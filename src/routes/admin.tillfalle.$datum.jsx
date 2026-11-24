import { createFileRoute, Link, notFound, useNavigate } from '@tanstack/react-router'
import { ejIPrototypen, Statusbricka, Tillbakalank } from '../components/AdminLayout'
import { Ikon } from '../components/Ikon'
import { useBokning, matchar } from '../bokningar'
import { workshop, tillfalleMedId, formatPris } from '../data'

// Ett tillfälle och dess deltagare, t.ex. /admin/tillfalle/14-november
export const Route = createFileRoute('/admin/tillfalle/$datum')({
  loader: ({ params }) => {
    const tillfalle = tillfalleMedId(params.datum)
    if (!tillfalle) throw notFound()
    return { tillfalle }
  },
  validateSearch: (s) => ({ q: typeof s.q === 'string' && s.q.trim() ? s.q : undefined }),
  head: ({ loaderData }) => ({ meta: [{ title: `${loaderData?.tillfalle.kort ?? 'Tillfälle'} · Ljusrum admin` }] }),
  component: Tillfalle,
})

function Tillfalle() {
  const { tillfalle } = Route.useLoaderData()
  const { q } = Route.useSearch()
  const navigate = useNavigate({ from: Route.fullPath })
  const { alla } = useBokning()
  const deltagare = alla.filter((b) => b.tillfalle === tillfalle.id)
  const lista = deltagare.filter((b) => matchar(b, q))

  return (
    <div className="adm-sida">
      <div className="adm-sidhuvud">
        <Tillbakalank to="/admin">Alla tillfällen</Tillbakalank>
        <div className="adm-sidhuvud__rubrikrad">
          <h1>{workshop.titel}</h1>
          <a href="#" className="button" {...ejIPrototypen}><Ikon namn="plus" />Lägg till deltagare</a>
        </div>
        <ul className="adm-meta">
          <li><Ikon namn="kalender" />{tillfalle.helt}</li>
          <li><Ikon namn="klocka" />{workshop.tid}</li>
          <li><Ikon namn="plats" />{workshop.plats}</li>
          <li><Ikon namn="anvandare" />{deltagare.length} av {workshop.maxDeltagare} anmälda</li>
        </ul>
      </div>

      <div className="adm-verktyg">
        <h2 className="adm-sektionsrubrik">Deltagare ({deltagare.length})</h2>
        <div className="search-field adm-verktyg__sok">
          <Ikon namn="sok" />
          <label className="visually-hidden" htmlFor="sok-tillfalle">Sök bland deltagarna</label>
          <input
            id="sok-tillfalle"
            type="search"
            placeholder="Sök namn, e-post eller bokningsnr"
            value={q ?? ''}
            onChange={(e) => navigate({ search: { q: e.target.value || undefined }, replace: true })}
          />
        </div>
      </div>

      {lista.length === 0 ? (
        <p className="adm-tomt" role="status">
          {deltagare.length === 0 ? 'Inga bokningar på det här tillfället än.' : 'Inga deltagare matchar sökningen.'}
        </p>
      ) : (
        <div className="adm-tabell-ram">
          <table className="adm-tabell adm-tabell--tillfalle">
            <caption className="visually-hidden">Deltagare {tillfalle.kort}</caption>
            <thead>
              <tr>
                <th scope="col">Bokning</th>
                <th scope="col">Deltagare</th>
                <th scope="col">Tid</th>
                <th scope="col">Pris</th>
                <th scope="col">Betalning</th>
                <th scope="col">Status</th>
                <th scope="col"><span className="visually-hidden">Åtgärder</span></th>
              </tr>
            </thead>
            <tbody>
              {lista.map((b) => (
                <tr key={b.nr}>
                  <td className="adm-cell--titel adm-cell--nr">{b.nr}</td>
                  <td data-label="Deltagare">
                    <span className="adm-stark">{b.namn}</span>
                    <span className="caption adm-cell--epost">{b.epost}</span>
                  </td>
                  <td data-label="Tid">{workshop.tid}</td>
                  <td data-label="Pris">{formatPris(workshop.pris)}</td>
                  <td data-label="Betalning">På plats</td>
                  <td data-label="Status"><Statusbricka /></td>
                  <td className="adm-cell--atgarder">
                    <Link to="/admin/bokning/$nr" params={{ nr: b.nr }} className="text-link">
                      Visa bokning<span className="visually-hidden"> {b.nr}, {b.namn}</span>
                      <Ikon namn="vinkel-hoger" />
                    </Link>
                    <button type="button" className="icon-button" {...ejIPrototypen}>
                      <Ikon namn="prickar" /><span className="visually-hidden">Fler val för {b.namn}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
