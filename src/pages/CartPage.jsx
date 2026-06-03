import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CartPage.css';
import { supabase } from '../supabase';

const CartPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [showModal, setShowModal] = React.useState(false);
    const [customerName, setCustomerName] = React.useState("");
    const [customerPhone, setCustomerPhone] = React.useState("");

    const [cart, setCart] = React.useState(
      JSON.parse(localStorage.getItem('cart')) || []
    );

    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    const isAdmin = currentUser && (currentUser.role === 'admin' || currentUser.email === 'zajnagultilebajeva@gmail.com');

    const increment = (id) => {
      const updated = cart.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updated);
      localStorage.setItem('cart', JSON.stringify(updated));
    };

    const decrement = (id) => {
      const updated = cart.map(item =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      setCart(updated);
      localStorage.setItem('cart', JSON.stringify(updated));
    };

    const removeItem = (id) => {
      const updated = cart.filter(item => item.id !== id);
      setCart(updated);
      localStorage.setItem('cart', JSON.stringify(updated));
    };

    const clearCart = () => {
      setCart([]);
      localStorage.removeItem('cart');
    };

    const buyProduct = () => {
      if (cart.length === 0) {
        toast.warn("Себетчеңиз бош!");
        return;
      }
      setShowModal(true);
    };

    const handleConfirmOrder = async () => {
      if (!customerName.trim() || !customerPhone.trim()) {
        toast.error("Атыңызды жана телефон номериңизди толтуруңуз!");
        return;
      }

      const order = {
        id: Date.now().toString(), 
        name: customerName,
        phone: customerPhone,
        products: cart,
        total: totalPrice,
        date: new Date().toLocaleString("ru-RU") 
      };

      try {
        const { error } = await supabase
          .from('orders')
          .insert([order]);

        if (error) {
          toast.error("Буйрутманы сактоодо ката кетти: " + error.message);
          return;
        }

        setCart([]);
        localStorage.removeItem("cart");
        setShowModal(false);
        setCustomerName("");
        setCustomerPhone("");

        toast.success("Буйрутмаңыз ийгиликтүү кабыл алынды!");
      } catch (err) {
        toast.error("Сервер менен байланыш үзүлдү!");
        console.error(err);
      }
    };
        
    const totalPrice = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

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
                      style={{ width: '80px', borderRadius: '10%', objectFit: 'cover'}}
                    />
                  </TableCell>

                  <TableCell align="right">{product.title}</TableCell>
                  <TableCell align="right">{product.category}</TableCell>
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
          <p className="total__price" style={{marginRight: "40px"}}>
            Жалпы суммасы:  {totalPrice} сом
          </p>

          <Button variant="contained" color="error" onClick={clearCart}>
             Себетчени тазалоо
          </Button>
          <Button variant="contained" onClick={buyProduct} style={{marginLeft: "40px"}}>
             Сатып алуу
          </Button>
          
          {isAdmin && (
            <Button variant="contained" onClick={() => navigate('/admin')} style={{marginLeft: "40px"}}>
               Продукт тарыхча
            </Button>
          )}

          {showModal && (
            <div className="modal-overlay">
              <div className="modal-card">
                <h3 className="modal-title">Буйрутманы тариздөө</h3>
                <p style={{ textAlign: 'center', color: '#555', margin: '0 0 15px 0' }}>
                  Жалпы сумма: <strong>{totalPrice} сом</strong>
                </p>
                
                <input 
                  type="text" 
                  placeholder="Атыңыз" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="modal-input"
                />
                
                <input 
                  type="text" 
                  placeholder="Телефон номериңиз" 
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="modal-input"
                />

                <div className="modal-btn-group">
                  <button onClick={handleConfirmOrder} className="modal-confirm-btn">Ырастоо</button>
                  <button onClick={() => setShowModal(false)} className="modal-cancel-btn">Жабуу</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <ToastContainer autoClose={2000} position="top-center" />
      </>
    );
};

export default CartPage;