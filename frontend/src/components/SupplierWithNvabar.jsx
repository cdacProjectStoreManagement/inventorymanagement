import React from 'react'
import {Link} from 'react-router-dom'

function Suppliernavbar() {
  return (
    <div>
      <nav class="navbar bg-dark text-light">
        <div class="container-fluid">
            <h2>Supplier</h2>
            <ul class="nav justify-content-end">
            <li class="nav-item">
            <Link to='/supplier' class="nav-link active" aria-current="page" >View Supplier</Link>
            </li>
            <li class="nav-item">
            <Link to='/supplier/add' class="nav-link" aria-current="page" >Add Supplier</Link>
            </li>
            </ul>
        </div>
        </nav>
        <hr/>
    </div>
  )
}

export default Suppliernavbar
