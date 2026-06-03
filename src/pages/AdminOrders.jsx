import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';

const AdminOrders = ({ darkMode }) => {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        const fetchedOrders = JSON.parse(localStorage.getItem('orders')) || [];
        setOrders(fetchedOrders);
    }, []);

    const deleteOrder = (id) => {
        const updated = orders.filter(order => order.id !== id);
        setOrders(updated);
        localStorage.setItem('orders', JSON.stringify(updated));
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
            <h2>Сатып алуулардын тарыхы (Админ панель)</h2>
            {orders.length === 0 ? (
                <p>Азырынча буйрутмалар жок.</p>
            ) : (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Дата жана Убакыт</TableCell>
                                <TableCell>Кардардын Аты</TableCell>
                                <TableCell>Телефон номери</TableCell>
                                <TableCell>Товарлар</TableCell>
                                <TableCell align="right">Жалпы суммасы</TableCell>
                                <TableCell align="right">Аракет</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id}>
                                    <TableCell>{order.date}</TableCell>
                                    <TableCell>{order.name}</TableCell>
                                    <TableCell>{order.phone}</TableCell>
                                    <TableCell>
                                        {order.products.map((p, index) => (
                                            <div key={index}>
                                                • {p.title} ({p.quantity} даана)
                                            </div>
                                        ))}
                                    </TableCell>
                                    <TableCell align="right" style={{ fontWeight: 'bold', color: 'green' }}>
                                        {order.total} сом
                                    </TableCell>
                                    <TableCell align="right">
                                        <Button 
                                            variant="contained" 
                                            color="error" 
                                            onClick={() => deleteOrder(order.id)}
                                        >
                                            Өчүрүү
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};

export default AdminOrders