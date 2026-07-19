import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET() {
  const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });

  await redis.set('keepalive', new Date().toISOString());
  return NextResponse.json({ ok: true });
}
