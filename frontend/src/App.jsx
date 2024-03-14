// App.js
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import MainNavbar from './components/mainNavbar';
import { Route, Routes, Navigate } from 'react-router-dom'; 
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import AddProduct from './pages/addProduct';
import AddSupplier from './pages/AddSupplier';
import Supplier from './pages/Supplier';
import Warehouse from './pages/Warehouse';
import AddWarehouse from './pages/AddWarehouse';
import Store from './pages/Store';
import AddStore from './pages/AddStore';
import OrderForm from './pages/AddOrder';
import StoreForm from './pages/AddBill';
import Orders from './pages/Orders';
import Bills from './pages/Bills';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import ProtectedRoute from './services/ProtectedRoute';
import UserPage from './pages/User';
import Signout from './pages/Signout'


function App() {
  return (
    <div className="container-fluid">
      <MainNavbar />
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />


        {/* Protected route for the dashboard */}
        <Route
          path="/user"
          element={<ProtectedRoute component={UserPage} requiredRoles={['admin', 'storemanager', 'warehousemanager','biller']} />}
        />

        <Route
          path="/dashboard"
          element={<ProtectedRoute component={null} requiredRoles={['admin', 'storemanager', 'warehousemanager','biller']} />}
        />
        
        <Route path="/product" element={<ProtectedRoute component={Product} requiredRoles={['admin', 'storemanager', 'warehousemanager', 'biller']} />} />
        <Route path="/product/add" element={<ProtectedRoute component={AddProduct} requiredRoles={['admin', 'storemanager', 'warehousemanager']} />} />
        <Route path="/supplier/add" element={<ProtectedRoute component={AddSupplier} requiredRoles={['admin', 'warehousemanager']} />} />
        <Route path="/supplier" element={<ProtectedRoute component={Supplier} requiredRoles={['admin', 'warehousemanager']} />} />
        <Route path="/warehouse" element={<ProtectedRoute component={Warehouse} requiredRoles={['admin', 'warehousemanager']} />} />
        <Route path="/warehouse/add" element={<ProtectedRoute component={AddWarehouse} requiredRoles={['admin', 'warehousemanager']} />} />
        <Route path="/store" element={<ProtectedRoute component={Store} requiredRoles={['admin', 'storemanager']} />} />
        <Route path="/store/add" element={<ProtectedRoute component={AddStore} requiredRoles={['admin', 'storemanager']} />} />
        <Route path="/neworder/:warehouseId" element={<ProtectedRoute component={OrderForm} requiredRoles={['admin', 'warehousemanager']} />} />
        <Route path="/newbill/:storeId" element={<ProtectedRoute component={StoreForm} requiredRoles={['admin', 'storemanager',  'biller']} />} />
        <Route path="/order/:warehouseId" element={<ProtectedRoute component={Orders} requiredRoles={['admin',  'warehousemanager', ]} />} />
        <Route path="/bill/:storeId" element={<ProtectedRoute component={Bills} requiredRoles={['admin', 'storemanager', 'biller']} />} />


        {/* Catch-all route for unknown paths */}
        <Route path="/*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </div>
  );
}

export default App;
