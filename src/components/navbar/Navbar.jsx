import React from 'react'
import'./Navbar.scss'
import Search from '../Search/Search'
import Sort from '../Sort/Sort'


const Navbar = () => {
  return (
    <>
    <div className="navbar">
      <div className="container navbar-content">
        <div className="navbar-logo">API Store</div>
        <div className="navbar-controls">
          <Search/>
          <Sort/>
        </div>
      </div>
    </div>
    </>
  )
}

export default Navbar