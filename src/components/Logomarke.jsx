// Ljusrums logomärke (bländarformen) från Logo_LJUSRUM.svg, beskuret runt märket.
// Färgen följer currentColor, så märket kan vara lila på ljust och Lavender Haze på mörkt.
export function Logomarke({ size = 24, className = 'logomarke' }) {
  return (
    <svg className={className} width={size} height={size} viewBox="31 26 94 94" fill="currentColor" aria-hidden="true" focusable="false">
      <path d="M59.8 27.8L67.8 35.4C70.8 38.2 72.4 42 72.4 46.2C72.4 50.2 74 54 76.8 56.8L77.8 57.8L87 28" />
      <path d="M32.6 54.4L43.6 54C47.6 53.8 51.6 55.4 54.4 58.2C57.2 61 61 62.4 65 62.4H66.4L51.6 35" />
      <path d="M32.6 92.4L40 84.4C42.8 81.4 46.6 79.6 50.6 79.6C54.6 79.6 58.2 77.8 61 75L62 74L32 65.4" />
      <path d="M59.8 118.8L59.2 107.8C59 103.8 60.4 99.8 63.2 96.8C65.8 94 67.4 90 67.2 86.2V84.8L40 100.2" />
      <path d="M97.8 118L89.6 110.8C86.6 108.2 84.8 104.4 84.6 100.2C84.4 96.2 82.6 92.6 79.8 89.8L78.8 88.8L70.8 119" />
      <path d="M123.8 90.2L112.8 91C108.8 91.4 104.8 90 101.8 87.2C98.8 84.6 95 83.2 91 83.4H89.6L105.6 110.2" />
      <path d="M122 52.4L115 60.8C112.4 63.8 108.6 65.8 104.6 66C100.6 66.2 97 68 94.4 71L93.6 72L124 79.2" />
      <path d="M93.8 27L94.8 38C95.2 42 94 46 91.2 49.2C88.6 52.2 87.4 56 87.6 60L87.8 61.4L114.2 44.8" />
    </svg>
  )
}
