import { lazy, Suspense, useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import { Protectedroute } from './routes/protectedroute'
import PageLoader from './components/pageLoader'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import NotFound from './pages/notFoundPage'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  const [count, setCount] = useState(0)
 const Dashboard = lazy(()=>import('../src/pages/Dashboard'));
 const Task = lazy(()=>import('../src/pages/Task'));
 const Profile = lazy(()=>import('../src/pages/profile'));
 const query = new QueryClient();
  return (
    <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <Toaster richColors position="top-right" />

    <BrowserRouter>
    <QueryClientProvider client={query}>
    <Suspense fallback={<PageLoader/>}>
    <Routes>
      <Route path='' element={<Register/>}/>
      <Route element={<Protectedroute/>}>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/tasks' element={<Task/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='*' element={<NotFound/>}/>
      </Route>
    </Routes>
    </Suspense>
    </QueryClientProvider>
    </BrowserRouter>
    </GoogleOAuthProvider>
    </>
  )
}

export default App
