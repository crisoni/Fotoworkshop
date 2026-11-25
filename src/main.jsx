// Gemensamma stilar först, så att komponenternas egna CSS-filer kan bygga vidare på dem.
import './styles.css'
import { createRoot } from 'react-dom/client'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree, scrollRestoration: true })
createRoot(document.getElementById('root')).render(<RouterProvider router={router} />)
