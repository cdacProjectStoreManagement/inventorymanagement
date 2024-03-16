import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
const ProductItem = ({ product, onSelect }) => (
  <li key={product.id} onClick={() => onSelect(product)}>
    {product.productCode} {product.productName} ({product.productCategory}) price: {product.costPrice}
  </li>
);

const WarehouseStock = (props) => {
  const [products, setProducts] = useState([]);
  const [inventory, setInventory] = useState({
    id: "",
    quantity: 0,
    minimumStockLevel: 0,
    maximumStockLevel: 0,
    reOrderLimit: 0,
    product: {id: 0}, 
  });
  const {warehouseId}= useParams();
  const [message, setMessage] = useState("");
  const [searchText, setSearchText] = useState('');

  const productUrl = "http://127.0.0.1:8080/product";
  const InventoryUrl=  `http://127.0.0.1:8080/warehouse/addinventory/${warehouseId}`;
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    axios.get(productUrl).then((result) => {
      const productReceived = result.data;
      setProducts(productReceived);
    });
  };

  const onSearch = ({ target }) => {
    document.getElementById("searchlist").hidden = false;
    setSearchText(target.value);
  };

  const onTextChanged = (args) => {
    setInventory(prevInventory => ({
      ...prevInventory,
      [args.target.name]: args.target.value
    }));
  };

  const ShowMessage=(msg)=>{
    setMessage(msg);
    document.getElementById('div1').hidden=false
    setTimeout(() => {
        document.getElementById('div1').hidden=true
            setMessage("");
    }, 2000);
}
const ShowSucces=(msg)=>{
setMessage(msg);
document.getElementById('div2').hidden=false
setTimeout(() => {
    document.getElementById('div2').hidden=true
        setMessage("");
}, 2000);
}
  const onSelect = (selectedProduct) => {
    document.getElementById("searchlist").hidden = true;
    setInventory(prevInventory => ({
      ...prevInventory,
      product: selectedProduct.id
    }));
    setSearchText(`${selectedProduct.productCode} ${selectedProduct.productName}`);
  };
  const AddRecord=()=>
  {
    axios.post(InventoryUrl, inventory).then((result)=>{
      if(result.status===201)
       {
            Reset();
           ShowSucces("Product is Added!");
           
       }
       else
       {
           ShowMessage("Something went wrong!")
       }
   });
  }
  const Reset=()=>{
    setInventory({
      id: "",
      quantity: 0,
      minimumStockLevel: 0,
      maximumStockLevel: 0,
      reOrderLimit: 0,
      productId: 0 
      });
  }

  return (
    <div>
      <div className="container-fluid">
        <div>
          <h1> warehouse : {warehouseId}</h1>
          <hr/>
        </div>
      <div class="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3"  id='div1' hidden>{message}</div>
      <div class="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"  id='div2' hidden>{message}</div>
        <div>
          <label htmlFor="searchbar" className="form-label">Product </label>
          <h2>Selected Product: {inventory.productId}</h2>
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
          <ul className="dropdown-menu show" id="searchlist" data-popper-placement="bottom" hidden>
            {products.length === 0 ? (
              <li colSpan="8">No matching products found.</li>
            ) : (
              products
                .filter(product => (
                  searchText === "" ||
                  product.productCode?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                  product.productName?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
                  product.productCategory?.toString().toLowerCase().includes(searchText.toLowerCase())
                ))
                .map(product => (
                  <ProductItem key={product.id} product={product} onSelect={onSelect} />
                ))
            )}
          </ul>
        </div>
            <div class="col-md-6">
                <label for="validationDefault01" class="form-label">Product Quantity</label>
                <input type="number" class="form-control" id="validationDefault01" min={0}  value={inventory.quantity} name="quantity" onChange={onTextChanged} required/>
            </div>
            <div class="col-md-6">
                <label for="validationDefault01" class="form-label">Minimum StockLevel</label>
                <input type="number" class="form-control" id="validationDefault01" min={0}  value={inventory.minimumStockLevel} name="minimumStockLevel" onChange={onTextChanged} required/>
            </div>
            <div class="col-md-6">
                <label for="validationDefault01" class="form-label">Maximum StockLevel</label>
                <input type="number" class="form-control" id="validationDefault01" min={0} value={inventory.maximumStockLevel} name="maximumStockLevel" onChange={onTextChanged} required/>
            </div>
            <div class="col-md-6">
                <label for="validationDefault01" class="form-label">Reorder Limit</label>
                <input type="number" class="form-control" id="validationDefault01" min={0} value={inventory.reOrderLimit} name="reOrderLimit" onChange={onTextChanged} required/>
            </div>
            <div class="col-12">
                <button class="btn btn-primary" onClick={AddRecord}>Add Stock</button>
            </div>

      </div>
    </div>
  );
};


export default WarehouseStock
