import { useEffect, useRef } from 'react'
import { createFileRoute, Link, Navigate } from '@tanstack/react-router'
import { Webbplats } from '../components/Webbplats'
import { Ikon } from '../components/Ikon'
import { InforDagen } from '../components/InforDagen'
import { useBokning } from '../bokningar'
import { workshop, tillfalleMedId, formatPris, kartlank } from '../data'
import { laddaNerKalenderfil, googleKalenderlank } from '../kalenderfil'
import '../components/Deltagare.css'

export const Route = createFileRoute('/boka/bekraftelse')({
  component: Bekraftelse,
  head: () => ({ meta: [{ title: 'Bokningen är bekräftad · Ljusrum' }] }),
})

// Bekräftelse: först kvittot (gick det igenom?), sedan när och var, pris och vad man ska ta med.
function Bekraftelse() {
  const { senaste } = useBokning()
  const rubrik = useRef(null)
  useEffect(() => { rubrik.current?.focus() }, [])

  if (!senaste) return <Navigate to="/" replace />
  const tillfalle = tillfalleMedId(senaste.tillfalle)

  return (
    <Webbplats>
      <div className="sida sida--smal bekraftelse">
        <div className="bekraftelse__kvitto" role="status">
          <span className="bekraftelse__ikon"><Ikon namn="bock" size={40} /></span>
          <h1 ref={rubrik} tabIndex={-1}>Bokningen är bekräftad!</h1>
          <p className="bekraftelse__nr">Bokningsnummer: {senaste.nr}</p>
          <p className="bekraftelse__epost">Vi har skickat en bekräftelse till {senaste.epost}.</p>
        </div>

        <hr className="divider" />

        <section className="bekraftelse__detaljer" aria-labelledby="detaljer">
          <h2 id="detaljer" className="boka__underrubrik">{workshop.titel}</h2>
          <ul className="info-list">
            <li className="info-row"><Ikon namn="kalender" />{tillfalle.helt}</li>
            <li className="info-row"><Ikon namn="klocka" />Kl {workshop.tid}</li>
            <li className="info-row"><Ikon namn="plats" />{workshop.plats}</li>
          </ul>
          <hr className="divider" />
          <div className="prisrad-rad">
            <span>Att betala på plats</span>
            <span className="belopp">{formatPris(workshop.pris)}</span>
          </div>
        </section>

        <div className="efter-bokning">
          <button type="button" className="button button--block" onClick={() => laddaNerKalenderfil(senaste, tillfalle)}>
            <Ikon namn="kalender" />Lägg till i kalender
          </button>
          <div className="efter-bokning__lankar">
            <a className="text-link" href={googleKalenderlank(senaste, tillfalle)} target="_blank" rel="noopener noreferrer">
              Google Kalender<span className="visually-hidden"> (öppnas i ny flik)</span>
            </a>
            <a className="text-link" href={kartlank} target="_blank" rel="noopener noreferrer">
              <Ikon namn="plats" />Vägbeskrivning<span className="visually-hidden"> (öppnas i ny flik)</span>
            </a>
          </div>
        </div>

        <hr className="divider" />

        <InforDagen rubrikKlass="boka__underrubrik" />

        <p className="bekraftelse__tillbaka"><Link to="/" className="text-link">Till workshopsidan</Link></p>
      </div>
    </Webbplats>
  )
}
