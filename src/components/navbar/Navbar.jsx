import React from 'react'
import'./Navbar.scss'
import Search from '../search/Search.jsx'
import Sort from '../sort/Sort.jsx'


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