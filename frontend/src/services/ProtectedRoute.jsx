// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from './UserContext';

// Import your dashboard components
import StoreManagerDashboard from '../pages/StoreManager';
import WarehouseManagerDashboard from '../pages/WarehouseManager';
import AdminDashboard from '../pages/AdminDashbord';
import BillerDashbord from '../pages/AddBill'

// Define a mapping of roles to dashboard components
const roleToComponent = {
  admin: AdminDashboard,
  storemanager: StoreManagerDashboard,
  warehousemanager: WarehouseManagerDashboard,
  biller:BillerDashbord,
};

const ProtectedRoute = ({ component: Component, requiredRoles, ...rest }) => {
  const { user } = useUser();

  if (!user) {
    // Redirect to login if the user is not authenticated
    console.log('User not authenticated. Redirecting to /signin');
    return <Navigate to="/signin" />;
  }

  // Check if the user has at least one of the required roles
  const hasRequiredRole = requiredRoles.includes(user.role);
  if (!hasRequiredRole) {
    // Redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }
  if (Component===null) {
    // Determine which dashboard to render based on the user's role
        const userRole = user.role || '';
        const DashboardComponent = roleToComponent[userRole];
        
        if (!DashboardComponent) {
          // Redirect to unauthorized page if the user has an unknown role
          return <Navigate to="/unauthorized" />;
        }
        
      // Render the protected component
      return <DashboardComponent {...rest} />;
        
  }

  
return Component ? <Component {...rest} /> : null;

};

export default ProtectedRoute;
