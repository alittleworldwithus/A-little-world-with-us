import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const isSupabaseConfigured = Boolean(supabaseUrl);

  return NextResponse.json({
    status: 'ok',
    service: 'a-little-world-with-us',
    timestamp: new Date().toISOString(),
    database_configured: isSupabaseConfigured,
  });
}
