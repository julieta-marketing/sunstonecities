'use client'

import { useState } from 'react'
import Image from 'next/image'

function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

/* Portrait card: photo fills the card as a background with the name
   overlaid at the bottom; falls back to an initials tile if the photo
   fails to load.

   Source photos aren't shot to a consistent head-and-shoulders framing,
   so `focus`/`zoom` let each image be nudged to match Mike Stone's
   reference crop (face centered, eyes ~upper-third). For best long-term
   results, new headshots should be pre-cropped to that same framing
   before upload so these per-image overrides stay unnecessary. */
export function TeamPhotoCard({
  name,
  image,
  focus = '50% 50%',
  zoom = 1,
}: {
  name: string
  image?: string
  focus?: string
  zoom?: number
}) {
  const [errored, setErrored] = useState(false)
  const showImage = Boolean(image) && !errored

  return (
    <div className="group relative aspect-[3/4] overflow-hidden bg-[#0F3A63]">
      {showImage ? (
        <Image
          src={image!}
          alt={name}
          fill
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
          className="object-cover scale-[var(--zoom)] transition-transform duration-300 ease-out group-hover:scale-[calc(var(--zoom)*1.06)]"
          style={{
            objectPosition: focus,
            transformOrigin: focus,
            ['--zoom' as string]: zoom,
          }}
          onError={() => setErrored(true)}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-[#79B3DE] transition-transform duration-300 ease-out group-hover:scale-[1.06]">
          <span className="font-display text-3xl font-semibold text-white">
            {getInitials(name)}
          </span>
        </div>
      )}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,rgba(10,28,48,0.85),transparent)]"
      />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <p className="font-display text-lg font-semibold leading-tight text-white">
          {name}
        </p>
      </div>
    </div>
  )
}
