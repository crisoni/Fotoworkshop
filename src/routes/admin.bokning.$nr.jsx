import { createFileRoute } from '@tanstack/react-router'
import { ejIPrototypen, Statusbricka, Tillbakalank } from '../components/AdminLayout'
import { Ikon } from '../components/Ikon'
import { useBokning } from '../bokningar'
import { workshop, tillfalleMedId, formatPris } from '../data'

// En bokning, t.ex. /admin/bokning/L101.
// Tillbakalänken leder till samma tillfälle man kom från, så att valt tillfälle inte tappas.
// Kom man från "Alla deltagare" (?fran=deltagare) leder den dit i stället.
export const Route = createFileRoute('/admin/bokning/$nr')({
  validateSearch: (s) => ({ fran: s.fran === 'deltagare' ? 'deltagare' : undefined }),
  head: ({ params }) => ({ meta: [{ title: `Bokning ${params.nr} · Ljusrum admin` }] }),
  component: Bokning,
})

function Bokning() {
  const { nr } = Route.useParams()
  const { fran } = Route.useSearch()
  const { alla } = useBokning()
  const b = alla.find((x) => x.nr.toLowerCase() === nr.toLowerCase())

  if (!b) {
    return (
      <div className="adm-sida">
        <Tillbakalank to="/admin">Alla tillfällen</Tillbakalank>
        <h1>Bokningen finns inte</h1>
        <p>Det finns ingen bokning med nummer {nr}.</p>
      </div>
    )
  }

  const t = tillfalleMedId(b.tillfalle)
  const fornamn = b.namn.split(' ')[0]
  const rader = [
    ['Bokningsnummer', b.nr],
    ['Workshop', workshop.titel],
    ['Datum', t.helt],
    ['Tid', workshop.tid],
    ['Plats', workshop.plats],
    ['Pris', formatPris(workshop.pris)],
    ['Betalning', 'På plats'],
    ['Status', <Statusbricka key="s" />],
    ['Bokad', b.bokad],
  ]

  return (
    <div className="adm-sida">
      <div className="adm-sidhuvud">
        {fran === 'deltagare' ? (
          <Tillbakalank to="/admin" search={{ vy: 'deltagare' }}>Alla deltagare</Tillbakalank>
        ) : (
          <Tillbakalank to="/admin/tillfalle/$datum" params={{ datum: t.id }}>Deltagare {t.kort}</Tillbakalank>
        )}
        <div className="adm-sidhuvud__rubrikrad">
          <div className="adm-bokning__namn">
            <h1>{b.namn}</h1>
            <Statusbricka />
          </div>
          <div className="adm-bokning__knappar">
            <a href={`mailto:${b.epost}`} className="button">Skicka e-post</a>
            <button type="button" className="icon-button" {...ejIPrototypen}>
              <Ikon namn="penna" /><span className="visually-hidden">Redigera bokningen</span>
            </button>
            <button type="button" className="icon-button" {...ejIPrototypen}>
              <Ikon namn="prickar" /><span className="visually-hidden">Fler val</span>
            </button>
          </div>
        </div>
        <p className="adm-underrubrik">Bokning {b.nr} · {workshop.titel}</p>
      </div>

      <div className="adm-bokning">
        <section className="card adm-kort" aria-labelledby="kort-bokning">
          <h2 id="kort-bokning" className="adm-kort__rubrik">Bokning</h2>
          <dl className="adm-nyckelvarde">
            {rader.map(([etikett, varde]) => (
              <div key={etikett}>
                <dt>{etikett}</dt>
                <dd>{varde}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="card adm-kort adm-kort--deltagare" aria-labelledby="kort-deltagare">
          <h2 id="kort-deltagare" className="adm-kort__rubrik">Deltagare</h2>
          <dl className="adm-nyckelvarde">
            <div><dt>Namn</dt><dd>{b.namn}</dd></div>
            <div><dt>E-post</dt><dd className="adm-cell--epost">{b.epost}</dd></div>
          </dl>
          <a href={`mailto:${b.epost}`} className="text-link">
            Skicka e-post till {fornamn}<Ikon namn="vinkel-hoger" />
          </a>
        </section>
      </div>
    </div>
  )
}
