import React from 'react'
import './Navbar.css'
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min'
const Navbar = () => {
  return (
    <>
    
    <div className="navbar_whole">
        <div className="inn_navbar">
               <NavLink to="/" className="logo_text">M<span>C</span>S</NavLink>
                <NavLink to="/add" className="btn btn-primary">Add Item &nbsp; <i class='bx bx-plus'></i></NavLink>
        </div>
    </div>
    
    </>
  )
}

export default Navbar