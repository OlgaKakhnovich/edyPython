import { useState, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import StartPage from './pages/StartPage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import { useAuthContext } from './context/AuthContext';
import Loading from './components/LoadingBall';
import { Toaster } from "react-hot-toast";
import LevelPage from './pages/LevelPage';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import FreeSpace from './pages/FreeSpace';
import "./index.css";
import { ProgressProvider } from './context/ProgressContext';


const Overlay = ({ sidebar, setSidebar }) => {
  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${sidebar ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setSidebar(false)}></div>
  )
}

function App() {

  const { authUser, isLoading } = useAuthContext();
  const location = useLocation();
  const [sidebar, setSidebar] = useState(false);

  const isAuthPage = ['/start', '/login', '/signup'].includes(location.pathname);

  if (isLoading) {
    return <Loading />
  }
  else {
    return (
      <ProgressProvider userId={authUser?.id}>
        <div className='h-screen flex items-center justify-center bg-base100'>
          <Routes>
            <Route path="/start" element={<StartPage />} />
            <Route path="/" element={authUser ? <Home /> : <Navigate to={"/start"} />} />
            <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={"/"} />} />
            <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to={"/"} />} />
            <Route path="/free_space_to_code" element={authUser ? <FreeSpace /> : <Navigate to={"/start"} />} />
            <Route path="/levels/:id" element={authUser ? <LevelPage /> : <Navigate to={"/start"} />} />

          </Routes>

          {!isAuthPage && (
            <>
              <Navbar sidebar={sidebar} setSidebar={setSidebar} />
              <Sidebar sidebar={sidebar} setSidebar={setSidebar} />
            </>
          )}
          <Overlay sidebar={sidebar} setSidebar={setSidebar} />
          <Toaster />
        </div>
      </ProgressProvider>
    )
  }
}

export default App
