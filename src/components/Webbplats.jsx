import { useEffect, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { Ikon } from './Ikon'
import { Logomarke } from './Logomarke'
import { siFacebook, siInstagram } from './varumarken'
import './Webbplats.css'

const villkor = [
  ['Anmälningsvillkor', 'https://www.folkuniversitetet.se/om-folkuniversitetet/anmalningsvillkor/'],
  ['Ångra köp', 'https://www.folkuniversitetet.se/om-folkuniversitetet/anmalningsvillkor/angerformular-for-onlinekop/'],
  ['Personuppgifter', 'https://www.folkuniversitetet.se/om-folkuniversitetet/anmalningsvillkor/personuppgifter-gdpr/'],
]


function SocialLank({ ikon, namn, href }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="webb-fot__social">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d={ikon.path} />
      </svg>
      <span className="visually-hidden">Ljusrum på {namn} (öppnas i ny flik)</span>
    </a>
  )
}

// Sidhuvud och sidfot för besökarnas sidor.
// Dator: logotyp och länkar i en rad. Mobil: logotyp och meny-knapp (Topbar i Figma).
export function Webbplats({ children, medPrisrad = false }) {
  const [oppen, setOppen] = useState(false)
  const sokvag = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => setOppen(false), [sokvag])

  // Öppen meny på mobil: sidan bakom scrollar inte, och Escape stänger menyn
  useEffect(() => {
    if (!oppen) return
    document.documentElement.classList.add('meny-oppen')
    const tangent = (e) => { if (e.key === 'Escape') setOppen(false) }
    window.addEventListener('keydown', tangent)
    return () => {
      document.documentElement.classList.remove('meny-oppen')
      window.removeEventListener('keydown', tangent)
    }
  }, [oppen])
  const kakor = useRef(null)

  function rensa() {
    try {
      for (const lagring of [sessionStorage, localStorage]) {
        Object.keys(lagring).filter((k) => k.startsWith('ljusrum.')).forEach((k) => lagring.removeItem(k))
      }
    } catch { /* lagring avstängd */ }
    window.location.reload()
  }

  return (
    <div id="top" className={medPrisrad ? 'webb webb--med-prisrad' : 'webb'}>
      <a className="skip-link" href="#innehall">Hoppa till innehållet</a>
      <header className="webb-huvud">
        <div className="webb-huvud__rad">
          <Link to="/" className="logotyp"><Logomarke size={28} />LJUSRUM</Link>
          <button
            type="button"
            className="icon-button webb-huvud__knapp"
            aria-expanded={oppen}
            aria-controls="huvudmeny"
            onClick={() => setOppen((o) => !o)}
          >
            <span className="hamburgare" data-oppen={oppen} aria-hidden="true"><span /><span /><span /></span>
            <span className="visually-hidden">{oppen ? 'Stäng menyn' : 'Öppna menyn'}</span>
          </button>
          <nav id="huvudmeny" aria-label="Huvudmeny" className="webb-nav" data-oppen={oppen}>
            <div className="webb-nav__lankar">
              <Link to="/" activeOptions={{ exact: true }} onClick={() => setOppen(false)}>Workshoppar</Link>
              {/* Galleri och Priser är med för att menyn ska se ut som en riktig webbplats. Sidorna finns inte än. */}
              <a href="#galleri" onClick={(e) => e.preventDefault()}>Galleri</a>
              <a href="#priser" onClick={(e) => e.preventDefault()}>Priser</a>
              <a href="#om-ljusrum" onClick={() => setOppen(false)}>Om Ljusrum</a>
              <a href="#kontakt" onClick={() => setOppen(false)}>Kontakt</a>
            </div>
            <Link to="/boka" className="button button--block webb-nav__boka" onClick={() => setOppen(false)}>Boka en plats</Link>
          </nav>
        </div>
      </header>

      <main id="innehall" className="webb-main">
        {children}
      </main>

      <footer className="webb-fot">
        <div className="webb-fot__inre">
          <div className="webb-fot__kolumner">
            <div id="om-ljusrum" className="webb-fot__varumarke">
              <Link to="/" className="webb-fot__logo"><Logomarke size={28} />LJUSRUM</Link>
              <p>Fotoworkshoppar för nybörjare i Stockholm. Lär dig ta kontroll över kameran, en lördag i taget.</p>
            </div>

            <nav className="webb-fot__kolumn" aria-labelledby="fot-workshoppar">
              <h2 id="fot-workshoppar" className="webb-fot__rubrik">Workshoppar</h2>
              <ul>
                <li><Link to="/">Ta kontroll över din kamera</Link></li>
                <li><Link to="/boka">Boka en plats</Link></li>
              </ul>
            </nav>

            <nav className="webb-fot__kolumn" aria-labelledby="fot-villkor">
              <h2 id="fot-villkor" className="webb-fot__rubrik">Villkor</h2>
              <ul>
                {villkor.map(([text, href]) => (
                  <li key={href}>
                    <a href={href} target="_blank" rel="noopener noreferrer">
                      {text}<span className="visually-hidden"> (öppnas i ny flik)</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

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
              <span className="webb-fot__logo webb-fot__logo--liten" aria-hidden="true"><Logomarke size={22} />LJUSRUM</span>
              <span>© {new Date().getFullYear()} Ljusrum</span>
            </p>
            <div className="webb-fot__lankar">
              <button type="button" className="webb-fot__lank-accent" onClick={() => kakor.current?.showModal()}>
                Inställningar för kakor
              </button>
              <Link to="/admin" className="webb-fot__lank-accent">Inloggning för arrangörer</Link>
            </div>
            <div className="webb-fot__hoger">
              <ul className="webb-fot__sociala" aria-label="Följ oss">
                <li><SocialLank ikon={siInstagram} namn="Instagram" href="https://www.instagram.com/" /></li>
                <li><SocialLank ikon={siFacebook} namn="Facebook" href="https://www.facebook.com/" /></li>
              </ul>
              <a href="#top" className="webb-fot__topp">
                <Ikon namn="vinkel-hoger" className="webb-fot__topp-ikon" />Till toppen
              </a>
            </div>
          </div>
        </div>
      </footer>

      <dialog ref={kakor} className="kakor" aria-labelledby="kakor-rubrik">
        <h2 id="kakor-rubrik">Inställningar för kakor</h2>
        <p>Vi använder inga kakor för spårning eller reklam.</p>
        <p>Webbplatsen sparar bara din pågående bokning i webbläsaren, så att den finns kvar om du laddar om sidan.</p>
        <div className="kakor__knappar">
          <button type="button" className="button" onClick={() => kakor.current?.close()}>Stäng</button>
          <button type="button" className="text-link" onClick={rensa}>Rensa sparade uppgifter</button>
        </div>
      </dialog>
    </div>
  )
}
