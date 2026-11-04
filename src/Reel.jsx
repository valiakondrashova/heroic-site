import { useEffect, useRef, useState } from 'react'

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

export function reelSrc({ start, autoplay = true } = {}) {
  const params = new URLSearchParams({
    autoplay: autoplay ? '1' : '0',
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

function iframeProps(title, labelled) {
  return {
    title,
    tabIndex: -1,
    'aria-hidden': labelled ? undefined : true,
    allow: 'autoplay; fullscreen; picture-in-picture',
  }
}

export function useReel(iframeRef, { clipSeconds, start, end } = {}) {
  const playerRef = useRef(null)

  useEffect(() => {
    let dead = false
    let player = null
    let viewObserver = null
    const from = start ?? 0
    const to = end ?? clipSeconds ?? null

    const onScreen = (node) => {
      const rect = node.getBoundingClientRect()
      return rect.width > 0 && rect.height > 0 && rect.bottom > 0 && rect.top < window.innerHeight
    }

    loadPlayerApi()
      .then((Vimeo) => {
        if (dead || !iframeRef.current) return
        player = new Vimeo.Player(iframeRef.current)
        const node = iframeRef.current
        if (dead) {
          player.unload().catch(() => {})
          player = null
          return
        }
        playerRef.current = player
        const reveal = () => {
          if (!dead && node) node.style.visibility = ''
        }
        const arm = () => {
          if (dead) return
          player.setMuted(true).catch(() => {})
          player.setAutopause(false).catch(() => {})
          player.play().catch(() => {})
        }
        player.ready().then(arm).catch(arm)
        if (to != null) {
          const resume = () => {
            if (!dead && node && onScreen(node)) player.play().catch(() => {})
          }
          player.on('pause', resume)
          viewObserver = new IntersectionObserver((entries) => {
            if (entries.some((entry) => entry.isIntersecting)) resume()
          }, { threshold: 0.2 })
          viewObserver.observe(node.parentElement || node)
          let seeking = false
          let armed = false
          player.on('timeupdate', ({ seconds }) => {
            if (dead || seeking) return
            if (!armed) {
              if (seconds >= from && seconds < to) armed = true
              return
            }
            if (seconds < to) return
            seeking = true
            node.style.visibility = 'hidden'
            let finished = false
            const finish = () => {
              if (dead || finished) return
              player.getCurrentTime().then((now) => {
                if (dead || finished) return
                if (now > from + 0.25) {
                  window.setTimeout(finish, 80)
                  return
                }
                finished = true
                reveal()
                seeking = false
              }).catch(() => {
                finished = true
                reveal()
                seeking = false
              })
            }
            player.setCurrentTime(from).then(() => player.play()).catch(() => {})
            window.setTimeout(finish, 80)
            window.setTimeout(() => {
              if (finished || dead) return
              finished = true
              reveal()
              seeking = false
            }, 500)
          })
        }
      })
      .catch(() => {})

    return () => {
      dead = true
      viewObserver?.disconnect()
      playerRef.current = null
      player?.off?.('timeupdate')
      player?.off?.('pause')
      player?.unload?.().catch(() => {})
    }
  }, [iframeRef, clipSeconds, start, end])

  return playerRef
}

function ReelSingle({ className, title, clipSeconds, start, end, fit, labelled }) {
  const iframeRef = useRef(null)
  useReel(iframeRef, { clipSeconds, start, end })

  const frame = (
    <iframe
      ref={iframeRef}
      className={fit ? 'reel-fit' : className}
      src={reelSrc({ start })}
      {...iframeProps(title, labelled)}
    />
  )

  if (fit === 'height') {
    return <div className={`reel-stage${className ? ` ${className}` : ''}`}>{frame}</div>
  }

  return frame
}

function ClipIframe({ title, start, end, labelled }) {
  const iframeRef = useRef(null)
  useReel(iframeRef, { start, end })

  return (
    <iframe
      ref={iframeRef}
      className="reel-fit"
      src={reelSrc({ start, autoplay: true })}
      {...iframeProps(title, labelled)}
    />
  )
}

function ReelCut({ className, title, start, end, labelled }) {
  const stageRef = useRef(null)
  const [shown, setShown] = useState(true)

  useEffect(() => {
    const stage = stageRef.current
    const menu = stage?.closest('.menu')
    if (!menu) return undefined
    const sync = () => setShown(menu.classList.contains('menu--open'))
    sync()
    const observer = new MutationObserver(sync)
    observer.observe(menu, { attributes: true, attributeFilter: ['class'] })
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={stageRef} className={`reel-stage${className ? ` ${className}` : ''}`}>
      {shown ? <ClipIframe title={title} start={start} end={end} labelled={labelled} /> : null}
    </div>
  )
}

export function ReelFrame({ className, title, clipSeconds, start, end, fit, labelled = false }) {
  const to = end ?? clipSeconds ?? null
  if (to != null) {
    return (
      <ReelCut
        className={className}
        title={title}
        start={start ?? 0}
        end={to}
        labelled={labelled}
      />
    )
  }

  return (
    <ReelSingle
      className={className}
      title={title}
      clipSeconds={clipSeconds}
      start={start}
      end={end}
      fit={fit}
      labelled={labelled}
    />
  )
}
