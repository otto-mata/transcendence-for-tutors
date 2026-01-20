import { NextResponse } from 'next/server';

export async function DELETE(_request: Request, { params }: { params: { id: string } }) {
  return NextResponse.json({ ok: true, id: params.id });
}
