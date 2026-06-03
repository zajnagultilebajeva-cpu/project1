// import React from "react";
// import { useNavigate } from "react-router-dom";

// const BasePage = () => {
//   const navigate = useNavigate()
//   const orders = JSON.parse(localStorage.getItem("orders")) || [];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>📦 Сатып алынган заказдар</h2>

//       {orders.length === 0 ? (
//         <p>Азырынча заказ жок</p>
//       ) : (
//         orders.map((order) => (
//           <div key={order.id} style={{
//             border: "1px solid #ccc",
//             marginBottom: "10px",
//             padding: "10px"
//           }}>
//             <h3>👤 {order.user.name}</h3>
//             <p>📞 {order.user.phone}</p>
//             <p>💰 Жалпы: {order.total} сом</p>
//             <p>📅 {new Date(order.date).toLocaleString()}</p>

//             <h4>🛒 Товарлар:</h4>

//             {order.products.map((p) => (
//               <div key={p.id}>
//                 - {p.title} ({p.quantity} шт)
//               </div>
//             ))}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default BasePage


import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { supabase } from '../supabase';

const AdminPanel = () => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null); 
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('id', { ascending: false });

      if (error) {
        toast.error('Товарларды жүктөөдө ката кетти: ' + error.message);
      } else {
        setItems(data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!name || !price) {
      toast.warn('Бардык талааларды толтуруңуз!');
      return;
    }

    try {
      if (editId) {
        const { error } = await supabase
          .from('products')
          .update({ title: name, price: Number(price) })
          .eq('id', editId);

        if (error) {
          toast.error('Өзгөртүүдө ката кетти: ' + error.message);
          return;
        }

        toast.success('Ийгиликтүү өзгөртүлдү!');
        setEditId(null);
      } else {
        const newItem = {
          id: Date.now(),
          title: name,
          price: Number(price),
          description: "Админ панелден кошулган товар",
          brand: "Бренд",
          category: "All",
          images: ["https://marketplace.canva.com/EAHDMRox-Pg/1/0/1600w/canva-beige-and-brown-minimalist-elegant-fashion-big-sale-banner-yDZHcGnWFx0.jpg"]
        };

        const { error } = await supabase
          .from('products')
          .insert([newItem]);

        if (error) {
          toast.error('Кошууда ката кетти: ' + error.message);
          return;
        }

        toast.success('Жаңы товар кошулду!');
      }

      setName('');
      setPrice('');
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error('Ката кетти!');
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.title || item.name || '');
    setPrice(item.price || '');
  };

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) {
        toast.error('Өчүрүүдө ката кетти: ' + error.message);
        return;
      }

      toast.error('Товар өчүрүлдү!');
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error('Ката кетти!');
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Админ Панель (Товарларды башкаруу)</h2>
      
      <form onSubmit={handleSave} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Аталышы" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', flex: 1 }}
        />
        <input 
          type="number" 
          placeholder="Баасы" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: '10px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: editId ? '#eab308' : '#10b981', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {editId ? 'Өзгөртүүнү сактоо' : 'Кошуу'}
        </button>
      </form>

      {loading ? (
        <p>Жүктөлүүдө...</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Аталышы</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Баасы (сом)</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Аракеттер</th>
            </tr>
          </thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.title}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.price}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd', gap: '10px', display: 'flex' }}>
                  <button onClick={() => handleEdit(item)} style={{ backgroundColor: '#3b82f6', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  );
};

export default AdminPanel;