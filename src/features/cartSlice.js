import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  totalItems: 0,
  totalAmount: 0,
  deliveryCharge: 400,
}

const storeInLocalStorage = (data) => {
  localStorage.setItem('cart', JSON.stringify(data))
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const tempItem = state.carts.find(item => item.id === action.payload.id);
      if (tempItem) {
        state.carts = state.carts.map(item => {
          if(item.id === action.payload.id) {
            let newQty = item.quantity + action.payload.quantity;
            let newTotalPrice = newQty * item.price;
            return { ...item, quantity: newQty, totalPrice: newTotalPrice }
          } else {
            return item;
          }
        });
      } else {
        state.carts.push(action.payload);
      }
      storeInLocalStorage(state.carts);
    },
    removeFromCart: (state, action) => {
      state.carts = state.carts.filter(item => item.id !== action.payload);
      storeInLocalStorage(state.carts);
    },
    clearCart: state => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },
    toggleCart: (state, action) => {
      state.carts = state.carts.map(item => {
        if(item.id === action.payload.id) { 
          let tempQty = item.quantity
          let tempTotalPrice = item.totalPrice;
          if (action.payload.type === 'INC') {
            tempQty++;
            tempTotalPrice = tempQty * item.price;
          }
          if (action.payload.type === 'DEC') {
            tempQty--;
            if (tempQty < 1) tempQty = 1
            tempTotalPrice = tempQty * item.price;
          }
          return { ...item, quantity: tempQty, totalPrice: tempTotalPrice }
        } else {
          return item;
        }
      })
      storeInLocalStorage(state.carts);
    },
    getCartTotal: state => {
      state.totalAmount = state.carts.reduce((cartTotal, cartItem) => {
        return cartTotal += cartItem.totalPrice;
      }, 0)
      state.totalItems = state.carts.length;
    }
  }
})

export const { addToCart, removeFromCart, clearCart, toggleCart, getCartTotal } = cartSlice.actions;

export default cartSlice.reducer;