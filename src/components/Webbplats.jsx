import { useEffect, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Ikon } from './Ikon'
import './Webbplats.css'

// Sidhuvud och sidfot för besökarnas sidor.
// Dator: logotyp och länkar i en rad. Mobil: logotyp och meny-knapp (Topbar i Figma).
export function Webbplats({ children, medPrisrad = false }) {
  const [oppen, setOppen] = useState(false)
  const sokvag = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => setOppen(false), [sokvag])

  return (
    <div className={medPrisrad ? 'webb webb--med-prisrad' : 'webb'}>
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
        <div className="webb-fot__rad">
          <section id="om-ljusrum" aria-labelledby="om-rubrik">
            <h2 id="om-rubrik" className="webb-fot__rubrik">Om Ljusrum</h2>
            <p>Ljusrum arrangerar fotoworkshoppar i Stockholm, i vår fotostudio på Södermalm och utomhus i närheten.</p>
          </section>
          <section id="kontakt" aria-labelledby="kontakt-rubrik">
            <h2 id="kontakt-rubrik" className="webb-fot__rubrik">Kontakt</h2>
            <p>Har du frågor eller behöver ändra något? Skriv till <a href="mailto:hej@ljusrum.se">hej@ljusrum.se</a>.</p>
          </section>
          <p className="webb-fot__admin"><Link to="/admin">Inloggning för arrangörer</Link></p>
        </div>
      </footer>
    </div>
  )
}
