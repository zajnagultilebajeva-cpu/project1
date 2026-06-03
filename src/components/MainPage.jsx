// import { useEffect, useState } from 'react' 
// import { useNavigate } from "react-router-dom" 
// import { Button } from '@mui/material' 
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined' 
// import '../styles/MainPage.css' 

// const MainPage = ({ search }) => { 
//     const [clothes, setClothes] = useState([])
     
//     const chakyruu = useNavigate()  
//     const addToCart = (item) => { 
//         const cart = JSON.parse(localStorage.getItem('cart')) || [] 
//         const exist = cart.find(prod => prod.id === item.id) 
//         let updatedCart 
//         if (exist) { updatedCart = cart.map(prod => prod.id === item.id ? 
//             { ...prod, quantity: prod.quantity + 1 

//             } : prod ) 
//         } else { 
//             updatedCart = [...cart, 
//                 { 
//                     ...item, quantity: 1 

//                 }] 
//         } 
//             localStorage.setItem('cart', JSON.stringify(updatedCart)) 
//         } 
//     useEffect(() => { fetch("https://api.escuelajs.co/api/v1/products") 
//         .then(response => response.json()) 
//         .then(data => { setClothes(data) }) 
//         .catch(error => console.log(error)) }, 
//         []
//     )
//     const filteredClothes = clothes.filter(item =>
//         item.slug?.toLowerCase().includes((search || "").toLowerCase())
//     )
// return ( 
//     <> 
//         <section className="hero"> 
//             <div id="slider"> 
//                 <figure> 
//                     <img src="https://cdn11.bigcommerce.com/s-g3m0h8weca/images/stencil/original/carousel/60/UNEEK_BANNER_2026.png?c=1" 
//                          alt=""
//                     /> 
//                     <img src="https://cdn-1.aki.kg/cdn-st-0/qfE/T/2947070.f4b678bdce420e5f2ab29db5a7a52dbe.jpg" 
//                          alt="" 
//                     /> 
//                     <img src="https://marketplace.canva.com/EAHDMRox-Pg/1/0/1600w/canva-beige-and-brown-minimalist-elegant-fashion-big-sale-banner-yDZHcGnWFx0.jpg" 
//                          alt="" 
//                     /> 
//                     <img src="https://static.wixstatic.com/media/e13a0d_1c50967b95dc4638a06d07347834446c~mv2.png/v1/fit/w_2500,h_1330,al_c/e13a0d_1c50967b95dc4638a06d07347834446c~mv2.png" 
//                          alt=""
//                     /> 
//                     <img src="https://img.freepik.com/free-vector/fashion-template-design_23-2150368863.jpg?semt=ais_incoming&w=740&q=80" 
//                          alt="" 
//                     /> 
//                 </figure> 
//             </div> 
//         </section> 
//         <main className='main'> 
//             <div className="products"> 
//                 {filteredClothes.map(item => ( 
//                     <div className="card" key={item.id}> 
//                         <img src={item.images?.[0]} 
//                              alt={item.title} 
//                              className='card_image' 
//                              onClick={() => chakyruu(`/detail/${item.id}`)} 
//                         />
//                         <h3 className='card_title'>
//                             {item.title}
//                         </h3> 
//                         <p className='card_descript'> 
//                             {item.description?.split(" ").slice(0, 15).join(" ") || 
//                              item.description?.split(" ").slice(0, 30).join(" ")}... 
//                         </p> 
//                         <div style={{ width:"300px", 
//                                     display:"flex", 
//                                     justifyContent:"space-between", 
//                                     paddingTop:"10px" 
//                                     }}> 
//                         <p className='card_price'>
//                             {item.price} $
//                         </p> 
                        
//                         {/* 
//                             <button className='card_btn' 
//                                     onClick={() => chakyruu('/cart', {state:item})}> 
//                                             Себетчеге салуу </button> 
//                         */} 
//                         <Button variant="contained" 
//                                 color="success" 
//                                 startIcon={<ShoppingCartIcon />} 
//                                 onClick={() => addToCart(item)}> 
                                
//                                 Себетчеге салуу 
//                         </Button> 
//                         </div> 
//                     </div> 
//                 ))} 
//             </div> 
//         </main> 
//     </> 
// ) } 
    
// export default MainPage

// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import { Button } from '@mui/material';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
// // 1. Биз түзгөн 50 продуктуну импорттойбуз
// import { kepkaData } from '../data'; 
// import '../styles/MainPage.css';

// const MainPage = () => {
//     // 2. Стейтке маалыматты түз эле беребиз
//     const [clothes] = useState(kepkaData); 
//     const navigate = useNavigate();

//     return (
//         <div className="main_container">
//             <section className="hero">
//                 <div id="slider">
//                     <figure>
//                         <img src="https://cdn11.bigcommerce.com/s-g3m0h8weca/images/stencil/original/carousel/60/UNEEK_BANNER_2026.png?c=1" alt="banner1" />
//                         <img src="https://img.freepik.com/free-vector/fashion-template-design_23-2150368863.jpg" alt="banner2" />
//                     </figure>
//                 </div>
//             </section>

//             <main className='main'>
//                 <h1 style={{ textAlign: 'center', margin: '30px 0' }}>Биздин Ассортимент</h1>
                
//                 <div className="products">
//                     {clothes.map(item => (
//                         <div className="card" key={item.id}>
//                             <div className="card_img_container">
//                                 <img
//                                     src={item.image}
//                                     alt={item.title}
//                                     className='card_image'
//                                     onClick={() => navigate(`/detail/${item.id}`)}
//                                     // Эгер сүрөт жүктөлбөй калса, боштук болбошу үчүн:
//                                     onError={(e) => { e.target.src = 'https://via.placeholder.com/300x300?text=No+Image'; }}
//                                 />
//                             </div>
                            
//                             <div className="card_info">
//                                 <h3 className='card_brand'>{item.brand}</h3>
//                                 <p className='card_title'>{item.title}</p>

//                                 <div className="card_bottom">
//                                     <span className='card_price'>{item.price} сом</span>
//                                     <Button 
//                                         variant="contained" 
//                                         color="success"
//                                         size="small"
//                                         startIcon={<ShoppingCartIcon />}
//                                         onClick={() => navigate('/cart', { state: item })}
//                                     >
//                                         Кошуу
//                                     </Button>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default MainPage;
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined';
import { kepkaData } from '../data'
import { collection, getDocs, query, orderBy, onSnapshot } from "firebase/firestore"
import { db } from "../Firebase"
import '../styles/MainPage.css'
import { doc, deleteDoc } from "firebase/firestore"
import { toast } from 'react-toastify';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCardIcon from '@mui/icons-material/AddCard';

const MainPage = ({ darkMode, isAdmin}) => {
    
    const chakyruu = useNavigate() 
    const [search, setSearch] = useState("")
    const [category, setCategory] = useState(localStorage.getItem("category") || "All")        
    const [filtered, setFiltered] = useState(kepkaData)
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [products, setProducts] = useState(() => {
    const localData = localStorage.getItem("local_products");
        if (!localData) {
            localStorage.setItem("local_products", JSON.stringify(kepkaData));
            return kepkaData;
        }
        const parsedData = JSON.parse(localData)
        if (parsedData.length === 0) {
            localStorage.setItem("local_products", JSON.stringify(kepkaData));
            return kepkaData;
        }
        
        return parsedData
    })
    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter(p => p.id?.toString() !== productId?.toString())
        setProducts(updatedProducts)
        localStorage.setItem("local_products", JSON.stringify(updatedProducts))
        toast.success("Товар ийгиликтүү өчтү!")
    }   
    useEffect(() => {
        if (darkMode) {
            document.body.classList.add("dark");
        } else {
            document.body.classList.remove("dark");
        }
    }, [darkMode])

    useEffect(() => {
        const allData = products; 

        const result = allData.filter(item => {
            const matchSearch = item.description
                ?.toLowerCase()
                .includes(search.toLowerCase());

            const matchCategory = category === "All" || item.category === category;

            return matchSearch && matchCategory;
        });

        setFiltered(result)
    }, [search, category, products])
    

    useEffect(() => {
        const handleStorageChange = () => {
            const savedSearch = localStorage.getItem("search") || "";
            setSearch(savedSearch)
        }

        window.addEventListener("storage-changed", handleStorageChange)
        return () => window.removeEventListener("storage-changed", handleStorageChange)
    }, [])
    useEffect(() => {
        const handleCategoryChange = () => {
            const saved = localStorage.getItem("category") || "All";
            setCategory(saved)
        }

        window.addEventListener("category-changed", handleCategoryChange)

        return () =>
            window.removeEventListener("category-changed", handleCategoryChange);
    }, [])
    const addToCart = (item) => { 
        const currentCart = JSON.parse(localStorage.getItem('cart')) || []
        const exist = currentCart.find(prod => prod.id === item.id)
        let updatedCart

        if (exist) { 
            updatedCart = currentCart.map(prod => prod.id === item.id 
                ? { ...prod, quantity: prod.quantity + 1 } 
                : prod 
            );
        } else { 
            updatedCart = [...currentCart, { ...item, quantity: 1 }]
        }
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCart(updatedCart)
    }
return (
        <>
             <section className="hero" >
                 <div id="slider">
                     <figure>
                         <img src="https://cdn11.bigcommerce.com/s-g3m0h8weca/images/stencil/original/carousel/60/UNEEK_BANNER_2026.png?c=1" alt="" />
                         <img src="https://cdn-1.aki.kg/cdn-st-0/qfE/T/2947070.f4b678bdce420e5f2ab29db5a7a52dbe.jpg" alt="" />
                         <img src="https://marketplace.canva.com/EAHDMRox-Pg/1/0/1600w/canva-beige-and-brown-minimalist-elegant-fashion-big-sale-banner-yDZHcGnWFx0.jpg" alt="" />
                         <img src="https://static.wixstatic.com/media/e13a0d_1c50967b95dc4638a06d07347834446c~mv2.png/v1/fit/w_2500,h_1330,al_c/e13a0d_1c50967b95dc4638a06d07347834446c~mv2.png" alt="" />
                         <img src="https://i.etsystatic.com/44327675/r/il/2146bd/7819525668/il_fullxfull.7819525668_7khv.jpg" alt="" />
                     </figure>
                 </div>
             </section>
             <main className='main'>
                {isAdmin && (
                     <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto 20px auto", display: "flex", justifyContent: "flex-end" }}>
                         <Button 
                             variant="contained" color="success"
                             onClick={() => chakyruu('/create')} 
                             startIcon={< AddCardIcon/>}
                             style={{ backgroundColor: '#10b981', padding: '10px 20px', fontWeight: 'bold' }}
                         >
                             Жаңы товар кошуу 
                         </Button>
                     </div>
                 )}
                 <div className="products">
                     {filtered.map(item => (
                        <div className="card" key={item.id}>
                            
                            <img
                                src={item.images[0]}
                                alt={item.title}
                                className='card_image'
                                onClick={() => chakyruu(`/detail/${item.id}`)}
                            />

                            <h3 className='card_title'>{item.title}</h3>

                            <p className='card_descript'>
                                {item.description?.split(" ").slice(0, 15).join(" ")}
                            </p>
                            <h3 className='card_descript'>{item.brand}</h3>

                            <div style={{
                                         width:"300px", 
                                         display:"flex", 
                                         justifyContent:"space-between",
                                         paddingTop:"10px"
                            }}>
                                <p className='card_price'>{item.price} сом</p>
                                <Button variant="contained" 
                                        color="success"
                                        startIcon={<ShoppingCartIcon />}
                                        onClick={() => addToCart(item)}>
                                    Себетчеге салуу
                                </Button>
                            </div>
                            
                            
                            {isAdmin && (
                            <div className="admin-buttons" style={{ display: "flex", gap: "10px", marginTop: "10px", width: "300px" }}>
                                <Button variant="outlined"
                                        color='secondary'
                                        onClick={() => chakyruu(`/edit/${item.id}`)}>
                                    Өзгөртүү
                                </Button>
                                <Button variant="outlined" 
                                        color="error"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => handleDeleteProduct(item.id)}>
                                        Өчүрүү
                                </Button>
                            </div>
                            )}
                            
                        </div>
                    ))}
                </div>
                <div className="brand-section">
                    <h2 className="brand-title">Биздин расмий бренддер</h2>
                    <div className="brand-slider">
                        <div className="brand-track">
                        <div className="brand-item">
                            <img src="https://static.vecteezy.com/system/resources/previews/020/336/280/non_2x/nike-logo-nike-icon-free-free-vector.jpg" alt="Nike" />
                        </div>
                        <div className="brand-item">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Logo_Adidas.png" alt="Adidas" />
                        </div>
                        <div className="brand-item">
                            <img src="https://upload.wikimedia.org/wikinews/en/thumb/4/43/Lacoste_logo.svg/960px-Lacoste_logo.svg.png?utm_source=en.wikinews.org&utm_campaign=index&utm_content=thumbnail" alt="Lacoste" />
                        </div>
                        <div className="brand-item">
                            <img src="https://cdn.worldvectorlogo.com/logos/tommy-hilfiger-3.svg" alt="Tommy" />
                        </div>
                        <div className="brand-item">
                            <img src="https://upload.wikimedia.org/wikipedia/ru/thumb/b/b4/Puma_logo.svg/1280px-Puma_logo.svg.png" alt="Puma" />
                        </div>
                        <div className="brand-item">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/the-north-face-1-logo-png-transparent.png" alt="TNF" />
                        </div>

                      
                        <div className="brand-item">
                            <img src="https://static.vecteezy.com/system/resources/previews/020/336/280/non_2x/nike-logo-nike-icon-free-free-vector.jpg" alt="Nike" />
                        </div>
                        <div className="brand-item">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Logo_Adidas.png" alt="Adidas" />
                        </div>
                        <div className="brand-item">
                            <img src="https://upload.wikimedia.org/wikinews/en/thumb/4/43/Lacoste_logo.svg/960px-Lacoste_logo.svg.png?utm_source=en.wikinews.org&utm_campaign=index&utm_content=thumbnail" alt="Lacoste" />
                        </div>
                        <div className="brand-item">
                            <img src="https://cdn.worldvectorlogo.com/logos/tommy-hilfiger-3.svg" alt="Tommy" />
                        </div>
                        <div className="brand-item">
                            <img src="https://upload.wikimedia.org/wikipedia/ru/thumb/b/b4/Puma_logo.svg/1280px-Puma_logo.svg.png" alt="Puma" />
                        </div>
                        <div className="brand-item">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/the-north-face-1-logo-png-transparent.png" alt="TNF" />
                        </div>
                        </div>
                    </div>
                    </div>
            </main>
        </>
    )
}

export default MainPage;