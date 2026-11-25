import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Webbplats } from '../components/Webbplats'
import { Ikon } from '../components/Ikon'
import { useBokning, platserKvar, platserText } from '../bokningar'
import { workshop, tillfallen, formatPris, workshopSokvag } from '../data'
import '../components/Start.css'

export const Route = createFileRoute('/')({
  component: Startsida,
})

// Startsidan. Stor bild med workshoppen till vänster och de tre tillfällena som kort till höger
// (inspirerat av en kursida med glaskort). Ett kort väljer datumet och går direkt till bokningen.
// Mobil: bilden överst, korten i en lista under.
function Startsida() {
  const { alla, uppdatera } = useBokning()
  const navigate = useNavigate()
  const totalt = String(tillfallen.length).padStart(2, '0')

  function valj(id) {
    uppdatera({ tillfalle: id })
    navigate({ to: '/boka' })
  }

  return (
    <Webbplats>
      <section className="start-hero" aria-labelledby="start-rubrik">
        <div className="start-hero__text">
          <p className="start-hero__over">Fotoworkshop · Lördagar i november</p>
          <h1 id="start-rubrik">{workshop.titel}</h1>
          <p className="start-hero__ingress">
            En dag för vuxna nybörjare som vill komma vidare från autoläget. Korta genomgångar och mycket övning, i studion och ute på Södermalm.
          </p>
          <div className="start-hero__knappar">
            <Link to="/boka" className="button start-knapp start-knapp--ljus">
              <Ikon namn="kalender" />Välj datum
            </Link>
            <Link to={workshopSokvag} className="button start-knapp start-knapp--glas">
              Om workshoppen<Ikon namn="vinkel-hoger" />
            </Link>
          </div>
          <p className="start-hero__fakta">
            <span>Kl {workshop.tid}</span>
            <span>{formatPris(workshop.pris)}</span>
            <span>Högst {workshop.maxDeltagare} deltagare</span>
          </p>
        </div>

        <div className="start-tillfallen">
          <h2 className="visually-hidden" id="start-tillfallen">Tillfällen</h2>
          <ul aria-labelledby="start-tillfallen">
            {tillfallen.map((t, i) => {
              const kvar = platserKvar(alla, t.id)
              return (
                <li key={t.id}>
                  <button type="button" className="start-kort" disabled={kvar === 0} onClick={() => valj(t.id)}>
                    <span className="start-kort__nr" aria-hidden="true">
                      {String(i + 1).padStart(2, '0')}<span>/{totalt}</span>
                    </span>
                    <span className="start-kort__datum">{t.lang}</span>
                    <span className="start-kort__platser">{platserText(kvar)}</span>
                    <span className="visually-hidden">, välj och boka</span>
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      </section>

      <section className="start-varfor" aria-labelledby="varfor-rubrik">
        <h2 id="varfor-rubrik">Därför Ljusrum</h2>
        <ul>
          <li>
            <Ikon namn="anvandare" size={28} />
            <h3>Små grupper</h3>
            <p>Högst {workshop.maxDeltagare} deltagare, så det finns tid för just dina frågor.</p>
          </li>
          <li>
            <Ikon namn="plats" size={28} />
            <h3>Inne och ute</h3>
            <p>Genomgångar i studion på Södermalm och övningar i ljuset utanför.</p>
          </li>
          <li>
            <Ikon namn="kamera" size={28} />
            <h3>Bort från autoläget</h3>
            <p>Bländare, slutartid, ISO, fokus, ljus och komposition. Inga förkunskaper behövs.</p>
          </li>
        </ul>
        <Link to={workshopSokvag} className="text-link">Läs allt om workshoppen<Ikon namn="vinkel-hoger" /></Link>
      </section>
    </Webbplats>
  )
}
