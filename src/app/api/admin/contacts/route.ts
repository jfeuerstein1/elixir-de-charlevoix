import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get('secret') !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const redis = new Redis({
    url: process.env.KV_REST_API_URL!,
    token: process.env.KV_REST_API_TOKEN!,
  });

  const keys = await redis.keys('contact:*');
  if (keys.length === 0) {
    return NextResponse.json([]);
  }

  const values = await redis.mget<Record<string, string>[]>(...keys);
  const contacts = keys.map((key, i) => ({ key, ...values[i] }))
    .sort((a, b) => (b.timestamp ?? '').localeCompare(a.timestamp ?? ''));

  const format = searchParams.get('format');
  if (format === 'csv') {
    const rows = [
      ['timestamp', 'name', 'email', 'message', 'site'],
      ...contacts.map(c => [
        c.timestamp ?? '',
        c.name ?? '',
        c.email ?? '',
        (c.message ?? '').replace(/"/g, '""'),
        c.site ?? '',
      ]),
    ];
    const csv = rows.map(r => r.map(v => `"${v}"`).join(',')).join('\n');
    return new Response(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="contacts.csv"',
      },
    });
  }

  return NextResponse.json(contacts);
}
