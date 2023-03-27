import React from 'react'
import { Link } from 'react-router-dom'
import './Category.css'

const Category = ({categories}) => {
  return (
    <div className='categories'>
      <div className='container'>
        <div className='categories-content'>
          <div className='section-title'>
            <h3>Category</h3>
          </div>
          <div className='category-items'>
            {
              categories.slice(0, 5).map(category => (
                <div key={category.id}>
                  <Link to={`/category/${category.id}`}>
                    <div className='category-item'>
                      <div className='category-item-img'>
                        <img src={category.image} alt={category.name} />
                      </div>
                      <div className='category-item-name'>
                        <h6>{category.name}</h6>
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Category