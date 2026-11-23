'use client';

import React, { useState } from 'react';
import { 
  Film, Heart, Sparkles, MapPin, Calendar, Music, 
  Send, Compass, Download, Share2, Play, Pause, Camera, RefreshCw
} from 'lucide-react';

interface MemoryClip {
  id: string;
  title: string;
  date: string;
  year: string;
  location: string;
}

interface TravelPin {
  id: string;
  place: string;
  country: string;
  visitedDate: string;
  story: string;
  isBucketList?: boolean;
}

export default function AnniversaryRecapPage() {
  const [activeTab, setActiveTab] = useState<'recap' | 'dates' | 'pinmap'>('recap');

  // Recap Montage State
  const [anniversaryDays, setAnniversaryDays] = useState(1248);
  const [soundtrack, setSoundtrack] = useState('acoustic');
  const [colorMood, setColorMood] = useState('golden');
  const [aspectRatio, setAspectRatio] = useState<'9:16' | '16:9'>('9:16');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const memories: MemoryClip[] = [
    { id: '1', title: 'Sunset on U Bein Bridge', date: 'Nov 22, 2023', year: '3 Years Ago', location: 'Mandalay, Myanmar' },
    { id: '2', title: 'Bagan Hot Air Balloon Morning', date: 'Nov 22, 2024', year: '2 Years Ago', location: 'Bagan, Myanmar' },
    { id: '3', title: 'Cozy Rain Coffee at Inya Lake', date: 'Nov 22, 2025', year: '1 Year Ago', location: 'Yangon, Myanmar' },
  ];

  // AI Date Night State
  const [dateMood, setDateMood] = useState('romantic');
  const [dateItinerary, setDateItinerary] = useState({
    title: 'Starlight Rooftop Dining & Acoustic Serenade',
    time: '6:30 PM - 10:00 PM',
    plan: [
      '6:30 PM - Meet at Sunset Terrace with custom favorite mocktails/wine.',
      '7:45 PM - Private dinner featuring French/Italian pasta & candlelight dessert.',
      '9:15 PM - Starlight acoustic music session and exchange of handwritten anniversary cards.',
    ],
    loveLetter: 'To the love of my life, every single one of our 1,248 days together has been my favorite adventure. From quiet morning coffees to breathtaking sunset travels, thank you for making our world so gentle, warm, and endlessly magical. Happy Anniversary!'
  });

  // Travel Pin-Map State
  const [pins, setPins] = useState<TravelPin[]>([
    {
      id: 'pin-1',
      place: 'Inle Lake Floating Gardens',
      country: 'Shan State, Myanmar',
      visitedDate: 'January 2024',
      story: 'Watched traditional fishermen and stayed at an overwater wooden bungalow during foggy morning sunrise.',
    },
    {
      id: 'pin-2',
      place: 'Ngapali Beach Coral Coast',
      country: 'Rakhine, Myanmar',
      visitedDate: 'April 2025',
      story: 'Bicycled along the palm-fringed shoreline and collected seashells at low tide.',
    },
    {
      id: 'pin-3',
      place: 'Mount Popa Hilltop Monastery',
      country: 'Mandalay Region',
      visitedDate: 'November 2025',
      story: 'Climbed the 777 steps together and enjoyed the panoramic sunset view over the volcanic peak.',
    },
    {
      id: 'pin-4',
      place: 'Kyoto Bamboo Forest (Bucket List)',
      country: 'Japan',
      visitedDate: 'Planned Autumn 2027',
      story: 'Target dream anniversary trip to see the vibrant autumn maple leaves in Arashiyama.',
      isBucketList: true,
    }
  ]);

  const handleGenerateDateIdea = () => {
    if (dateMood === 'adventure') {
      setDateItinerary({
        title: 'Lakeside Kayaking & Sunset Campfire',
        time: '3:00 PM - 8:30 PM',
        plan: [
          '3:00 PM - Afternoon tandem kayak session across calm lake waters.',
          '5:30 PM - Pitching cozy shoreline tent with fairy lights and warm cider.',
          '7:00 PM - Toasting marshmallows by campfire while sharing favorite memories.',
        ],
        loveLetter: 'Every journey with you feels like an epic adventure. Even in the wild and windy outdoors, your smile is my warmest home. Here is to a lifetime of discovering new horizons together!'
      });
    } else {
      setDateItinerary({
        title: 'Starlight Rooftop Dining & Acoustic Serenade',
        time: '6:30 PM - 10:00 PM',
        plan: [
          '6:30 PM - Meet at Sunset Terrace with custom favorite mocktails/wine.',
          '7:45 PM - Private dinner featuring French/Italian pasta & candlelight dessert.',
          '9:15 PM - Starlight acoustic music session and exchange of handwritten anniversary cards.',
        ],
        loveLetter: 'To the love of my life, every single one of our 1,248 days together has been my favorite adventure. From quiet morning coffees to breathtaking sunset travels, thank you for making our world so gentle, warm, and endlessly magical. Happy Anniversary!'
      });
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto p-4 md:p-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border/40 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-accent-1/10 border border-accent-1/20 rounded-2xl text-accent-1 shadow-sm">
            <Heart className="w-6 h-6 fill-accent-1/20" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl font-bold tracking-tight text-text-1">Anniversary & Memory Montage</h1>
              <span className="text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-accent-1/10 text-accent-1 border border-accent-1/20">
                Day {anniversaryDays} Together
              </span>
            </div>
            <p className="text-xs text-text-2 mt-1">
              "On This Day" retrospective video generator, AI date night planner, and interactive couple travel map.
            </p>
          </div>
        </div>

        {/* Tab Controls */}
        <nav className="flex items-center gap-1.5 bg-card/60 border border-border/60 backdrop-blur-sm p-1 rounded-full">
          <button
            onClick={() => setActiveTab('recap')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'recap'
                ? 'bg-accent-1 text-white shadow-sm'
                : 'text-text-2 hover:text-text-1 hover:bg-card'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            Recap Video
          </button>
          <button
            onClick={() => setActiveTab('dates')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'dates'
                ? 'bg-accent-1 text-white shadow-sm'
                : 'text-text-2 hover:text-text-1 hover:bg-card'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Date Planner
          </button>
          <button
            onClick={() => setActiveTab('pinmap')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeTab === 'pinmap'
                ? 'bg-accent-1 text-white shadow-sm'
                : 'text-text-2 hover:text-text-1 hover:bg-card'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Travel Pin-Map
          </button>
        </nav>
      </div>

      {/* TAB 1: RECAP MONTAGE VIDEO GENERATOR */}
      {activeTab === 'recap' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Controls & On This Day (7 cols) */}
          <div className="lg:col-span-7 space-y-5 glass-card bg-card border border-border/70 p-6 rounded-2xl shadow-card">
            <h2 className="text-xs font-bold text-text-2 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-accent-1" />
              On This Day Retrospective Footage
            </h2>

            <div className="space-y-3">
              {memories.map((m, idx) => (
                <div
                  key={m.id}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    currentSlideIndex === idx
                      ? 'bg-accent-1/10 border-accent-1/40 ring-1 ring-accent-1/20 text-text-1'
                      : 'bg-card/60 border-border/50 text-text-2 hover:border-accent-1/30 hover:bg-accent-1/5'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="font-semibold text-text-1 text-xs">{m.title}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-accent-1/10 text-accent-1 border border-accent-1/20">
                        {m.year}
                      </span>
                    </div>
                    <div className="text-[11px] text-text-2 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent-1" />
                      <span>{m.location}</span>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-text-2">{m.date}</span>
                </div>
              ))}
            </div>

            {/* Soundtrack & Color Grading Selector */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-card/60 p-3 rounded-xl border border-border/50">
                <span className="text-[10px] text-text-2 font-semibold uppercase block mb-1">
                  Romantic Soundtrack
                </span>
                <select
                  value={soundtrack}
                  onChange={(e) => setSoundtrack(e.target.value)}
                  className="w-full bg-card border border-border/60 rounded-lg px-2.5 py-1 text-xs text-text-1 focus:outline-none focus:border-accent-1"
                >
                  <option value="acoustic">Acoustic Sunset (82 BPM)</option>
                  <option value="lofi">Lo-Fi Love Piano (74 BPM)</option>
                  <option value="strings">Starlight Strings (90 BPM)</option>
                </select>
              </div>

              <div className="bg-card/60 p-3 rounded-xl border border-border/50">
                <span className="text-[10px] text-text-2 font-semibold uppercase block mb-1">
                  Visual Mood Palette
                </span>
                <select
                  value={colorMood}
                  onChange={(e) => setColorMood(e.target.value)}
                  className="w-full bg-card border border-border/60 rounded-lg px-2.5 py-1 text-xs text-text-1 focus:outline-none focus:border-accent-1"
                >
                  <option value="golden">Golden Warmth Glow</option>
                  <option value="pastel">Dreamy Lavender Pastel</option>
                  <option value="vintage">35mm Vintage Film Grain</option>
                </select>
              </div>
            </div>

            <button className="w-full py-2.5 bg-accent-1 hover:opacity-90 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition-all">
              <Film className="w-4 h-4" />
              <span>Export HD Anniversary Montage (MP4)</span>
            </button>
          </div>

          {/* Right: Video Canvas Preview (5 cols) */}
          <div className="lg:col-span-5 space-y-4 glass-card bg-card border border-border/70 p-6 rounded-2xl shadow-card flex flex-col items-center">
            <h2 className="text-xs font-bold text-text-2 uppercase tracking-wider self-start flex items-center gap-2">
              <Camera className="w-4 h-4 text-accent-1" />
              Memory Reel Preview (9:16)
            </h2>

            {/* Vertical Video Stage Mockup */}
            <div className="w-56 aspect-[9/16] bg-accent-1/5 rounded-2xl border-2 border-accent-1/30 shadow-lg relative overflow-hidden flex flex-col justify-between p-4">
              <div className="absolute inset-0 bg-gradient-to-t from-accent-1/10 via-transparent to-accent-1/5 pointer-events-none z-10" />

              {/* Top Reel Counter */}
              <div className="z-20 flex justify-between items-center text-[10px] font-mono text-accent-1">
                <span className="bg-accent-1/15 px-2 py-0.5 rounded border border-accent-1/25">
                  Day {anniversaryDays}
                </span>
                <span className="text-text-2">{memories[currentSlideIndex].year}</span>
              </div>

              {/* Center Play Button Overlay */}
              <div className="z-20 self-center">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-12 h-12 rounded-full bg-accent-1 text-white flex items-center justify-center shadow-md hover:opacity-90 hover:scale-105 transition-all"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="z-20 text-left space-y-1">
                <div className="text-xs font-bold text-text-1 leading-snug">
                  {memories[currentSlideIndex].title}
                </div>
                <div className="text-[10px] text-accent-1 flex items-center gap-1 font-mono">
                  <MapPin className="w-3 h-3 text-accent-1" />
                  <span>{memories[currentSlideIndex].location}</span>
                </div>
              </div>
            </div>

            <div className="text-[11px] text-text-2 text-center">
              Beat-synced with gentle Ken Burns motion and soft vignette transitions.
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: AI DATE NIGHT & LOVE LETTER */}
      {activeTab === 'dates' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 space-y-4 glass-card bg-card border border-border/70 p-6 rounded-2xl shadow-card">
            <h2 className="text-xs font-bold text-text-2 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-1" />
              Date Night Theme & Mood
            </h2>

            <div className="space-y-2">
              {[
                { id: 'romantic', name: 'Candlelight & Fine Dining', desc: 'Private terrace, acoustic violin, custom desserts.' },
                { id: 'adventure', name: 'Lakeside Campfire & Kayak', desc: 'Tandem kayak, shoreline tent, toasted marshmallows.' },
                { id: 'cozy', name: 'Cinema Blanket Fort Night', desc: 'Projector screening, handmade pizzas, fairy lights.' },
              ].map((m) => (
                <div
                  key={m.id}
                  onClick={() => {
                    setDateMood(m.id);
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    dateMood === m.id
                      ? 'bg-accent-1/10 border-accent-1/40 ring-1 ring-accent-1/20'
                      : 'bg-card/60 border-border/50 hover:border-accent-1/30 hover:bg-accent-1/5'
                  }`}
                >
                  <div className="font-semibold text-xs text-text-1 mb-0.5">{m.name}</div>
                  <div className="text-[11px] text-text-2">{m.desc}</div>
                </div>
              ))}
            </div>

            <button
              onClick={handleGenerateDateIdea}
              className="w-full py-2 bg-accent-1 hover:opacity-90 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate Date & Letter</span>
            </button>
          </div>

          <div className="lg:col-span-8 space-y-4">
            {/* Itinerary Card */}
            <div className="glass-card bg-card border border-border/70 p-6 rounded-2xl shadow-card space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <h3 className="font-bold text-text-1 text-sm">{dateItinerary.title}</h3>
                <span className="text-xs font-mono text-accent-1">{dateItinerary.time}</span>
              </div>
              <div className="space-y-2 text-xs text-text-1">
                {dateItinerary.plan.map((step, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-card/60 border border-border/50">
                    {step}
                  </div>
                ))}
              </div>
            </div>

            {/* Love Letter Card */}
            <div className="glass-card bg-card border border-border/70 p-6 rounded-2xl shadow-card space-y-3">
              <span className="text-xs font-bold text-text-2 uppercase tracking-wider block">
                Heartfelt Anniversary Note
              </span>
              <p className="text-xs text-text-1 italic leading-relaxed p-4 rounded-xl bg-accent-1/5 border border-accent-1/15">
                "{dateItinerary.loveLetter}"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COUPLE TRAVEL PIN-MAP */}
      {activeTab === 'pinmap' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold text-text-1">Our Journey Footsteps & Memory Pins</h2>
              <p className="text-xs text-text-2">Places we have explored together across cities, beaches, and mountain tops</p>
            </div>
            <button className="px-3.5 py-1.5 bg-accent-1 hover:opacity-90 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm">
              <MapPin className="w-3.5 h-3.5" />
              <span>Add New Journey Pin</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pins.map((pin) => (
              <div
                key={pin.id}
                className={`p-5 rounded-2xl border transition-all ${
                  pin.isBucketList
                    ? 'glass-card bg-card/60 border-dashed border-accent-2/40'
                    : 'glass-card bg-card border-border/70 shadow-card'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className={`w-4 h-4 ${pin.isBucketList ? 'text-accent-2' : 'text-accent-1'}`} />
                    <h3 className="font-bold text-text-1 text-sm">{pin.place}</h3>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                    pin.isBucketList
                      ? 'bg-accent-2/10 text-accent-2 border border-accent-2/25'
                      : 'bg-accent-1/10 text-accent-1 border border-accent-1/20'
                  }`}>
                    {pin.isBucketList ? 'Bucket List Target' : 'Visited'}
                  </span>
                </div>
                <div className="text-[11px] text-text-2 font-mono mb-2">{pin.country} - {pin.visitedDate}</div>
                <p className="text-xs text-text-1 leading-relaxed bg-card/60 p-3 rounded-xl border border-border/50">
                  {pin.story}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
