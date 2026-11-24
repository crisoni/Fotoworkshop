import { WorkshopCard } from './WorkshopCard'

export default {
  title: 'Komponenter/Workshopkort',
  component: WorkshopCard,
  args: {
    title: 'Ta kontroll över din kamera',
    date: 'Lördagar 14, 21 och 28 november 2026',
    time: 'Kl 10:00–15:00',
    place: 'Södermalm & utomhus i närheten',
    rating: '4,9/5',
    reviews: 32,
  },
  argTypes: {
    title: { control: 'text', name: 'Rubrik' },
    date: { control: 'text', name: 'Datum' },
    time: { control: 'text', name: 'Tid' },
    place: { control: 'text', name: 'Plats' },
    rating: { control: 'text', name: 'Betyg' },
    reviews: { control: 'number', name: 'Antal omdömen' },
    image: { table: { disable: true } },
    imageAlt: { table: { disable: true } },
    headingLevel: { table: { disable: true } },
  },
  decorators: [(Story) => <div style={{ padding: '0 24px', maxWidth: '44rem' }}><Story /></div>],
}

export const Standard = {}

export const LangRubrik = {
  name: 'Lång rubrik i smal vy',
  args: { title: 'Ta kontroll över din kamera – grundkurs i bländare, slutartid och ISO för vuxna nybörjare' },
  decorators: [(Story) => <div style={{ maxWidth: '22rem' }}><Story /></div>],
}

export const UtanBetyg = {
  name: 'Utan betyg',
  args: { rating: '' },
}
