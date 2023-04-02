import React, { useState } from 'react';
import './ProductModal.css';
import { FaTimes, FaPlus, FaMinus } from 'react-icons/fa';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setIsModalOpen } from '../../features/modalSlice';
import { addToCart } from '../../features/cartSlice';
import { formatPrice } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';


const ProductModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalData: product } = useSelector(state => state.modal);
  const [qty, setQty] = useState(1);


  const increaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty + 1;
      return newQty;
    })
  }

  const decreaseQty = () => {
    setQty((prevQty) => {
      let newQty = prevQty - 1;
      if(newQty < 1){
        newQty = 1;
      }
      return newQty;
    })
  }
  const addToCartHandler = product => {
    let totalPrice = qty * product.price;
    dispatch(addToCart({ ...product, totalPrice, quantity: qty }));
    dispatch(setIsModalOpen(false));
    navigate('/cart');
  }


  const modalOverlayHandler = (e) => {
    if(e.target.classList.contains('overlay-bg')){
      dispatch(setIsModalOpen(false));
    }
  }

  return (
    <div className='overlay-bg' onClick={modalOverlayHandler}>
      <div className='product-details-modal'>
        <button className='modal-close-btn' onClick={() => dispatch(setIsModalOpen(false))}>
          <FaTimes/>
        </button>
        <div className='details-content'>
          <div className='details-left'>
            <div className='details-img'>
            <img src = {product.images[0]} alt = {product.title} />
            </div>
          </div>
          <div className='details-left'>
            <div className = "details-info">
              <h3 className = "title">{product.title}</h3>
              <p className='description'>{product.description}</p>
              <div className='price'>Price: {formatPrice(product.price)}</div>
              <div className = "qty">
                <span className = "qty-text">Qty: </span>
                <div className = "qty-change">
                  <button type = "button" className='qty-dec' onClick={() => decreaseQty()}>
                    <FaMinus />
                  </button>
                  <span className = "qty-value">{qty}</span>
                  <button type = "button" className='qty-inc' onClick={() => increaseQty()}>
                    <FaPlus/>
                  </button>
                </div>
              </div>
              <button type = "button" className='btn-primary add-to-cart-btn'>
                  <span className = "btn-icon">
                    <AiOutlineShoppingCart/>
                  </span>
                  <span className = 'btn-text' onClick={() => addToCartHandler(product)}>Add To Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductModal