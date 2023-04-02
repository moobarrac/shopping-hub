import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen, setModalData } from '../../features/modalSlice';
import { formatPrice } from '../../utils/helpers';
import ProductModal from '../ProductModal/ProductModal';
import './ProductList.css'

const ProductList = ({products}) => {
  const dispatch = useDispatch();
  const { isModalOpen } = useSelector(state => state.modal)

  const openModal = data => {
    dispatch(setModalData(data));
    dispatch(setIsModalOpen(true));
  }

  return (
    <section className='product'>
      {isModalOpen && <ProductModal/>}
      <div className='container'>
        <div className='product-content'>
          <div className='section-title'>
            <h3>Our Products</h3>
          </div>
          <div className='product-items'>
            {
              products.slice(0, 20).map(product => (
                <div className='product-item' key={product.id} onClick={() => openModal(product)}>
                  <div className='product-item-img'>
                    <img src={product.images[0]} alt="" />
                    <div className='product-item-category'>{product.category.name}</div>
                  </div>
                  <div className='product-item-body'>
                    <h6 className='product-item-title'>{product.title}</h6>
                    <div className='product-item-price'>{formatPrice(product.price)}</div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductList