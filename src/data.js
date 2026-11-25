// Innehåll och exempeldata från casebladet "Boka en fotoworkshop".

export const workshop = {
  titel: 'Ta kontroll över din kamera',
  betyg: '4,9/5',
  omdomen: 32,
  tid: '10:00–15:00',
  plats: 'Södermalm & utomhus i närheten',
  platsLang: 'Ljusrum fotostudio på Södermalm i Stockholm och utomhus i närheten',
  // Ljusrum är påhittat, så adressen är en platshållare. Byt till en riktig adress om det behövs.
  adress: 'Ljusrum fotostudio, Södermalm, Stockholm',
  pris: 1200,
  maxDeltagare: 10,
  kortOm:
    'Ta kontroll över din kamera är en workshop för vuxna nybörjare som vill komma vidare från autoläget. Dagen innehåller korta genomgångar och praktiska fotoövningar, både inne och ute.',
  merOm:
    'Deltagarna får öva på bländare, slutartid, ISO, fokus, ljus och komposition. Inga tidigare fotokunskaper behövs.',
  forkunskaper:
    'Inga tidigare fotokunskaper behövs. Du behöver en egen kamera där du kan ställa in bländare, slutartid och ISO. Mobilkamera räcker inte. Extra objektiv och stativ behövs inte.',
  ingar: 'Handledning, övningsmaterial och fika. Lunch ingår inte.',
  taMedKort: 'Egen kamera, laddat batteri och minneskort.',
  taMed:
    'Egen kamera där det går att ställa in bländare, slutartid och ISO, laddat batteri och minneskort. Mobilkamera räcker inte. Extra objektiv och stativ behövs inte.',
  kladsel: 'Kläder efter väder.',
}

// Tillfällena. id används i adressen, t.ex. /admin/tillfalle/14-november
export const tillfallen = [
  { id: '14-november', dag: 14, datum: '2026-11-14', kort: '14 november', lang: 'Lördag 14 november', helt: 'Lördag 14 november 2026' },
  { id: '21-november', dag: 21, datum: '2026-11-21', kort: '21 november', lang: 'Lördag 21 november', helt: 'Lördag 21 november 2026' },
  { id: '28-november', dag: 28, datum: '2026-11-28', kort: '28 november', lang: 'Lördag 28 november', helt: 'Lördag 28 november 2026' },
]

export const tillfalleMedId = (id) => tillfallen.find((t) => t.id === id)
export const tillfalleMedDag = (dag) => tillfallen.find((t) => t.dag === dag)

// Förberedda bokningar. Alla är bekräftade och gäller en person, kl. 10–15, 1 200 kr.
export const exempelbokningar = [
  { nr: 'L101', tillfalle: '14-november', namn: 'Alma Lind', epost: 'alma.lind@example.com', bokad: '3 november 2026, 14:12' },
  { nr: 'L102', tillfalle: '14-november', namn: 'Robin Berg', epost: 'robin.berg@example.com', bokad: '4 november 2026, 09:30' },
  { nr: 'L103', tillfalle: '14-november', namn: 'Sam Ek', epost: 'sam.ek@example.com', bokad: '6 november 2026, 18:05' },
  { nr: 'L104', tillfalle: '21-november', namn: 'Kim Dahl', epost: 'kim.dahl@example.com', bokad: '8 november 2026, 11:47' },
  { nr: 'L105', tillfalle: '21-november', namn: 'Alex Holm', epost: 'alex.holm@example.com', bokad: '9 november 2026, 20:16' },
  { nr: 'L106', tillfalle: '28-november', namn: 'Noor Lund', epost: 'noor.lund@example.com', bokad: '10 november 2026, 07:58' },
]

export const formatPris = (kr) => `${kr.toLocaleString('sv-SE').replace(/ /g, ' ')} kr`

// Länk till kartan för vägbeskrivning
export const kartlank = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(workshop.adress)}`
