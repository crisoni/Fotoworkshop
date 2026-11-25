import { workshop, kartlank } from './data'

// "Lägg till i kalender" efter bokningen.
// .ics-filen fungerar i Apple Kalender, Outlook och Google Kalender.
// I filen anges tiden i UTC: 10:00–15:00 svensk vintertid är 09:00–14:00 UTC.
const tid = (datum, klocka) => `${datum.replace(/-/g, '')}T${klocka}00`
const rad = (s) => s.replace(/[,;\\]/g, (m) => `\\${m}`).replace(/\n/g, '\\n')

function beskrivning(bokning) {
  return `Bokningsnummer: ${bokning.nr}\nTa med: ${workshop.taMed}\nBetalas på plats: ${workshop.pris} kr\nVägbeskrivning: ${kartlank}`
}

export function laddaNerKalenderfil(bokning, tillfalle) {
  const innehall = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Ljusrum//Bokning//SV',
    'CALSCALE:GREGORIAN',
    'BEGIN:VEVENT',
    `UID:${bokning.nr}-${tillfalle.id}@ljusrum.se`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART:${tid(tillfalle.datum, '0900')}Z`,
    `DTEND:${tid(tillfalle.datum, '1400')}Z`,
    `SUMMARY:${rad(`Fotoworkshop: ${workshop.titel}`)}`,
    `LOCATION:${rad(workshop.adress)}`,
    `DESCRIPTION:${rad(beskrivning(bokning))}`,
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Fotoworkshop i morgon. Ladda kamerabatteriet.',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')
  const url = URL.createObjectURL(new Blob([innehall], { type: 'text/calendar;charset=utf-8' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `ljusrum-${tillfalle.id}.ics`
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function googleKalenderlank(bokning, tillfalle) {
  const p = new URLSearchParams({
    action: 'TEMPLATE',
    text: `Fotoworkshop: ${workshop.titel}`,
    dates: `${tid(tillfalle.datum, '1000')}/${tid(tillfalle.datum, '1500')}`,
    ctz: 'Europe/Stockholm',
    location: workshop.adress,
    details: beskrivning(bokning),
  })
  return `https://calendar.google.com/calendar/render?${p}`
}
