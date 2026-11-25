import { useState } from 'react'
import { Ikon } from './Ikon'
import './WorkshopCard.css'

// Workshopens introduktion: bild, rubrik, betyg och infrader för datum, tid och plats.
// Byggd från ramen "01 Kurssida – alternativ B" (mobil) och "D01 Workshopsida – dator" i Figma.
export function WorkshopCard({
  title = 'Ta kontroll över din kamera',
  date = 'Lördagar 14, 21 och 28 november 2026',
  time = 'Kl 10:00–15:00',
  place = 'Södermalm & utomhus i närheten',
  rating = '4,9/5',
  reviews = 32,
  image = '/bilder/kamera.jpg',
  imageAlt = 'Händer som håller en analog systemkamera framför ansiktet',
  headingLevel = 1,
  titelTillagg = null,
}) {
  const Rubrik = `h${headingLevel}`
  return (
    <article className="workshop-card">
      <Bild src={image} alt={imageAlt} />
      <div className="workshop-card__text">
        <div className="workshop-card__titelrad">
          <Rubrik className="workshop-card__titel">{title}</Rubrik>
          {titelTillagg}
        </div>
        {rating && (
          <p className="workshop-card__betyg">
            <span className="workshop-card__stjarnor" aria-hidden="true">
              {[0, 1, 2, 3, 4].map((i) => <Ikon key={i} namn="stjarna" size={16} />)}
            </span>
            <span>
              <span className="visually-hidden">Betyg </span>
              {rating} · {reviews} omdömen
            </span>
          </p>
        )}
        <ul className="info-list workshop-card__info">
          <li className="info-row"><Ikon namn="kalender" /><span>{date}</span></li>
          <li className="info-row"><Ikon namn="klocka" /><span>{time}</span></li>
          <li className="info-row"><Ikon namn="plats" /><span>{place}</span></li>
        </ul>
      </div>
    </article>
  )
}

// Om bildfilen saknas visas en neutral yta i stället för en trasig bild.
function Bild({ src, alt }) {
  const [saknas, setSaknas] = useState(false)
  if (saknas) {
    return (
      <div className="workshop-card__bild workshop-card__bild--saknas" role="img" aria-label={alt}>
        <Ikon namn="kamera" size={40} />
      </div>
    )
  }
  return <img className="workshop-card__bild" src={src} alt={alt} onError={() => setSaknas(true)} />
}
