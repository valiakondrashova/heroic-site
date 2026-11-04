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
    const from = start ?? 0
    const to = end ?? clipSeconds ?? null

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
          player.getCurrentTime().then((seconds) => {
            if (dead) return
            const inside = seconds >= from && (to == null || seconds < to)
            if (inside || !from) {
              player.play().catch(() => {})
              return
            }
            node.style.visibility = 'hidden'
            player.setCurrentTime(from).then(() => player.play()).catch(() => {}).finally(reveal)
          }).catch(() => player.play().catch(() => {}))
        }
        player.ready().then(arm).catch(arm)
        if (to != null) {
          let seeking = false
          player.on('timeupdate', ({ seconds }) => {
            if (dead || seeking) return
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
            window.setTimeout(finish, 120)
            window.setTimeout(() => {
              if (finished || dead) return
              finished = true
              reveal()
              seeking = false
            }, 1600)
          })
        }
      })
      .catch(() => {})

    return () => {
      dead = true
      playerRef.current = null
      player?.off?.('timeupdate')
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

// Two players so a one-second loop cuts forward instead of scrubbing backward.
function ReelCut({ className, title, start, end, labelled }) {
  const firstRef = useRef(null)
  const secondRef = useRef(null)

  useEffect(() => {
    let dead = false
    let players = []
    const nodes = [firstRef.current, secondRef.current]
    let active = 0
    let busy = false

    const park = (player) => player.setCurrentTime(start).then(() => player.pause()).catch(() => {})

    loadPlayerApi()
      .then((Vimeo) => {
        if (dead || nodes.some((node) => !node)) return
        players = nodes.map((node) => new Vimeo.Player(node))
        if (dead) {
          players.forEach((player) => player.unload().catch(() => {}))
          players = []
          return
        }

        players.forEach((player, index) => {
          player.ready().then(() => {
            if (dead) return
            player.setMuted(true).catch(() => {})
            if (index === 0) {
              player.setCurrentTime(start).then(() => player.play()).catch(() => player.play().catch(() => {}))
            } else {
              park(player)
            }
          }).catch(() => {})

          player.on('timeupdate', ({ seconds }) => {
            if (dead || busy || index !== active || seconds < end) return
            busy = true
            const next = index ^ 1
            const standby = players[next]
            standby.play()
              .then(() => standby.getCurrentTime())
              .then((at) => {
                if (dead) return
                if (at > start + 0.45) return park(standby)
                nodes[index].style.visibility = 'hidden'
                nodes[next].style.visibility = ''
                active = next
                return park(player)
              })
              .catch(() => {})
              .finally(() => {
                busy = false
              })
          })
        })
      })
      .catch(() => {})

    return () => {
      dead = true
      players.forEach((player) => {
        player.off?.('timeupdate')
        player.unload?.().catch(() => {})
      })
    }
  }, [start, end])

  return (
    <div className={`reel-stage${className ? ` ${className}` : ''}`}>
      <iframe
        ref={firstRef}
        className="reel-fit"
        src={reelSrc({ start })}
        {...iframeProps(title, labelled)}
      />
      <iframe
        ref={secondRef}
        className="reel-fit"
        src={reelSrc({ start })}
        {...iframeProps('', false)}
        style={{ visibility: 'hidden' }}
      />
    </div>
  )
}

export function ReelFrame({ className, title, clipSeconds, start, end, fit, labelled = false }) {
  const span = start != null && end != null ? end - start : null
  if (fit === 'height' && span != null && span <= 1.5) {
    return <ReelCut className={className} title={title} start={start} end={end} labelled={labelled} />
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
