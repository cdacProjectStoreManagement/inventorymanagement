import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import Productnavbarwithsearch from '../components/productnavbarwithsearch';
import config from '../config/config.json';
function Product() {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const url = config.apiUrl+"/product";

  useEffect(() => {
    GetRecords();
  }, []); // Equivalent to componentDidMount

  const GetRecords = () => {
    axios.get(url).then((result) => {
      var productReceived = result.data;
      setProducts(productReceived);
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
                  <th>Code</th>
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
                        <td>{new Date(product.mfgDate).toLocaleDateString()}</td>
                        <td>{new Date(product.expiryDate).toLocaleDateString()}</td>

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

export default Product;
