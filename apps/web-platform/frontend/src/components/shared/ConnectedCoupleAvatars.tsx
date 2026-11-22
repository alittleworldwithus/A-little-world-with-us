'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Heart, User } from 'lucide-react'

export interface ConnectedCoupleAvatarsProps {
  userAvatarUrl?: string | null
  partnerAvatarUrl?: string | null
  userName?: string | null
  partnerName?: string | null
  size?: 'sm' | 'md' | 'lg' | 'xl'
  showHeartBadge?: boolean
  className?: string
  priority?: boolean
}

const SIZE_CONFIGS = {
  sm: {
    container: 'h-9',
    avatar: 'w-8 h-8 text-[11px]',
    gap: 'gap-1.5',
    badge: 'w-4 h-4 text-[9px]',
    iconSize: 'w-2.5 h-2.5',
    border: 'border-[1.5px]',
  },
  md: {
    container: 'h-12',
    avatar: 'w-11 h-11 text-xs',
    gap: 'gap-2',
    badge: 'w-5 h-5 text-[10px]',
    iconSize: 'w-3 h-3',
    border: 'border-2',
  },
  lg: {
    container: 'h-16',
    avatar: 'w-14 h-14 text-sm font-semibold',
    gap: 'gap-2.5',
    badge: 'w-6 h-6 text-xs',
    iconSize: 'w-3.5 h-3.5',
    border: 'border-2',
  },
  xl: {
    container: 'h-20',
    avatar: 'w-16 h-16 text-base font-bold',
    gap: 'gap-3',
    badge: 'w-7 h-7 text-sm',
    iconSize: 'w-4 h-4',
    border: 'border-[2.5px]',
  },
}

function SingleAvatar({
  url,
  name,
  fallbackLetter,
  avatarClass,
  borderClass,
  priority,
}: {
  url?: string | null
  name?: string | null
  fallbackLetter: string
  avatarClass: string
  borderClass: string
  priority?: boolean
}) {
  const [imgError, setImgError] = useState(false)

  const hasValidImage = !!url && !imgError

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 overflow-hidden rounded-full shadow-md ${avatarClass} ${borderClass} border-card bg-card/90 transition-transform duration-200 hover:scale-105 hover:z-20`}
      title={name ?? undefined}
      role="img"
      aria-label={name ?? 'Avatar'}
    >
      {hasValidImage ? (
        <Image
          src={url}
          alt={name ?? 'Couple avatar'}
          fill
          sizes="(max-width: 768px) 48px, 80px"
          priority={priority}
          className="object-cover"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-accent-1/25 to-accent-2/30 text-accent-1 font-semibold select-none">
          {name ? name.slice(0, 1).toUpperCase() : fallbackLetter ? fallbackLetter : <User className="h-1/2 w-1/2 opacity-70" />}
        </div>
      )}
    </div>
  )
}

export default function ConnectedCoupleAvatars({
  userAvatarUrl,
  partnerAvatarUrl,
  userName = 'You',
  partnerName = 'Partner',
  size = 'md',
  showHeartBadge = true,
  className = '',
  priority = false,
}: ConnectedCoupleAvatarsProps) {
  const cfg = SIZE_CONFIGS[size]

  return (
    <div
      className={`relative inline-flex items-center ${cfg.gap} select-none ${cfg.container} ${className}`}
      aria-label={`${userName} and ${partnerName}`}
    >
      {/* User Avatar (Left) */}
      <SingleAvatar
        url={userAvatarUrl}
        name={userName}
        fallbackLetter="U"
        avatarClass={cfg.avatar}
        borderClass={cfg.border}
        priority={priority}
      />

      {/* Center Heart Badge */}
      {showHeartBadge && (
        <div
          className={`flex items-center justify-center shrink-0 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-700/60 shadow-xs ${cfg.badge}`}
          aria-hidden="true"
        >
          <Heart className={`fill-rose-500 text-rose-500 ${cfg.iconSize} animate-pulse`} />
        </div>
      )}

      {/* Partner Avatar (Right) */}
      <SingleAvatar
        url={partnerAvatarUrl}
        name={partnerName}
        fallbackLetter="P"
        avatarClass={cfg.avatar}
        borderClass={cfg.border}
        priority={priority}
      />
    </div>
  )
}
