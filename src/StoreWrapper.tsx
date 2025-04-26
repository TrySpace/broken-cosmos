import { ReactNode } from 'react'

import {
  Outlet,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router'
import { RouterProvider } from 'react-router/dom'

type StoreWrapperProps = {
  children: ReactNode
}

function Routification({ children }) {
  const router = createBrowserRouter(
    createRoutesFromElements((
      <Route
        element={
          <Outlet />
        }
      >
        <Route path="*" element={<>{children}</>} />
      </Route>
    )),
    {}
  )
  return <RouterProvider router={router} />
}

export function StoreWrapper({ children }: StoreWrapperProps) {
  return (
    <Routification>{children}</Routification>
  )
}
