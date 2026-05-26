import { Outlet } from 'react-router-dom'

export default function AppShell() {
  return (
    <div className="flex h-screen bg-base">
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  )
}