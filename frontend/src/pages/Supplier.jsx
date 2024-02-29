import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import SupplierNavbar from '../components/SupplierNavbarwithoutsearch';
import config from '../config/config.json';

function Supplier() {
  const [suppliers, setSuppliers] = useState([]);
  const [searchText, setSearchText] = useState('');

  const url = config.apiUrl+'/supplier';

  useEffect(() => {
    GetRecords();
  }, []); // Equivalent to componentDidMount

  const GetRecords = () => {
    axios.get(url).then((result) => {
      var supplierReceived = result.data;
      setSuppliers(supplierReceived);
    });
  };

  const OnSearchHandle = ({ target }) => {
    setSearchText(target.value);
  };

  return (
    <div>
      <AdminSidebar>
        <div>
          <SupplierNavbar onChange={OnSearchHandle} />
          <div className='table-responsive'>
            <table className='table table-bordered'>
              <thead className='table-dark'>
                <tr>
                  <th>Supplier Id</th>
                  <th>Name</th>
                  <th>Company</th>
                  <th>Address</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.length === 0 ? (
                  <tr>
                    <td colSpan='5'>No matching Supplier found.</td>
                  </tr>
                ) : (
                  suppliers
                    .filter((supplier) =>
                      searchText === '' ||
                      supplier.id?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                      supplier.supplierName?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                      supplier.company?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                      supplier.supplierAddress?.toString().toLowerCase().includes(searchText.toLowerCase())
                    )
                    .map((supplier) => (
                      <tr key={supplier.id}>
                        <td>{supplier.id}</td>
                        <td>{supplier.supplierName}</td>
                        <td>{supplier.company}</td>
                        <td>{supplier.supplierAddress}</td>
                        <td>{supplier.supplierContact}</td>
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

export default Supplier;
