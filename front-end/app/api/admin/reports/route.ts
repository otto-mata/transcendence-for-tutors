import { NextResponse } from 'next/server';

const MOCK_REPORTS = [
  { id: 'r1', type: 'post', targetId: '101', reason: 'spam' },
  { id: 'r2', type: 'comment', targetId: '201', reason: 'abuse' },
];

export async function GET() {
  return NextResponse.json(MOCK_REPORTS);
}
