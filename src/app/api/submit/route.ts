import { NextRequest, NextResponse } from 'next/server';
import type { Submission } from '@/types/submission';

export const POST = async (request: NextRequest) => {
  const body: Submission = await request.json();

  const response = await fetch(`${process.env.API_URL}/submissions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Failed to submit' }, { status: response.status });
  }

  return NextResponse.json(await response.json());
};
