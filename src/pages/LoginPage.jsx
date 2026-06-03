import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { supabase } from '../supabase'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const ADMIN_EMAIL = "zajnagultilebajeva@gmail.com"
  const ADMIN_PASSWORD = "kepka.kg"

  const handleLogin = async () => {
    if (!email || !password) {
      toast.warn('Бардык талааларды толтуруңуз!')
      return
    }

    const trimmedEmail = email.trim().toLowerCase();

    try {
      if (trimmedEmail === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
        const { data: existingAdmin } = await supabase
          .from('users')
          .select('*')
          .eq('email', trimmedEmail)
          .maybeSingle();

        if (!existingAdmin) {
          await supabase
            .from('users')
            .insert([{ email: trimmedEmail, password: password, role: 'admin' }]);
        }

        localStorage.setItem('email', trimmedEmail);
        localStorage.setItem('currentUser', JSON.stringify({ role: 'admin', email: trimmedEmail }));
        
        toast.success('Куш келиңиз, Администратор!');
        setTimeout(() => {
          navigate('/base')
          window.location.reload()
        }, 1500);
        return;
      }

      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', trimmedEmail)
        .maybeSingle();

      if (error) {
        toast.error('Ката кетти: ' + error.message)
        return
      }

      if (user) {
        if (user.password === password) {
          localStorage.setItem('email', user.email);
          localStorage.setItem('currentUser', JSON.stringify({ role: user.role || 'user', email: user.email }));
          
          toast.success('Ийгиликтүү кирдиңиз!');
          setTimeout(() => {
            navigate('/')
            window.location.reload()
          }, 1500);
        } else {
          toast.error('Купуя сөз туура эмес!');
        }
      } else {
        const newUser = { email: trimmedEmail, password: password, role: 'user' };
        const { error: insertError } = await supabase
          .from('users')
          .insert([newUser]);

        if (insertError) {
          toast.error('Каттоодо ката кетти: ' + insertError.message);
          return;
        }

        localStorage.setItem('email', trimmedEmail);
        localStorage.setItem('currentUser', JSON.stringify({ role: 'user', email: trimmedEmail }));
        
        toast.success('Жаңы колдонуучу катары катталдыңыз жана кирдиңиз!');
        setTimeout(() => {
          navigate('/')
          window.location.reload()
        }, 1500);
      }
    } catch (err) {
      toast.error('Сервер менен байланышууда ката кетти!');
      console.error(err);
    }
  }

  
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Кирүү панели</h1>
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

      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f5f5f5',
    padding: '20px',
    boxSizing: 'border-box'
  },
  card: {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '22px',
    padding: '35px 25px',
    boxShadow: '0 5px 25px rgba(0,0,0,0.08)',
    border: '1px solid #ececec',
    boxSizing: 'border-box',
    marginTop: '20px'
  },
  title: {
    margin: 0,
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: '700',
    color: '#111',
    fontFamily: '"Montserrat", sans-serif'
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
    marginTop: '20px'
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
    marginTop: '20px'
  },
}

export default LoginPage;