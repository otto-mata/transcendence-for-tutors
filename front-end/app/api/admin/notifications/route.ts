import { NextResponse } from 'next/server';

const MOCK_NOTIFS = [
  { id: 'n1', title: 'Maintenance', message: 'System maintenance tonight' },
];

export async function GET() {
  return NextResponse.json(MOCK_NOTIFS);
}
