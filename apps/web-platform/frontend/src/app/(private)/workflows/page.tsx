'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import {
  Play,
  Square,
  RotateCcw,
  Sliders,
  CheckCircle2,
  Clock,
  Sparkles,
  Heart,
  Brain,
  MessageCircleHeart,
  Volume2,
  ShieldCheck,
  Send,
  Terminal,
  Activity,
  Layers,
  Zap,
} from 'lucide-react'

export interface CompanionStage {
  id: string
  order: number
  title: string
  category: 'input' | 'analysis' | 'memory' | 'empathy' | 'wellness' | 'audio' | 'safety' | 'sync'
  engine: string
  description: string
  enabled: boolean
  status: 'idle' | 'running' | 'completed' | 'bypassed'
  latency: string
  config: Record<string, string | number | boolean>
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
}

const INITIAL_STAGES: CompanionStage[] = [
  {
    id: 'stage-1-intake',
    order: 1,
    title: 'Diary & Voice Mood Journal Intake',
    category: 'input',
    engine: 'Whisper & Audio Ingestion',
    description: 'Captures daily voice notes, handwritten reflections, and quick mood check-ins.',
    enabled: true,
    status: 'idle',
    latency: '1.1s',
    config: {
      inputModality: 'Audio Voice Note / Text Diary',
      sampleRate: '16kHz Whisper Dual-channel',
      language: 'Burmese (my) & English (en)',
      privacyFilter: 'Client-side AES-256 GCM encrypted',
    },
    icon: Heart,
  },
  {
    id: 'stage-2-sentiment',
    order: 2,
    title: 'Emotional Vector Analysis & Sentiment Mapping',
    category: 'analysis',
    engine: 'Voyage AI Multimodal Embeddings',
    description: 'Maps emotional valence, relationship sentiment, and stress indicators.',
    enabled: true,
    status: 'idle',
    latency: '1.9s',
    config: {
      embeddingModel: 'voyage-multimodal-3',
      dimensionSize: '1024-dim Vector',
      metricsTracked: 'Valence, Arousal, Empathy score',
      sentimentScale: '5-point continuum',
    },
    icon: Brain,
  },
  {
    id: 'stage-3-memory',
    order: 3,
    title: 'Memory Matrix & Context Retrieval',
    category: 'memory',
    engine: 'Qdrant Vector Memory Vault',
    description: 'Retrieves anniversary milestones, shared jokes, past dates, and couple promises.',
    enabled: true,
    status: 'idle',
    latency: '1.4s',
    config: {
      collection: 'couple_memories_vault',
      similarityThreshold: '0.84 Cosine Distance',
      topKRetrieval: '5 contextual memory anchors',
      coupleIdBinding: 'Strict Row Level Security (RLS)',
    },
    icon: Layers,
  },
  {
    id: 'stage-4-empathy',
    order: 4,
    title: 'Empathetic Response Generation',
    category: 'empathy',
    engine: 'Gemini 2.5 Flash Empathy Engine',
    description: 'Synthesizes warm, non-judgmental, and validating relationship reflections.',
    enabled: true,
    status: 'idle',
    latency: '2.2s',
    config: {
      model: 'gemini-2.5-flash',
      toneGuideline: 'Gentle, attentive, validating',
      safetyGuardrail: 'Zero gaslighting & active listening',
      partnerPerspective: 'Balanced mutual empathy',
    },
    icon: MessageCircleHeart,
  },
  {
    id: 'stage-5-wellness',
    order: 5,
    title: 'Wellness Routine & Habit Suggestions',
    category: 'wellness',
    engine: 'Habit & Sleep Cognitive Planner',
    description: 'Generates gentle reminders for hydration, mindful breathing, and couple check-ins.',
    enabled: true,
    status: 'idle',
    latency: '1.3s',
    config: {
      routineTypes: 'Breathing, Bedtime wind-down, Walk',
      streakTracking: 'Enabled (Love Streak sync)',
      adaptivePacing: 'Matches partner stress level',
    },
    icon: Sparkles,
  },
  {
    id: 'stage-6-voice',
    order: 6,
    title: 'Voice Companion Audio Synthesis',
    category: 'audio',
    engine: 'ElevenLabs Warm Voice Synthesizer',
    description: 'Produces soft audio whispers and bedtime meditations tailored to your partner.',
    enabled: true,
    status: 'idle',
    latency: '2.4s',
    config: {
      voiceTone: 'Warm & Calming (Whisper style)',
      speechRate: '0.92x (Slow & soothing)',
      backgroundAmbience: 'Gentle rain & piano chords (-18dB)',
    },
    icon: Volume2,
  },
  {
    id: 'stage-7-safety',
    order: 7,
    title: 'Guardian Safety & Crisis Check',
    category: 'safety',
    engine: 'AIGuardian Safety Evaluator',
    description: 'Monitors severe emotional distress thresholds. Bypassed for routine diary sync.',
    enabled: false,
    status: 'bypassed',
    latency: '0.0s (Bypassed)',
    config: {
      autoBypass: true,
      bypassTarget: 'Stage 8: Partner Sync',
      emergencyResourcePrompt: 'Disabled in normal mood range',
    },
    icon: ShieldCheck,
  },
  {
    id: 'stage-8-sync',
    order: 8,
    title: 'Daily Summary & Telegram Check-in Digest',
    category: 'sync',
    engine: 'Telegram Partner Sync & Push',
    description: 'Packages evening couple digest and delivers gentle notification to your partner.',
    enabled: true,
    status: 'idle',
    latency: '1.6s',
    config: {
      destination: 'Shared Couple Feed & Telegram Bot',
      digestFormat: '3-bullet reflection + Audio card',
      encryption: 'End-to-End Vault Keyed',
    },
    icon: Send,
  },
]

export default function WorkflowsPage() {
  const [stages, setStages] = useState<CompanionStage[]>(INITIAL_STAGES)
  const [selectedStageId, setSelectedStageId] = useState<string>('stage-1-intake')
  const [isSimulating, setIsSimulating] = useState(false)
  const [simStep, setSimStep] = useState<number>(-1)
  const [logs, setLogs] = useState<
    Array<{ timestamp: string; stageTitle: string; message: string; type: 'info' | 'success' | 'warn' | 'bypass' }>
  >([
    {
      timestamp: '18:50:00',
      stageTitle: 'COMPANION-CORE',
      message: 'Emotional Companion Pipeline initialized. Ready for partner mood synchronization.',
      type: 'info',
    },
    {
      timestamp: '18:50:01',
      stageTitle: 'ROUTING',
      message: 'Stage 7 [Guardian Safety Check] auto-bypassed: Direct bridge to Stage 8 active.',
      type: 'bypass',
    },
  ])

  const terminalEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [logs])

  const addLog = (
    stageTitle: string,
    message: string,
    type: 'info' | 'success' | 'warn' | 'bypass' = 'info'
  ) => {
    const time = new Date().toTimeString().split(' ')[0]
    setLogs((prev) => [...prev, { timestamp: time, stageTitle, message, type }])
  }

  const handleToggleStage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setStages((prev) =>
      prev.map((stage) => {
        if (stage.id !== id) return stage
        const newEnabled = !stage.enabled
        const newStatus = !newEnabled ? 'bypassed' : 'idle'

        addLog(
          stage.title,
          newEnabled
            ? 'Stage re-enabled into active companion pipeline.'
            : 'Stage bypassed. Downstream pipeline will auto-bridge past this node.',
          newEnabled ? 'info' : 'bypass'
        )

        return {
          ...stage,
          enabled: newEnabled,
          status: newStatus,
          latency: !newEnabled ? '0.0s (Bypassed)' : stage.latency,
        }
      })
    )
  }

  const runSimulation = async () => {
    if (isSimulating) return
    setIsSimulating(true)
    setSimStep(0)

    setStages((prev) =>
      prev.map((s) => ({
        ...s,
        status: !s.enabled ? 'bypassed' : 'idle',
      }))
    )

    addLog('SIMULATOR', 'Initiating live companion pipeline simulation...', 'info')

    for (let i = 0; i < stages.length; i++) {
      const current = stages[i]
      setSimStep(i)

      if (!current.enabled) {
        setStages((prev) =>
          prev.map((s, idx) => (idx === i ? { ...s, status: 'bypassed' } : s))
        )
        addLog(
          current.title,
          'Stage is disabled. Auto-bypassing to next stage in 200ms...',
          'bypass'
        )
        await new Promise((r) => setTimeout(r, 400))
        continue
      }

      setStages((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'running' } : s))
      )
      addLog(current.title, `Executing [${current.engine}]...`, 'info')

      await new Promise((r) => setTimeout(r, 850))

      setStages((prev) =>
        prev.map((s, idx) => (idx === i ? { ...s, status: 'completed' } : s))
      )
      addLog(current.title, `Completed successfully in ${current.latency}.`, 'success')
    }

    addLog('PIPELINE', 'All companion stages finished. Daily summary dispatched.', 'success')
    setIsSimulating(false)
    setSimStep(-1)
  }

  const resetPipeline = () => {
    setIsSimulating(false)
    setSimStep(-1)
    setStages(INITIAL_STAGES)
    setLogs([
      {
        timestamp: new Date().toTimeString().split(' ')[0],
        stageTitle: 'SYSTEM',
        message: 'Pipeline reset to default couple companion configuration.',
        type: 'info',
      },
    ])
  }

  const selectedStage = stages.find((s) => s.id === selectedStageId) || stages[0]
  const activeCount = stages.filter((s) => s.enabled).length

  return (
    <div className="space-y-6 pb-12">
      {/* Top Header Card */}
      <section className="rounded-panel border border-accent-1/20 bg-card p-6 shadow-sm backdrop-blur-xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-1/15 px-3 py-1 text-xs font-semibold text-accent-1 border border-accent-1/25">
                <Zap size={13} />
                COMPANION PIPELINE
              </span>
              <span className="text-xs text-text-2">
                Auto-Bypass Routing · Empathy Telemetry
              </span>
            </div>
            <h1 className="text-2xl font-bold text-text-1" style={{ fontFamily: 'var(--font-display)' }}>
              Emotional & Wellness Companion Canvas
            </h1>
            <p className="mt-1 text-xs text-text-2">
              Active Stages: <strong className="text-accent-1">{activeCount}</strong> / {stages.length} ·
              Bypass Modes: <strong className="text-warning">{stages.length - activeCount} Bypassed</strong> ·
              Pipeline Latency: <strong className="text-text-1">~1.8s / Stage</strong>
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetPipeline}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 rounded-xl border border-accent-1/20 bg-card px-4 py-2.5 text-xs font-semibold text-text-2 hover:bg-soft-tint transition"
            >
              <RotateCcw size={14} />
              Reset
            </button>

            <button
              type="button"
              onClick={runSimulation}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 rounded-xl bg-accent-1 px-5 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition disabled:opacity-50"
            >
              {isSimulating ? (
                <>
                  <Square size={14} className="animate-pulse" />
                  Running Stage {simStep + 1}...
                </>
              ) : (
                <>
                  <Play size={14} fill="currentColor" />
                  Run Companion Pipeline
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Stages Left, Inspector Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6">
        {/* Stages Column */}
        <div className="space-y-3">
          {stages.map((stage, idx) => {
            const Icon = stage.icon
            const isSelected = stage.id === selectedStageId
            const isRunning = stage.status === 'running'
            const isCompleted = stage.status === 'completed'
            const isBypassed = stage.status === 'bypassed' || !stage.enabled

            return (
              <div key={stage.id} className="space-y-2">
                <div
                  onClick={() => setSelectedStageId(stage.id)}
                  className={`flex min-h-[82px] cursor-pointer items-center justify-between gap-4 rounded-2xl border p-4 transition-all ${
                    isSelected
                      ? 'border-accent-1 bg-accent-1/10 shadow-sm'
                      : isRunning
                      ? 'border-accent-1 bg-accent-1/5'
                      : isBypassed
                      ? 'border-warning/30 bg-card/60 opacity-75'
                      : 'border-accent-1/15 bg-card hover:border-accent-1/30'
                  }`}
                >
                  {/* Left: Icon & Stage Metadata */}
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div
                      className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl border ${
                        isBypassed
                          ? 'border-warning/30 bg-warning/10 text-warning'
                          : isRunning
                          ? 'border-accent-1 bg-accent-1/20 text-accent-1 animate-pulse'
                          : isCompleted
                          ? 'border-success/30 bg-success/10 text-success'
                          : 'border-accent-1/15 bg-soft-tint text-accent-1'
                      }`}
                    >
                      <Icon size={20} />
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-text-2">
                          STAGE {stage.order}
                        </span>
                        <span className="rounded-md border border-accent-1/20 bg-stat-bg px-2 py-0.5 text-[10px] font-semibold text-accent-1">
                          {stage.engine}
                        </span>
                      </div>
                      <h2 className={`mt-0.5 text-sm font-semibold text-text-1 ${isBypassed ? 'line-through text-text-2' : ''}`}>
                        {stage.title}
                      </h2>
                      <p className="truncate text-xs text-text-2 max-w-[420px]">
                        {stage.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Badges & Bypass Toggle */}
                  <div className="flex shrink-0 items-center gap-3">
                    {isRunning && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-1/15 px-2.5 py-1 text-xs font-semibold text-accent-1">
                        <Activity size={12} className="animate-spin" />
                        Running...
                      </span>
                    )}

                    {isCompleted && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-semibold text-success">
                        <CheckCircle2 size={12} />
                        Done ({stage.latency})
                      </span>
                    )}

                    {isBypassed && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1 text-xs font-semibold text-warning">
                        BYPASS ROUTE
                      </span>
                    )}

                    {!isRunning && !isCompleted && !isBypassed && (
                      <span className="inline-flex items-center gap-1 text-xs text-text-2">
                        <Clock size={12} />
                        {stage.latency}
                      </span>
                    )}

                    {/* Switch Toggle */}
                    <button
                      type="button"
                      aria-label={stage.enabled ? `Bypass stage ${stage.order}` : `Enable stage ${stage.order}`}
                      onClick={(e) => handleToggleStage(stage.id, e)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                        stage.enabled ? 'bg-accent-1' : 'bg-card border-border'
                      }`}
                    >
                      <span
                        className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                          stage.enabled ? 'translate-x-5' : 'translate-x-0'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* Connector between nodes */}
                {idx < stages.length - 1 && (
                  <div className="flex justify-center h-4 items-center">
                    <div
                      className={`w-0.5 h-full ${
                        isBypassed
                          ? 'border-r-2 border-dashed border-warning/40'
                          : isCompleted
                          ? 'bg-success'
                          : 'bg-accent-1/20'
                      }`}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Right Column: Inspector & Logs */}
        <div className="space-y-5 lg:sticky lg:top-6 lg:self-start lg:max-h-[calc(100vh-3rem)] lg:overflow-y-auto">
          {/* Node Inspector */}
          <div className="rounded-panel border border-accent-1/20 bg-card p-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-accent-1/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sliders size={16} className="text-accent-1" />
                <h3 className="text-sm font-bold text-text-1">Stage Inspector</h3>
              </div>
              <span className="rounded-full bg-accent-1/15 px-2.5 py-0.5 text-xs font-semibold text-accent-1">
                Stage {selectedStage.order}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-2">
                  Module Name
                </label>
                <p className="text-sm font-semibold text-text-1 mt-0.5">
                  {selectedStage.title}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-2">
                  Cognitive Engine
                </label>
                <p className="text-xs font-medium text-accent-1 mt-0.5">
                  {selectedStage.engine}
                </p>
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-2">
                  Node Status
                </label>
                <p className="text-xs text-text-2 mt-0.5">
                  State: <strong className={selectedStage.enabled ? 'text-success' : 'text-warning'}>{selectedStage.status.toUpperCase()}</strong> · Latency: {selectedStage.latency}
                </p>
              </div>

              <div className="border-t border-accent-1/10 pt-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-text-2">
                  Parameters & Config
                </label>
                <div className="mt-2 space-y-1.5 rounded-xl border border-accent-1/10 bg-stat-bg p-3 text-xs font-mono">
                  {Object.entries(selectedStage.config).map(([key, val]) => (
                    <div key={key} className="flex justify-between gap-2">
                      <span className="text-text-2">{key}:</span>
                      <span className="text-accent-1 text-right truncate max-w-[170px]">
                        {String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Telemetry Log Terminal */}
          <div className="rounded-panel border border-accent-1/20 bg-card p-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-accent-1/10 pb-2 mb-3">
              <div className="flex items-center gap-2">
                <Terminal size={14} className="text-accent-1" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-text-1">
                  Pipeline Telemetry
                </h3>
              </div>
              <span className={`h-2 w-2 rounded-full ${isSimulating ? 'bg-accent-1 animate-ping' : 'bg-success'}`} />
            </div>

            <div className="h-56 overflow-y-auto space-y-1.5 font-mono text-[11px] text-text-2 pr-1">
              {logs.map((log, i) => (
                <div key={i} className="leading-relaxed">
                  <span className="opacity-50">[{log.timestamp}]</span>{' '}
                  <span
                    className={`font-semibold ${
                      log.type === 'success'
                        ? 'text-success'
                        : log.type === 'warn'
                        ? 'text-error'
                        : log.type === 'bypass'
                        ? 'text-warning'
                        : 'text-accent-1'
                    }`}
                  >
                    [{log.stageTitle}]
                  </span>{' '}
                  <span>{log.message}</span>
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
