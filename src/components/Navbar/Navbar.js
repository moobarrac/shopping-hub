import React, { useEffect, useState } from 'react'
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaBars, FaTimes } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchCategories } from '../../features/categorySlice'
import './Navbar.css'

const Navbar = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector(state => state.categories);
  const { totalItems } = useSelector(state => state.carts)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  return (
    <nav className='navbar'>
      <div className='navbar-content'>
        <div className='navbar-top container'>
          <Link to='/' className='navbar-brand'>
            <span className='text-blue'>Shopping</span>
            <span className='text-yellow'>Hub.</span>
          </Link>
          <form className='navbar-search'>
            <input type="text" placeholder='Search here...' />
            <button type = "submit" className = "navbar-search-btn">
              <AiOutlineSearch/>
            </button>
          </form>
          <div className='navbar-cart'>
            <Link to='/cart' className='add-to-cart-btn'>
              <span className='cart-icon'>
                <AiOutlineShoppingCart/>
              </span>
              <div className='cart-text'>
                Cart
                <span className='cart-count'>{totalItems}</span>
              </div>
            </Link>
          </div>
        </div>

        <div className='navbar-bottom'>
          <div className='container'>
            <ul className={`nav-links text-white ${isSidebarOpen ? 'show-nav-links' : ""}`}>
              <button className='navbar-hide-btn'  onClick={() => setIsSidebarOpen(false)}>
                <FaTimes/>
              </button>
              {
                categories.slice(0, 5).map(category => (
                  <li key={category.id}><Link to={`/category/${category.id}`} className="nav-link text-white" onClick={() => setIsSidebarOpen(false)}>{category.name}</Link></li>
                ))
              }
            </ul>

            <button type = "button" className='navbar-show-btn'  onClick={() => setIsSidebarOpen(true)}>
              <FaBars/>
            </button>
          </div>
          
        </div>
      </div>
    </nav>
  )
}

export default Navbar