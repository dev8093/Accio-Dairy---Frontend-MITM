import React,{useEffect} from 'react'
import Navbar from "./components/Navbar"
import './index.css'
import {useSelector,useDispatch} from "react-redux"
import { checkAuth } from './redux/features/user.slice'
import { Routes,Route,Navigate } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
function App() {
  const dispatch = useDispatch()
useEffect(()=>{
  dispatch(checkAuth())
},[])
const {user} = useSelector(state=>state.user)
  return (
    <div>
      
      {/* <Navbar /> */}
      <Routes>
        <Route path='/' element={user?<HomePage/>:<Navigate to="/login" />}/>
        <Route path='/login' element={!user?<LoginPage/>:<Navigate to="/" />}/>
        <Route path='/register' element={!user?<SignupPage/>:<Navigate to="/" />}/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
