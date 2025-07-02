import React, { useEffect } from 'react'
import { Routes,Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'
import {Loader} from "lucide-react"
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import themes from 'daisyui/theme/object'
import { useThemeStore } from './store/useTheme.js'
import {Toaster} from "react-hot-toast"
import { useAuthStore } from './store/useAuth'


const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[])
  useEffect(()=>{
    setTheme()
  },[])
  const{chatTheme,setTheme}=useThemeStore()
  
  if(isCheckingAuth && !authUser){
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"></Loader>
    </div>
  }
  
  return (
    <div data-theme={chatTheme}  >
    <Navbar/>

     <Routes>
      <Route path='/' element={authUser?<HomePage/>:<Navigate to="/login" ></Navigate>} ></Route>
      <Route path='/signup' element={!authUser?<SignUp/>:<Navigate to="/" ></Navigate>} ></Route>
      <Route path='/login' element={!authUser?<LoginPage/>:<Navigate to="/" />} ></Route>
      <Route path='/settings' element={<SettingsPage/>} ></Route>
      <Route path='/profile' element={authUser?<ProfilePage/>:<Navigate to="/login" />} ></Route>
     </Routes>

     <Toaster/>
     </div>
  )
}

export default App