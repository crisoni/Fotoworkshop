import { Ikon } from './Ikon'
import { tillfallen } from '../data'

// Månadsvy för november 2026. Veckan börjar på måndag.
// Workshopdatum (lördagar 14, 21, 28) är valbara, övriga dagar går inte att välja.
const veckodagar = ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön']
const forstaVeckodag = 6 // 1 november 2026 är en söndag (index 6 när måndag = 0)
const dagarIManaden = 30

export function Kalender({ vald, onValj }) {
  const celler = [
    ...Array.from({ length: forstaVeckodag }, () => null),
    ...Array.from({ length: dagarIManaden }, (_, i) => i + 1),
  ]
  while (celler.length % 7) celler.push(null)
  const veckor = Array.from({ length: celler.length / 7 }, (_, i) => celler.slice(i * 7, i * 7 + 7))

  return (
    <div className="card kalender">
      <div className="kalender__manad">
        <button type="button" className="icon-button" disabled aria-label="Föregående månad (inga tillfällen)">
          <Ikon namn="vinkel-vanster" size={24} />
        </button>
        <p className="kalender__manadsnamn" id="kalender-manad">November 2026</p>
        <button type="button" className="icon-button" disabled aria-label="Nästa månad (inga tillfällen)">
          <Ikon namn="vinkel-hoger" size={24} />
        </button>
      </div>
      <table className="kalender__tabell" aria-labelledby="kalender-manad">
        <thead>
          <tr>{veckodagar.map((d) => <th key={d} scope="col" className="label">{d}</th>)}</tr>
        </thead>
        <tbody>
          {veckor.map((vecka, i) => (
            <tr key={i}>
              {vecka.map((dag, j) => {
                if (!dag) return <td key={j} />
                const tillfalle = tillfallen.find((t) => t.dag === dag)
                if (!tillfalle) {
                  return <td key={j}><span className="kalender__dag kalender__dag--inaktiv">{dag}</span></td>
                }
                const arVald = vald === tillfalle.id
                return (
                  <td key={j}>
                    <button
                      type="button"
                      className={arVald ? 'kalender__dag kalender__dag--vald' : 'kalender__dag kalender__dag--ledig'}
                      aria-pressed={arVald}
                      aria-label={tillfalle.helt}
                      onClick={() => onValj(tillfalle.id)}
                    >
                      {dag}
                    </button>
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
