import { createFileRoute, Outlet } from '@tanstack/react-router'
import { AdminLayout } from '../components/AdminLayout'

// Arrangörens adminsida. Arrangören antas redan vara inloggad (casebladet).
// Sidorna under /admin delar sidomeny och toppfält.
export const Route = createFileRoute('/admin')({
  component: Admin,
  head: () => ({ meta: [{ title: 'Bokningar · Ljusrum admin' }] }),
})

function Admin() {
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  )
}
