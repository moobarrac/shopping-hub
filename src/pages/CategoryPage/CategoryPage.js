import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProductByCategory } from '../../features/categorySlice'
import { useParams, Link } from 'react-router-dom';
import ProductList from '../../components/ProductList/ProductList';
import { AiOutlineHome, AiOutlineRight } from 'react-icons/ai'
import "./CategoryPage.css";

const CategoryPage = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {catProductSingle: products, catProductSingleStatus: status} = useSelector(state => state.categories);

    useEffect(() => {
      dispatch(fetchProductByCategory(id, 'single'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    return (
      <div className = "category-page">
        <div className = "container">
          <div className = "breadcrumb">
            <ul className = "breadcrumb-items">
              <li className = "breadcrumb-item">
                <Link to = "/">
                  <AiOutlineHome/>
                  <span className = "breadcrumb-seperator">
                    <AiOutlineRight/>
                  </span>
                </Link>
              </li>
              <li>
                Category
                <span className = "breadcrumb-seperator">
                  <AiOutlineRight/>
                </span>
              </li>
              <li>
                { products[0] && products[0].category.name}
              </li>
            </ul>
          </div>
        </div>
        <ProductList products = {products} status = {status} />
      </div>
    )
}

export default CategoryPage