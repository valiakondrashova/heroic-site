export const details = [
  'For the announcement trailer of the new Godzilla vs. Kong mobile game, the HEROIC team crafted an action-packed CGI cinematic showcasing the ultimate showdown between the iconic titans.',
  'Starting with film and game 3D assets provided by the client, we fully adapted their rigs, grooms, and materials for optimal performance within Unreal Engine. Expanding upon the client’s initial script and storyboard, we illustrated key additional sequences, refined narrative continuity, and developed deliberate pacing to build high-stakes tension leading into a massive climax.',
  'From level assembly and real-time groom simulations to heavy destruction VFX and dynamic lighting, the entire pipeline was realized in Unreal Engine to deliver a high-impact, cinematic visual experience.',
]

export const scope = [
  'Storyboard expansion & Pre-viz',
  'Asset adaptation & Rigging',
  'Grooming',
  'Shader setup',
  'Level assembly & Layout',
  'Camera direction',
  'Cinematography',
  'Character & Facial animation',
  'VFX & Destruction physics',
  'Lighting & Shading',
  'Compositing',
  'SFX & Audio integration',
]

export function CaseInfoVariantOne() {
  const [lead, ...rest] = details

  return (
    <div className="csv csv1">
      <div className="csv1-text">
        <p className="csv-label">details</p>
        <p className="csv1-lead">{lead}</p>
        {rest.map((text) => (
          <p key={text} className="csv1-body">
            {text}
          </p>
        ))}
      </div>

      <div className="csv1-scope">
        <p className="csv-label">Scope of work</p>
        <ul className="csv1-pills">
          {scope.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
