// import React, { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
// import { Button } from '@mui/material'
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined'
// import { useNavigate } from 'react-router-dom'
// import '../styles/DetailPage.css'

// const DetailPage = () => {
//     const { id } = useParams()
//     const chakyruu = useNavigate()
//     const [product, setProduct] = useState(null)
//     const [selectImg, setSelectImg] = useState(null)
//     useEffect(() => {
//         fetch(`https://api.escuelajs.co/api/v1/products/${id}`)
//             .then(res => res.json())
//             .then(data => {
//                 setProduct(data)
//                 if (data?.images?.length) {
//                     setSelectImg(data.images[0])
//                 }
//             })
//     }, [id])

//     const handleClickImage = (img) => {
//         setSelectImg(img)
//     }

//     return (
//         <div className='product__details'>
//             <img src={selectImg} alt="main"/>
//             {product?.images && (
//                 <div>
//                     {product.images.map(img => (
//                         <img
//                             key={img}
//                             src={img}
//                             alt="img"
//                             width={130}
//                             onClick={() => handleClickImage(img)}
//                             style={{ cursor: 'pointer' }}
//                         />
//                     ))}
//                 </div>
//             )}
//             <div className='product__info'>
//                 <h2 className='product__title'>
//                     <span>Аталышы:</span> {product?.title}
//                 </h2>

//                 <p className='product__price'>
//                     <span>Баасы:</span> {product?.price} $
//                 </p>

//                 <p className='product__description'>
//                     <span>Түшүндүрмөсү:</span> {product?.description}
//                 </p>

//                 <p className='product__category'>
//                     <span>Тиби:</span> {product?.category?.name}
//                 </p>

//                 <div className='btns'>
//                             <Button variant="contained" 
//                                     color="success"
//                                     startIcon={<ShoppingCartIcon />}
//                                     onClick={() => addToCart(item)}>
//                                 Себетчеге салуу
//                             </Button>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DetailPage


import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartOutlined'
import { useNavigate } from 'react-router-dom'
import '../styles/DetailPage.css'
import { kepkaData } from '../data'

const DetailPage = () => {
    const { id } = useParams()
    const chakyruu = useNavigate()
    const [selectImg, setSelectImg] = useState(null)
    const product = kepkaData.find(item => item.id === Number(id))
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])

    const handleClickImage = (images) => {
        setSelectImg(images)
    }
    
    
    useEffect(() => {
        if (product) {
            setSelectImg(product.images[0])
        }
    }, [product])

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
    };

    return (
        <div className='product__details'>
            <img src={selectImg} alt="main"/>
            {product?.images && (
                <div>
                    {product.images.map(images => (
                        <img
                            key={images}
                            src={images}
                            alt="img"
                            width={130}
                            onClick={() => handleClickImage(images)}
                            style={{ cursor: 'pointer' }}
                        />
                    ))}
                </div>
            )}
            <div className='product__info'>
                <h2 className='product__title'>
                    <span>Аталышы:</span>{product?.title}
                </h2>

                <p className='product__price'>
                    <span>Баасы:</span>  {product?.price} сом
                </p>

                 <p className='product__description'>
                    <span>Түшүндүрмөсү:</span> {product?.description}
                </p> 

                <p className='product__category'>
                    <span>Тиби:</span> {product?.category}
                </p>

                <div className='btns'>
                            <Button variant="contained" 
                                    color="success"
                                    startIcon={<ShoppingCartIcon />}
                                    onClick={() => addToCart(product)}>
                                Себетчеге салуу
                            </Button>
                </div>
            </div>
        </div>
    )
}

export default DetailPage