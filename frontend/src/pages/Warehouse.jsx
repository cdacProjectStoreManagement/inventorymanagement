import React, { useState, useEffect } from "react";
import axios from "axios";
import AdminSidebar from "../components/adminSidebar";
import WarehouseNavbarWithSearch from "../components/WareHouseNavbarWithSearch";
import { Link } from "react-router-dom";
function Product() {
  const [warehouses, setWarehouses] = useState([]);
  const [searchText, setSearchText] = useState("");

  const url = "http://127.0.0.1:8080/warehouse";

  useEffect(() => {
    GetRecords();
  }, []); // Equivalent to componentDidMount

  const GetRecords = () => {
    axios.get(url).then((result) => {
      var warehouseReceived = result.data;
      setWarehouses(warehouseReceived);
    });
  };

  const OnSearchHandle = ({ target }) => {
    setSearchText(target.value);
  };
  

  return (
    <div>
      <AdminSidebar>
        <div>
          <WarehouseNavbarWithSearch onChange={OnSearchHandle} />
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead className="table-dark">
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
                {warehouses.length === 0 ? (
                  <tr>
                    <td colSpan="8">No matching products found.</td>
                  </tr>
                ) : (
                  warehouses
                    .filter(
                      (warehouse) =>
                        searchText === "" ||
                        warehouse.warehouseName
                          ?.toString()
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                        warehouse.locationCity
                          ?.toString()
                          .toLowerCase()
                          .includes(searchText.toLowerCase()) ||
                        warehouse.locationCountry
                          ?.toString()
                          .toLowerCase()
                          .includes(searchText.toLowerCase())
                    )
                    .map((warehouse) => (
                      <tr key={warehouse.id}>
                        <td>{warehouse.warehouseName}</td>
                        <td>{warehouse.locationAddress}</td>
                        <td>{warehouse.locationCity}</td>
                        <td>{warehouse.locationState}</td>
                        <td>{warehouse.locationCountry}</td>
                        <td>{warehouse.locationPincode}</td>
                        <td >
                          <Link to={`/neworder/${warehouse.id}`} class="nav-link" aria-current="page" style={{color:"green"}}>add Order</Link>
                          <Link to={`/order/${warehouse.id}`} class="nav-link" aria-current="page" style={{color:"green"}}>view Order</Link>
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
