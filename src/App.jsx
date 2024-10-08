import { useDispatch} from 'react-redux'
import { useEffect, useState } from 'react'
import './App.css'
import authService from './appWrite/Auth'
import { login, logout } from './Store/auth'
import Header from './Component/Header/Header'
import Footer from './Component/Footer/Footer'
import { Outlet } from 'react-router-dom'

function App() {
  const [loading,setloading]=useState(true)
   const dispatch=useDispatch()
    useEffect(()=>{
      authService.getCurrentUser()
      .then((useData)=>{
        if (useData) {
          dispatch(login(useData))
          
        } else {
          dispatch(logout())
        }
        
      }).finally(()=>setloading(false))
    },)


  return !loading ? (
    <>
      <div className='min-h-screen flex flex-wrap content-between bg-white'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
     
    </>
  ):null
}

export default App
