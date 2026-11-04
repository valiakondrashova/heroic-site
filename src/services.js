export const whyChooseUs = [
  {
    n: '01',
    title: 'We love stories',
    body: 'Crafting artistically stunning and narratively compelling trailers for games.',
  },
  {
    n: '02',
    title: 'Solution-oriented approach',
    body: 'Utilizing the right pipelines and the right supporting tools to match our clients needs and budget.',
  },
  {
    n: '03',
    title: 'Seamless integration with client pipeline',
    body: 'Our strong Room 8 Group heritage allows us to fully understand the making of a game and the associated needs of flexibility and adaptability.',
  },
  {
    n: '04',
    title: 'Best of the entertainment worlds',
    body: 'We combine the expertise of Film and TV talents with gaming veterans to bring the best of the 2 worlds.',
  },
  {
    n: '05',
    title: 'Reliability of Room 8 Group',
    body: 'An integrated group of 2000 seasoned video game development experts.',
  },
]

export const servicePages = [
  {
    slug: 'pre-production',
    title: 'Pre-production',
    lead: 'Before a single frame ships, we lock story, look, and pace — so production hits the date and the tone of the game.',
    expertise: [
      'Scriptwriting and narrative beats',
      'Storyboarding and animatics',
      'Mood boards, concept art, color scripts',
      'Beauty-shot planning',
    ],
    process: [
      'Script writing',
      'Storyboarding',
      'Mood boarding',
      'Concept art',
      'Color scripts',
      'Animatics',
      'Beauty shots production',
    ],
    videos: ['/assets/rect15049.jpg', '/assets/rect15052.jpg', '/assets/rect15053.jpg'],
  },
  {
    slug: 'in-game-cutscenes',
    title: 'In-game cutscenes',
    lead: 'Cinematics that live in the engine — timed to gameplay, shipped with the build, not as an afterthought.',
    expertise: [
      'Real-time cutscenes',
      'In-engine integration',
      'Motion capture and animation cleanup',
    ],
    process: [
      'Performance capture',
      'Animation cleanup',
      'Environment setup',
      'Camera direction',
      'Lighting',
      'In-engine integration',
      'Sound',
    ],
    videos: ['/assets/rect15051.jpg', '/assets/rect15048.jpg', '/assets/rect15054.jpg'],
  },
  {
    slug: 'gameplay-trailers',
    title: 'Gameplay trailers',
    lead: 'Capture, edit, and polish the session that sells the game — with sound, VFX, and titles that hold up next to a cinematic.',
    expertise: [
      'Capture team on the floor',
      'Editing and motion design',
      'Visual effects and title cards',
    ],
    process: [
      'Gameplay capture',
      'Editing',
      'Sound design',
      'Visual effect animation',
      'Motion design',
      'Title cards creation',
    ],
    videos: ['/assets/rect15056.jpg', '/assets/rect15055.jpg', '/assets/rect15049.jpg'],
  },
  {
    slug: 'trailers-cinematics',
    title: 'Trailers & cinematics',
    lead: 'Full-pipeline story trailers: assets, worlds, performance, and finish — built to launch a game, not just decorate it.',
    expertise: [
      'Creating assets',
      'Environment setup',
      'Rigging and key-frame animation',
      'Motion capture',
      'Compositing and post',
    ],
    process: [
      'Assets creation',
      'Environment setup',
      'Rigging & key-frame animation',
      'Motion capture',
      'Visual effect animation',
      'Lighting',
      'Compositing',
      'Sound design',
      'Postproduction editing',
    ],
    videos: ['/assets/service-ua-still.jpg', '/assets/rect15048.jpg', '/assets/rect15051.jpg'],
  },
  {
    slug: 'user-acquisition-videos',
    title: 'User Acquisition Videos',
    lead: 'We’ll help you maintain growth after launch with quality user acquisition videos. Our end-to-end solution—from concept to final trailer—guarantees delivery on time and at scale.',
    expertise: [
      '2D/3D rendering excellence',
      'In-game assets adaptation',
      'Fake gameplay creation',
      'Any art style — cartoon / stylized / cel shading',
      'Specialization in live-ops mobile and free-to-play markets',
      'Robust production pipeline for timely, quality delivery within budget',
    ],
    process: [
      'Script writing',
      'Storyboarding',
      'Concepting',
      'Pre viz',
      'Assets creation',
      'Animation',
      'Lighting',
      'VFX',
      '2D / 3D rendering',
      'Compositing',
      'Sound',
    ],
    videos: ['/assets/service-ua-still.jpg', '/assets/rect15052.jpg', '/assets/rect15054.jpg'],
  },
]

export function getService(slug) {
  return servicePages.find((s) => s.slug === slug) || servicePages[4]
}
