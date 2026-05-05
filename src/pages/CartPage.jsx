import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthPage from '../pages/AuthPage';
import '../styles/CartPage.css';

const CartPage = () => {
    const location = useLocation()
    const [showModal, setShowModal] = React.useState(false)
    

    const [cart, setCart] = React.useState(
      JSON.parse(localStorage.getItem('cart')) || []
    )

    const increment = (id) => {
      const updated = cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
      setCart(updated)
      localStorage.setItem('cart', JSON.stringify(updated))
    }

    const decrement = (id) => {
      const updated = cart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      setCart(updated)
      localStorage.setItem('cart', JSON.stringify(updated))
    }
    const removeItem = (id) => {
      const updated = cart.filter(item => item.id !== id)
      setCart(updated);
      localStorage.setItem('cart', JSON.stringify(updated))
    }
    const clearCart = () => {
      setCart([])
      localStorage.removeItem('cart')
    }
    const buyProduct = () => {
      const user = JSON.parse(localStorage.getItem("user"))
      if (!user) {
        setShowModal(true)
        console.log("CLICKED BUY")
        return;
      }

      const order = {
        user: user,
        products: cart,
        total: totalPrice,
      }

      const orders = JSON.parse(localStorage.getItem("orders")) || []
      orders.push(order);
      localStorage.setItem("orders", JSON.stringify(orders));

      console.log("Сакталды:", order);

      setCart([]);
      localStorage.removeItem("cart")
    }
        
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )


    return (
      <>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>Себетче</TableCell>
                <TableCell align="right">Аталышы</TableCell>
                <TableCell align="right">Тиби</TableCell>
                <TableCell align="right">Баасы</TableCell>
                <TableCell align="right">Саны</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {cart.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <img
                      src={product.images?.[0]}
                      alt="img"
                      style={{ width: '50px', borderRadius: '50%' }}
                    />
                  </TableCell>

                  <TableCell align="right">{product.title}</TableCell>
                  <TableCell align="right">{product.category?.name}</TableCell>
                  <TableCell align="right">{product.price} сом</TableCell>

                  <TableCell align="right">
                    <button
                      className="cart__btns"
                      onClick={() => increment(product.id)}
                    >
                      +
                    </button>

                    <span className="quantity">{product.quantity}</span>

                    <button
                      className="cart__btns"
                      onClick={() => decrement(product.id)}
                    >
                      -
                    </button>
                  </TableCell>

                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => removeItem(product.id)}
                    >
                      Өчүрүү
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="sum_and_del">
          <p className="total__price"
             style={{marginRight: "40px"}}>
            Жалпы суммасы:  {totalPrice} сом
          </p>

          <Button variant="contained" color="error" onClick={clearCart}>
             Себетчени тазалоо
          </Button>
          <Button variant="contained"  
                  onClick={buyProduct}
                  style={{marginLeft: "40px"}}>
             Сатып алуу
          </Button>
          {showModal && (
            <AuthPage onClose={() => setShowModal(false)} />
          )}
          
        </div>
      </>
    )
}

export default CartPage