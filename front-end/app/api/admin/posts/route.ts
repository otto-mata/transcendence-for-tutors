import { NextResponse } from 'next/server';

const MOCK_POSTS = [
  { id: 101, body: 'First post', author: 'alice' },
  { id: 102, body: 'Second post', author: 'bob' },
];

export async function GET() {
  return NextResponse.json(MOCK_POSTS);
}
