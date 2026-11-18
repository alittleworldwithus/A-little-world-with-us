'use client'

import { useState } from 'react'
import {
  Search,
  X,
  Smile,
  Heart,
  Laugh,
  Sparkles,
  Flame,
  Sun,
  Moon,
  Coffee,
  Gift,
  Music,
  Star,
  Zap,
  ThumbsUp,
  Send,
  ShieldCheck,
  Compass,
  Key,
  Bookmark,
  Bell,
  Crown,
  Gem,
  Rocket,
  type LucideIcon,
} from 'lucide-react'

interface Sticker {
  id: string
  name: string
  emoji: string
  category: string
  icon: LucideIcon
  tags: string[]
}

interface StickerPickerProps {
  onStickerSelect: (sticker: { id: string; emoji: string; category: string; tags: string[] }) => void
  onClose: () => void
}

const stickers: Sticker[] = [
  // Love & Affection
  { id: '1', name: 'Love Heart', emoji: '[Heart]', category: 'Love', icon: Heart, tags: ['love', 'heart', 'care'] },
  { id: '2', name: 'Sparkles', emoji: '[Sparkles]', category: 'Love', icon: Sparkles, tags: ['sparkle', 'magic', 'shine'] },
  { id: '3', name: 'Warm Hug', emoji: '[Warm Hug]', category: 'Love', icon: Flame, tags: ['hug', 'warm', 'flame'] },
  { id: '4', name: 'Sweet Crown', emoji: '[Crown]', category: 'Love', icon: Crown, tags: ['queen', 'king', 'crown'] },
  { id: '5', name: 'Precious Gem', emoji: '[Gem]', category: 'Love', icon: Gem, tags: ['gem', 'diamond', 'treasure'] },
  { id: '6', name: 'Special Gift', emoji: '[Gift]', category: 'Love', icon: Gift, tags: ['gift', 'present', 'box'] },

  // Emotions
  { id: '7', name: 'Happy Smile', emoji: '[Smile]', category: 'Emotions', icon: Smile, tags: ['happy', 'smile', 'joy'] },
  { id: '8', name: 'Pure Joy', emoji: '[Laugh]', category: 'Emotions', icon: Laugh, tags: ['laugh', 'funny', 'fun'] },
  { id: '9', name: 'Sunshine', emoji: '[Sun]', category: 'Emotions', icon: Sun, tags: ['sun', 'bright', 'morning'] },
  { id: '10', name: 'Peaceful Moon', emoji: '[Moon]', category: 'Emotions', icon: Moon, tags: ['night', 'sleep', 'rest'] },
  { id: '11', name: 'Star Glow', emoji: '[Star]', category: 'Emotions', icon: Star, tags: ['star', 'favorite', 'bright'] },
  { id: '12', name: 'High Energy', emoji: '[Zap]', category: 'Emotions', icon: Zap, tags: ['energy', 'lightning', 'fast'] },

  // Everyday
  { id: '13', name: 'Coffee Time', emoji: '[Coffee]', category: 'Everyday', icon: Coffee, tags: ['coffee', 'tea', 'cafe'] },
  { id: '14', name: 'Favorite Melody', emoji: '[Music]', category: 'Everyday', icon: Music, tags: ['music', 'song', 'tune'] },
  { id: '15', name: 'Sweet Send', emoji: '[Send]', category: 'Everyday', icon: Send, tags: ['send', 'letter', 'message'] },
  { id: '16', name: 'Thumbs Up', emoji: '[Thumbs Up]', category: 'Everyday', icon: ThumbsUp, tags: ['good', 'yes', 'ok'] },
  { id: '17', name: 'Adventure', emoji: '[Compass]', category: 'Everyday', icon: Compass, tags: ['explore', 'travel', 'trip'] },
  { id: '18', name: 'Safe Guard', emoji: '[Shield]', category: 'Everyday', icon: ShieldCheck, tags: ['safe', 'protect', 'care'] },
  { id: '19', name: 'Little Key', emoji: '[Key]', category: 'Everyday', icon: Key, tags: ['secret', 'key', 'lock'] },
  { id: '20', name: 'Saved Memory', emoji: '[Bookmark]', category: 'Everyday', icon: Bookmark, tags: ['save', 'memory', 'keep'] },
  { id: '21', name: 'Gentle Chime', emoji: '[Bell]', category: 'Everyday', icon: Bell, tags: ['alert', 'bell', 'ring'] },
  { id: '22', name: 'To The Stars', emoji: '[Rocket]', category: 'Everyday', icon: Rocket, tags: ['rocket', 'launch', 'future'] },
]

const categories = ['All', 'Love', 'Emotions', 'Everyday']

const categoryIcons: Record<string, LucideIcon> = {
  All: Sparkles,
  Love: Heart,
  Emotions: Smile,
  Everyday: Coffee,
}

export default function StickerPicker({ onStickerSelect, onClose }: StickerPickerProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredStickers = stickers.filter((sticker) => {
    const matchesSearch = sticker.tags.some((tag) =>
      tag.toLowerCase().includes(searchTerm.toLowerCase())
    ) || sticker.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || sticker.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-lg max-h-[80vh] rounded-modal border border-accent-1/20 bg-card shadow-[0_20px_40px_rgba(19,10,33,0.28)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-accent-1/20 p-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-accent-1" />
            <h2 className="text-lg font-serif text-text-1">Stickers</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-text-2 hover:bg-accent-1/10 hover:text-accent-1 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-accent-1/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search stickers..."
              className="w-full rounded-input border border-accent-1/20 bg-card pl-10 pr-4 py-2 text-sm text-text-1 placeholder:text-text-2/50 focus:outline-none focus:ring-2 focus:ring-accent-1/50"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="flex gap-2 p-4 border-b border-accent-1/20 overflow-x-auto">
          {categories.map((category) => {
            const Icon = categoryIcons[category]
            return (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`flex items-center gap-2 px-4 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition ${
                  selectedCategory === category
                    ? 'bg-accent-1 text-white font-semibold shadow-sm'
                    : 'bg-card text-text-2 hover:bg-accent-1/10'
                }`}
              >
                <Icon className="h-4 w-4" />
                {category}
              </button>
            )
          })}
        </div>

        {/* Sticker Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
            {filteredStickers.map((sticker) => {
              const Icon = sticker.icon
              return (
                <button
                  key={sticker.id}
                  type="button"
                  onClick={() => onStickerSelect(sticker)}
                  className="aspect-square flex flex-col items-center justify-center gap-2 rounded-2xl border border-accent-1/20 bg-card/60 p-3 text-text-1 hover:border-accent-1 hover:bg-accent-1/10 hover:scale-105 active:scale-95 transition-all shadow-xs"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-1/15 text-accent-1">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-text-2 truncate max-w-full">
                    {sticker.name}
                  </span>
                </button>
              )
            })}
          </div>
          {filteredStickers.length === 0 && (
            <div className="text-center py-8 text-text-2">
              <p>No stickers found</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-accent-1/20 p-4 text-center text-xs text-text-2">
          {filteredStickers.length} stickers available
        </div>
      </div>
    </div>
  )
}
