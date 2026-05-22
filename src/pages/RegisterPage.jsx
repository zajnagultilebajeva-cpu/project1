import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../Firebase'
import { ToastContainer, toast } from 'react-toastify';

const RegisterPage = () => {
  const [email, setEmail] = useState('zajnagultilebajeva@gmail.com')
  const [password, setPassword] = useState('kepka_jsx')
  const [secretKey, setSecretKey] = useState('') 
  const navigate = useNavigate()
  
  const MY_SECRET_KEY = "kepka_jsx" 

  const handleRegister = async () => {
    if (!email || !password || !secretKey) {
      toast.warn('Бардык талааларды толтуруңуз!')
      return
    }

    if (secretKey !== MY_SECRET_KEY) {
      toast.error('Каттоого уруксат жок! Секреттик код ката.')
      return
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success('Администратор ийгиликтүү катталды!');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (error) {
      console.error(error);
      if (error.code === 'auth/email-already-in-use') {
        toast.error('Бул почта буга чейин катталган!');
      } else if (error.code === 'auth/weak-password') {
        toast.error('Пароль өтө жөнөкөй! Кеминде 6 символ болушу керек.');
      } else {
        toast.error('Каттоо учурунда ката кетти: ' + error.message);
      }
    }
  }

  const styles = {
    container: {
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      padding: '20px'
    },
    card: {
      backgroundColor: '#ffffff',
      padding: '40px 30px',
      borderRadius: '16px',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%',
      maxWidth: '360px',
      alignItems: 'stretch'
    },
    title: {
      margin: '0 0 10px 0',
      textAlign: 'center',
      fontSize: '24px',
      fontWeight: '700',
      color: '#1a202c'
    },
    input: {
      padding: '12px 16px', 
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      fontSize: '14px',
      outline: 'none',
      transition: 'all 0.2s ease',
      backgroundColor: '#f8fafc',
    },
    secretInput: {
      padding: '12px 16px', 
      borderRadius: '8px',
      border: '2px dashed #ef4444',
      fontSize: '14px',
      outline: 'none',
      backgroundColor: '#fef2f2',
    },
    button: {
      padding: '12px', 
      cursor: 'pointer', 
      backgroundColor: '#4f46e5',
      color: 'white', 
      border: 'none', 
      borderRadius: '8px', 
      fontWeight: '600',
      fontSize: '16px',
      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
      transition: 'all 0.2s ease',
    },
    link: {
      textAlign: 'center',
      color: '#4f46e5',
      textDecoration: 'none',
      fontSize: '14px',
      fontWeight: '500',
      marginTop: '10px'
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Администратор</h2>
        
        <input 
          type='text' 
          placeholder='Электрондук почта' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />
        
        <input 
          type='password' 
          placeholder='Пароль'
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          onFocus={(e) => e.target.style.borderColor = '#4f46e5'}
          onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
        />

        <input 
          type='password' 
          placeholder='Секреттик кодду жазыңыз'
          value={secretKey} 
          onChange={(e) => setSecretKey(e.target.value)}
          style={styles.secretInput}
        />

        <button 
          onClick={handleRegister} 
          style={styles.button}
          onMouseOver={(e) => e.target.style.backgroundColor = '#4338ca'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#4f46e5'}
        >
          Каттоо
        </button>
        
        <Link to={'/login'} style={styles.link}>Кирүү барагына өтүү</Link>
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default RegisterPage