import React, { useState, useEffect, useCallback } from "react";
import "./singlepage.scss";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import Loading from '../../../components/Loading/Loading'

export default function ProductSinglePage({ cartItemsID, setCartItemsID }) {
  const { setItem } = useLocalStorage();
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(1);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [product, setProduct] = useState({});

  const productId = useParams().id;


  useEffect(() => {
    fetchSingle(productId);
  }, [productId]);

  const swap = useCallback(
    (num) => {
      product.images?.length &&
        setCurrentSlide(
          (aImg) =>
            (aImg + num + product.images?.length) % product.images?.length
        );
    },
    [product.images]
  );

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };
  const incrementCount = () => {
    setCount(count + 1);
  };

  const addToCart = (id, count) => {
    const copy = cartItemsID[id] ? cartItemsID[id] : undefined;
    if (copy === undefined) {
      const newCartItemsID = { ...cartItemsID, [id]: count };
      setCartItemsID(newCartItemsID);
      setItem("cartItems", newCartItemsID);
    } else {
      const newCartItemsID = { ...cartItemsID, [id]: count + copy };
      setCartItemsID(newCartItemsID);
      setItem("cartItems", newCartItemsID);
    }
  };

  const fetchSingle = async (id) => {
    try {
      const data = await fetch(`/products/product/${id}`);
      const fetchedData = await data.json();
      setProduct(fetchedData);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };

  const renderPage = () => {
    if (loading) return <Loading />;
    return (
      <div className="single_page">
      <div className="single_page_main_image">
        <div className="current_slide">
          <img
            src={
              product.images?.length > 0 ? product.images[currentSlide] : null
            }
            alt="main"
            width="100%"
          />
          <div className="slider-button-left" onClick={() => swap(-1)}>
            <FontAwesomeIcon icon={faChevronLeft} />{" "}
          </div>
          <div className="slider-button-right" onClick={() => swap(1)}>
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        </div>

        <div className="single_slider_images">
          {product.images?.length > 0
            ? product.images.map((image, index) => {
                return (
                  <div
                    className="single_slider_image"
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                  >
                    <img src={image} alt={index} width="100%" />
                  </div>
                );
              })
            : null}
        </div>
      </div>

      <div className="single_page_description">
        <h2 className="font-h1 upper font-whitesmoke mt-2">{product.title}</h2>
        <h4 className="font-medium font-whitesmoke weight-6 mt-5">Price</h4>
        <p className="font-medium font-whitesmoke weight-7 padding-left1 max-width80">
          <span className={product.sale === 0 ? null : "underline"}>
            {product.price}$
          </span>
          <span className="margin-left-1">
            {product.newprice !== 0 ? product.newprice + "$" : null}
          </span>
        </p>

        <h4 className="font-medium font-whitesmoke weight-6 mt-5">
          Description
        </h4>
        <p className="font-desc font-whitesmoke padding-left1 max-width80">
          {product.description}
        </p>

        <div className="plus_minus_buttons width-100">
          <div className="shop_count_button" onClick={decrementCount}>
            -
          </div>
          <div className="shop_count">{count}</div>
          <div className="shop_count_button" onClick={incrementCount}>
            +
          </div>

          <div
            className="ui vertical animated button standart ml-2"
            tabIndex="0"
            onClick={() => addToCart(product._id, count)}
          >
            <div className="hidden content">Shop</div>
            <div className="visible content">
              <i className="shop icon"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  return (
    renderPage()
  );
}
