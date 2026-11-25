import { createRootRoute, HeadContent, Link, Outlet } from '@tanstack/react-router'
import { BokningProvider } from '../bokningar'

export const Route = createRootRoute({
  component: Layout,
  head: () => ({ meta: [{ title: 'Ljusrum · Fotoworkshoppar i Stockholm' }] }),
  notFoundComponent: SidanFinnsInte,
})

// Besökarnas sidor och adminsidan har var sitt utseende (Webbplats och AdminLayout),
// så roten håller bara det delade bokningstillståndet.
function Layout() {
  return (
    <BokningProvider>
      <HeadContent />
      <Outlet />
    </BokningProvider>
  )
}

function SidanFinnsInte() {
  return (
    <main style={{ padding: '4rem 1.5rem', maxWidth: '40rem', margin: '0 auto', display: 'grid', gap: '1rem' }}>
      <h1>Sidan finns inte</h1>
      <p>Adressen kan vara felstavad eller sidan flyttad.</p>
      <p><Link to="/">Till startsidan</Link></p>
    </main>
  )
}
