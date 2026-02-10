'use client';

import { useEffect, createContext, useContext, ReactNode } from 'react';
import { initBrowserTelemetry, getTracer } from './browser';
import type { Tracer } from '@opentelemetry/api';

interface TelemetryContextValue {
  tracer: Tracer | null;
  trackEvent: (name: string, attributes?: Record<string, string | number | boolean>) => void;
  trackPageView: (path: string) => void;
}

const TelemetryContext = createContext<TelemetryContextValue>({
  tracer: null,
  trackEvent: () => {},
  trackPageView: () => {},
});

export function useTelemetry() {
  return useContext(TelemetryContext);
}

interface TelemetryProviderProps {
  children: ReactNode;
}

export function TelemetryProvider({ children }: TelemetryProviderProps) {
  useEffect(() => {
    initBrowserTelemetry();
  }, []);

  const trackEvent = (name: string, attributes?: Record<string, string | number | boolean>) => {
    const tracer = getTracer();
    const span = tracer.startSpan(`event.${name}`);
    if (attributes) {
      Object.entries(attributes).forEach(([key, value]) => {
        span.setAttribute(key, value);
      });
    }
    span.end();
  };

  const trackPageView = (path: string) => {
    const tracer = getTracer();
    const span = tracer.startSpan('page_view');
    span.setAttribute('page.path', path);
    span.setAttribute('page.url', typeof window !== 'undefined' ? window.location.href : '');
    span.end();
  };

  const value: TelemetryContextValue = {
    tracer: typeof window !== 'undefined' ? getTracer() : null,
    trackEvent,
    trackPageView,
  };

  return (
    <TelemetryContext.Provider value={value}>
      {children}
    </TelemetryContext.Provider>
  );
}

