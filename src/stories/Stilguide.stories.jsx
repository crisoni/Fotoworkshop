export default { title: 'Stilguide' }

const colors = {
  'Sidbakgrund (Paper)': '--surface-subtle',
  'Kortyta (Canvas)': '--surface-card',
  'Aktiv meny (Porcelain)': '--bg-page',
  'Text (Ink)': '--text-primary',
  'Sekundär text (Steel)': '--text-secondary',
  'Primär handling och länkar (Aubergine)': '--action-primary',
  'Valt datum och tid (Ink)': '--action-selected',
  'Workshopdatum i kalendern (Lavender Haze)': '--surface-brand-soft',
  'Betyg och status (Ember)': '--icon-accent',
  'Kantlinje (Chalk)': '--border-default',
  'Kantlinje stark (Mist)': '--border-strong',
}

export const Farger = {
  name: 'Färger',
  render: () => (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {Object.entries(colors).map(([label, token]) => (
        <li key={token} style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span aria-hidden="true" style={{
            width: '2rem', height: '2rem', background: 'var(' + token + ')',
            border: '1px solid var(--color-line)', borderRadius: '50%',
          }} />
          <span>{label} <code>{token}</code></span>
        </li>
      ))}
    </ul>
  ),
}

export const Textroller = {
  render: () => (
    <>
      <h1>Display H1 – Ta kontroll över din kamera</h1>
      <h2>Heading H2 – Om workshoppen</h2>
      <h3>Heading H3 – Dina uppgifter</h3>
      <p>Body – Brödtexten berättar vad deltagaren behöver veta om workshoppen.</p>
      <p className="caption">Caption – Steg 1 av 2 · Ta kontroll över din kamera</p>
      <p className="label">Label – Tillfälle</p>
    </>
  ),
}
