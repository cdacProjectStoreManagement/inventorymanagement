import React, { useState } from 'react'
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import config from '../config/config.json'
import StoreNavbar from '../components/StoreNavbar';

function Addstore(s) {
    const [store, setstore] = useState({
        storeName: "",
        locationAddress: "",
        locationCity: "",
        locationState: "",
        locationCountry: "",
        locationPincode: ""
    });
    const [message, setMessage] = useState("");
    const url = config.apiUrl+"/store";

    const OnTextChanged = (args) => {
        var copyOfstore = { ...store };
        copyOfstore[args.target.name] = args.target.value;
        setstore(copyOfstore)
    }

    const ShowMessage = (msg) => {
        setMessage(msg);
        document.getElementById('div1').hidden = false
        setTimeout(() => {
            document.getElementById('div1').hidden = true
            setMessage("");
        }, 2000);
    }
    const ShowSucces = (msg) => {
        setMessage(msg);
        document.getElementById('div2').hidden = false
        setTimeout(() => {
            document.getElementById('div2').hidden = true
            setMessage("");
        }, 2000);
    }
    const Reset = () => {
        setstore({
            storeName: "",
            locationAddress: "",
            locationCity: "",
            locationState: "",
            locationCountry: "",
            locationPincode: ""
        })
    }

    const AddRecord = () => {
        // Validation for store name
        if (store.storeName.trim() === "") {
            ShowMessage("Please enter storeName");
            return;
        }

        // Validation for Product Name
        if (store.locationAddress.trim() === "") {
            ShowMessage("Please enter address(building no./street).");
            return;
        }

        // Validation for Product Category
        if (store.locationCity.trim() === "") {
            ShowMessage("Please enter city.");
            return;
        }

        // Validation for Product Description
        if (store.locationState.trim() === "") {
            ShowMessage("Please enter state");
            return;
        }

        // Validation for Cost Price
        if (store.locationCountry.trim() === "") {
            ShowMessage("Please enter a valid country.");
            return;
        }

        // Validation for Selling Price
        if (store.locationPincode.length === 5 || store.locationPincode === "") {
            ShowMessage("Please enter a valid pin-code.");
            return;
        }

        // If all validations pass, proceed to submit the form
        axios.post(url, store).then((result) => {
            if (result.status === 201) {
                Reset();
                ShowSucces("store is Added!");

            }
            else {
                ShowMessage("Something went wrong!")
            }
        });
    }

    return <>
        <div>
            <AdminSidebar>
                <StoreNavbar />
                <div class="p-3 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-3" id='div1' hidden>{message}</div>
                <div class="p-3 text-success-emphasis bg-success-subtle border border-success-subtle rounded-3" id='div2' hidden>{message}</div>
                <div>
                    <div class="row g-3">
                        <div class="col-md-6">
                            <label for="validationDefault01" class="form-label">tore Name:</label>
                            <input type="text" class="form-control" id="validationDefault01" value={store.storeName} name="storeName" onChange={OnTextChanged} required />
                        </div>
                        <div class="col-md-6">
                            <label for="validationDefault02" class="form-label">Area/Street:</label>
                            <input type="text" class="form-control" id="validationDefault02" value={store.locationAddress} name="locationAddress" onChange={OnTextChanged} required />
                        </div>

                        <div class="col-md-6">
                            <label for="validationDefault01" class="form-label">City</label>
                            <input type="text" class="form-control" id="validationDefault03" value={store.locationCity} name="locationCity" onChange={OnTextChanged} required />
                        </div>
                        <div class="col-md-6">
                            <label for="validationDefault02" class="form-label">State</label>
                            <input type="text" class="form-control" id="validationDefault04" step="0.01" value={store.locationState} name="locationState" onChange={OnTextChanged} required />
                        </div>
                        <div class="col-md-6">
                            <label for="validationDefault02" class="form-label">Country</label>
                            <input type="text" class="form-control" id="validationDefault04" step="0.01" value={store.locationCountry} name="locationCountry" onChange={OnTextChanged} required />
                        </div>
                        <div class="col-md-6">
                            <label for="validationDefault02" class="form-label">Pin code</label>
                            <input type="text   " class="form-control" id="validationDefault05" step="0.01" value={store.locationPincode} name="locationPincode" onChange={OnTextChanged} required />
                        </div>

                        <div class="col-12">
                            <button class="btn btn-primary" onClick={AddRecord}>Add store</button>
                        </div>
                    </div>
                </div>
            </AdminSidebar>
        </div>
    </>





}

export default Addstore;