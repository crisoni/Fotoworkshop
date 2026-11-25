import { useRef, useState } from 'react'
import { Ikon } from './Ikon'
import { siFacebook } from './varumarken'
import './Dela.css'

// Dela-knapp på workshopsidan. Öppnar en dialog med länken, Kopiera och delning via Facebook eller e-post.
export function Dela({ titel }) {
  const dialog = useRef(null)
  const falt = useRef(null)
  const [kopierad, setKopierad] = useState(false)
  const url = typeof window === 'undefined' ? '' : window.location.origin + window.location.pathname

  function oppna() {
    setKopierad(false)
    dialog.current?.showModal()
  }

  async function kopiera() {
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      falt.current?.select()
      document.execCommand?.('copy')
    }
    setKopierad(true)
  }

  const epost = `mailto:?subject=${encodeURIComponent(`Fotoworkshop: ${titel}`)}&body=${encodeURIComponent(`Kolla in den här fotoworkshoppen hos Ljusrum:\n${url}`)}`
  const facebook = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`

  return (
    <>
      <button type="button" className="icon-button dela-knapp" onClick={oppna}>
        <Ikon namn="dela" size={22} />
        <span className="visually-hidden">Dela workshoppen</span>
      </button>

      <dialog
        ref={dialog}
        className="dela"
        aria-labelledby="dela-rubrik"
        onClick={(e) => { if (e.target === dialog.current) dialog.current.close() }}
      >
        <div className="dela__huvud">
          <h2 id="dela-rubrik">Dela workshoppen</h2>
          <button type="button" className="icon-button" onClick={() => dialog.current?.close()}>
            <Ikon namn="stang" size={24} />
            <span className="visually-hidden">Stäng</span>
          </button>
        </div>
        <div className="dela__rad">
          <label htmlFor="dela-lank" className="visually-hidden">Länk till workshoppen</label>
          <input id="dela-lank" ref={falt} readOnly value={url} onFocus={(e) => e.target.select()} />
          <button type="button" className="button" onClick={kopiera}>{kopierad ? 'Kopierad' : 'Kopiera'}</button>
        </div>
        <p className="visually-hidden" role="status">{kopierad ? 'Länken är kopierad' : ''}</p>
        <div className="dela__kanaler">
          <a className="dela__kanal" href={facebook} target="_blank" rel="noopener noreferrer">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false"><path d={siFacebook.path} /></svg>
            <span className="visually-hidden">Dela på Facebook (öppnas i ny flik)</span>
          </a>
          <a className="dela__kanal" href={epost}>
            <Ikon namn="kuvert" />
            <span className="visually-hidden">Dela via e-post</span>
          </a>
        </div>
      </dialog>
    </>
  )
}
