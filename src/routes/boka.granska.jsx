import { useRef, useState } from 'react'
import { createFileRoute, Link, Navigate, useNavigate } from '@tanstack/react-router'
import { Webbplats } from '../components/Webbplats'
import { Ikon } from '../components/Ikon'
import { useBokning, utkastKlart } from '../bokningar'
import { workshop, tillfalleMedId, formatPris } from '../data'
import '../components/Deltagare.css'

export const Route = createFileRoute('/boka/granska')({
  component: Granska,
  head: () => ({ meta: [{ title: 'Granska bokning · Ljusrum' }] }),
})

// Steg 2 av 2: kontrollera allt innan bokningen bekräftas.
// Varje grupp har en Ändra-länk tillbaka till rätt del av steg 1 (förbättring efter test).
function Granska() {
  const { utkast, bekrafta } = useBokning()
  const navigate = useNavigate()
  const bekraftad = useRef(false)
  const [godkant, setGodkant] = useState(false)
  const [visaFel, setVisaFel] = useState(false)

  // Efter bekräftelsen töms utkastet. Då ska sidan inte skicka tillbaka till steg 1.
  if (bekraftad.current) return null

  // Kommer man hit utan att ha fyllt i allt (t.ex. via en sparad länk) går man tillbaka till steg 1
  if (!utkastKlart(utkast)) return <Navigate to="/boka" replace />
  const tillfalle = tillfalleMedId(utkast.tillfalle)

  function bekraftaBokning() {
    if (!godkant) {
      setVisaFel(true)
      document.getElementById('villkor')?.focus()
      return
    }
    bekraftad.current = true
    bekrafta()
    navigate({ to: '/boka/bekraftelse', replace: true })
  }

  return (
    <Webbplats>
      <div className="sida sida--smal granska">
        <div className="sidrubrik">
          <div className="sidrubrik__rad">
            <Link to="/boka" className="tillbaka" aria-label="Tillbaka till steg 1">
              <Ikon namn="pil-vanster" size={24} />
            </Link>
            <h1>Granska bokning</h1>
          </div>
          <p className="caption">Steg 2 av 2 · Kontrollera att allt stämmer</p>
        </div>

        <section className="card granska__kort" aria-label="Din bokning">
          <div className="granska__grupp">
            <h2 className="boka__underrubrik">{workshop.titel}</h2>
            <p className="info-row"><Ikon namn="plats" />{workshop.plats}</p>
          </div>

          <hr className="divider" />

          <div className="granska__grupp">
            <div className="granska__grupprubrik">
              <h3 className="label">Tillfälle</h3>
              <Link to="/boka" hash="datum" className="text-link">
                Ändra<span className="visually-hidden"> tillfälle</span>
              </Link>
            </div>
            <ul className="info-list">
              <li className="info-row"><Ikon namn="kalender" />{tillfalle.helt}</li>
              <li className="info-row"><Ikon namn="klocka" />Kl {utkast.tid}</li>
            </ul>
          </div>

          <hr className="divider" />

          <div className="granska__grupp granska__grupp--tat">
            <div className="granska__grupprubrik">
              <h3 className="label">Dina uppgifter</h3>
              <Link to="/boka" hash="uppgifter" className="text-link">
                Ändra<span className="visually-hidden"> dina uppgifter</span>
              </Link>
            </div>
            <p>{utkast.namn}</p>
            <p className="granska__epost">{utkast.epost}</p>
          </div>

          <hr className="divider" />

          <div className="granska__pris">
            <div className="prisrad-rad">
              <span>Vuxen × 1</span>
              <span className="belopp">{formatPris(workshop.pris)}</span>
            </div>
          </div>
          <p className="betalning">
            <Ikon namn="kort" />
            <span><strong>Du betalar på plats</strong> när workshoppen börjar. Inget dras nu.</span>
          </p>
        </section>

        <div className="villkor">
          <label className="villkor__rad">
            <input
              id="villkor"
              type="checkbox"
              checked={godkant}
              aria-invalid={visaFel && !godkant}
              aria-describedby={visaFel && !godkant ? 'villkor-fel' : undefined}
              onChange={(e) => { setGodkant(e.target.checked); if (e.target.checked) setVisaFel(false) }}
            />
            <span>
              Jag godkänner{' '}
              <a href="https://www.folkuniversitetet.se/om-folkuniversitetet/anmalningsvillkor/" target="_blank" rel="noopener noreferrer">
                anmälningsvillkoren<span className="visually-hidden"> (öppnas i ny flik)</span>
              </a>
              . Bokningen är bindande.
            </span>
          </label>
          {visaFel && !godkant && <p id="villkor-fel" className="falt__fel">Godkänn villkoren för att bekräfta bokningen.</p>}
        </div>

        <div className="granska__handling">
          <button type="button" className="button button--block" onClick={bekraftaBokning}>Bekräfta bokning</button>
          <p className="caption">Du får en bekräftelse till din e-post.</p>
        </div>
      </div>
    </Webbplats>
  )
}
