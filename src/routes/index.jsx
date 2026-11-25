import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { WorkshopCard } from '../components/WorkshopCard'
import { Webbplats } from '../components/Webbplats'
import { ViktigInfo } from '../components/ViktigInfo'
import { Dela } from '../components/Dela'
import { workshop, formatPris, tillfallen } from '../data'
import { useBokning, platserKvar, platserText } from '../bokningar'
import '../components/Deltagare.css'

export const Route = createFileRoute('/')({
  component: Workshopsida,
})

// Workshopsidan: "Framsida – efter test" (mobil) och "D01 Workshopsida – dator".
// Mobil: en kolumn och en flytande prisrad i nederkant.
// Dator: innehållet till vänster och ett bokningskort till höger som följer med vid scroll.
function Workshopsida() {
  const [visaMer, setVisaMer] = useState(false)
  const { alla, uppdatera } = useBokning()
  const navigate = useNavigate()

  // Ett tillfälle i priskortet väljer datumet direkt och går till bokningen
  function valjTillfalle(id) {
    uppdatera({ tillfalle: id })
    navigate({ to: '/boka' })
  }

  return (
    <Webbplats medPrisrad>
      <div className="sida workshop">
        <div className="workshop__innehall">
          <WorkshopCard titelTillagg={<Dela titel={workshop.titel} />} />

          <hr className="divider" />

          <section className="workshop__avsnitt" aria-labelledby="om">
            <h2 id="om">Om workshoppen</h2>
            <p>
              {workshop.kortOm}{' '}
              {visaMer && <span id="mer-om">{workshop.merOm} </span>}
              <button
                type="button"
                className="text-link"
                aria-expanded={visaMer}
                aria-controls="mer-om"
                onClick={() => setVisaMer((v) => !v)}
              >
                {visaMer ? 'Visa mindre' : 'Läs mer'}
              </button>
            </p>
          </section>

          <hr className="divider" />

          <section className="workshop__avsnitt" aria-labelledby="forkunskaper">
            <h2 id="forkunskaper">Förkunskaper</h2>
            <p>{workshop.forkunskaper}</p>
          </section>

          <section className="card viktig-info" aria-labelledby="viktigt">
            <h2 id="viktigt" className="boka__underrubrik">Viktig information</h2>
            <ViktigInfo />
          </section>
        </div>

        <aside className="prisrad" aria-label="Pris och bokning">
          <div className="prisrad__pris">
            <span className="caption">Pris per person</span>
            <span className="prisrad__belopp">{formatPris(workshop.pris)}</span>
          </div>
          <Link to="/boka" className="button prisrad__knapp">Boka</Link>
          {/* Bara på dator: tillfällen med lediga platser */}
          <div className="prisrad__tillfallen">
            <h2 className="label" id="tillfallen-rubrik">Tillfällen</h2>
            <ul aria-labelledby="tillfallen-rubrik">
              {tillfallen.map((t) => {
                const kvar = platserKvar(alla, t.id)
                return (
                  <li key={t.id}>
                    <button type="button" className="tillfalle-rad" disabled={kvar === 0} onClick={() => valjTillfalle(t.id)}>
                      <span className="tillfalle-rad__datum">{t.lang}</span>
                      <span className={kvar <= 3 ? 'platser platser--fa' : 'platser'}>{platserText(kvar)}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </aside>
      </div>
    </Webbplats>
  )
}
