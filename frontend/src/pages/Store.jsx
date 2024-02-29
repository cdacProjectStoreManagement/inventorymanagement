import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import StoreNavbarWithSearch from '../components/StoreNavbarWithSearch'
import { Link } from 'react-router-dom';
function Product() {
  const [stores, setStores] = useState([]);
  const [searchText, setSearchText] = useState('');

  const url = "http://127.0.0.1:8080/store";

  useEffect(() => {
    GetRecords();
  }, []); // Equivalent to componentDidMount

  const GetRecords = () => {
    axios.get(url).then((result) => {
      var storeReceived = result.data;
      setStores(storeReceived);
    });
  }

  const OnSearchHandle = ({ target }) => {
    setSearchText(target.value);
  };

  return (
    <div>
      <AdminSidebar>
        <div> 
          <StoreNavbarWithSearch onChange={OnSearchHandle}/>   
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead className='table-dark'>
                <tr>
                  <th>Name</th>
                  <th>Address(Area/Street)</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Country</th>
                  <th>Pin code</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stores.length === 0 ? (
                  <tr>
                    <td colSpan="8">No matching products found.</td>
                  </tr>
                ) : (
                  stores
                  .filter(store => (
                    searchText === "" ||
                    (store.storeName?.toString().toLowerCase().includes(searchText.toLowerCase())) ||
                    (store.locationCity?.toString().toLowerCase().includes(searchText.toLowerCase())) ||
                    (store.locationCountry?.toString().toLowerCase().includes(searchText.toLowerCase()))
                  ))
                    .map((store) => (
                      <tr key={store.id}>
                        <td>{store.storeName}</td>
                        <td>{store.locationAddress}</td>
                        <td>{store.locationCity}</td>
                        <td>{store.locatonState}</td>
                        <td>{store.locationCountry}</td>
                        <td>{store.locationPincode}</td>
                        <td >
                          <Link to={`/newbill/${store.id}`} class="nav-link" aria-current="page" style={{color:"green"}}>Add Bill</Link>
                          <Link to={`/bill/${store.id}`} class="nav-link" aria-current="page" style={{color:"green"}}>view Bill</Link>
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

export default Product;