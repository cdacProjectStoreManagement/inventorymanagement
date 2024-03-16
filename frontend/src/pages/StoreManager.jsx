import React, { useEffect, useState } from 'react'
import "./dashboard.css"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import AdminSidebar from '../components/adminSidebar'

function StoreManagerDashbord() {
  const[dashboard,setDashboard] = useState("");

    var navigate = useNavigate();

    useEffect(()=>{
      getDashboard();
    },[])

    const getDashboard=()=>{
    
    axios.get(`http://localhost:8080/dashboard`)
    .then(res=>{
        setDashboard(res.data);
    })
    .catch(error=>{
      console.log(error);
    })
}
// "noOfSuppliers": 0,
//   "noOfProducts": 0,
//   "noOfStores": 1,
//   "noOfWarehouses": 2,
//   "totalSumOfBills": null,
//   "totalSumOfOrders": null
// }

const goToSupplier=()=>{
    navigate("/supplier");
}
const goToWarehouses=()=>{
    navigate("/warehouse");
}
const goToStores=()=>{
    navigate("/product");
}
const goToProducts=()=>{
    navigate("/product");
}
const goToBills=()=>{
    navigate("/bills");
}
const goToOrders=()=>{
    navigate("/orders");
}


    return (  <>
    <AdminSidebar>
    <div className="dashboard">
        <div className="grid">
            <div className="tile">
                <h4>No of Warehouses</h4>
                <h4>{dashboard.noOfWarehouses}</h4>
                <button className='btn btn-dark' onClick={goToWarehouses}>View Warehouses</button>
            </div>
            <div className="tile">
                <h4>No of Stores</h4>
                <h4>{dashboard.noOfStores}</h4>
                <button className='btn btn-dark' onClick={goToStores}>View Stores</button>
            </div>
            <div className="tile">
                <h4>No of Products</h4>
                <h4>{dashboard.noOfProducts}</h4>
                <button className='btn btn-dark' onClick={goToProducts}>View Products</button>
            </div>
            <div className="tile">
                <h4>Products Sold Worth Rs</h4>
                <h4>{dashboard.totalSumOfBills}</h4>
                <button className='btn btn-dark' onClick={goToBills}>View Bills</button>
            </div>
        </div>
    </div>
    </AdminSidebar>
    </>

    );
}

export default StoreManagerDashbord
