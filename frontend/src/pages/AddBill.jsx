import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import AdminSidebar from '../components/adminSidebar';
import Config from '../config/config.json';
import { useUser } from '../services/UserContext';
const ProductItem = ({ product, onSelect }) => (
  <li key={product.id} onClick={() => onSelect(product)}>
    {product.productCode} {product.productName} ({product.productCategory})
  </li>
);

function BillForm() {
  const [orderData, setOrderData] = useState({
    totalAmount: 0,
    billDetails: [
      {
        product: {
          id: 0,
        },
        quantity: 0,
        amount: 0,
      },
    ],
  });
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const { storeId } = useParams();
  const [message, setMessage] = useState('');
  const [searchProduct, setSearchProduct] = useState('');
  const productUrl = Config.apiUrl + '/product';
  const parsedStoreId = parseInt(storeId, 10); // Convert to number
  const { user } = useUser();
  let orderUrl=null;
  let storeiid=null;
  if(user.role !== 'biller')
  {
    orderUrl=Config.apiUrl + `/bill/${parsedStoreId}`;
    storeiid = parsedStoreId;
  }
  else{
    orderUrl=Config.apiUrl + `/bill/${user.bussinessId}`
    storeiid = user.bussinessId;
  }
  console.log(orderUrl);


  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(productUrl).then((result) => {
      const productsReceived = result.data;
      setProducts(productsReceived);
    });
  };
  const onSearchProduct = ({ target }) => {
    document.getElementById('searchlistproduct').hidden = false;
    setSearchProduct(target.value);
  };

  const onSelectProductSearch = (selectedProduct) => {
    // Check if the selected product already exists in billDetails
    const existingProduct = orderData.billDetails.find(
      (orderDetail) => orderDetail.product.id === selectedProduct.id
    );

    if (existingProduct) {
      // If the product already exists, update its quantity and amount
      const updatedbillDetails = orderData.billDetails.map((orderDetail) =>
        orderDetail.product.id === selectedProduct.id
          ? {
              ...orderDetail,
              quantity: orderDetail.quantity + 1, // You can adjust this logic based on your requirements
              amount: (orderDetail.quantity + 1) * selectedProduct.sellingPrice, // Update the amount based on the new quantity
            }
          : orderDetail
      );

      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        billDetails: updatedbillDetails,
      }));
    } else {
      // If the product doesn't exist, add it as a new orderDetail
      setSelectedProducts((prevSelectedProducts) => [
        ...prevSelectedProducts,
        selectedProduct,
      ]);

      setOrderData((prevOrderData) => ({
        ...prevOrderData,
        billDetails: [
          ...prevOrderData.billDetails,
          {
            product: {
              id: selectedProduct.id,
            },
            quantity: 1, // You can set the initial quantity as needed
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
      totalAmount: 0,
      billDetails: [
        {
          product: {
            id: 0,
          },
          quantity: 0,
          amount: 0,
        },
      ],
    });
    setSelectedProducts([]);
    setSearchProduct('');
  };
  
  const calculateTotalAmount = () => {
    const total = orderData.billDetails.reduce(
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
      billDetails: prevOrderData.billDetails.filter(
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
            <h1>Store Id: {storeiid}</h1>
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
                            value={orderData.billDetails
                              .filter(
                                (orderDetail) =>
                                  orderDetail.product.id === product.id
                              )
                              .map(
                                (filteredOrderDetail) =>
                                  filteredOrderDetail.quantity
                              )[0]}
                            onChange={(e) => {
                              const quantity = parseInt(e.target.value, 10) || 0;
                              const amount = quantity * product.costPrice;

                              const updatedbillDetails = orderData.billDetails.map(
                                (orderDetail) => {
                                  if (
                                    orderDetail.product.id === product.id
                                  ) {
                                    return {
                                      ...orderDetail,
                                      amount: amount,
                                      quantity: quantity,
                                    };
                                  }
                                  return orderDetail;
                                }
                              );

                              setOrderData((prevOrderData) => ({
                                ...prevOrderData,
                                billDetails: updatedbillDetails,
                                totalAmount: orderData.billDetails.reduce(
                                  (total, orderDetail) =>
                                    total + orderDetail.amount,
                                  0
                                ),
                              }));
                            }}
                          />
                        </td>
                        <td>
                          {orderData.billDetails
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
                Add Bill
              </button>
            </div>
          </div>
        </div>
      </AdminSidebar>
    </div>
  );
}

export default BillForm;
