import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import config from '../config/config.json';
import { useParams } from 'react-router-dom';
function Bills() {
    const [bills, setbills] = useState([]);
    const [searchText, setSearchText] = useState('');
    const {storeId} = useParams();
    const url = config.apiUrl+`/bill/${storeId}`;

    useEffect(() => {
        GetRecords();
    }, []); // Equivalent to componentDidMount

    const GetRecords = () => {
        axios.get(url).then((result) => {
            var billReceived = result.data;
            setbills(billReceived);
        });
    }

    const OnSearchHandle = ({ target }) => {
        setSearchText(target.value);
    };
 

    return (
        <div>
            <AdminSidebar>
                <div>
                    <div className='table-responsive'>
                        <table className='table table-bordered'>
                            <thead className='table-dark'>
                                <tr>
                                    <th>Id</th>
                                    <th>Bill Date</th>
                                    <th>Total Amount</th>
                                    <th></th>
                                    

                                </tr>
                            </thead>
                            <tbody>
                                {bills.length === 0 ? (
                                    <tr>
                                        <td colSpan="8">No matching orders found.</td>
                                    </tr>
                                ) : (
                                    bills
                                        .filter(order => (
                                            searchText === "" ||
                                            (order.orderId?.toString().toLowerCase().includes(searchText.toLowerCase()))
                                        ))
                                        .map((order) => (
                                            <tr key={order.id}>
                                                <td>{order.id}</td>
                                                <td>{order.billDate}</td>
                                                <td>{order.totalAmount}</td>
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

export default Bills;