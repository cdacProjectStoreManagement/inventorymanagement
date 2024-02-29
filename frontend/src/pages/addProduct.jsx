import React, {useState} from 'react'
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import Productnavbar from '../components/productnavbar';
import config from '../config/config.json';
function AddProduct() {
    const [product, setProduct] = useState({productCode:0 ,productName:"", productDescription:"",productCategory:"",costPrice:0.0 ,sellingPrice:0.0 ,expiryDate:"",mfgDate:""});
    const [message, setMessage] = useState("");
    const url = config.apiUrl+"/product";
    const OnTextChanged=(args)=>{
        var copyOfProduct = {...product};
        copyOfProduct[args.target.name] =    args.target.value;
        setProduct(copyOfProduct)
    }
    
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
   const Reset = ()=>{
    setProduct({productCode:0 ,productName:"", prodcutDescription:"",productCategory:"",costPrice:0.0 ,sellingPrice:0.0 ,expiryDate:"",mfgDate:""});}


    const AddRecord = ()=>{
        // Validation for Product Code
        if (product.productCode <= 0) {
            ShowMessage("Please enter a valid product code.");
            return;
        }

        // Validation for Product Name
        if (product.productName.trim() === "") {
            ShowMessage("Please enter a product name.");
            return;
        }

        // Validation for Product Category
        if (product.productCategory.trim() === "") {
            ShowMessage("Please enter a product category.");
            return;
        }

        // Validation for Product Description
        if (product.productDescription.trim() === "") {
            ShowMessage("Please enter a product description.");
            return;
        }

        // Validation for Cost Price
        if (product.costPrice <= 0) {
            ShowMessage("Please enter a valid cost price.");
            return;
        }

        // Validation for Selling Price
        if (product.sellingPrice <= 0) {
            ShowMessage("Please enter a valid selling price.");
            return;
        }

        // Validation for MFG Date
        if (!product.mfgDate) {
            ShowMessage("Please select a manufacturing date.");
            return;
        }

        // Validation for Expiry Date
        if (!product.expiryDate || product.expiryDate < product.mfgDate) {
            ShowMessage("Please select a valid expiry date.");
            return;
        }

        // If all validations pass, proceed to submit the form
        axios.post(url, product).then((result)=>{
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

  return (
    <div>

        <AdminSidebar>
        <Productnavbar/>
        <div class="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3"  id='div1' hidden>{message}</div>
        <div class="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3"  id='div2' hidden>{message}</div>
        <div>
        <div class="row g-3">
            <div class="col-md-6">
                <label for="validationDefault01" class="form-label">Product Code</label>
                <input type="number" class="form-control" id="validationDefault01"  value={product.productCode} name="productCode" onChange={OnTextChanged} required/>
            </div>
            <div class="col-md-6">
                <label for="validationDefault02" class="form-label">Product Name</label>
                <input type="text" class="form-control" id="validationDefault02" value={product.productName} name="productName" onChange={OnTextChanged} required/>
            </div>
           
            <div class="col-md-6">
                <label for="validationDefault01" class="form-label">Product Category</label>
                <input type="text" class="form-control" id="validationDefault03"  value={product.productCategory} name="productCategory" onChange={OnTextChanged} required/>
            </div>
            <div class="col-md-6 mb-3">
                <label for="validationTextarea" class="form-label">Description</label>
                <textarea class="form-control" id="validationTextarea" value={product.productDescription} name="productDescription" onChange={OnTextChanged} required></textarea>
            </div>
            <div class="col-md-6">
                <label for="validationDefault02" class="form-label">Cost Price</label>
                <input type="number" class="form-control" id="validationDefault04" step="0.01" value={product.costPrice} name="costPrice" onChange={OnTextChanged} required/>
            </div>
            <div class="col-md-6">
                <label for="validationDefault02" class="form-label">Selling Price</label>
                <input type="number" class="form-control" id="validationDefault05" step="0.01" value={product.sellingPrice} name="sellingPrice" onChange={OnTextChanged} required/>
            </div>
            <div class="col-md-6">
                <label for="validationDefault02" class="form-label">MFG. Date</label>
                <input type="date" class="form-control" id="validationDefault06" value={product.mfgDate} name="mfgDate" onChange={OnTextChanged} required/>
            </div>
            <div class="col-md-6">
                <label for="validationDefault02" class="form-label">Expiry Date</label>
                <input type="date" class="form-control" id="validationDefault07" min={product.mfgDate} value={product.expiryDate} name="expiryDate" onChange={OnTextChanged} />
            </div>
            <div class="col-12">
                <button class="btn btn-primary" onClick={AddRecord}>Add Product</button>
            </div>
        </div>
        </div>
    </AdminSidebar>
    </div>
  )
}

export default AddProduct
