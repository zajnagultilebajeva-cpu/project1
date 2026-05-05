import React from "react";
import { useNavigate } from "react-router-dom";

const BasePage = () => {
  const navigate = useNavigate()
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 Сатып алынган заказдар</h2>

      {orders.length === 0 ? (
        <p>Азырынча заказ жок</p>
      ) : (
        orders.map((order) => (
          <div key={order.id} style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px"
          }}>
            <h3>👤 {order.user.name}</h3>
            <p>📞 {order.user.phone}</p>
            <p>💰 Жалпы: {order.total} сом</p>
            <p>📅 {new Date(order.date).toLocaleString()}</p>

            <h4>🛒 Товарлар:</h4>

            {order.products.map((p) => (
              <div key={p.id}>
                - {p.title} ({p.quantity} шт)
              </div>
            ))}
          </div>
        ))
      )}
    </div>
  );
};

export default BasePage