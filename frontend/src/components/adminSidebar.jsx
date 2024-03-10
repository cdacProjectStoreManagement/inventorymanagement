import React, { useState } from 'react';
import {
    FaTh,
    FaBars,
    FaUserAlt,
    FaWarehouse,
    FaShoppingBag,
    FaStore,
    FaPlus,
    FaTruck
} from "react-icons/fa";
import { NavLink } from 'react-router-dom';
import { useUser } from '../services/UserContext';

function AdminSidebar({ children }) {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const { user } = useUser();
    const menuItem = [
        {
            path: "/dashboard",
            name: "Dashboard",
            roles: ['admin', 'storemanager', 'warehousemanager','biller'],
            icon: <FaTh />
           
        },
        {
            path: "/user",
            name: "About",
            roles:['admin', 'storemanager', 'warehousemanager','biller'],
            icon: <FaUserAlt />
        },
        {
            path: "add",
            name: "Add Product",
            roles:['admin', 'storemanager', 'warehousemanager'],
            icon: <FaPlus />
        },
        {
            path: "/product",
            name: "Product",
            roles:['admin', 'storemanager', 'warehousemanager','biller'],
            icon: <FaShoppingBag />
        },
        {
            path: "/warehouse",
            name: "Warehouse",
            roles:['admin','warehousemanager'],
            icon: <FaWarehouse/>
        },
        {
            path: "/store",
            name: "Store",
            roles:['admin', 'storemanager'],
            icon: <FaStore />
        },
        {
            path: "/supplier",
            name: "Supplier",
            roles:['admin', 'warehousemanager'],
            icon: < FaTruck />
        },

    ];
    const filteredMenuItems = menuItem.filter(item => item.roles.includes(user.role));
    return (
        <div style={{ display: 'flex' }}>
            <div style={{ width: isOpen ? "200px" : "50px" }} className="sidebar">
                <div className="top_section">
                    <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">Content</h1>
                    <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
                        <FaBars onClick={toggle} />
                    </div>
                </div>
                {
                    filteredMenuItems.map((item, index) => (
                        <NavLink to={item.path} key={index} className="link" activeClassName="active">
                            <div className="icon">{item.icon}</div>
                            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
                        </NavLink>
                    ))
                }
            </div>
            <main style={{ flex: 1 }}>{children}</main>
        </div>
    );
}

export default AdminSidebar;
