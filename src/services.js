import { projects } from './projects.js'

const clip = (id) => projects.find((project) => project.id === id)

const storyboards = [
  { id: 'story-a', story: 'a', image: '/assets/story-board-1.png', title: 'Storyboard' },
  { id: 'story-b', story: 'b', image: '/assets/story-board-2.png', title: 'Storyboard' },
]

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
    lead: 'We build a strong foundation for every project, from initial concepts and creative development to storyboards and previz.',
    expertise: [
      'Creative concept development',
      'Visual storytelling',
      'Strong creative & strategic input',
      'Art direction',
      'Visual development',
      'Story-driven approach',
      'From initial idea to production-ready vision',
      'Adaptable to different visual styles and IPs',
    ],
    process: [
      'General ideas creation',
      'Concepting',
      'Detailed script creation based on approved idea',
      'Storyboarding based on approved script',
      '2D or 3D previz creation using storyboard (with draft VO if needed) (storymatic)',
    ],
    clips: storyboards,
  },
  {
    slug: 'in-game-cutscenes',
    title: 'In-game cutscenes',
    lead: 'Create story-driven in-game cutscenes in Unreal Engine, combining deep engine knowledge with film-production experience.',
    expertise: [
      'Unreal mastery',
      'Actors casting',
      'Motion capture / performance capture / 3D scanning',
      'Script / storyboard creation',
      'Fully integrated team',
      '2D / 3D cutscenes',
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
    clips: [clip('hammer'), clip('superior')],
  },
  {
    slug: 'gameplay-trailers',
    title: 'Gameplay trailers',
    lead: 'We provide an end-to-end, engine-agnostic trailer solution to showcase any in-game features.',
    expertise: [
      'Any in-game engines (Unity / Unreal / proprietary engines)',
      'Support from wider Room 8 Group tech team',
      'Strong creative input / film-director experience',
      'Full in-engine scene creation',
    ],
    process: [
      'Script writing',
      'Storyboarding',
      'In-game capture',
      'Pre viz',
      'Lighting',
      'VFX',
      '2D / 3D rendering',
      'Compositing',
      'Sound',
    ],
    clips: [clip('drone'), clip('robocop')],
  },
  {
    slug: 'trailers-cinematics',
    title: 'Trailers & cinematics',
    lead: 'We deliver high-quality, end-to-end cinematic trailers across any production pipeline (Maya, Unreal, Cinema 4D).',
    expertise: [
      'Work on any pipeline',
      'Mocap / performance capture / scanning',
      'Hyperreal to stylized rendering',
      'Expert creative input',
      'Short and long format',
      'All animation types (key frame / stop motion / 2D)',
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
    clips: [clip('godzilla'), clip('hellsinger')],
  },
  {
    slug: 'user-acquisition-videos',
    title: 'User Acquisition Videos',
    lead: 'We’ll help you maintain growth after launch with quality user acquisition videos. Our end-to-end solution—from concept to final trailer—guarantees delivery on time and at scale.',
    expertise: [
      '2D/3D rendering excellence',
      'In-game assets adaptation',
      'Fake gameplay creation',
      'Any art style - cartoon / ctylized / cell shading…',
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
    clips: [clip('dragons'), clip('robocop')],
  },
]

export function getService(slug) {
  return servicePages.find((s) => s.slug === slug) || servicePages[4]
}
