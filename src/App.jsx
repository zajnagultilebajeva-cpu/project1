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
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './Firebase'
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
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import CreateProduct from './pages/CreatProduct'


function App() {
  const [search, setSearch] = useState("")
  const [darkMode, setDarkMode] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isWelcomePage, setIsWelcomePage] = useState(true)
  const navigate = useNavigate()

  const isAdmin = !!user;

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode)
    
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [darkMode])

  if (loading) return <div style={{ textAlign: 'center', marginTop: '20%', fontSize: '20px' }}>ЖҮКТӨЛҮҮДӨ...</div>
  if (isWelcomePage) {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: darkMode ? '#111827' : '#f5f5f5',
        padding: '20px',
        boxSizing: 'border-box',
        fontFamily: 'sans-serif',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '480px',
          background: darkMode ? '#1f2937' : '#ffffff',
          borderRadius: '28px',
          padding: '45px 28px',
          boxShadow: darkMode
            ? '0 8px 30px rgba(0,0,0,0.4)'
            : '0 8px 30px rgba(0,0,0,0.08)',
          border: darkMode
            ? '1px solid #374151'
            : '1px solid #ececec',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: '36px',
            fontWeight: '700',
            margin: 0,
            color: darkMode ? '#fff' : '#111',
          }}
        >
          Кош келиңиз 👋
        </h1>

        <p
          style={{
            marginTop: '14px',
            marginBottom: '35px',
            color: darkMode ? '#9ca3af' : '#777',
            fontSize: '16px',
            lineHeight: '24px',
            fontFamily: '"Montserrat", sans-serif'
          }}
        >
          Улантуу үчүн багытты тандаңыз
        </p>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '18px',
          }}
        >
          <button
            onClick={() =>{
               setIsWelcomePage(false) 
               navigate("/")
            }}
            style={{
              width: '100%',
              height: '58px',
              border: 'none',
              borderRadius: '16px',
              background: '#111',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s',
              fontFamily: '"Montserrat", sans-serif'
            }}
          >
            🌐 Сайтка кирүү
          </button>

          <button
            onClick={() => {
              setIsWelcomePage(false)
              navigate('/login')
            }}
            style={{
              width: '100%',
              height: '58px',
              border: '1px solid #ddd',
              borderRadius: '16px',
              background: darkMode ? '#374151' : '#fff',
              color: darkMode ? '#fff' : '#111',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: '0.3s',
              fontFamily: '"Montserrat", sans-serif'
            }}
          >
            🛠️ Админка
          </button>
        </div>
      </div>
    </div>
  )
}
  return (
    <div className={darkMode ? "dark" : "light"}>
      <Header search={search} setSearch={setSearch} darkMode={darkMode} setDarkMode={setDarkMode}/>
      
      <Routes>
        <Route path='/' element={<MainPage search={search} darkMode={darkMode}/>}/>
        <Route path='/detail/:id' element={<DetailPage darkMode={darkMode}/>}/>
        <Route path='/cart' element={<CartPage darkMode={darkMode}/>}/>
        <Route path='/about' element={<AboutUsPage darkMode={darkMode}/>}/>
        <Route path='/map' element={<Map darkMode={darkMode}/>}/>
        <Route path='/types' element={<TypePage darkMode={darkMode}/>} />
        <Route path='/auth' element={<AuthPage darkMode={darkMode}/>} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/base' element={user ? <BasePage darkMode={darkMode}/> : <Navigate to="/login" />} />
        {/* <Route path='/creat' element={isAdmin? <CreateProduct />: <Navigate to="/" />} /> */}
      </Routes>

      <Footer darkMode={darkMode}/>
    </div>
  )
}

export default App