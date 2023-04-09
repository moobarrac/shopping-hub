import { configureStore } from "@reduxjs/toolkit";
import modalReducer from './features/modalSlice'
import categoryReducer from './features/categorySlice'
import productReducer from './features/productSlice'
import cartsReducer from './features/cartSlice'

const store = configureStore({
  reducer: {
    modal: modalReducer,
    categories: categoryReducer,
    products: productReducer,
    carts: cartsReducer,
  }
})

export default store;