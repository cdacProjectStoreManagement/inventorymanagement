import React, {useState} from 'react'
import axios from 'axios';
import AdminSidebar from '../components/adminSidebar';
import Suppliernavbar from '../components/SupplierNavbarwithoutsearch';
import config from '../config/config.json';

function AddSupplier() {
    const [supplier, setSupplier] = useState({
      supplierName: '',
      supplierAddress: '',
      supplierContact: '',
      company: '',
    });
  
    const [message, setMessage] = useState('');
    const url = config.apiUrl + '/supplier';
  
    const onTextChanged = (args) => {
      var copyOfSupplier = { ...supplier };
      copyOfSupplier[args.target.name] = args.target.value;
      setSupplier(copyOfSupplier);
    };
  
    const showMessage = (msg) => {
      setMessage(msg);
      document.getElementById('div1').hidden = false;
      setTimeout(() => {
        document.getElementById('div1').hidden = true;
        setMessage('');
      }, 2000);
    };
  
    const showSuccess = (msg) => {
      setMessage(msg);
      document.getElementById('div2').hidden = false;
      setTimeout(() => {
        document.getElementById('div2').hidden = true;
        setMessage('');
      }, 2000);
    };
  
    const reset = () => {
      setSupplier({
        supplierName: '',
        supplierAddress: '',
        supplierContact: '',
        company: '',
      });
    };
  
    const validateForm = () => {
      // Simple validation: Check if all fields are filled
      const { supplierName, supplierAddress, supplierContact, company } = supplier;
      if (!supplierName || !supplierAddress || !supplierContact || !company) {
        showMessage('Please fill in all fields.');
        return false;
      }
      return true;
    };
  
    const addRecord = () => {
      if (validateForm()) {
        axios.post(url, supplier).then((result) => {
          if (result.status === 201) {
            reset();
            showSuccess('Supplier is Added!');
          } else {
            showMessage('Something went wrong!');
          }
        });
      }
    };
  
    return (
        <div>
        <AdminSidebar>
          <Suppliernavbar />
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
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="validationDefault01" className="form-label">
                  Supplier Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault01"
                  value={supplier.supplierName}
                  name="suppilerName"
                  onChange={onTextChanged}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="validationDefault02" className="form-label">
                  Contact
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault02"
                  value={supplier.supplierContact}
                  name="supplierContact"
                  onChange={onTextChanged}
                  required
                />
              </div>
  
              <div className="col-md-6">
                <label htmlFor="validationDefault01" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationDefault03"
                  value={supplier.company}
                  name="company"
                  onChange={onTextChanged}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="validationTextarea" className="form-label">
                  Supplier Address
                </label>
                <textarea
                  className="form-control"
                  id="validationTextarea"
                  value={supplier.supplierAddress}
                  name="supplierAddress"
                  onChange={onTextChanged}
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <button className="btn btn-primary" onClick={addRecord}>
                  Add Supplier
                </button>
              </div>
            </div>
          </div>
        </AdminSidebar>
      </div>
    );
  }
  
  export default AddSupplier;
  