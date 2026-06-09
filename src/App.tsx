import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { Suspense } from 'react';
import { LoadingSpinner } from './components/ui';


export default function App() {
  return (
    <Suspense fallback={<LoadingSpinner fullPage />}>
      <RouterProvider router={router} />
    </Suspense>
  )
}