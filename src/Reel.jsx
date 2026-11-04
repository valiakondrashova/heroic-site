import { useEffect, useRef } from 'react'

const VIDEO_ID = '1102458841'

let playerApi = null

function loadPlayerApi() {
  if (window.Vimeo?.Player) return Promise.resolve(window.Vimeo)
  if (!playerApi) {
    playerApi = new Promise((resolve, reject) => {
      const script = document.createElement('script')
      script.src = 'https://player.vimeo.com/api/player.js'
      script.async = true
      script.onload = () => resolve(window.Vimeo)
      script.onerror = () => reject(new Error('Vimeo player failed to load'))
      document.head.appendChild(script)
    })
  }
  return playerApi
}

export function reelSrc() {
  const params = new URLSearchParams({
    autoplay: '1',
    loop: '1',
    muted: '1',
    controls: '0',
    title: '0',
    byline: '0',
    portrait: '0',
    autopause: '0',
    dnt: '1',
    transparent: '0',
    playsinline: '1',
    background: '1',
  })
  return `https://player.vimeo.com/video/${VIDEO_ID}?${params}`
}

export function useReel(iframeRef, { clipSeconds } = {}) {
  const playerRef = useRef(null)

  useEffect(() => {
    let dead = false
    let player = null

    loadPlayerApi()
      .then((Vimeo) => {
        if (dead || !iframeRef.current) return
        player = new Vimeo.Player(iframeRef.current)
        playerRef.current = player
        player.setMuted(true).catch(() => {})
        player.play().catch(() => {})
        if (clipSeconds) {
          player.on('timeupdate', ({ seconds }) => {
            if (seconds >= clipSeconds) player.setCurrentTime(0).catch(() => {})
          })
        }
      })
      .catch(() => {})

    return () => {
      dead = true
      playerRef.current = null
      player?.unload?.().catch(() => {})
    }
  }, [iframeRef, clipSeconds])

  return playerRef
}

export function ReelFrame({ className, title, clipSeconds, labelled = false }) {
  const iframeRef = useRef(null)
  useReel(iframeRef, { clipSeconds })

  return (
    <iframe
      ref={iframeRef}
      className={className}
      src={reelSrc()}
      title={title}
      tabIndex={-1}
      aria-hidden={labelled ? undefined : true}
      allow="autoplay; fullscreen; picture-in-picture"
    />
  )
}
