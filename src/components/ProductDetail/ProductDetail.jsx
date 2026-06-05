import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Loader from '../Loader/loader'
import './ProductDetail.scss'

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(response.data);
        setIsError(false);
      } catch (error) {
        console.error("Ошибка:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  if (isLoading) return <Loader />
  if (isError) return <h2>Произошла ошибка при загрузке товара</h2>
  if (!product) return <h2>Товар не найден</h2>

  const discountPrice = (product.price - (product.price * product.discountPercentage / 100)).toFixed(2);

  return (
    <div className="product-detail">
      <Link to="/" className="product-detail__back">
        ← Назад к товарам
      </Link>

      <div className="product-detail__container">
        <div className="product-detail__gallery">
          <div className="product-detail__image-wrapper">
            <img
              src={product.images[currentImageIndex]}
              alt={product.title}
              className="product-detail__image"
            />
          </div>

          {product.images.length > 1 && (
            <div className="product-detail__controls">
              <button
                className="product-detail__btn-prev"
                onClick={handlePrevImage}
              >
                ← Предыдущая
              </button>
              <span className="product-detail__image-counter">
                {currentImageIndex + 1} / {product.images.length}
              </span>
              <button
                className="product-detail__btn-next"
                onClick={handleNextImage}
              >
                Следующая →
              </button>
            </div>
          )}

          <div className="product-detail__thumbnails">
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${product.title} ${index + 1}`}
                className={`product-detail__thumbnail ${currentImageIndex === index ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>

        <div className="product-detail__info">
          <h1 className="product-detail__title">{product.title}</h1>

          <div className="product-detail__rating">
            <span className="product-detail__rating-value">⭐ {product.rating}</span>
            <span className="product-detail__reviews">({product.reviews?.length || 0} отзывов)</span>
          </div>

          <div className="product-detail__price">
            <span className="product-detail__current-price">${discountPrice}</span>
            <span className="product-detail__old-price">${product.price}</span>
            <span className="product-detail__discount">-{product.discountPercentage}%</span>
          </div>

          <p className="product-detail__description">
            {product.description}
          </p>

          <div className="product-detail__stock">
            <span>Количество в наличии: <b>{product.stock}</b></span>
            {product.stock > 0 ? (
              <span className="product-detail__available">✓ Товар в наличии</span>
            ) : (
              <span className="product-detail__unavailable">✗ Товар недоступен</span>
            )}
          </div>

          <div className="product-detail__details">
            <h3>Детали товара:</h3>
            <ul>
              <li><strong>Бренд:</strong> {product.brand}</li>
              <li><strong>Категория:</strong> {product.category}</li>
              <li><strong>SKU:</strong> {product.sku}</li>
              <li><strong>Вес:</strong> {product.weight} kg</li>
              <li><strong>Гарантия:</strong> {product.warrantyInformation}</li>
              <li><strong>Доставка:</strong> {product.shippingInformation}</li>
            </ul>
          </div>

          <button className="product-detail__buy-btn">
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
