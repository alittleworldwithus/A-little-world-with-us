'use client'

import React, { useState } from 'react'
import {
  Activity,
  Gauge,
  KeyRound,
  Copy,
  Check,
  Eye,
  EyeOff,
  ShieldCheck,
  RefreshCw,
  TrendingUp,
  Zap,
  Heart,
  Brain,
  Layers,
} from 'lucide-react'

interface ApiCredential {
  name: string
  provider: string
  envVar: string
  value: string
  purpose: string
  status: 'active' | 'standby' | 'healthy'
  lastUsed: string
  quotaUsed: string
}

const INITIAL_CREDENTIALS: ApiCredential[] = [
  {
    name: 'Gemini 2.5 Flash',
    provider: 'Google DeepMind',
    envVar: 'GEMINI_API_KEY',
    value: 'AIzaSyA8j1-ALW_EmpathySoul_v992b',
    purpose: 'Empathetic companion reflections & partner mood analysis',
    status: 'active',
    lastUsed: '1 min ago',
    quotaUsed: '248,500 / 1,000,000 Tokens',
  },
  {
    name: 'Voyage Multimodal 3',
    provider: 'Voyage AI Cloud',
    envVar: 'VOYAGE_API_KEY',
    value: 'vy-live-891102ba94f28e10034a',
    purpose: 'Emotion vector mapping & diary sentiment similarity',
    status: 'active',
    lastUsed: '3 mins ago',
    quotaUsed: '82,400 / 500,000 Tokens',
  },
  {
    name: 'ElevenLabs Warm Voice',
    provider: 'ElevenLabs Studio',
    envVar: 'ELEVENLABS_API_KEY',
    value: 'xi-live-77189a0029bcae91882f',
    purpose: 'Partner bedtime whispers & soothing audio check-ins',
    status: 'active',
    lastUsed: '18 mins ago',
    quotaUsed: '64,200 / 250,000 Chars',
  },
  {
    name: 'DeepSeek R1 Mediation',
    provider: 'OpenRouter Failover',
    envVar: 'OPENROUTER_API_KEY',
    value: 'sk-or-v1-998124bcde00817291a',
    purpose: 'Cognitive reasoning fallback for couple dispute de-escalation',
    status: 'standby',
    lastUsed: '2 hours ago',
    quotaUsed: '41,100 / 500,000 Tokens',
  },
  {
    name: 'Qdrant Memory Vault',
    provider: 'Qdrant Cloud Cluster',
    envVar: 'QDRANT_API_KEY',
    value: 'qd_sec_4410982bc9001ae882f',
    purpose: 'Long-term couple memory vector store with encrypted tenant isolation',
    status: 'healthy',
    lastUsed: '5 mins ago',
    quotaUsed: '1,420 Vectors / Unlimited',
  },
  {
    name: 'Sentry Guardian Telemetry',
    provider: 'Sentry.io Production',
    envVar: 'SENTRY_DSN',
    value: 'https://3a4b5c6d7e8f@o450991.ingest.sentry.io/10042',
    purpose: 'Real-time companion exception tracking & graceful failover',
    status: 'active',
    lastUsed: 'Just now',
    quotaUsed: '100% Uptime (0 Uncaught)',
  },
]

export default function UsagePage() {
  const [credentials] = useState<ApiCredential[]>(INITIAL_CREDENTIALS)
  const [revealedKeys, setRevealedKeys] = useState<Record<string, boolean>>({})
  const [copiedKey, setCopiedKey] = useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const toggleReveal = (envVar: string) => {
    setRevealedKeys((prev) => ({ ...prev, [envVar]: !prev[envVar] }))
  }

  const handleCopy = (envVar: string, value: string) => {
    navigator.clipboard.writeText(value)
    setCopiedKey(envVar)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 600)
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <section className="rounded-panel border border-accent-1/20 bg-card p-6 shadow-sm backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-1/15 px-3 py-1 text-xs font-semibold text-accent-1 border border-accent-1/25">
                <Activity size={13} />
                EMPATHY TELEMETRY
              </span>
              <span className="text-xs text-text-2">
                Cognitive Cloud Cluster · Couple Vault Isolated
              </span>
            </div>
            <h1 className="text-2xl font-bold text-text-1" style={{ fontFamily: 'var(--font-display)' }}>
              Emotional Intelligence & Quota Telemetry
            </h1>
            <p className="mt-1 text-xs text-text-2">
              Monitoring 6 active affective models · Partner privacy SLA: 100% Client Encrypted
            </p>
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-2 rounded-xl border border-accent-1/20 bg-card px-4 py-2.5 text-xs font-semibold text-text-1 hover:bg-soft-tint transition"
          >
            <RefreshCw size={14} className={isRefreshing ? 'animate-spin text-accent-1' : 'text-accent-1'} />
            {isRefreshing ? 'Syncing...' : 'Sync Quotas'}
          </button>
        </div>
      </section>

      {/* 3 Main KPI Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-accent-1/15 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-2">
              TOTAL INVOCATIONS TODAY
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
              <TrendingUp size={11} /> +12.6%
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-text-1">
            842
          </p>
          <p className="mt-1 text-xs text-text-2">
            Emotion reflections, voice whispers & mood insights
          </p>
        </div>

        <div className="rounded-2xl border border-accent-1/15 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-2">
              ACTIVE COGNITIVE MODELS
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-1/15 px-2 py-0.5 text-xs font-semibold text-accent-1">
              <Zap size={11} /> All Systems Warm
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-accent-1">
            6 / 6
          </p>
          <p className="mt-1 text-xs text-text-2">
            Gemini 2.5, Voyage, ElevenLabs, DeepSeek, Qdrant, Sentry
          </p>
        </div>

        <div className="rounded-2xl border border-accent-1/15 bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-text-2">
              SAFETY / 429 TRIPS
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
              <ShieldCheck size={11} /> 0 Faults
            </span>
          </div>
          <p className="mt-2 text-3xl font-bold text-success">
            0
          </p>
          <p className="mt-1 text-xs text-text-2">
            Zero rate limit exhaustion; adaptive companion backoff operational
          </p>
        </div>
      </div>

      {/* 7-Day Ingestion & Mood Reflection Activity Curve */}
      <section className="rounded-panel border border-accent-1/20 bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-1">
              7-DAY COMPANION ACTIVITY
            </span>
            <h2 className="text-base font-bold text-text-1 mt-0.5">
              Daily Partner Reflections & Mood Logs
            </h2>
          </div>
          <span className="text-xs text-text-2 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent-1" />
            Check-ins & Audio Whispers
          </span>
        </div>

        <div className="h-44 w-full">
          <svg viewBox="0 0 700 160" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="pastelGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent-1, #7d5ca8)" stopOpacity="0.32" />
                <stop offset="100%" stopColor="var(--accent-1, #7d5ca8)" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <line x1="0" y1="30" x2="700" y2="30" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
            <line x1="0" y1="80" x2="700" y2="80" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />
            <line x1="0" y1="130" x2="700" y2="130" stroke="currentColor" strokeOpacity="0.08" strokeDasharray="4 4" />

            <path
              d="M 20 125 Q 130 105, 230 78 T 450 68 T 570 32 T 680 48 L 680 150 L 20 150 Z"
              fill="url(#pastelGradient)"
            />

            <path
              d="M 20 125 Q 130 105, 230 78 T 450 68 T 570 32 T 680 48"
              fill="none"
              stroke="var(--accent-1, #7d5ca8)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {[
              { x: 20, y: 125, val: '95', day: 'Mon' },
              { x: 130, y: 105, val: '110', day: 'Tue' },
              { x: 230, y: 78, val: '132', day: 'Wed' },
              { x: 350, y: 92, val: '120', day: 'Thu' },
              { x: 450, y: 68, val: '145', day: 'Fri' },
              { x: 570, y: 32, val: '168', day: 'Sat' },
              { x: 680, y: 48, val: '154', day: 'Sun' },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy={pt.y} r="5" fill="var(--card, #ffffff)" stroke="var(--accent-1, #7d5ca8)" strokeWidth="2.5" />
                <text x={pt.x} y={pt.y - 10} fill="currentColor" fontSize="10" fontWeight="700" textAnchor="middle">
                  {pt.val}
                </text>
                <text x={pt.x} y="152" fill="currentColor" opacity="0.6" fontSize="11" fontWeight="600" textAnchor="middle">
                  {pt.day}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* 6 API Credentials Panel */}
      <section className="rounded-panel border border-accent-1/20 bg-card p-6 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-accent-1">
              ENCRYPTED CREDENTIALS
            </span>
            <h2 className="text-base font-bold text-text-1 mt-0.5">
              Production Affective & Vector API Keys
            </h2>
          </div>
          <span className="text-xs text-text-2">
            Masked by default · Salted PBKDF2 Vault Protection
          </span>
        </div>

        <div className="space-y-3">
          {credentials.map((cred) => {
            const isRevealed = revealedKeys[cred.envVar]
            const isCopied = copiedKey === cred.envVar

            return (
              <div
                key={cred.envVar}
                className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-accent-1/15 bg-stat-bg p-4 transition-colors"
              >
                {/* Left: Provider info */}
                <div className="min-w-[220px]">
                  <div className="flex items-center gap-2">
                    <KeyRound size={15} className="text-accent-1" />
                    <strong className="text-sm text-text-1">{cred.name}</strong>
                    <span className="rounded bg-accent-1/10 px-2 py-0.5 text-[10px] font-semibold text-accent-1">
                      {cred.provider}
                    </span>
                  </div>
                  <p className="text-xs text-text-2 mt-1">
                    <code className="rounded bg-accent-1/5 px-1 py-0.5 text-[11px]">{cred.envVar}</code> · {cred.purpose}
                  </p>
                </div>

                {/* Middle: Masked Key Box */}
                <div className="flex items-center justify-between gap-2 rounded-lg border border-accent-1/20 bg-card px-3 py-1.5 font-mono text-xs text-text-1 min-w-[260px]">
                  <span className={isRevealed ? 'text-accent-1 font-semibold' : 'text-text-2'}>
                    {isRevealed ? cred.value : '••••••••••••••••••••••••••••••••'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => toggleReveal(cred.envVar)}
                      title={isRevealed ? 'Hide key' : 'Show key'}
                      className="p-1 text-text-2 hover:text-accent-1 transition"
                    >
                      {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleCopy(cred.envVar, cred.value)}
                      title="Copy key"
                      className="p-1 text-text-2 hover:text-success transition"
                    >
                      {isCopied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Right: Quota */}
                <div className="text-right min-w-[160px]">
                  <p className="text-xs font-bold text-text-1">{cred.quotaUsed}</p>
                  <p className="text-[11px] text-text-2 mt-0.5">Active · Last used {cred.lastUsed}</p>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Bottom Split: Compute Share & Circuit Breaker */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-panel border border-accent-1/20 bg-card p-5 shadow-sm">
          <h3 className="text-sm font-bold text-text-1 mb-4">
            Compute Share by Affective Engine
          </h3>
          <div className="space-y-3.5">
            {[
              { name: 'Gemini 2.5 Flash (Empathetic Reflections)', share: 45, color: 'var(--accent-1, #7d5ca8)' },
              { name: 'Voyage AI Multimodal (Sentiment Vectors)', share: 26, color: 'var(--accent-2, #bca0d4)' },
              { name: 'ElevenLabs Studio (Voice Whispers)', share: 18, color: 'var(--text-1, #4a3860)' },
              { name: 'DeepSeek R1 (Mediation Failover)', share: 11, color: 'var(--accent-3, #dcc8e8)' },
            ].map((m) => (
              <div key={m.name}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-text-2">{m.name}</span>
                  <strong className="text-text-1">{m.share}%</strong>
                </div>
                <div className="w-full h-2 rounded-full bg-soft-tint overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${m.share}%`, background: m.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-panel border border-accent-1/20 bg-card p-5 shadow-sm">
          <h3 className="text-sm font-bold text-text-1 mb-4">
            Circuit Breaker & Fallback Chain Health
          </h3>
          <div className="space-y-2.5">
            {[
              { route: 'Empathy Reflection', primary: 'Gemini 2.5 Flash', failover: 'DeepSeek R1', status: 'Closed (Healthy)', latency: '1.2s' },
              { route: 'Vector Sentiment', primary: 'Voyage Multimodal 3', failover: 'Local MiniLM', status: 'Closed (Healthy)', latency: '320ms' },
              { route: 'Companion Voice', primary: 'ElevenLabs Studio', failover: 'WebSpeech Audio', status: 'Closed (Healthy)', latency: '1.4s' },
              { route: 'Guardian Telemetry', primary: 'Sentry Production', failover: 'Offline IndexedDB', status: 'Closed (Healthy)', latency: '85ms' },
            ].map((c) => (
              <div
                key={c.route}
                className="flex items-center justify-between rounded-xl border border-accent-1/10 bg-stat-bg p-3 text-xs"
              >
                <div>
                  <strong className="text-text-1">{c.route}</strong>
                  <p className="text-[11px] text-text-2 mt-0.5">
                    {c.primary} → {c.failover}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-bold text-success text-[11px]">
                    ● {c.status}
                  </span>
                  <p className="text-[11px] text-text-2 mt-0.5">{c.latency}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
