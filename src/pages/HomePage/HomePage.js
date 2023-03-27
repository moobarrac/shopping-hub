import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Category from '../../components/Category/Category';
import ProductList from '../../components/ProductList/ProductList';
import SingleCategory from '../../components/SingleCategory/SingleCategory';
import { fetchCategories, fetchProductByCategory } from '../../features/categorySlice';
import { fetchProducts } from '../../features/productSlice';

const HomePage = () => {
  const dispatch = useDispatch();
  const { categories, catProductAll: productByCategories, catProductAllStatus } = useSelector(state => state.categories);
  const { products } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
    dispatch(fetchProductByCategory(1, 'all'));
    dispatch(fetchProductByCategory(2, 'all'));
  }, [])

  return (
    <div className='home-page'>
      <Category categories={categories}/>
      <ProductList products={products}/>
      {productByCategories[0] &&  <SingleCategory status={catProductAllStatus} products={productByCategories[0]}/>}
      {productByCategories[1] &&  <SingleCategory status={catProductAllStatus} products={productByCategories[1]}/>}
    </div>
  )
}

export default HomePage;