import { register, collectDefaultMetrics } from "prom-client";

// Register default metrics only once (important for dev + hot reload)
const globalForMetrics = globalThis as unknown as {
  metricsRegistered?: boolean;
};

if (!globalForMetrics.metricsRegistered) {
  const prefix = "my_application_";
  collectDefaultMetrics({ prefix });
  globalForMetrics.metricsRegistered = true;
}

export async function GET() {
  const metrics = await register.metrics();

  return new Response(metrics, {
    headers: {
      "Content-Type": register.contentType,
    },
  });
}
