import { NextResponse } from 'next/server';

import { getPublicLanterns, hasSharedStorage, isLanternInput, savePublicLantern } from '@/lib/lantern-feed';

export const dynamic = 'force-dynamic';

export async function GET() {
  const lanterns = await getPublicLanterns();

  return NextResponse.json({
    lanterns,
    source: hasSharedStorage() ? 'shared' : 'sample'
  });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!isLanternInput(body)) {
    return NextResponse.json({ error: 'Invalid lantern payload.' }, { status: 400 });
  }

  const lantern = await savePublicLantern(body);

  return NextResponse.json({
    lantern,
    source: hasSharedStorage() ? 'shared' : 'sample'
  });
}