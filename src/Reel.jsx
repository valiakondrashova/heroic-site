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

export function reelSrc({ start } = {}) {
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
  const hash = start ? `#t=${start}s` : ''
  return `https://player.vimeo.com/video/${VIDEO_ID}?${params}${hash}`
}

export function useReel(iframeRef, { clipSeconds, start, end } = {}) {
  const playerRef = useRef(null)

  useEffect(() => {
    let dead = false
    let player = null
    const from = start ?? 0
    const to = end ?? clipSeconds ?? null

    loadPlayerApi()
      .then((Vimeo) => {
        if (dead || !iframeRef.current) return
        player = new Vimeo.Player(iframeRef.current)
        playerRef.current = player
        const arm = () => {
          player.setMuted(true).catch(() => {})
          if (from) player.setCurrentTime(from).catch(() => {})
          player.play().catch(() => {})
        }
        player.ready().then(arm).catch(arm)
        if (to != null) {
          let nextJump = 0
          const jump = () => {
            const now = performance.now()
            if (now < nextJump) return
            nextJump = now + 800
            player.setCurrentTime(from).catch(() => {})
          }
          player.on('timeupdate', ({ seconds }) => {
            if (seconds >= to - 0.08 || (from > 0 && seconds < from - 0.45)) jump()
          })
        }
      })
      .catch(() => {})

    return () => {
      dead = true
      playerRef.current = null
      player?.unload?.().catch(() => {})
    }
  }, [iframeRef, clipSeconds, start, end])

  return playerRef
}

export function ReelFrame({ className, title, clipSeconds, start, end, fit, labelled = false }) {
  const iframeRef = useRef(null)
  useReel(iframeRef, { clipSeconds, start, end })

  const frame = (
    <iframe
      ref={iframeRef}
      className={fit ? 'reel-fit' : className}
      src={reelSrc({ start })}
      title={title}
      tabIndex={-1}
      aria-hidden={labelled ? undefined : true}
      allow="autoplay; fullscreen; picture-in-picture"
    />
  )

  if (fit === 'height') {
    return <div className={`reel-stage${className ? ` ${className}` : ''}`}>{frame}</div>
  }

  return frame
}
