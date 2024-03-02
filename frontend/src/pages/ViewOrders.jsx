import React, { useState } from 'react'
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import config from '../config/config.json';
import { useParams } from 'react-router-dom';
function ViewOrders() {
  const {warehouseId}= useParams();
  const [orders, setOrders]=useState([]);
  const [searchText, setSearchText] = useState('');

  const url = config.apiUrl+`/warehouse/orders/${warehouseId}`;

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

  
    
  return (
    <div>
      <AdminSidebar>
        <div> 
          <Productnavbarwithsearch onChange={OnSearchHandle}/>   
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead className='table-dark'>
                <tr>
                  <th>Order Id</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Category</th>
                  <th>Cost Price</th>
                  <th>Selling Price</th>
                  <th>MFG. Date</th>
                  <th>Expiry Date</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="8">No matching products found.</td>
                  </tr>
                ) : (
                  products
                  .filter(product => (
                    searchText === "" ||
                    (product.productCode?.toString().toLowerCase().includes(searchText.toLowerCase())) ||
                    (product.productName?.toString().toLowerCase().includes(searchText.toLowerCase())) ||
                    (product.productCategory?.toString().toLowerCase().includes(searchText.toLowerCase()))
                  ))
                    .map((product) => (
                      <tr key={product.id}>
                        <td>{product.productCode}</td>
                        <td>{product.productName}</td>
                        <td>{product.prodcutDescription}</td>
                        <td>{product.productCategory}</td>
                        <td>{product.costPrice}</td>
                        <td>{product.sellingPrice}</td>
                        <td>{product.mfgDate}</td>
                        <td>{product.expiryDate}</td>
                      </tr>
                    ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AdminSidebar>
    </div>
  )
}

export default ViewOrders
