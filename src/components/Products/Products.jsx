
import './Products.scss'
import ProductsItem from "./ProductsItem.jsx"
import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader.jsx'
import { useProduct } from '../../store/useProduct'
import Pagination from '../Pagination/Pagination.jsx'

const Products = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { searchValue, sortValue, limit, skip, currentPage,  setSkip, setCurrentPage } = useProduct();

  const onPageChange = (page) => {
    setCurrentPage(page);
    setSkip(page* limit-limit);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://dummyjson.com/products?limit=100');
        setData(response.data);
        setIsError(false);
      } catch (error) {
        console.error("Ошибка:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);


  useEffect(() => {
    setCurrentPage(1);
    setSkip(0);
  }, [searchValue, sortValue, setCurrentPage, setSkip]);

  const filteredAndSortedProducts = useMemo(() => {
    if (!data?.products) return [];

    let products = [...data.products];

    if (searchValue) {
      products = products.filter(product =>
        product.title.toLowerCase().includes(searchValue.toLowerCase()) ||
        product.description.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    if (sortValue === 'title') {
      products.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortValue === 'price') {
      products.sort((a, b) => a.price - b.price);
    } else if (sortValue === 'stock') {
      products.sort((a, b) => b.stock - a.stock);
    }

    return products;
  }, [data, searchValue, sortValue]);


  const paginatedProducts = useMemo(() => {
    return filteredAndSortedProducts.slice(skip, skip + limit);
  }, [filteredAndSortedProducts, skip, limit]);

  if (isLoading) return <Loader />
  if (isError) return <h2>Произошла ошибка при загрузке</h2>

  return (
    <>
      <div className="products">
        <div className="products__list">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductsItem
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <p>Нет товаров, соответствующих критериям поиска</p>
          )}
        </div>
        {filteredAndSortedProducts.length > 0 &&
          <Pagination
            count={filteredAndSortedProducts.length}
            limit={limit}
            onPageChange={onPageChange}
            currentPage={currentPage}
          />}
      </div>
    </>
  )
}

export default Products
