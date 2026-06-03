// import { useState, useEffect} from 'react'
// import Header from './components/Header'
// import Main from './components/MainPage'
// import {Routes, Route} from 'react-router-dom'
// import Footer from './components/Footer'
// import DetailPage from './pages/DetailPage'
// import CartPage from './pages/CartPage'
// import Map from './pages/Map'
// import AboutUsPage from './pages/AboutUsPage'
// import MainPage from './components/MainPage'
// import TypePage from './pages/TypePage'
// import AuthPage from './pages/AuthPage'
// import BasePage from './pages/BasePage'
// import RegisterPage from './pages/RegisterPage'

// function App() {
//   const [search, setSearch] = useState("")
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     document.body.classList.toggle("dark", darkMode)
//   }, [darkMode])
//   return (
//     < >
//       <div className={darkMode ? "dark" : "light"} >
      
//       <Header search={search} 
//               setSearch={setSearch}  
//               darkMode={darkMode}   
//               setDarkMode={setDarkMode}/>
//       <Routes>
//           <Route path='/' element={<MainPage  search={search} darkMode={darkMode}/>}/>
//           <Route path='/detail/:id' element={<DetailPage darkMode={darkMode}/>}/>
//           <Route path='/cart' element={<CartPage darkMode={darkMode}/>}/>
//           <Route path='/about' element={<AboutUsPage darkMode={darkMode}/>}/>
//           <Route path='/map' element={<Map darkMode={darkMode}/>}/>
//           <Route path='/types' element={<TypePage darkMode={darkMode}/>} />
//           <Route path='/auth' element={<AuthPage darkMode={darkMode}/>} />
//           <Route path='/base' element={<BasePage darkMode={darkMode}/>}/>
//           <Route path="/register" element={<RegisterPage />} />
          
//       </Routes>
//       <Footer darkMode={darkMode}/>
//     </div>
//     </>
//   )
// }

// export default App

import React, { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import Header from './components/Header'
import MainPage from './components/MainPage'
import Footer from './components/Footer'
import DetailPage from './pages/DetailPage'
import CartPage from './pages/CartPage'
import Map from './pages/Map'
import AboutUsPage from './pages/AboutUsPage'
import TypePage from './pages/TypePage'
import AuthPage from './pages/AuthPage' 
import BasePage from './pages/BasePage'
import LoginPage from './pages/LoginPage'
import CreateProduct from './pages/CreateProduct'
import EditProduct from './pages/EditProduct'
import CircularProgress from '@mui/material/CircularProgress'
import AdminOrders from './pages/AdminOrders'

function App() {
  const [search, setSearch] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [role, setRole] = useState(null)
  
  const currentEmail = localStorage.getItem("email")
  const isAdmin = role === "admin" || currentEmail === "zajnagultilebajeva@gmail.com"
  
  useEffect(() => {
    document.body.classList.toggle("dark", darkMode)
    
    const loggedInUser = localStorage.getItem("currentUser")
    if (loggedInUser) {
      const parsedUser = JSON.parse(loggedInUser)
      setUser(parsedUser)
      setRole(parsedUser.role || "user")
    } else {
      setUser(null)
      setRole(null)
    }
    
    setLoading(false)
  }, [darkMode])

  if (loading) 
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh'}}>
       <CircularProgress size="3rem" aria-label="Loading…" />
    </div>

  return (
    <div className={darkMode ? "dark" : "light"}>
      <Header search={search} setSearch={setSearch} darkMode={darkMode} setDarkMode={setDarkMode} isAdmin={isAdmin}/>
      
      <Routes>
        <Route path='/' element={<MainPage darkMode={darkMode} isAdmin={isAdmin} />} />
        <Route path='/detail/:id' element={<DetailPage darkMode={darkMode}/>}/>
        <Route path='/cart' element={<CartPage darkMode={darkMode}/>}/>
        <Route path='/about' element={<AboutUsPage darkMode={darkMode}/>}/>
        <Route path='/map' element={<Map darkMode={darkMode}/>}/>
        <Route path='/types' element={<TypePage darkMode={darkMode}/>} />
        <Route path='/auth' element={<AuthPage darkMode={darkMode}/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path="/base" element={isAdmin ? <BasePage darkMode={darkMode} /> : <Navigate to="/" />}/>
        <Route path='/create' element={isAdmin ? <CreateProduct />: <Navigate to="/" />} />
        <Route path='/edit/:id' element={isAdmin ? <EditProduct /> : <Navigate to="/" />} />
        <Route path="/admin" element={<AdminOrders darkMode={darkMode}/>} />
      </Routes>
      

      <Footer darkMode={darkMode}/>
    </div>
  )
}

export default App