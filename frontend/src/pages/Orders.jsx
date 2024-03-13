import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
// import ordernavbarwithsearch from '../components/ordernavbarwithsearch';
import OrderDetails from './OrderDetalis'
import { Link } from 'react-router-dom';
import config from '../config/config.json';
import { useParams } from 'react-router-dom';
function Orders() {
    const [orders, setOrders] = useState([]);
    const [searchText, setSearchText] = useState('');
    const {warehouseId} = useParams();
    const url = config.apiUrl+`/order/${warehouseId}`;

    useEffect(() => {
        GetRecords();
    }, []); // Equivalent to componentDidMount

    const GetRecords = () => {
        axios.get(url).then((result) => {
            var orderReceived = result.data;
            setOrders(orderReceived);
        });
    }

    const OnSearchHandle = ({ target }) => {
        setSearchText(target.value);
    };
    //   "id": 6,
    //   "orderDate": "2024-02-20",
    //   "arrivedDate": "2024-02-20",
    //   "totalAmount": 0,
    //   "supplier": {
    //     "id": 1,
    //     "supplierName": "Supplier A"
    //   },
    //   "orderDetails": [
    //     {
    //       "order": {
    //         "id": 1,
    //         "orderCode": 101,
    //         "orderName": "Laptop A"
    //       },
    //       "orderQuantity": 4,
    //       "amount": 0
    //     }
    //   ]
    // }
    const onOrderDetails = (e) => {
        <OrderDetails props={e} />
    }

    return (
        <div>
            <AdminSidebar>
                <div>
                    {/* <ordernavbarwithsearch onChange={OnSearchHandle}/>    */}
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Id</th>
                                    <th>Order Date</th>
                                    <th>Arrived Date</th>
                                    <th>Total Amount</th>
                                    <th>Supplier</th>
                                    <th></th>
                                    

                                </tr>
                            </thead>
                            <tbody>
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan="8">No matching orders found.</td>
                                    </tr>
                                ) : (
                                    orders
                                        .filter(order => (
                                            searchText === "" ||
                                            (order.orderId?.toString().toLowerCase().includes(searchText.toLowerCase()))
                                        ))
                                        .map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.orderDate}</td>
                                                <td>{order.arrivedDate}</td>
                                                <td>{order.totalAmount}</td>
                                                <td>{order.supplier.supplierName}</td>
                                                <td>
                                                    {/* <button onClick={onOrderDetails(order.OrderDetails)} className='btn btn-primary mt-2'>
                                                    Order details
                                                </button> */}
                                                <button></button>
                                                </td>

                                            </tr>
                                        ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </AdminSidebar>
        </div>
    );
}

export default Orders;