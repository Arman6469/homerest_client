import React from "react";
import "./productcard.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function ProductCard(props) {
  return (
    <Link to={`/product/${props.product._id}`} className="product_card_all_link">
      <div className="product_card">
        <img
          src={props.product.images[0]}
          alt={props.product.id}
          className="product_image"
        />
        <h2 className="product_card_title font-red font-large upper ">
          {props.product.title}
        </h2>
        <div className="sale_parent font-medium">
          {props.product.sale !== 0 ? (
            <div className="product_card_sale_lent font-white font-medium upper">
              sale {props.product.sale}%
            </div>
          ) : null}
        </div>
        <p className="product_card_price font-red">
          <span className={props.product.sale === 0 ? null : "underline"}>
            {props.product.price}$
          </span>{" "}
          {props.product.newprice !== 0 ? props.product.newprice + "$" : null}
        </p>

        <div className="product_card_cart">
          <FontAwesomeIcon
            icon={faShoppingCart}
            className="shopping_cart_icon"
          />
        </div>
      </div>
    </Link>
  );
}
