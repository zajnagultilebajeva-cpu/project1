import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../Firebase'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warn('Бардык талааларды толтуруңуз!')
      return
    }

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )

      localStorage.setItem('email', response.user.email)

      toast.success('Ийгиликтүү кирдиңиз!')

      setTimeout(() => {
        navigate('/')
        setEmail('')
        setPassword('')
      }, 1500)
    } catch (error) {
      console.error(error)
      toast.error('Мындай колдонуучу табылган жок же пароль ката!')
    }
  }
  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Башкаруу панели</h1>
        <input
          type="email"
          placeholder="Почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
        />

        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <button onClick={handleLogin} style={styles.button}>
          Кирүү
        </button>
      </div>

      <ToastContainer  autoClose={2000} />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '50vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
    padding: '20px',
    boxSizing: 'border-box',
  },

  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '22px',
    padding: '35px 25px',
    marginRight:'-40%',
    boxShadow: '0 5px 25px rgba(0,0,0,0.08)',
    border: '1px solid #ececec',
    boxSizing: 'border-box',
  },

  title: {
    margin: 0,
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: '700',
    color: '#111',
    fontFamily: '"Montserrat", sans-serif'
  },

  subtitle: {
    textAlign: 'center',
    color: '#777',
    marginTop: '10px',
    marginBottom: '30px',
    fontSize: '15px',
    lineHeight: '22px',
    fontFamily: '"Montserrat", sans-serif'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },

  input: {
    width: '100%',
    height: '56px',
    border: '1px solid #ddd',
    borderRadius: '14px',
    padding: '0 18px',
    fontSize: '16px',
    outline: 'none',
    background: '#fafafa',
    boxSizing: 'border-box',
    marginTop:'20px'
    
  },

  button: {
    width: '100%',
    height: '56px',
    border: 'none',
    borderRadius: '14px',
    background: '#111',
    color: '#fff',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
    marginTop:'20px'
  },
}


export default LoginPage