import React, { useState, useEffect } from "react";
import "./cartpage.scss";
import { connect } from "react-redux";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import OrderForm from "../../components/OrderForm/OrderForm";

function CartPage(props) {
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { setItem } = useLocalStorage();

  useEffect(() => {
    let gin = 0;
    for (let i = 0; i < cartProducts.length; i++) {
      gin += cartProducts[i].totalPrice;
    }
    setTotalPrice(gin);
  }, [cartProducts]);

  useEffect(() => {
    if (props.data) {
      setCartProducts([]);
      props.data.map((product) => {
        if (props.cartItemsID[product._id]) {
          setCartProducts((prev) => {
            return [
              ...prev,
              {
                ...product,
                count: props.cartItemsID[product._id],
                totalPrice: props.cartItemsID[product._id] * product.price,
              },
            ];
          });
        }
        return null;
      });
    }
  }, [props.data, props.cartItemsID]);

  const plusItem = (id, count) => {
    const newCartItemsID = { ...props.cartItemsID, [id]: count + 1 };
    props.setCartItemsID(newCartItemsID);
    setItem("cartItems", newCartItemsID);
  };
  const minusItem = (id, count) => {
    const newCartItemsID = { ...props.cartItemsID, [id]: count - 1 };
    props.setCartItemsID(newCartItemsID);
    setItem("cartItems", newCartItemsID);
  };
  const deleteItem = (id) => {
    if (props.cartItemsID[id]) {
      delete props.cartItemsID[id];
      const newProducts = { ...props.cartItemsID };
      props.setCartItemsID(newProducts);
      setItem("cartItems", newProducts);
    }
  };

  return (
    <div
      className={
        cartProducts.length > 1
          ? "width-100 pt-7 flex-column px-1 border-box"
          : "width-100 pt-7 flex-column px-1 border-box pb-footer"
      }
    >
      <div className="flex width-100">
        <table className="ui celled table width-75">
          <thead>
            <tr>
              <th className="width-25">Product</th>
              <th className="width-25">Title</th>
              <th className="width-25">Quantity</th>
              <th className="width-25">Price</th>
            </tr>
          </thead>
          {cartProducts.length > 0 ? (
            cartProducts.map((item) => {
              return (
                <tbody key={item._id}>
                  <tr className="width-100">
                    <td data-label="Name" >
                      {" "}
                      <img
                        src={item.images[0]}
                        alt={item.description}
                        width="100%"
                      />
                    </td>
                    <td
                      data-label="Title"
                      className="height-100 font-large font-red jscac capitalize"
                    >
                      {item.title}
                    </td>
                    <td data-label="Count" >
                      <div className="cart_plus_minus width-100">
                        <div
                          className={
                            item.count === 1
                              ? "cart_count_button disabled"
                              : "cart_count_button"
                          }
                          onClick={() => minusItem(item._id, item.count)}
                        >
                          -
                        </div>
                        <div className="cart_count">{item.count}</div>
                        <div
                          className="cart_count_button"
                          onClick={() => plusItem(item._id, item.count)}
                        >
                          +
                        </div>
                        <div
                          className="ui vertical animated button standart ml-2 remove_button"
                          tabIndex="0"
                          onClick={() => deleteItem(item._id)}
                        >
                          <div className="hidden content">Ջնջել</div>
                          <div className="visible content">
                            <i className="trash icon"></i>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td
                      data-label="totalPrice"
                      className="font-medium font-red"
                    >
                      <div className="w-100 jscac font-medium-cart">{item.totalPrice}$</div>
                    </td>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <tbody>
              <tr>
                <td>
                  <div className="jsc  width-100">
                    <h1 className="font-small-cart font-red">
                      There is not products in your cart yet
                    </h1>
                  </div>
                </td>
              </tr>
            </tbody>
          )}
        </table>

        <div className="width-25-cart flex-column">
          <p className="font-small-cart font-red weight-6">
            Shipping in Armenia is FREE
          </p>
          <p className="font-medium-cart font-red weight-8 capitalize mt-3">
            Total Price
          </p>
          <p className="font-medium-cart font-red weight-7">{totalPrice}$</p>
          <p className="font-small-cart font-red weight-6 mt-3">Paymanent cash</p>
        </div>
      </div>

      {cartProducts.length > 0 ? (
        <OrderForm
          cartProducts={cartProducts}
          setCartProducts={setCartProducts}
        />
      ) : null}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    data: state.fetchData.products,
  };
};

export default connect(mapStateToProps)(CartPage);
