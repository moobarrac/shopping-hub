/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { AiFillPhone } from 'react-icons/ai';
import { BsEnvelopeFill } from 'react-icons/bs';
import './Footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container'>
        <div className='footer-content'>
          <div className='footer-item'>
            <h6>Links</h6>
            <ul className='footer-lists'>
              <li><a href='#'>About us</a></li>
              <li><a href='#'>Blog</a></li>
              <li><a href='#'>Contact us</a></li>
              <li><a href='#'>FAQs</a></li>
            </ul>
          </div>
          <div className='footer-item'>
            <h6>Policies</h6>
            <ul className='footer-lists'>
              <li><a href='#'>Tems and Conditionss</a></li>
              <li><a href='#'>Cookies</a></li>
              <li><a href='#'>Data policy</a></li>
            </ul>
          </div>
          <div className='footer-item'>
            <h6>About shopping hub</h6>
            <ul className='footer-lists'>
              <li><a href='#'>Company Info</a></li>
              <li><a href='#'>Branches</a></li>
              <li><a href='#'>Store</a></li>
            </ul>
          </div>
          <div className='footer-item'>
            <h6>Contact</h6>
            <ul className='footer-lists'>
              <li>
                <span><AiFillPhone/></span>
                <span>0816 169 0112</span>
              </li>
              <li>
                <span><BsEnvelopeFill/></span>
                <span>info@shoppinghub.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer