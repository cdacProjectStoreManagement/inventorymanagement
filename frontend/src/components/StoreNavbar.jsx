import React from 'react'
import {Link} from 'react-router-dom'

function StoreNavbar(props) {
  return (
    <div>
      <nav class="navbar bg-dark text-light">
        <div class="container-fluid">
            <h2>Store</h2>
             
            <ul class="nav justify-content-end">
            <li class="nav-item">
            <Link to='/store' class="nav-link active" aria-current="page" >View Store</Link>
            </li>
            <li class="nav-item">
            <Link to='/store/add' class="nav-link" aria-current="page" >Add Store</Link>
            </li>
            </ul>
        </div>
        </nav>
        <hr/>
    </div>
  )
}

export default StoreNavbar
