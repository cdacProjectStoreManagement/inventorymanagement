import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AdminSidebar from '../components/adminSidebar';
import Config from '../config/config.json';

const SupplierItem = ({ supplier, onSelect }) => (
  <li key={supplier.id} onClick={() => onSelect(supplier)}>
    {supplier.id} {supplier.supplierName} ({supplier.company})
  </li>
);

const ProductItem = ({ product, onSelect }) => (
  <li key={product.id} onClick={() => onSelect(product)}>
    {product.productCode} {product.productName} ({product.productCategory})
  </li>
);

function OrderForm() {
  const [orderData, setOrderData] = useState({
    orderDate: '',
    arrivedDate: '',
    totalAmount: 0,
    supplier: {
      id: 0,
    },
    orderDetails: [
      {
        product: {
          id: 0,
        },
        orderQuantity: 0,
        amount: 0,
      },
    ],
  });
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const { warehouseId } = useParams();
  const [message, setMessage] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const productUrl = Config.apiUrl + '/product';
  const supplierUrl = Config.apiUrl + '/supplier';
  const parsedWarehouseId = parseInt(warehouseId, 10); // Convert to number
  const orderUrl = Config.apiUrl + `/order/${parsedWarehouseId}`;
  console.log(orderUrl);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  useEffect(() => {
    getProducts();
    getSuppliers();
  }, []);

  const getProducts = () => {
    axios.get(productUrl).then((result) => {
      const productsReceived = result.data;
      setProducts(productsReceived);
    });
  };

  const getSuppliers = () => {
    axios.get(supplierUrl).then((result) => {
      const suppliersReceived = result.data;
      setSuppliers(suppliersReceived);
    });
  };

  const onSearch = ({ target }) => {
    document.getElementById('searchlist').hidden = false;
    setSearchText(target.value);
  };

  const onSearchProduct = ({ target }) => {
    document.getElementById('searchlistproduct').hidden = false;
    setSearchProduct(target.value);
  };

  const onSelectSupplier = (selectedSupplier) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      supplier: {
        id: selectedSupplier.id,
      },
    }));
    document.getElementById('searchlist').hidden = true;
  };

  const onSelectProductSearch = (selectedProduct) => {
    // Check if the selected product already exists in orderDetails
    const existingProduct = orderData.orderDetails.find(
      (orderDetail) => orderDetail.product.id === selectedProduct.id
    );

    if (existingProduct) {
      // If the product already exists, update its quantity and amount
      const updatedOrderDetails = orderData.orderDetails.map((orderDetail) =>
        orderDetail.product.id === selectedProduct.id
          ? {
              ...orderDetail,
              orderQuantity: orderDetail.orderQuantity + 1, // You can adjust this logic based on your requirements
              amount: (orderDetail.orderQuantity + 1) * selectedProduct.costPrice, // Update the amount based on the new quantity
            }
          : orderDetail
      );

      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        orderDetails: updatedOrderDetails,
      }));
    } else {
      // If the product doesn't exist, add it as a new orderDetail
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        selectedProduct,
      ]);

      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        orderDetails: [
          ...prevOrderData.orderDetails,
          {
            product: {
              id: selectedProduct.id,
            },
            orderQuantity: 1, // You can set the initial quantity as needed
            amount: selectedProduct.costPrice, // You can set the initial amount based on the product's costPrice
          },
        ],
      }));
    }

    // Hide the product search list
    document.getElementById('searchlistproduct').hidden = true;
    calculateTotalAmount();
  };

  const onTextChanged = (args) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      [args.target.name]: args.target.value,
    }));
  };

  const validateOrderData = () => {
    if (!orderData.orderDate) {
      ShowMessage('Please select the Order Date.');
      return false;
    }

    if (orderData.arrivedDate && orderData.arrivedDate < orderData.orderDate) {
      ShowMessage('Arrival Date must be after the Order Date.');
      return false;
    }

    return true;
  };

  const ShowMessage = (msg) => {
    setMessage(msg);
    document.getElementById('div1').hidden = false;
    setTimeout(() => {
      document.getElementById('div1').hidden = true;
      setMessage('');
    }, 2000);
  };

  const ShowSuccess = (msg) => {
    setMessage(msg);
    document.getElementById('div2').hidden = false;
    setTimeout(() => {
      document.getElementById('div2').hidden = true;
      setMessage('');
    }, 2000);
  };

  const Reset = () => {
    setOrderData({
      orderDate: '',
      arrivedDate: '',
      totalAmount: 0,
      supplier: {
        id: 0,
      },
      orderDetails: [
        {
          product: {
            id: 0,
          },
          orderQuantity: 0,
          amount: 0,
        },
      ],
    });
    setSearchText('');
    setSelectedProducts([]);
    setSearchProduct('');
  };
  
  const calculateTotalAmount = () => {
    const total = orderData.orderDetails.reduce(
      (total, orderDetail) => total + orderDetail.amount,
      0
    );

    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      totalAmount: total,
    }));
  };

  const AddRecord = () => {
    calculateTotalAmount();
    removeOrderDetail(0);
    if (!validateOrderData()) {
      return;
    }
    

    axios
      .post(orderUrl, orderData)
      .then((result) => {
        if (result.status === 201) {
          Reset();
          ShowSuccess('Product is Added!');
        } else {
          ShowMessage('Something went wrong!');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  const removeOrderDetail = (productIdToRemove) => {
    setOrderData((prevOrderData) => ({
      ...prevOrderData,
      orderDetails: prevOrderData.orderDetails.filter(
        (orderDetail) => orderDetail.product.id !== productIdToRemove
      ),
    }));
  
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.id !== productIdToRemove)
    );
  };
  
  
  return (
    <div>
      <AdminSidebar>
        <div className="container-fluid">
          <div>
            <h1>Warehouse: {warehouseId}</h1>
            <br />
          </div>
          <div
            className="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3"
            id="div1"
            hidden
          >
            {message}
          </div>
          <div
            className="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"
            id="div2"
            hidden
          >
            {message}
          </div>
          <div>
            <label htmlFor="searchbar" className="form-label">
              Supplier
            </label>
            <h2>Selected Supplier: {orderData.supplier.id}</h2>
          </div>
          <div className="dropdown-center">
            <input
              id="searchbar"
              className="col-8 dropdown-search show"
              type="search"
              data-bs-toggle="dropdown"
              aria-expanded="true"
              onChange={onSearch}
              value={searchText}
            />
            <ul
              className="dropdown-menu show"
              id="searchlist"
              data-popper-placement="bottom"
              hidden
            >
              {suppliers.length === 0 ? (
                <li colSpan="8">
                  <Link
                    to="/supplier/add"
                    className="nav-link"
                    aria-current="page"
                  >
                    Add Supplier
                  </Link>
                </li>
              ) : (
                suppliers
                  .filter(
                    (supplier) =>
                      searchText === '' ||
                      supplier.id
                        ?.toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      supplier.supplierName
                        ?.toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase()) ||
                      supplier.company
                        ?.toString()
                        .toLowerCase()
                        .includes(searchText.toLowerCase())
                  )
                  .map((supplier) => (
                    <SupplierItem
                      key={supplier.id}
                      supplier={supplier}
                      onSelect={onSelectSupplier}
                    />
                  ))
              )}
            </ul>
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefault02" className="form-label">
              Order Date
            </label>
            <input
              type="date"
              className="form-control"
              id="validationDefault06"
              value={orderData.orderDate}
              name="orderDate"
              onChange={onTextChanged}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="validationDefault02" className="form-label">
              Arrival Date
            </label>
            <input
              type="date"
              className="form-control"
              id="validationDefault07"
              min={orderData.orderDate}
              value={orderData.arrivedDate}
              name="arrivedDate"
              onChange={onTextChanged}
            />
          </div>
          <br />
          <div>
            <div>
              <label htmlFor="searchbar" className="form-label">
                Products
              </label>
            </div>
            <div className="dropdown-center">
              <input
                id="searchbar"
                className="col-8 dropdown-search show"
                type="search"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                onChange={onSearchProduct}
                value={searchProduct}
              />
              <ul
                className="dropdown-menu show"
                id="searchlistproduct"
                data-popper-placement="bottom"
                hidden
              >
                {products.length === 0 ? (
                  <li colSpan="8">
                    {' '}
                    <Link
                      to="/product/add"
                      className="nav-link"
                      aria-current="page"
                    >
                      Add Product
                    </Link>
                  </li>
                ) : (
                  products
                    .filter(
                      (product) =>
                        searchProduct === '' ||
                        product.productCode
                          ?.toString()
                          .toLowerCase()
                          .includes(searchProduct.toLowerCase()) ||
                        product.productName
                          ?.toString()
                          .toLowerCase()
                          .includes(searchProduct.toLowerCase()) ||
                        product.productCategory
                          ?.toString()
                          .toLowerCase()
                          .includes(searchProduct.toLowerCase())
                    )
                    .map((product) => (
                      <ProductItem
                        key={product.id}
                        product={product}
                        onSelect={onSelectProductSearch} // Use the updated function
                      />
                    ))
                )}
              </ul>
            </div>
            <br />
            <div>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Code</th>
                      <th>Name</th>
                      <th>Category</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedProducts.map((product) => (
                      <tr key={product.id}>
                        <td>{product.productCode}</td>
                        <td>{product.productName}</td>
                        <td>{product.productCategory}</td>
                        <td>
                          <input
                            type="number"
                            value={orderData.orderDetails
                              .filter(
                                (orderDetail) =>
                                  orderDetail.product.id === product.id
                              )
                              .map(
                                (filteredOrderDetail) =>
                                  filteredOrderDetail.orderQuantity
                              )[0]}
                            onChange={(e) => {
                              const quantity = parseInt(e.target.value, 10) || 0;
                              const amount = quantity * product.costPrice;

                              const updatedOrderDetails = orderData.orderDetails.map(
                                (orderDetail) => {
                                  if (
                                    orderDetail.product.id === product.id
                                  ) {
                                    return {
                                      ...orderDetail,
                                      amount: amount,
                                      orderQuantity: quantity,
                                    };
                                  }
                                  return orderDetail;
                                }
                              );

                              setOrderData((prevOrderData) => ({
                                ...prevOrderData,
                                orderDetails: updatedOrderDetails,
                                totalAmount: orderData.orderDetails.reduce(
                                  (total, orderDetail) =>
                                    total + orderDetail.amount,
                                  0
                                ),
                              }));
                            }}
                          />
                        </td>
                        <td>
                          {orderData.orderDetails
                            .filter(
                              (orderDetail) =>
                                orderDetail.product.id === product.id
                            )
                            .map(
                              (filteredOrderDetail) =>
                                filteredOrderDetail.amount
                            )[0]}
                        </td>
                        <td>
                        <button className="btn btn-primary col-12" onClick={() => removeOrderDetail(product.id)}>
                          Remove
                        </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-12">
              <h2>Total Amount: {orderData.totalAmount}</h2>
            </div>
            <div className="col-12">
              <button className="btn btn-primary col-12" onClick={AddRecord}>
                Add Order
              </button>
            </div>
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}

export default OrderForm;
