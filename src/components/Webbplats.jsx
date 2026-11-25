import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Ikon } from './Ikon'
import { workshop } from '../data'
import './Webbplats.css'

// Sidhuvud och sidfot för besökarnas sidor.
// Dator: logotyp och länkar i en rad. Mobil: logotyp och meny-knapp (Topbar i Figma).
export function Webbplats({ children, medPrisrad = false }) {
  const [oppen, setOppen] = useState(false)
  const sokvag = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => setOppen(false), [sokvag])

  return (
    <div id="top" className={medPrisrad ? 'webb webb--med-prisrad' : 'webb'}>
      <a className="skip-link" href="#innehall">Hoppa till innehållet</a>
      <header className="webb-huvud">
        <div className="webb-huvud__rad">
          <Link to="/" className="logotyp">LJUSRUM</Link>
          <button
            type="button"
            className="icon-button webb-huvud__knapp"
            aria-expanded={oppen}
            aria-controls="huvudmeny"
            onClick={() => setOppen((o) => !o)}
          >
            <Ikon namn={oppen ? 'stang' : 'meny'} size={24} />
            <span className="visually-hidden">{oppen ? 'Stäng menyn' : 'Öppna menyn'}</span>
          </button>
          <nav id="huvudmeny" aria-label="Huvudmeny" className="webb-nav" data-oppen={oppen}>
            <Link to="/" activeOptions={{ exact: true }}>Workshoppar</Link>
            <a href="#om-ljusrum">Om Ljusrum</a>
            <a href="#kontakt">Kontakt</a>
          </nav>
        </div>
      </header>

      <main id="innehall" className="webb-main">
        {children}
      </main>

      <footer className="webb-fot">
        <div className="webb-fot__inre">
          <div className="webb-fot__kolumner">
            <div className="webb-fot__varumarke">
              <Link to="/" className="webb-fot__logo">LJUSRUM</Link>
              <p>Fotoworkshoppar för nybörjare i Stockholm. Lär dig ta kontroll över kameran, en lördag i taget.</p>
            </div>

            <nav className="webb-fot__kolumn" aria-labelledby="fot-workshoppar">
              <h2 id="fot-workshoppar" className="webb-fot__rubrik">Workshoppar</h2>
              <ul>
                <li><Link to="/">Ta kontroll över din kamera</Link></li>
                <li><Link to="/boka">Boka en plats</Link></li>
              </ul>
            </nav>

            <section id="om-ljusrum" className="webb-fot__kolumn" aria-labelledby="om-rubrik">
              <h2 id="om-rubrik" className="webb-fot__rubrik">Om Ljusrum</h2>
              <p>Vi håller till i vår fotostudio på Södermalm och utomhus i närheten. Högst {workshop.maxDeltagare} deltagare per tillfälle.</p>
            </section>

            <section id="kontakt" className="webb-fot__kolumn" aria-labelledby="kontakt-rubrik">
              <h2 id="kontakt-rubrik" className="webb-fot__rubrik">Kontakt</h2>
              <ul>
                <li><a href="mailto:hej@ljusrum.se">hej@ljusrum.se</a></li>
                <li className="webb-fot__notis">Blir du sjuk eller behöver ändra något? Mejla oss så hjälper vi dig.</li>
              </ul>
            </section>
          </div>

          <div className="webb-fot__botten">
            <p className="webb-fot__copy">
              <span className="webb-fot__logo webb-fot__logo--liten" aria-hidden="true">LJUSRUM</span>
              <span>© {new Date().getFullYear()} Ljusrum</span>
            </p>
            <Link to="/admin" className="webb-fot__lank-accent">Inloggning för arrangörer</Link>
            <a href="#top" className="webb-fot__topp">
              <Ikon namn="vinkel-hoger" className="webb-fot__topp-ikon" />Till toppen
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
