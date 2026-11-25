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

      <dl className="infor-dagen__ingar">
        <div>
          <dt>Ingår:</dt>
          <dd>
            <ul>
              {workshop.ingarLista.map((sak) => (
                <li key={sak}><Ikon namn="bock" size={16} className="infor-dagen__ja" />{sak}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt>Ingår inte:</dt>
          <dd>
            <ul>
              <li><Ikon namn="forbjuden" size={16} className="infor-dagen__nej" />{workshop.ingarInte}</li>
            </ul>
          </dd>
        </div>
      </dl>
    </section>
  )
}
