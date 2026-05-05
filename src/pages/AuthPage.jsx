
import React, { useState } from 'react';
import '../styles/AuthPage.css';

const AuthPage = ({ onClose }) => {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  

  const handleRegister = () => {
        const user = { name, phone }
        localStorage.setItem("user", JSON.stringify(user))
        onClose()
    }
    
  return (
    <>
        <div className="row">
            <div id="auth-form" className="card border-primary">
                <h5 className="card_header">
                    Катталуу</h5>
                <div className="card_body">
                    <form className="panel_body">
                    <div className="input_group">
                        <span className="input_group_text">
                            <img src='https://icons.veryicon.com/png/o/system/ued_v10-of-shengye-group/general-user-name-icon.png'  className="fa_user"/>
                        </span>
                        <input type="text" 
                               id="login" 
                               name="аты" 
                               className="form-control" 
                               placeholder="Айгүл"
                               onChange={(e) => setName(e.target.value)}/>
                    </div>
                    
                    <div className="input-group">
                        <span className="input-group-text">
                            <img src='https://www.iconpacks.net/icons/1/free-phone-icon-1-thumb.png'  className="fa_user"/>
                        </span>
                        <input type="num" 
                               id="password" 
                               name="num " 
                               className="form-control" 
                               placeholder="+996 "
                               onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                    <button type="button" 
                            className="btn btn-primary"
                            onClick={handleRegister}>Каттоо
                    </button>
                    <button onClick={onClose}>Жабуу</button>
                    </form>
                </div>
            </div>
        </div>
    </>
  )
}

export default AuthPage