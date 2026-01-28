import { NextResponse } from 'next/server';

export async function PATCH(_: Request, { params }: { params: any }) {
  const backend = process.env.BACKEND_URL ?? 'http://localhost:3000/notifications';
  const { id } = await params; // params is a Promise in Next dynamic API routes
  try {
    const body = await _.json();
  // backend expects PATCH requests at /notifications/:id/read
  const res = await fetch(`${backend}/${id}/read`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (err) {
    console.error('Proxy PATCH to backend failed', err);
    return NextResponse.json({ error: 'proxy_failed' }, { status: 502 });
  }
}
