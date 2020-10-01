import React, { useState, useEffect } from "react";
import "./header.scss";
import logo from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortDown, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import HeaderShopItem from "./ShopItem/HeaderShopItem";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

function Header(props) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    });
  }, []);

  return (
    <div className="header">
      <div className={scrolled ? "header_main_div bg-red" : "header_main_div"}>
        <div className="logo">
          <img src={logo} alt="patker" width="100%" />
        </div>
        <div className="header_navigation">
          <ul>
            <NavLink to="/">
              <li
                className={
                  scrolled
                    ? "font-whitesmoke font-medium weight-6 "
                    : "font-red font-medium weight-6 "
                }
              >
                Գլխավոր
              </li>
            </NavLink>
            <NavLink to="/shop">
              <li
                className={
                  scrolled
                    ? "font-whitesmoke font-medium weight-6 "
                    : "font-red font-medium weight-6 "
                }
                onClick={() => props.setCurrentAll("all")}
              >
                Խանութ
                <div className="rotating_triangle">
                  <FontAwesomeIcon icon={faSortDown} rotation={180} />
                </div>
              </li>
            </NavLink>
            <div
              className={
                scrolled
                  ? "shop_dropdown bg-red"
                  : "shop_dropdown bg-whitesmoke"
              }
            >
              {props.headerItems
                ? props.headerItems.map((item) => {
                    return (
                      <HeaderShopItem
                        key={item._id}
                        item={item}
                        scrolled={scrolled}
                        setCurrent={props.setCurrent}
                        setCurrentAll={props.setCurrentAll}
                      />
                    );
                  })
                : null}
            </div>
            <NavLink to="/about">
              <li
                className={
                  scrolled
                    ? "font-whitesmoke font-medium weight-6 "
                    : "font-red font-medium weight-6 "
                }
              >
                Մեր Մասին
              </li>
            </NavLink>
            <NavLink to="/contact">
              <li
                className={
                  scrolled
                    ? "font-whitesmoke font-medium weight-6 "
                    : "font-red font-medium weight-6 "
                }
              >
                Կապ
              </li>
            </NavLink>
            <NavLink to="/mycart">
              <li
                className={
                  scrolled
                    ? "font-whitesmoke font-cart header_cart"
                    : "font-red font-cart header_cart"
                }
              >
                <FontAwesomeIcon icon={faShoppingCart} />
                <div
                  className={
                    scrolled
                      ? "bg-whitesmoke font-red  cart_counter"
                      : "bg-red font-whitesmoke cart_counter"
                  }
                  style={
                    Object.keys(props.cartItemsID).length !== 0
                      ? { opacity: 1 }
                      : { opacity: 0 }
                  }
                >
                  {Object.keys(props.cartItemsID).length}
                </div>
              </li>
            </NavLink>

            <div
              className={
                scrolled ? "moving_line bg-whitesmoke" : "moving_line bg-red"
              }
            ></div>
          </ul>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    cartArray: state.addToCart,
  };
};

export default connect(mapStateToProps)(Header);
