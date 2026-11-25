import { Ikon } from './Ikon'
import { workshop } from '../data'

// "Inför dagen": ersätter rutan Viktig information.
// Kamerakravet är det som oftast missas, så det står först som en varning.
// Det man ska ta med blir en checklista, och det som ingår (och inte ingår) blir brickor.
export function InforDagen({ rubrikId = 'infor-dagen', rubrikKlass }) {
  return (
    <section className="infor-dagen" aria-labelledby={rubrikId}>
      <h2 id={rubrikId} className={rubrikKlass}>Inför dagen</h2>

      <div className="infor-dagen__varning">
        <Ikon namn="varning" size={22} />
        <p><strong>Egen kamera krävs.</strong> {workshop.kameraKrav}</p>
      </div>

      <div className="infor-dagen__grupp">
        <h3 className="label">Packa också</h3>
        <ul className="infor-dagen__lista">
          {workshop.checklista.map((sak) => (
            <li key={sak}><Ikon namn="bock-cirkel" />{sak}</li>
          ))}
        </ul>
        <p className="caption">{workshop.behovsInte}</p>
      </div>

      <div className="infor-dagen__grupp">
        <h3 className="label">Ingår</h3>
        <ul className="infor-dagen__ingar">
          {workshop.ingarLista.map(([sak, ikon]) => (
            <li key={sak}><Ikon namn={ikon} size={22} />{sak}</li>
          ))}
          <li className="infor-dagen__ingar--inte"><Ikon namn="bestick" size={22} />Ingen {workshop.ingarInte.toLowerCase()}</li>
        </ul>
      </div>
    </section>
  )
}
