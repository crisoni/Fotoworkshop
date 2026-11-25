import { useEffect, useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Webbplats } from '../components/Webbplats'
import { Kalender } from '../components/Kalender'
import { Ikon } from '../components/Ikon'
import { useBokning, giltigEpost, utkastKlart, platserKvar, platserText } from '../bokningar'
import { workshop, workshopSokvag } from '../data'
import '../components/Deltagare.css'

export const Route = createFileRoute('/boka/')({
  component: Boka,
  head: () => ({ meta: [{ title: 'Boka workshop · Ljusrum' }] }),
})

// Steg 1 av 2: välj datum och tid, fyll i namn och e-post.
// Mobil: Välj datum → Välj tid → Dina uppgifter → Fortsätt. Datumet är det viktigaste valet,
// så det kommer först (ändrat efter design critique, Figma-ramarna 02–05 har uppgifterna först).
// Dator (ram D02–D05): kalender och tid till vänster, uppgifter och Fortsätt i ett kort till höger.
function Boka() {
  const { utkast, uppdatera, alla } = useBokning()
  const kvar = (id) => platserKvar(alla, id)
  const navigate = useNavigate()
  const [epostLamnad, setEpostLamnad] = useState(false)
  const klart = utkastKlart(utkast)
  const epostFel = epostLamnad && utkast.epost.trim() !== '' && !giltigEpost(utkast.epost)

  // "Ändra" på granskningssidan länkar hit med #datum eller #uppgifter
  useEffect(() => {
    const mal = window.location.hash.slice(1)
    if (!mal) return
    const el = document.getElementById(mal === 'datum' ? 'datum' : 'namn')
    if (el) {
      el.scrollIntoView({ block: 'center' })
      if (mal !== 'datum') el.focus()
    }
  }, [])

  function fortsatt(e) {
    e.preventDefault()
    if (klart) navigate({ to: '/boka/granska' })
  }

  return (
    <Webbplats>
      <form className="sida boka" onSubmit={fortsatt} noValidate>
        <div className="sidrubrik boka__rubrik">
          <div className="sidrubrik__rad">
            <Link to={workshopSokvag} className="tillbaka" aria-label="Tillbaka till workshopsidan">
              <Ikon namn="pil-vanster" size={24} />
            </Link>
            <h1>Boka workshop</h1>
          </div>
          <p className="caption">Steg 1 av 2 · {workshop.titel}</p>
        </div>

        <section className="boka__datum" aria-labelledby="datum-rubrik">
          <h2 className="boka__underrubrik" id="datum-rubrik">Välj datum</h2>
          <div id="datum" tabIndex={-1}>
            <Kalender
              vald={utkast.tillfalle}
              kvar={kvar}
              onValj={(id) => uppdatera({ tillfalle: id, tid: utkast.tid ?? null })}
            />
          </div>
        </section>

        <section className="boka__tid" aria-labelledby="tid-rubrik">
          <h2 className="boka__underrubrik" id="tid-rubrik">Välj tid</h2>
          {utkast.tillfalle ? (
            <div className="tider">
              <button
                type="button"
                className="tidval"
                aria-pressed={utkast.tid === workshop.tid}
                onClick={() => uppdatera({ tid: workshop.tid })}
              >
                {workshop.tid}
              </button>
              <p className={kvar(utkast.tillfalle) <= 3 ? 'platser platser--fa' : 'platser'}>
                {platserText(kvar(utkast.tillfalle))} av {workshop.maxDeltagare}
              </p>
            </div>
          ) : (
            <p className="caption">Välj ett datum för att se tider.</p>
          )}
        </section>

        <div className="boka__uppgifter">
          <h2 className="boka__underrubrik" id="uppgifter">Dina uppgifter</h2>
          <div className="boka__falt">
            <div className="falt">
              <label className="label" htmlFor="namn">Namn</label>
              <input
                id="namn"
                name="namn"
                autoComplete="name"
                placeholder="För- och efternamn"
                value={utkast.namn}
                onChange={(e) => uppdatera({ namn: e.target.value })}
              />
            </div>
            <div className="falt">
              <label className="label" htmlFor="epost">E-post</label>
              <input
                id="epost"
                name="epost"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="namn@exempel.se"
                value={utkast.epost}
                aria-invalid={epostFel}
                aria-describedby={epostFel ? 'epost-fel' : undefined}
                onChange={(e) => uppdatera({ epost: e.target.value })}
                onBlur={() => setEpostLamnad(true)}
              />
              {epostFel && <p id="epost-fel" className="falt__fel">Skriv en e-postadress, till exempel namn@exempel.se.</p>}
            </div>
          </div>
        </div>

        <div className="boka__handling">
          <button type="submit" className="button button--block" disabled={!klart}>Fortsätt</button>
          {!klart && (
            <p className="caption boka__hint">Fyll i namn och e-post och välj datum och tid för att fortsätta.</p>
          )}
        </div>
      </form>
    </Webbplats>
  )
}
