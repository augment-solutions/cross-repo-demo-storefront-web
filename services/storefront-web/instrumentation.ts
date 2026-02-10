export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initServerTelemetry } = await import('./lib/telemetry/server');
    initServerTelemetry();
  }
}

