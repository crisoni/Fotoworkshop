import { useRef } from 'react'
import { Ikon } from './Ikon'

// Sökfält med egen töm-knapp i stället för webbläsarens lilla kryss.
// Knappen syns bara när det står något, går att nå med Tab och har ett namn för skärmläsare.
// Efter tömning står markören kvar i fältet.
export function Sokfalt({ id, label, placeholder, value, onChange, onSubmit, inputRef, className = '', enterKeyHint }) {
  const egen = useRef(null)
  const falt = inputRef ?? egen
  const Ram = onSubmit ? 'form' : 'div'
  const ramProps = onSubmit ? { role: 'search', onSubmit } : {}

  return (
    <Ram className={`search-field ${className}`.trim()} {...ramProps}>
      <Ikon namn="sok" />
      <label htmlFor={id} className="visually-hidden">{label}</label>
      <input
        ref={falt}
        id={id}
        type="search"
        enterKeyHint={enterKeyHint}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          type="button"
          className="search-field__tom"
          onClick={() => { onChange(''); falt.current?.focus() }}
        >
          <Ikon namn="stang" size={18} />
          <span className="visually-hidden">Töm sökfältet</span>
        </button>
      )}
    </Ram>
  )
}
