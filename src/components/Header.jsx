import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Жабуу иконкасы кошулду
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel'
import IconButton from '@mui/material/IconButton'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Badge from '@mui/material/Badge'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import '../styles/Header.css';

function Header({ darkMode, setDarkMode, isAdmin }) {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const chakyruu = useNavigate();
    const [cartCount, setCartCount] = useState(0)
    const [anchorEl, setAnchorEl] = useState(null);
    const opens = Boolean(anchorEl)

    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const total = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
        setCartCount(total);
    }
    const handleLogout = () => {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('email')
        window.location.href = '/'
    }
    
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSearch = (value) => {
        setSearch(value);
        localStorage.setItem("search", value);
        window.dispatchEvent(new Event("storage-changed")); 
        chakyruu("/");
    };

    const handleCategoryChange = (cat) => {
        localStorage.setItem("category", cat);
        window.dispatchEvent(new Event("category-changed"));
        handleClose();
    };

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: '#aab4be',
                    ...theme.applyStyles('dark', { backgroundColor: '#8796A5' }),
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: '#001e3c',
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent('#fff')}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
            ...theme.applyStyles('dark', { backgroundColor: '#003892' }),
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#aab4be',
            borderRadius: 20 / 2,
            ...theme.applyStyles('dark', { backgroundColor: '#8796A5' }),
        },
    }));

    return (
        <header className='header'>
            <div className='header_left'>
                <h6 className='header_logo' onClick={() => chakyruu('/')}>Kepka.kg_</h6>
            </div>

            <nav className={`header_nav ${open ? "active" : ""}`}>
                <ul className="header_menu">
                    <li className="header_menu_li" onClick={() => { chakyruu('/'); setOpen(false); }}>Башкы бет</li>
                    <li className="header_menu_li" onClick={() => { chakyruu('/about'); setOpen(false); }}>Биз жөнүндө</li>
                    <li className="header_menu_li" onClick={() => { chakyruu('/cart'); setOpen(false); }}>Себет</li>
                    <li className="header_menu_li" onClick={() => { chakyruu('/map'); setOpen(false); }}>Дарек</li>
                </ul>
            </nav>

            <div className='header_right'>
                <input  
                    type='text' 
                    placeholder='Издөө...'
                    className='header_search_inp'
                    value={search}
                    onChange={(e) => handleSearch(e.target.value)}
                />

                <div className="header_category">
                    <Button
                        id="basic-button"
                        aria-controls={opens ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={opens ? 'true' : undefined}
                        onClick={handleClick}
                        variant="outlined"
                        size="small"
                    >
                        Бөлүм
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={opens}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleCategoryChange("All")}>Баары</MenuItem>
                        <MenuItem onClick={() => handleCategoryChange("Women")}>Аялдар үчүн</MenuItem>
                        <MenuItem onClick={() => handleCategoryChange("Men")}>Эркек кишилер үчүн</MenuItem>
                        <MenuItem onClick={() => handleCategoryChange("Kids")}>Жаш балдар үчүн</MenuItem>
                    </Menu>
                </div>

                <FormControlLabel
                    control={
                        <MaterialUISwitch
                            checked={darkMode}
                            onChange={() => setDarkMode(prev => !prev)}
                        />
                    }
                    label=""
                    className="header_switch"
                />
                <div className="menu_icon" onClick={() => setOpen(!open)}>
                    {open ? <CloseIcon /> : <MenuIcon />}
                </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>

                <IconButton 
                    onClick={() => chakyruu('/login')} // Түз эле логин баракчасына өтөт
                    style={{ 
                        color: isAdmin ? '#10b981' : (darkMode ? '#fff' : '#111'),
                        border: isAdmin ? '2px solid #10b981' : 'none'
                    }}
                    title="Кирүү / Админ Панель"
                >
                    <AdminPanelSettingsIcon />
                </IconButton>

                {localStorage.getItem('currentUser') && (
                    <IconButton onClick={handleLogout} color="error" title="Чыгуу">
                        <ExitToAppIcon />
                    </IconButton>
                )}
            </div>
        </header>
    );
}

export default Header;