import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { trace, Span, SpanStatusCode } from '@opentelemetry/api';

let initialized = false;

export function initServerTelemetry() {
  if (initialized) {
    return;
  }

  // Check if OTEL SDK is disabled per local-env-rules.yaml.md
  if (process.env.OTEL_SDK_DISABLED === 'true') {
    console.log('[Telemetry] OpenTelemetry SDK disabled via OTEL_SDK_DISABLED');
    initialized = true;
    return;
  }

  const collectorUrl = process.env.OTEL_COLLECTOR_URL || 'http://localhost:4318';

  const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'storefront-web-server',
    [ATTR_SERVICE_VERSION]: process.env.APP_VERSION || '1.0.0',
    'deployment.environment': process.env.NODE_ENV,
  });

  const provider = new NodeTracerProvider({ resource });

  const exporter = new OTLPTraceExporter({
    url: `${collectorUrl}/v1/traces`,
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));
  provider.register();

  registerInstrumentations({
    instrumentations: [
      new HttpInstrumentation({
        requestHook: (span, request) => {
          span.setAttribute('http.request.id', Math.random().toString(36).substring(7));
        },
      }),
    ],
  });

  initialized = true;
  console.log('[Telemetry] Server instrumentation initialized');
}

// No-op span for when telemetry is disabled
const noopSpan: Span = {
  setAttribute: () => noopSpan,
  setAttributes: () => noopSpan,
  addEvent: () => noopSpan,
  setStatus: () => noopSpan,
  updateName: () => noopSpan,
  end: () => {},
  isRecording: () => false,
  recordException: () => {},
  spanContext: () => ({
    traceId: '',
    spanId: '',
    traceFlags: 0,
  }),
} as unknown as Span;

/**
 * Wraps an async function with OpenTelemetry tracing.
 * Creates a span with the given name and passes it to the callback.
 * When OTEL_SDK_DISABLED=true, bypasses tracing entirely.
 */
export async function withTelemetry<T>(
  spanName: string,
  fn: (span: Span) => Promise<T>
): Promise<T> {
  // Check at runtime if OTEL SDK is disabled per local-env-rules.yaml.md
  // This must be checked inside the function, not at module load time,
  // because Next.js standalone mode may not have env vars at build time
  const isOtelDisabled = process.env.OTEL_SDK_DISABLED === 'true';

  // Bypass tracing when OTEL is disabled
  if (isOtelDisabled) {
    return fn(noopSpan);
  }

  const tracer = trace.getTracer('storefront-web-server');

  return tracer.startActiveSpan(spanName, async (span) => {
    try {
      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
      if (error instanceof Error) {
        span.recordException(error);
      }
      throw error;
    } finally {
      span.end();
    }
  });
}

