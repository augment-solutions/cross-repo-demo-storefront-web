'use client';

import { WebTracerProvider } from '@opentelemetry/sdk-trace-web';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { Resource } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { ZoneContextManager } from '@opentelemetry/context-zone';
import { registerInstrumentations } from '@opentelemetry/instrumentation';
import { FetchInstrumentation } from '@opentelemetry/instrumentation-fetch';
import { DocumentLoadInstrumentation } from '@opentelemetry/instrumentation-document-load';
import { UserInteractionInstrumentation } from '@opentelemetry/instrumentation-user-interaction';
import { trace } from '@opentelemetry/api';

let initialized = false;

export function initBrowserTelemetry() {
  if (initialized || typeof window === 'undefined') {
    return;
  }

  const collectorUrl = process.env.NEXT_PUBLIC_OTEL_COLLECTOR_URL || 'http://localhost:4318';

  const resource = new Resource({
    [ATTR_SERVICE_NAME]: 'storefront-web',
    [ATTR_SERVICE_VERSION]: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
    'deployment.environment': process.env.NODE_ENV,
  });

  const provider = new WebTracerProvider({ resource });

  const exporter = new OTLPTraceExporter({
    url: `${collectorUrl}/v1/traces`,
  });

  provider.addSpanProcessor(new BatchSpanProcessor(exporter));

  provider.register({
    contextManager: new ZoneContextManager(),
  });

  registerInstrumentations({
    instrumentations: [
      new FetchInstrumentation({
        propagateTraceHeaderCorsUrls: [/.*/],
        clearTimingResources: true,
      }),
      new DocumentLoadInstrumentation(),
      new UserInteractionInstrumentation({
        eventNames: ['click', 'submit'],
      }),
    ],
  });

  initialized = true;
  console.log('[Telemetry] Browser instrumentation initialized');
}

export function getTracer(name: string = 'storefront-web') {
  return trace.getTracer(name);
}

