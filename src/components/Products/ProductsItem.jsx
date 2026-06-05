import React from 'react'
import { Link } from 'react-router-dom'

const ProductsItem = ({ product }) => {
  const discountPrice = (product.price - (product.price * product.discountPercentage / 100)).toFixed(2);

  return (
    <>
        <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
          <div className="products__item">
              <img src={product.thumbnail} alt="" className="products__item-img" />
              <p className="products__item-price">
                  {discountPrice}
                  <span>$</span>
                  <span className="products__item-old-price">{product.price}$</span>
              </p>
              <p className="products__item-stock">
                  In stock: <b>{product.stock}</b> pcs.
              </p>
              <button className="products__item-cart">
              </button>
              <div className="products__item-info">
                  <span className="products__item-rating">
                      {product.rating}
                  </span>
                  <h2 className="products__item-title">{product.title}</h2>
                  <p className="products__item-text">{product.description}</p>
              </div>
          </div>
        </Link>
    </>
  )
}

export default ProductsItem