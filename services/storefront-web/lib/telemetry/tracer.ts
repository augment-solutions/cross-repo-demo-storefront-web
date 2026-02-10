import { trace, Span, SpanStatusCode, context, SpanKind } from '@opentelemetry/api';

const TRACER_NAME = 'storefront-web';

export function getTracer() {
  return trace.getTracer(TRACER_NAME);
}

export async function withSpan<T>(
  name: string,
  fn: (span: Span) => Promise<T>,
  attributes?: Record<string, string | number | boolean>
): Promise<T> {
  const tracer = getTracer();

  return tracer.startActiveSpan(name, async (span) => {
    try {
      if (attributes) {
        Object.entries(attributes).forEach(([key, value]) => {
          span.setAttribute(key, value);
        });
      }

      const result = await fn(span);
      span.setStatus({ code: SpanStatusCode.OK });
      return result;
    } catch (error) {
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error instanceof Error ? error.message : 'Unknown error',
      });
      span.recordException(error as Error);
      throw error;
    } finally {
      span.end();
    }
  });
}

export function createSpan(
  name: string,
  kind: SpanKind = SpanKind.INTERNAL
): Span {
  const tracer = getTracer();
  return tracer.startSpan(name, { kind });
}

export function addSpanEvent(
  span: Span,
  name: string,
  attributes?: Record<string, string | number | boolean>
): void {
  span.addEvent(name, attributes);
}

export function setSpanAttribute(
  span: Span,
  key: string,
  value: string | number | boolean
): void {
  span.setAttribute(key, value);
}

export function recordException(span: Span, error: Error): void {
  span.recordException(error);
  span.setStatus({ code: SpanStatusCode.ERROR, message: error.message });
}

export function endSpan(span: Span, status?: 'ok' | 'error', message?: string): void {
  if (status === 'error') {
    span.setStatus({ code: SpanStatusCode.ERROR, message });
  } else {
    span.setStatus({ code: SpanStatusCode.OK });
  }
  span.end();
}

export function getCurrentSpan(): Span | undefined {
  return trace.getActiveSpan();
}

export function runWithSpan<T>(span: Span, fn: () => T): T {
  return context.with(trace.setSpan(context.active(), span), fn);
}

