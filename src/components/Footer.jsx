import React from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/Footer.css'

function Footer() {
    const chakyruu = useNavigate()

    return (
        <footer className='footer'>
            <div className='footer_container'>
                
                <div className='footer_col'>
                    <h2>Kepka.kg__</h2>
                    <p>Кепка жана кийимдердин онлайн дүкөнү</p>
                </div>
                <div className='footer_col'>
                    <h3>Байланыш</h3>
                    <p>Email: zajnagultilebajeva@gmail.com</p>
                    <p>Тел: 0501553260</p>
                    <p>Дарек:  Ош шаары, А Шакирова көчөсү №275</p>
                </div>

                <div className='footer_col1'>
                    <h4>Соц. тармактар</h4>
                    <a href="https://instagram.com/kepka.osh__" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{textDecoration: "none", color: "white"}}>
                         Инстаграм
                    </a>
                    <a  href="https://api.whatsapp.com/send?phone=996501553260" 
                        target="_blank"  
                        rel="noopener noreferrer"
                        style={{textDecoration: "none", color: "white"}}>
                        WhatsApp
                    </a>
                </div>

            </div>

            <div className='footer_bottom'>
                <p>© 2026 Kepka.kg_</p>
            </div>
        </footer>
    )
}

export default Footer