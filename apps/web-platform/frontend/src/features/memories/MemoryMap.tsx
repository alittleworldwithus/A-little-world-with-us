'use client'
/* eslint-disable @next/next/no-img-element -- private signed URLs are resolved at runtime. */

import { useEffect, useMemo, useState } from 'react'
import { divIcon } from 'leaflet'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import type { Memory } from '@/lib/supabase'
import { getCachedDecryptedUrl } from '@/lib/mediaEncryption'
import { useTheme } from '@/contexts/ThemeContext'

const memoryPin = divIcon({
  className: 'memory-map-pin',
  html: '<span aria-hidden="true" style="display:grid;place-items:center;width:100%;height:100%"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg></span>',
  iconSize: [34, 42],
  iconAnchor: [17, 40],
  popupAnchor: [0, -38],
})

function hasValidCoordinates(
  memory: Memory
): memory is Memory & { latitude: number; longitude: number } {
  return (
    typeof memory.latitude === 'number' &&
    Number.isFinite(memory.latitude) &&
    memory.latitude >= -90 &&
    memory.latitude <= 90 &&
    typeof memory.longitude === 'number' &&
    Number.isFinite(memory.longitude) &&
    memory.longitude >= -180 &&
    memory.longitude <= 180
  )
}

export default function MemoryMap({ memories, coupleId }: { memories: Memory[]; coupleId: string }) {
  const { mode } = useTheme()
  const locatedMemories = useMemo(() => memories.filter(hasValidCoordinates), [memories])
  const first = locatedMemories[0]
  const [urls, setUrls] = useState<Record<string, string>>({})

  useEffect(() => {
    let mounted = true
    void Promise.all(locatedMemories.map(async (memory) => {
      const driveFileId = (memory as Memory & { storage_provider?: string; drive_file_id?: string | null }).storage_provider === 'google_drive'
        ? (memory as Memory & { drive_file_id?: string | null }).drive_file_id
        : null
      const path = memory.storage_path ?? memory.image_url
      if (driveFileId) return [memory.id, `/api/drive/file?fileId=${encodeURIComponent(driveFileId)}&download=1`] as const
      if (!path) return null
      if (path.startsWith('/') || path.startsWith('http')) return [memory.id, path] as const
      const mimeType = memory.mime_type || 'image/jpeg'
      try {
        const url = await getCachedDecryptedUrl(coupleId, 'memories', path, mimeType)
        return [memory.id, url] as const
      } catch {
        return null
      }
    })).then((entries) => {
      if (mounted) {
        setUrls(Object.fromEntries(entries.filter((entry): entry is readonly [string, string] => entry !== null)))
      }
    })
    return () => { mounted = false }
  }, [locatedMemories, coupleId])

  if (!first) return null

  const darkMap = mode === 'lavender-mist' || mode === 'monochrome'
  const tileUrl = process.env.NEXT_PUBLIC_CARTO_TILE_URL ?? `https://{s}.basemaps.cartocdn.com/${darkMap ? 'dark_all' : 'light_all'}/{z}/{x}/{y}{r}.png`

  return (
    <MapContainer
      center={[first.latitude, first.longitude]}
      zoom={4}
      scrollWheelZoom
      className="h-[70vh] w-full rounded-panel"
    >
      <TileLayer attribution="&copy; OpenStreetMap contributors &copy; CARTO" url={tileUrl} />
      {locatedMemories.map((memory) => (
        <Marker
          key={memory.id}
          position={[memory.latitude, memory.longitude]}
          icon={memoryPin}
        >
          <Popup>
            <strong>{memory.title ?? 'A memory together'}</strong>
            <br />
            {memory.location_label ?? 'Located memory'}
            <br />
            {memory.date}
            {urls[memory.id] ? (
              <>
                <br />
                <img
                  src={urls[memory.id]}
                  alt={`Memory photo: ${memory.title ?? 'Shared memory'}`}
                  className="mt-2 h-20 w-28 rounded object-cover"
                />
              </>
            ) : null}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
