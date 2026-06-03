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

const AdminPanel = () => {
  // Кадрлардын же товарлардын тизмеси
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [editId, setEditId] = useState(null); // Түзөтүлүп жаткан кадрдын IDси

  // Баракча ачылганда localStorage'дан маалыматтарды окуу
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('products')) || [];
    setItems(savedItems);
  }, []);

  // 1. КОШУУ ЖАНА ӨЗГӨРТҮҮ ФУНКЦИЯСЫ (Create & Update)
  const handleSave = (e) => {
    e.preventDefault();
    if (!name || !price) {
      toast.warn('Бардык талааларды толтуруңуз!');
      return;
    }

    let updatedItems;

    if (editId) {
      // ЭГЕР ӨЗГӨРТҮҮ (EDIT) БОЛУП ЖАТСА:
      updatedItems = items.map(item => 
        item.id === editId ? { ...item, name, price } : item
      );
      toast.success('Ийгиликтүү өзгөртүлдү!');
      setEditId(null);
    } else {
      // ЭГЕР ЖАҢЫ КОШУУ (CREATE) БОЛУП ЖАТСА:
      const newItem = {
        id: Date.now(), // уникалдуу ID
        name,
        price
      };
      updatedItems = [...items, newItem];
      toast.success('Жаңы кадр кошулду!');
    }

    setItems(updatedItems);
    localStorage.setItem('products', JSON.stringify(updatedItems));
    
    // Форманы тазалоо
    setName('');
    setPrice('');
    
    // Башка компоненттер да дароо билиши үчүн жаңылоо окуясын жөнөтөбүз
    window.dispatchEvent(new Event('storage-changed'));
  };

  // 2. ТҮЗӨТҮҮ РЕЖИМИНЕ ӨТКӨРҮҮ (Edit режимине даярдоо)
  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.name);
    setPrice(item.price);
  };

  // 3. ӨЧҮРҮҮ ФУНКЦИЯСЫ (Delete)
  const handleDelete = (id) => {
    const filteredItems = items.filter(item => item.id !== id);
    setItems(filteredItems);
    localStorage.setItem('products', JSON.stringify(filteredItems));
    toast.error('Кадр өчүрүлдү!');
    window.dispatchEvent(new Event('storage-changed'));
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <h2>Админ Панель (Товарларды / Кадрларды башкаруу)</h2>
      
      {/* Форма: Кошуу же Өзгөртүү үчүн */}
      <form onSubmit={handleSave} style={{ display: 'flex', gap: '10px', marginBottom: '30px' }}>
        <input 
          type="text" 
          placeholder="Аталышы" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '10px', flex: 1 }}
        />
        <input 
          type="text" 
          placeholder="Баасы же Маалыматы" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: '10px', flex: 1 }}
        />
        <button type="submit" style={{ padding: '10px 20px', backgroundColor: editId ? '#eab308' : '#10b981', color: '#fff', border: 'none', cursor: 'pointer' }}>
          {editId ? 'Өзгөртүүнү сактоо' : 'Кошуу'}
        </button>
      </form>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f3f4f6', textAlign: 'left' }}>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Аталышы</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Баасы / Маалыматы</th>
            <th style={{ padding: '10px', border: '1px solid #ddd' }}>Аракеттер</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
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
      <ToastContainer autoClose={2000} position="top-center" />
    </div>
  );
};

export default AdminPanel;