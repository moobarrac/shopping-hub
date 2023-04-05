import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai'
import { BiTrash } from 'react-icons/bi'
import { FaMinus, FaPlus } from 'react-icons/fa'
import './CartPage.css'
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCartTotal, removeFromCart, toggleCart } from '../../features/cartSlice';
import { formatPrice } from '../../utils/helpers';

const CartPage = () => {
  const { carts, totalAmount, totalItems, deliveryCharge } = useSelector(state => state.carts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartTotal())
  })

  return (
    <div className='cart-page'>
      <div className='container'>
        <div className='breadcrumb'>
          <ul className='breadcrumb-items'>
            <li className = "breadcrumb-item">
              <Link to = "/">
                <AiOutlineHome/>
                <span className = "breadcrumb-seperator">
                  <AiOutlineRight/>
                </span>
              </Link>
            </li>
            <li>Cart</li>
          </ul>
        </div>
      </div>
      <div className='cart-container'>
        <div className='container'>
          <div className='section-title'>
            <h3>My Cart</h3>
          </div>
          {
            carts.length === 0 ? (
              <h4 className='empty-cart'>No items found!</h4>
            ) : (
              <div className='cart-content'>
                <div className='cart-left'>
                  <div className='cart-items'>
                    {
                      carts.map(item => (
                        <div className='cart-item' key={item.id}>
                          <div className='cart-item-img'>
                            <img src={item.images[0]} alt={item.title} />
                            <button type='button' className='remove-btn' onClick={() => dispatch(removeFromCart(item.id))}>
                              <span className='btn-square-icon'>
                                <BiTrash/>
                              </span>
                            </button>
                          </div>
                          <div className='cart-item-info'>
                            <h6>{item.title}</h6>
                            <div className='qty'>
                              <span className='qty-text'>Qty: </span>
                              <div className='qty-change'>
                                <button className='qty-dec' onClick={() => dispatch(toggleCart({id: item.id, type: 'DEC'}))}>
                                  <FaMinus/>
                                </button>
                                <span className='qty-value'>{item.quantity}</span>
                                <button className='qty-inc' onClick={() => dispatch(toggleCart({id: item.id, type: 'INC'}))}>
                                  <FaPlus/>
                                </button>
                              </div>
                            </div>
                            <div className='price-container'>
                              <div className='price'>
                                Price: {formatPrice(item.price)}
                              </div>
                              <div className='sub-total'>
                                <span>Sub total: </span>
                                <span>{formatPrice(item.totalPrice)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <button className='btn-danger' onClick={() => dispatch(clearCart())}>Clear Cart</button>
                </div>
                
                <div className='cart-right'>
                  <div className='cart-summary'>
                    <div className='cart-summary-title'>
                      <h6>Order Summary</h6>
                    </div>
                    <ul className='cart-summary-info'>
                      <li className='cart-list'>
                        <span className='title'>Selected {totalItems} item(s) Price</span>
                        <span className='value'>{formatPrice(totalAmount)}</span>
                      </li>
                      <li className='cart-list'>
                        <span className='title'>Discount</span>
                        <span className='value'>
                          <span>-&nbsp;</span>
                          0
                        </span>
                      </li>
                      <li className='cart-list'>
                        <span className='title'>Delivery Cost</span>
                        <span className='value'>
                          <span>+&nbsp;</span>
                          {formatPrice(deliveryCharge)}
                        </span>
                      </li>
                    </ul>
                    <div className='cart-summary-total'>
                      <span className='total-text'>Grand Total: </span>
                      <span className='total-value'>{formatPrice(totalAmount + deliveryCharge)}</span>
                    </div>
                    <div className='cart-summary-btn'>
                      <button>Proceed to checkout</button>
                    </div>
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}

export default CartPage