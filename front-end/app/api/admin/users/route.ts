import { NextResponse } from 'next/server';

const MOCK_USERS = [
  { id: 'u1', username: 'alice', email: 'alice@example.com', role: 'USER' },
  { id: 'u2', username: 'bob', email: 'bob@example.com', role: 'MODERATOR' },
  { id: 'u3', username: 'charlie', email: 'charlie@example.com', role: 'USER' },
];

export async function GET() {
  return NextResponse.json(MOCK_USERS);
}
