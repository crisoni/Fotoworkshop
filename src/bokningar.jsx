import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { exempelbokningar, workshop } from './data'

// Delat tillstånd för bokningsflödet och adminsidan.
// Utkastet sparas i sessionStorage så att sidan klarar en omladdning mitt i bokningen.
// Bekräftade bokningar sparas i localStorage i den här webbläsaren, så att en bokning
// som görs på webbplatsen också syns i adminvyn. Ingen server, ingen riktig betalning.

const UTKAST = 'ljusrum.utkast'
const EGNA = 'ljusrum.bokningar'
const SENASTE = 'ljusrum.senaste'

const tomtUtkast = { tillfalle: null, tid: null, namn: '', epost: '' }

function las(lagring, nyckel, standard) {
  try {
    const v = lagring.getItem(nyckel)
    return v ? JSON.parse(v) : standard
  } catch {
    return standard
  }
}
function spara(lagring, nyckel, varde) {
  try { lagring.setItem(nyckel, JSON.stringify(varde)) } catch { /* privat läge e.d. */ }
}

const ses = () => (typeof window === 'undefined' ? null : window.sessionStorage)
const lok = () => (typeof window === 'undefined' ? null : window.localStorage)

const Bokningskontext = createContext(null)

export function BokningProvider({ children }) {
  const [utkast, setUtkast] = useState(() => las(ses(), UTKAST, tomtUtkast))
  const [egna, setEgna] = useState(() => las(lok(), EGNA, []))
  const [senaste, setSenaste] = useState(() => las(ses(), SENASTE, null))

  useEffect(() => { spara(ses(), UTKAST, utkast) }, [utkast])
  useEffect(() => { spara(lok(), EGNA, egna) }, [egna])
  useEffect(() => { spara(ses(), SENASTE, senaste) }, [senaste])

  const varde = useMemo(() => {
    const alla = [...exempelbokningar, ...egna]
    return {
      utkast,
      uppdatera: (andring) => setUtkast((u) => ({ ...u, ...andring })),
      alla,
      senaste,
      bekrafta: () => {
        const storsta = Math.max(...alla.map((b) => Number(b.nr.slice(1))))
        const nu = new Date()
        const ny = {
          nr: `L${storsta + 1}`,
          tillfalle: utkast.tillfalle,
          namn: utkast.namn.trim(),
          epost: utkast.epost.trim(),
          bokad: `${nu.toLocaleDateString('sv-SE', { day: 'numeric', month: 'long', year: 'numeric' })}, ${nu.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}`,
        }
        setEgna((e) => [...e, ny])
        setSenaste(ny)
        setUtkast(tomtUtkast)
        return ny
      },
    }
  }, [utkast, egna, senaste])

  return <Bokningskontext.Provider value={varde}>{children}</Bokningskontext.Provider>
}

export function useBokning() {
  const v = useContext(Bokningskontext)
  if (!v) throw new Error('useBokning måste användas inuti BokningProvider')
  return v
}

export const giltigEpost = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim())
export const utkastKlart = (u) => Boolean(u.tillfalle && u.tid && u.namn.trim() && giltigEpost(u.epost))

// Sökning i adminvyn: bokningsnummer, namn eller e-post
export function matchar(bokning, q) {
  if (!q) return true
  const s = q.trim().toLowerCase()
  return [bokning.nr, bokning.namn, bokning.epost].some((v) => v.toLowerCase().includes(s))
}

// Lediga platser på ett tillfälle (högst 10 deltagare)
export const platserKvar = (alla, tillfalleId) =>
  Math.max(0, workshop.maxDeltagare - alla.filter((b) => b.tillfalle === tillfalleId).length)
export const platserText = (n) => (n === 0 ? 'Fullbokat' : n === 1 ? '1 plats kvar' : `${n} platser kvar`)
