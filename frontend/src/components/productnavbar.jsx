import React from 'react'
import {Link} from 'react-router-dom'

function Productnavbar() {
  return (
    <div>
      <nav class="navbar bg-dark text-light">
        <div class="container-fluid">
            <h2>Products</h2>
            <ul class="nav justify-content-end">
            <li class="nav-item">
            <Link to='/product' class="nav-link active" aria-current="page" >View Product</Link>
            </li>
            <li class="nav-item">
            <Link to='/product/add' class="nav-link" aria-current="page" >Add Product</Link>
            </li>
            </ul>
        </div>
        </nav>
        <hr/>
    </div>
  )
}

export default Productnavbar
