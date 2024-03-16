import React, { useState, useEffect, useHistory } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import OrderNavbar from '../components/OrderNavbar';


function OrderDetails(props) {
  const history = useHistory();

  const handleGoBack = () => {
    props.onClose(); // Close the order details view
    history.goBack(); // Navigate back to the previous location
  };

  const orderDetails=props.orderDetails;
  const [searchText, setSearchText] = useState('');
    const OnSearchHandle = ({ target }) => {
    setSearchText(target.value);
  };
  // [
  //   {
  //     "id": 6,
  //     "orderDate": "2024-02-20",
  //     "arrivedDate": "2024-02-20",
  //     "totalAmount": 0,
  //     "supplier": {
  //       "id": 1,
  //       "supplierName": "Supplier A"
  //     },
  //     "orderDetails": [
  //       {
  //         "product": {
  //           "id": 1,
  //           "productCode": 101,
  //           "productName": "Laptop A"
  //         },
  //         "orderQuantity": 4,
  //         "amount": 0
  //       }
  //     ]
  //   },
  //   {
  //     "id": 7,
  //     "orderDate": "2024-02-20",
  //     "arrivedDate": "2024-02-20",
  //     "totalAmount": 0,
  //     "supplier": {
  //       "id": 2,
  //       "supplierName": "Supplier B"
  //     },
  //     "orderDetails": [
  //       {
  //         "product": {
  //           "id": 4,
  //           "productCode": 104,
  //           "productName": "Smartphone B"
  //         },
  //         "orderQuantity": 4,
  //         "amount": 0
  //       }
  //     ]
  //   }
  // ]
  return (
    <div>
      <AdminSidebar>
        <div> 
          <OrderNavbar/>   
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead className='table-dark'>
                <tr>
                  <th>Product Code</th>
                  <th>Product Name</th>
                  <th>Cost Price</th>
                  <th>Qunatity</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.length === 0 ? (
                  <tr>
                    <td colSpan="8">No products found.</td>
                  </tr>
                ) : (
                  orderDetails
                  .filter(orderDetail => (
                    searchText === "" ||
                    (orderDetail.product.productCode?.toString().toLowerCase().includes(searchText.toLowerCase())) ||
                    (orderDetail.product.productName?.toString().toLowerCase().includes(searchText.toLowerCase())) 
                    
                  ))
                    .map((orderDetail) => (
                      <tr key={orderDetail.product.id}>
                        <td>{orderDetail.product.productCode}</td>
                        <td>{orderDetail.product.productName}</td>
                        <td>{orderDetail.orderQuantity}</td>
                        <td>{orderDetail.amount}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
            <button onClick={handleGoBack} className='btn btn-primary'>Go Back to Orders</button>
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}

export default OrderDetails;
