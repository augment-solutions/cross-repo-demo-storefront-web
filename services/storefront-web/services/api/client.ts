import { trace, SpanStatusCode, context } from '@opentelemetry/api';

// Determine the base URL based on the endpoint
// - /api/v1/* endpoints go to the backend API gateway
// - /api/* endpoints (Next.js API routes) go to the internal Next.js server
// NOTE: Environment variables must be read at runtime, not at module load time,
// because Next.js standalone mode may not have env vars available at build time.
function getBaseUrl(endpoint: string): string {
  // Read env vars at runtime per local-env-rules.yaml.md
  const BACKEND_API_URL = process.env.API_URL || 'http://localhost:8080';
  const INTERNAL_API_URL = process.env.INTERNAL_API_URL || 'http://localhost:3000';

  // Check if running on server or client
  const isServer = typeof window === 'undefined';

  if (endpoint.startsWith('/api/v1/')) {
    // Backend API calls
    return BACKEND_API_URL;
  } else if (endpoint.startsWith('/api/')) {
    // Next.js API routes
    if (isServer) {
      // Server-side: use internal URL
      return INTERNAL_API_URL;
    }
    // Client-side: use relative path
    return '';
  }
  // Default to backend API
  return BACKEND_API_URL;
}

// Helper function to check if OTEL SDK is disabled at runtime
// This must be called inside functions, not at module load time,
// because Next.js standalone mode may not have env vars at build time
function isOtelDisabledAtRuntime(): boolean {
  const isServer = typeof window === 'undefined';
  // On client-side, always disable tracing since OTEL is server-side only
  // On server-side, check the OTEL_SDK_DISABLED env var per local-env-rules.yaml.md
  return !isServer || process.env.OTEL_SDK_DISABLED === 'true';
}

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
}

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

interface ApiResponse<T> {
  data: T;
  status: number;
}

async function requestWithoutTracing<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const { params, ...fetchOptions } = options;

  // Build URL with query params
  const baseUrl = getBaseUrl(endpoint);
  let url = `${baseUrl}${endpoint}`;
  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, String(value));
      }
    });
    const queryString = searchParams.toString();
    if (queryString) {
      url += `?${queryString}`;
    }
  }

  // Check if running on server or client
  const isServer = typeof window === 'undefined';

  const response = await fetch(url, {
    ...fetchOptions,
    headers: {
      'Content-Type': 'application/json',
      ...fetchOptions.headers,
    },
    // Only include credentials on client-side; server-side doesn't need them
    ...(isServer ? {} : { credentials: 'include' as RequestCredentials }),
    // Disable Next.js fetch caching for server-side requests
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const error = new ApiError(
      errorData.message || `Request failed with status ${response.status}`,
      response.status,
      errorData
    );
    (error as any).response = { status: response.status, data: errorData };
    throw error;
  }

  const data = await response.json();
  return { data, status: response.status };
}

async function requestWithTracing<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const tracer = trace.getTracer('storefront-web');

  return tracer.startActiveSpan(`HTTP ${options.method || 'GET'} ${endpoint}`, async (span) => {
    try {
      const { params, ...fetchOptions } = options;

      // Build URL with query params
      const baseUrl = getBaseUrl(endpoint);
      let url = `${baseUrl}${endpoint}`;
      if (params) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined) {
            searchParams.append(key, String(value));
          }
        });
        const queryString = searchParams.toString();
        if (queryString) {
          url += `?${queryString}`;
        }
      }

      span.setAttribute('http.url', url);
      span.setAttribute('http.method', options.method || 'GET');

      // Check if running on server or client
      const isServer = typeof window === 'undefined';

      const response = await fetch(url, {
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...fetchOptions.headers,
        },
        // Only include credentials on client-side; server-side doesn't need them
        ...(isServer ? {} : { credentials: 'include' as RequestCredentials }),
        // Disable Next.js fetch caching for server-side requests
        cache: 'no-store',
      });

      span.setAttribute('http.status_code', response.status);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        span.setStatus({ code: SpanStatusCode.ERROR, message: errorData.message });
        const error = new ApiError(
          errorData.message || `Request failed with status ${response.status}`,
          response.status,
          errorData
        );
        (error as any).response = { status: response.status, data: errorData };
        throw error;
      }

      const data = await response.json();
      span.setStatus({ code: SpanStatusCode.OK });
      return { data, status: response.status };
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      span.setStatus({ code: SpanStatusCode.ERROR, message: (error as Error).message });
      span.recordException(error as Error);
      throw new ApiError('Network error', 0, error);
    } finally {
      span.end();
    }
  });
}

async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  // Check at runtime if OTEL is disabled
  if (isOtelDisabledAtRuntime()) {
    return requestWithoutTracing<T>(endpoint, options);
  }
  return requestWithTracing<T>(endpoint, options);
}

interface ClientRequestOptions {
  headers?: Record<string, string>;
  params?: Record<string, string | number | boolean | undefined>;
}

export const apiClient = {
  get: <T>(endpoint: string, options?: ClientRequestOptions) =>
    request<T>(endpoint, { method: 'GET', ...options }),

  post: <T>(endpoint: string, data?: unknown, options?: ClientRequestOptions) =>
    request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  put: <T>(endpoint: string, data?: unknown, options?: ClientRequestOptions) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  patch: <T>(endpoint: string, data?: unknown, options?: ClientRequestOptions) =>
    request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    }),

  delete: <T>(endpoint: string, options?: ClientRequestOptions) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
};

export { ApiError };

