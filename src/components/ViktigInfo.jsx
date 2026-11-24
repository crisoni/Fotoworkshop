import { workshop } from '../data'

// "Viktig information": vad som ingår, vad man tar med och klädsel.
// lang = true visar hela listan över vad man ska ta med (används på bekräftelsen).
export function ViktigInfo({ lang = false }) {
  return (
    <dl className="viktig-info__lista">
      <div><dt>Ingår:</dt> <dd>{workshop.ingar}</dd></div>
      <div><dt>Ta med:</dt> <dd>{lang ? workshop.taMed : workshop.taMedKort}</dd></div>
      <div><dt>Klädsel:</dt> <dd>{workshop.kladsel}</dd></div>
    </dl>
  )
}
