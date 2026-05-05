import { useState, useEffect} from 'react'
import Header from './components/Header'
import Main from './components/MainPage'
import {Routes, Route} from 'react-router-dom'
import Footer from './components/Footer'
import DetailPage from './pages/DetailPage'
import CartPage from './pages/CartPage'
import Map from './pages/Map'
import AboutUsPage from './pages/AboutUsPage'
import MainPage from './components/MainPage'
import TypePage from './pages/TypePage'
import AuthPage from './pages/AuthPage'
import BasePage from './pages/BasePage'


function App() {
  const [search, setSearch] = useState("")
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode)
  }, [darkMode])
  return (
    < >
      <div className={darkMode ? "dark" : "light"} >
      
      <Header search={search} 
              setSearch={setSearch}  
              darkMode={darkMode}   
              setDarkMode={setDarkMode}/>
      <Routes>
          <Route path='/' element={<MainPage  search={search} darkMode={darkMode}/>}/>
          <Route path='/detail/:id' element={<DetailPage darkMode={darkMode}/>}/>
          <Route path='/cart' element={<CartPage darkMode={darkMode}/>}/>
          <Route path='/about' element={<AboutUsPage darkMode={darkMode}/>}/>
          <Route path='/map' element={<Map darkMode={darkMode}/>}/>
          <Route path='/types' element={<TypePage darkMode={darkMode}/>} />
          <Route path='/auth' element={<AuthPage darkMode={darkMode}/>} />
          <Route path='/base' element={<BasePage darkMode={darkMode}/>}/>
      </Routes>
      <Footer darkMode={darkMode}/>
    </div>
    </>
  )
}

export default App
