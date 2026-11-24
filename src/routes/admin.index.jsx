import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Statusbricka } from '../components/AdminLayout'
import { Ikon } from '../components/Ikon'
import { useBokning, matchar } from '../bokningar'
import { workshop, tillfallen, tillfalleMedId, formatPris } from '../data'

// Vy, datumfilter och sökning ligger i adressen (t.ex. /admin?vy=deltagare&datum=21-november).
// Då går det att ladda om sidan eller gå tillbaka utan att tappa det man valt.
export const Route = createFileRoute('/admin/')({
  component: Oversikt,
  validateSearch: (s) => ({
    vy: s.vy === 'deltagare' ? 'deltagare' : undefined,
    datum: tillfalleMedId(s.datum) ? s.datum : undefined,
    q: typeof s.q === 'string' && s.q.trim() ? s.q : undefined,
  }),
})

const manader = ['Oktober 2026', 'November 2026', 'December 2026']

function Oversikt() {
  const { vy } = Route.useSearch()
  const [manad, setManad] = useState(1) // November 2026, månaden med tillfällen
  const visarDeltagare = vy === 'deltagare'

  return (
    <div className="adm-sida">
      <div className="adm-sidhuvud adm-sidhuvud--rad">
        <div className="adm-sidhuvud__titel">
          <h1>Bokningar</h1>
          <p className="adm-underrubrik">Workshoptillfällen och anmälningar</p>
        </div>
        <div className="adm-manad" aria-label="Välj månad" role="group">
          <button type="button" className="icon-button" disabled={manad === 0} onClick={() => setManad((m) => m - 1)}>
            <Ikon namn="vinkel-vanster" /><span className="visually-hidden">Föregående månad</span>
          </button>
          <p aria-live="polite">{manader[manad]}</p>
          <button type="button" className="icon-button" disabled={manad === manader.length - 1} onClick={() => setManad((m) => m + 1)}>
            <Ikon namn="vinkel-hoger" /><span className="visually-hidden">Nästa månad</span>
          </button>
        </div>
      </div>

      <div className="adm-verktyg">
        <nav className="flikvaljare" aria-label="Visa">
          <Link to="/admin" search={{}} activeOptions={{ exact: true, includeSearch: false }} activeProps={{}} aria-current={!visarDeltagare ? 'page' : undefined} data-vald={!visarDeltagare}>Tillfällen</Link>
          <Link to="/admin" search={{ vy: 'deltagare' }} activeOptions={{ exact: true, includeSearch: false }} activeProps={{}} aria-current={visarDeltagare ? 'page' : undefined} data-vald={visarDeltagare}>Alla deltagare</Link>
        </nav>
        {visarDeltagare && <DeltagarFilter />}
      </div>

      {manad !== 1 ? (
        <p className="adm-tomt">Inga workshoptillfällen i {manader[manad].toLowerCase()}.</p>
      ) : visarDeltagare ? (
        <AllaDeltagare />
      ) : (
        <Tillfallen />
      )}
    </div>
  )
}

function Tillfallen() {
  const { alla } = useBokning()
  return (
    <div className="adm-tabell-ram">
      <table className="adm-tabell adm-tabell--tillfallen">
        <caption className="visually-hidden">Workshoptillfällen i november 2026</caption>
        <thead>
          <tr>
            <th scope="col">Workshop</th>
            <th scope="col">Datum</th>
            <th scope="col">Anmälda</th>
            <th scope="col">Pris</th>
            <th scope="col"><span className="visually-hidden">Åtgärder</span></th>
          </tr>
        </thead>
        <tbody>
          {tillfallen.map((t) => {
            const antal = alla.filter((b) => b.tillfalle === t.id).length
            return (
              <tr key={t.id}>
                <td className="adm-cell--titel">
                  <span className="adm-stark">{workshop.titel}</span>
                  <span className="caption">{workshop.plats}</span>
                </td>
                <td data-label="Datum" className="adm-cell--datum">
                  <span className="adm-stark">{t.lang}</span>
                  <span className="caption">kl {workshop.tid}</span>
                </td>
                <td data-label="Anmälda">{antal} av {workshop.maxDeltagare}</td>
                <td data-label="Pris">{formatPris(workshop.pris)}</td>
                <td className="adm-cell--atgarder">
                  <Link to="/admin/tillfalle/$datum" params={{ datum: t.id }} className="text-link">
                    Visa deltagare<span className="visually-hidden"> {t.kort}</span>
                    <Ikon namn="vinkel-hoger" />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

function DeltagarFilter() {
  const { datum, q } = Route.useSearch()
  const navigate = useNavigate({ from: '/admin/' })
  const satt = (andring) => navigate({ search: (s) => ({ ...s, ...andring }), replace: true })

  return (
    <div className="adm-filter">
      <label className="visually-hidden" htmlFor="datumfilter">Filtrera på datum</label>
      <div className="adm-select">
        <select id="datumfilter" value={datum ?? ''} onChange={(e) => satt({ datum: e.target.value || undefined })}>
          <option value="">Alla datum</option>
          {tillfallen.map((t) => <option key={t.id} value={t.id}>{t.kort}</option>)}
        </select>
        <Ikon namn="vinkel-ner" />
      </div>
      <div className="search-field">
        <Ikon namn="sok" />
        <label className="visually-hidden" htmlFor="sok-deltagare">Sök deltagare</label>
        <input
          id="sok-deltagare"
          type="search"
          placeholder="Sök namn eller e-post"
          value={q ?? ''}
          onChange={(e) => satt({ q: e.target.value || undefined })}
        />
      </div>
    </div>
  )
}

function AllaDeltagare() {
  const { alla } = useBokning()
  const { datum, q } = Route.useSearch()
  const ordning = (b) => tillfallen.findIndex((t) => t.id === b.tillfalle)
  const lista = alla
    .filter((b) => (!datum || b.tillfalle === datum) && matchar(b, q))
    .sort((a, b) => ordning(a) - ordning(b) || a.nr.localeCompare(b.nr))

  if (lista.length === 0) {
    return <p className="adm-tomt" role="status">Inga deltagare matchar sökningen.</p>
  }

  return (
    <div className="adm-tabell-ram">
      <table className="adm-tabell adm-tabell--deltagare">
        <caption className="visually-hidden">Alla deltagare</caption>
        <thead>
          <tr>
            <th scope="col">Bokning</th>
            <th scope="col">Deltagare</th>
            <th scope="col">E-post</th>
            <th scope="col">Tillfälle</th>
            <th scope="col">Betalning</th>
            <th scope="col">Status</th>
            <th scope="col"><span className="visually-hidden">Åtgärder</span></th>
          </tr>
        </thead>
        <tbody>
          {lista.map((b) => {
            const t = tillfalleMedId(b.tillfalle)
            return (
              <tr key={b.nr}>
                <td className="adm-cell--titel adm-cell--nr">{b.nr}</td>
                <td data-label="Deltagare" className="adm-stark">{b.namn}</td>
                <td data-label="E-post" className="adm-cell--epost">{b.epost}</td>
                <td data-label="Tillfälle">
                  <span className="adm-stark">{t.lang}</span>
                  <span className="caption">kl {workshop.tid}</span>
                </td>
                <td data-label="Betalning">På plats</td>
                <td data-label="Status"><Statusbricka /></td>
                <td className="adm-cell--atgarder">
                  <Link to="/admin/bokning/$nr" params={{ nr: b.nr }} search={{ fran: 'deltagare' }} className="text-link">
                    Visa bokning<span className="visually-hidden"> {b.nr}, {b.namn}</span>
                    <Ikon namn="vinkel-hoger" />
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
