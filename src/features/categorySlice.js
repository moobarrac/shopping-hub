import { createSlice } from '@reduxjs/toolkit';
import { STATUS } from '../utils/status';
import { BASE_URL } from '../utils/apis';

const initialState = {
  categories: [],
  status: STATUS.IDLE,
  catProductAll: [],
  catProductAllStatus: STATUS.IDLE,
  catProductSingle: [],
  catProductSingleStatus: STATUS.IDLE,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setCategoriesProductAll: (state, action) => {
      state.catProductAll.push(action.payload);
    },
    setCategoriesStatusAll: (state, action) => {
      state.catProductAllStatus = action.payload;
    },
    setCategoriesProductSingle: (state, action) => {
      state.catProductSingle = action.payload;
    },
    setCategoriesStatusSingle: (state, action) => {
      state.catProductSingleStatus = action.payload;
    },
  }
})

export const { setStatus, setCategories, setCategoriesProductAll, setCategoriesStatusAll, setCategoriesProductSingle, setCategoriesStatusSingle } = categorySlice.actions;

export default categorySlice.reducer;

export const fetchCategories = () => {
  return async function fetchCategoryThunk(dispatch) {
    dispatch(setStatus(STATUS.LOADING));
    try {
      const response = await fetch(`${BASE_URL}categories`);
      const data = await response.json();
      dispatch(setCategories(data));
      dispatch(setStatus(STATUS.IDLE));
    } catch (error) {
      dispatch(setStatus(STATUS.ERROR));
    }
  }
}

export const fetchProductByCategory = (categoryID, dataType) => {
  return async function fetchProductCategory(dispatch) {
    if(dataType === 'all') dispatch(setCategoriesStatusAll(STATUS.LOADING));
    if(dataType === 'single') dispatch(setCategoriesStatusSingle(STATUS.LOADING));

    try {
      const response = await fetch(`${BASE_URL}categories/${categoryID}/products`);
      const data = await response.json();
      if(dataType === 'all') {
        dispatch(setCategoriesProductAll(data.slice(0, 10)));
        dispatch(setCategoriesStatusAll(STATUS.IDLE));
      }
      if(dataType === 'single') {
        dispatch(setCategoriesProductSingle(data.slice(0, 10)));
        dispatch(setCategoriesStatusAll(STATUS.IDLE));
      }
    } catch (error) {
      dispatch(setCategoriesStatusAll(STATUS.ERROR));
    }
  }
}