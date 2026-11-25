import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useRouterState } from '@tanstack/react-router'
import { Ikon } from './Ikon'
import { Logomarke } from './Logomarke'
import './Admin.css'

// Menyval och knappar som ingår i designen men inte i uppgiften (avgränsningen i casebladet)
// visas som inaktiva, så att ingen tror att de ska fungera.

const meny = [
  { namn: 'Dashboard', ikon: 'appar' },
  { namn: 'Workshops', ikon: 'kamera' },
  { namn: 'Lärare', ikon: 'mossa' },
  { namn: 'Bokningar', ikon: 'kalender', till: '/admin' },
  { namn: 'Betalningar', ikon: 'kort' },
]
const menyBotten = [
  { namn: 'Support', ikon: 'fraga' },
  { namn: 'Inställningar', ikon: 'installningar' },
]

function Menyval({ val }) {
  if (val.till) {
    return (
      <Link to={val.till} className="adm-meny__val adm-meny__val--aktiv" aria-current="page">
        <Ikon namn={val.ikon} />
        <span>{val.namn}</span>
      </Link>
    )
  }
  return (
    <span className="adm-meny__val adm-meny__val--inaktiv" aria-disabled="true" title="Ingår inte i den här versionen">
      <Ikon namn={val.ikon} />
      <span>{val.namn}<span className="visually-hidden"> (ingår inte)</span></span>
    </span>
  )
}

// Sidomeny (264 px) och toppfält (72 px) på dator. På mobil: toppfält med logotyp,
// användare och meny-knapp som öppnar sidomenyn som en panel.
export function AdminLayout({ children }) {
  const [menyOppen, setMenyOppen] = useState(false)
  const [sok, setSok] = useState('')
  const navigate = useNavigate()
  const sokvag = useRouterState({ select: (s) => s.location.href })
  const menyknapp = useRef(null)
  const stangknapp = useRef(null)
  const varOppen = useRef(false)
  useEffect(() => setMenyOppen(false), [sokvag])

  // Mobilpanelen: fokus flyttas in när den öppnas och tillbaka till menyknappen när den stängs.
  // Resten av sidan är inert medan panelen är öppen, så Tab stannar i panelen.
  useEffect(() => {
    if (menyOppen) {
      varOppen.current = true
      stangknapp.current?.focus()
      const stang = (e) => e.key === 'Escape' && setMenyOppen(false)
      window.addEventListener('keydown', stang)
      return () => window.removeEventListener('keydown', stang)
    }
    if (varOppen.current) {
      varOppen.current = false
      menyknapp.current?.focus()
    }
  }, [menyOppen])

  function sokAllt(e) {
    e.preventDefault()
    navigate({ to: '/admin', search: { vy: 'deltagare', q: sok.trim() || undefined } })
  }

  return (
    <div className="adm">
      <a className="skip-link" href="#adm-innehall" tabIndex={menyOppen ? -1 : undefined}>Hoppa till innehållet</a>

      <aside id="adm-sidomeny" className="adm-sidomeny" data-oppen={menyOppen} aria-label="Adminmeny">
        <div className="adm-sidomeny__topp">
          <div className="adm-logo">
            <Link to="/admin" className="adm-logo__text"><Logomarke size={26} />LJUSRUM</Link>
            <button ref={stangknapp} type="button" className="icon-button adm-sidomeny__stang" onClick={() => setMenyOppen(false)}>
              <Ikon namn="stang" size={24} />
              <span className="visually-hidden">Stäng menyn</span>
            </button>
          </div>
          <nav className="adm-meny" aria-label="Admin">
            {meny.map((v) => <Menyval key={v.namn} val={v} />)}
          </nav>
        </div>
        <nav className="adm-meny" aria-label="Hjälp och inställningar">
          {menyBotten.map((v) => <Menyval key={v.namn} val={v} />)}
        </nav>
      </aside>
      {menyOppen && <div className="adm-skugga" onClick={() => setMenyOppen(false)} aria-hidden="true" />}

      <div className="adm-huvudyta" inert={menyOppen || undefined}>
        <header className="adm-topp">
          <Link to="/admin" className="adm-topp__logo"><Logomarke size={26} />LJUSRUM</Link>
          <form role="search" className="search-field adm-topp__sok" onSubmit={sokAllt}>
            <Ikon namn="sok" />
            <label htmlFor="sok-allt" className="visually-hidden">Sök deltagare eller bokning</label>
            <input
              id="sok-allt"
              type="search"
              placeholder="Sök deltagare eller bokningsnr"
              value={sok}
              onChange={(e) => setSok(e.target.value)}
            />
          </form>
          <div className="adm-topp__hoger">
            <button type="button" className="icon-button adm-topp__ikon" disabled title="Ingår inte i den här versionen">
              <Ikon namn="fraga" /><span className="visually-hidden">Hjälp (ingår inte)</span>
            </button>
            <button type="button" className="icon-button adm-topp__ikon" disabled title="Ingår inte i den här versionen">
              <Ikon namn="notiser" /><span className="visually-hidden">Notiser (ingår inte)</span>
            </button>
            <span className="adm-topp__avdelare" aria-hidden="true" />
            <div className="adm-anvandare">
              <img src="/bilder/maja-holm.jpg" alt="" width="40" height="40" />
              <div className="adm-anvandare__namn">
                <span>Maja Holm</span>
                <span className="caption">Arrangör</span>
              </div>
              <Ikon namn="vinkel-ner" className="adm-anvandare__pil" />
            </div>
            <button
              type="button"
              ref={menyknapp}
              className="icon-button adm-topp__meny"
              aria-expanded={menyOppen}
              aria-controls="adm-sidomeny"
              onClick={() => setMenyOppen(true)}
            >
              <Ikon namn="meny" size={24} />
              <span className="visually-hidden">Öppna menyn</span>
            </button>
          </div>
        </header>
        <main id="adm-innehall" className="adm-innehall">{children}</main>
      </div>
    </div>
  )
}

// Tillbakalänk (pil + text i Aubergine)
export function Tillbakalank({ children, ...props }) {
  return (
    <Link className="adm-tillbaka" {...props}>
      <Ikon namn="pil-vanster" />
      <span>{children}</span>
    </Link>
  )
}

export function Statusbricka({ text = 'Bekräftad' }) {
  return (
    <span className="status"><Ikon namn="bock" size={16} />{text}</span>
  )
}
