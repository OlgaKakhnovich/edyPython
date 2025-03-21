import { useState, useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import StartPage from './pages/StartPage';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import { useAuthContext } from './context/AuthContext';
import Loading from './components/LoadingBall';


function App() {

  const { authUser, isLoading } = useAuthContext();

  document.documentElement.className = "themes-root";

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className='h-screen flex items-center justify-center bg-base100'>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/home" element={authUser ? <Home /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to={"/home"} />} />
        <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to={"/home"} />} />
      </Routes>
    </div>
  )
}

export default App
