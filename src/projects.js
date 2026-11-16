export function embedSrc(video) {
  if (!video) return ''
  if (video.provider === 'youtube') {
    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      controls: '0',
      modestbranding: '1',
      rel: '0',
      playsinline: '1',
      loop: '1',
      playlist: video.id,
      fs: '0',
      disablekb: '1',
    })
    return `https://www.youtube-nocookie.com/embed/${video.id}?${params}`
  }
  const params = new URLSearchParams({
    autoplay: '1',
    muted: '1',
    loop: '1',
    background: '1',
    autopause: '0',
    dnt: '1',
    title: '0',
    byline: '0',
    portrait: '0',
  })
  return `https://player.vimeo.com/video/${video.id}?${params}`
}

export const projects = [
  {
    id: 'hammer',
    size: 'large',
    image: '/assets/cover-hammer.png',
    title: "Hammer and Bolter Butcher's Nails",
    subtitle: 'Warhammer | Game trailer',
    video: { provider: 'youtube', id: 'IQwGg1hwtX0' },
  },
  {
    id: 'superior',
    size: 'small',
    image: '/assets/cover-superior.png',
    title: 'Superior',
    subtitle: 'GalaGames | Game trailer',
    video: { provider: 'vimeo', id: '801240616' },
    extras: [
      {
        id: 'superior-breakdown',
        image: '/assets/cover-superior-extra.jpg',
        title: 'Superior breakdown',
        video: { provider: 'vimeo', id: '802762380' },
      },
    ],
  },
  {
    id: 'drone',
    size: 'small',
    image: '/assets/cover-drone.png',
    title: 'Project Drone Galaxy',
    subtitle: 'Playground Labs | Game trailer',
    video: { provider: 'vimeo', id: '800876258' },
    extras: [
      {
        id: 'drone-breakdown',
        image: '/assets/cover-drone-extra.jpg',
        title: 'Project Drone Galaxy breakdown',
        video: { provider: 'vimeo', id: '802763861' },
      },
    ],
  },
  {
    id: 'robocop',
    size: 'large',
    image: '/assets/cover-robocop.png',
    title: 'RoboCop: Rogue City',
    subtitle: 'Nacon | Official Launch Trailer',
    video: { provider: 'vimeo', id: '880941151' },
  },
  {
    id: 'godzilla',
    size: 'large',
    image: '/assets/cover-godzilla.png',
    title: 'Godzilla x Kong: Titan Chasers',
    subtitle: 'Tilting Point | Game trailer',
    video: { provider: 'vimeo', id: '1065139398' },
  },
  {
    id: 'hellsinger',
    size: 'small',
    image: '/assets/cover-hellsinger.png',
    title: 'Metal Hellsinger. Pre Sheol',
    subtitle: 'Outsiders | Game trailer',
    video: { provider: 'vimeo', id: '801227487' },
  },
  {
    id: 'dragons',
    size: 'small',
    image: '/assets/cover-dragons.png',
    title: 'Merge Dragons',
    subtitle: 'Gram Games | Game trailer',
    video: { provider: 'vimeo', id: '800870863' },
  },
  {
    id: 'hotel',
    size: 'large',
    image: '/assets/cover-hotel.png',
    title: 'Hotel Galactic',
    subtitle: 'Ancient Forge | Game trailer',
  },
]
