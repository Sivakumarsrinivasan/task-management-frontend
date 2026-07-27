import { lazy, Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { Protectedroute } from './routes/protectedroute'
import PageLoader from './components/pageLoader'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

function App() {
  const [count, setCount] = useState(0)
 const Dashboard = lazy(()=>import('../src/pages/Dashboard'));
 const query = new QueryClient();
  return (
    <>
          <Toaster richColors position="top-right" />

    <BrowserRouter>
    <QueryClientProvider client={query}>
    <Suspense fallback={<PageLoader/>}>
    <Routes>
      <Route path='' element={<Register/>}/>
      <Route element={<Protectedroute/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      </Route>
    </Routes>
    </Suspense>
    </QueryClientProvider>
    </BrowserRouter>
    </>
  )
}

export default App
