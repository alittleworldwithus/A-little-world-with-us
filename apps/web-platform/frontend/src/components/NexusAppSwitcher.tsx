'use client';

import React, { useState, useRef, useEffect } from 'react';
import { LayoutGrid, ExternalLink, ShieldCheck, Sparkles } from 'lucide-react';

interface AppInfo {
  id: string;
  name: string;
  subtitle: string;
  url: string;
  icon: string;
  color: string;
}

const NEXUS_APPS: AppInfo[] = [
  {
    id: 'narrativ',
    name: 'Narrativ Forge',
    subtitle: 'Anime & Video Production Studio',
    url: 'http://localhost:3000',
    icon: '🎬',
    color: '#38bdf8',
  },
  {
    id: 'auracraft',
    name: 'AuraCraft Studio',
    subtitle: '3D Persona & VTuber Live Stage',
    url: 'http://localhost:5180',
    icon: '🎭',
    color: '#a855f7',
  },
  {
    id: 'doka',
    name: 'Doka AI DMS',
    subtitle: 'Document Management & OCR',
    url: 'http://localhost:5173',
    icon: '📑',
    color: '#10b981',
  },
  {
    id: 'logixa',
    name: 'Logixa Flow',
    subtitle: 'B2B Logistics & Fleet Operations',
    url: 'http://localhost:3002',
    icon: '🚚',
    color: '#f59e0b',
  },
  {
    id: 'cognix',
    name: 'Cognix Nexus',
    subtitle: 'Second Brain & Knowledge Graph',
    url: 'http://localhost:3001',
    icon: '🧠',
    color: '#ec4899',
  },
  {
    id: 'alittleworld',
    name: 'A Little World',
    subtitle: 'Couple Capsule & Travel Memories',
    url: 'http://localhost:3004',
    icon: '💖',
    color: '#f43f5e',
  },
];

export function NexusAppSwitcher({ currentAppId = 'alittleworld' }: { currentAppId?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-full text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-xl border text-xs font-semibold transition-all ${
          isOpen
            ? 'bg-rose-500/20 border-rose-500/50 text-rose-300 shadow-[0_0_12px_rgba(244,63,94,0.25)]'
            : 'bg-card hover:bg-soft-tint border-accent-1/20 text-text-2 hover:text-text-1'
        }`}
        title="Nexus Suite App Switcher / App များ ကူးပြောင်းရန်"
      >
        <div className="flex items-center gap-2">
          <LayoutGrid className="h-4 w-4 text-rose-400" />
          <span>Nexus Suite</span>
        </div>
        <span className="text-[10px] bg-rose-500/15 text-rose-300 px-1.5 py-0.5 rounded-full font-mono">
          6 Apps
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 bottom-full mb-2 w-80 bg-card/95 backdrop-blur-xl border border-rose-500/30 rounded-2xl shadow-2xl z-50 p-3 animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-accent-1/20 px-1">
            <div className="flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-rose-400" />
              <span className="text-xs font-bold text-text-1 tracking-wide">The Nexus Suite</span>
            </div>
            <span className="text-[10px] bg-rose-500/15 text-rose-300 border border-rose-500/30 px-2 py-0.5 rounded-full font-mono">
              Connected
            </span>
          </div>

          <div className="mb-2.5 p-2 bg-soft-tint border border-accent-1/20 rounded-xl flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-rose-600/30 border border-rose-500/40 flex items-center justify-center text-xs font-bold text-rose-300 flex-shrink-0">
              T
            </div>
            <div className="overflow-hidden">
              <div className="text-xs font-semibold text-text-1 truncate">Thuwon Admin</div>
              <div className="text-[10px] text-text-2 truncate flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 text-rose-400 flex-shrink-0" />
                <span>thuwon417@gmail.com</span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            {NEXUS_APPS.map((app) => {
              const isCurrent = app.id === currentAppId;
              return (
                <a
                  key={app.id}
                  href={app.url}
                  target={isCurrent ? '_self' : '_blank'}
                  rel="noreferrer"
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between p-2 rounded-xl transition-all ${
                    isCurrent
                      ? 'bg-rose-500/15 border border-rose-500/40 text-rose-200'
                      : 'hover:bg-soft-tint border border-transparent text-text-2 hover:text-text-1'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base flex-shrink-0">{app.icon}</span>
                    <div className="truncate">
                      <div className="text-xs font-semibold flex items-center gap-1.5">
                        <span>{app.name}</span>
                        {isCurrent && (
                          <span className="text-[9px] bg-rose-500/30 text-rose-300 px-1.5 py-0.2 rounded font-mono">
                            Active
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-text-2 truncate">{app.subtitle}</div>
                    </div>
                  </div>
                  {!isCurrent && <ExternalLink className="h-3.5 w-3.5 text-text-2 flex-shrink-0 ml-2" />}
                </a>
              );
            })}
          </div>

          <div className="mt-2.5 pt-2 border-t border-accent-1/20 text-[10px] text-center text-text-2">
            Unified Supabase Auth · SSO
          </div>
        </div>
      )}
    </div>
  );
}
