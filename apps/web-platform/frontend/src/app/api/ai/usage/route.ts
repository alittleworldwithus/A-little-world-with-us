import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json({ error: 'Auth not configured' }, { status: 500 })
    }

    const supabase = createServerClient(
      supabaseUrl,
      supabaseAnonKey,
      { cookies: { getAll: () => req.cookies.getAll(), setAll: () => {} } }
    )
    const { data: { user: cookieUser } } = await supabase.auth.getUser()
    const bearer = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '')
    const tokenClient = bearer
      ? createClient(supabaseUrl, supabaseAnonKey)
      : null
    const { data: { user: tokenUser } } = tokenClient && bearer
      ? await tokenClient.auth.getUser(bearer)
      : { data: { user: null } }
    const user = cookieUser ?? tokenUser
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const env = process.env

  const providersConfig = {
    groq: Boolean(env.GROQ_API_KEY?.trim() && !env.GROQ_API_KEY.startsWith('your_')),
    gemini: Boolean(env.GEMINI_API_KEY?.trim() && !env.GEMINI_API_KEY.startsWith('your_')),
    openrouter: Boolean(env.OPENROUTER_API_KEY?.trim() && !env.OPENROUTER_API_KEY.startsWith('your_')),
    mistral: Boolean(env.MISTRAL_API_KEY?.trim() && !env.MISTRAL_API_KEY.startsWith('your_')),
    cohere: Boolean(env.COHERE_API_KEY?.trim() && !env.COHERE_API_KEY.startsWith('your_')),
    voyage: Boolean(env.VOYAGE_API_KEY?.trim() && !env.VOYAGE_API_KEY.startsWith('your_')),
    nvidia: Boolean(env.NVIDIA_API_KEY?.trim() && !env.NVIDIA_API_KEY.startsWith('your_')),
    cloudflare: Boolean((env.CLOUDFLARE_API_KEY?.trim() || env.CLOUDFLARE_API_TOKEN?.trim()) && !env.CLOUDFLARE_API_KEY?.startsWith('your_')),
  }

  const providers: Record<string, any> = {}
  for (const [prov, configured] of Object.entries(providersConfig)) {
    providers[prov] = {
      configured,
      status: configured ? 'active' : 'unconfigured',
      calls_today: 0,
      total_calls: 0,
      errors_today: 0,
      last_used: null,
    }
  }

  const summary = {
    project: 'A-Little-World-With-Us',
    timestamp: new Date().toISOString(),
    date: new Date().toISOString().substring(0, 10),
    total_calls_today: 0,
    active_chains: {
      chat_priority: ['groq', 'gemini', 'openrouter', 'mistral', 'cohere', 'nvidia', 'cloudflare'],
      rag_priority: ['voyage', 'cohere'],
      korean_learning_priority: ['gemini', 'groq', 'openrouter'],
    },
    providers,
  }

  return NextResponse.json(summary)
}
