import React from 'react'
import {Link} from 'react-router-dom'

function Productnavbarwithsearch(props) {
  return (
    <div>
      <nav class="navbar bg-dark text-light">
        <div class="container-fluid">
            <h2>Products</h2>
            <center>
                <div style={{width:500}}>
                <input class="form-control me-2"  type="search" placeholder="Search" aria-label="Search" onChange={props.onChange}/>
                </div>
            </center>
        </div>
        </nav>
        <hr/>
    </div>
  )
}

export default Productnavbarwithsearch
