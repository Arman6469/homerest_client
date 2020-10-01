export const REQUEST_API_DATA = "REQUEST_API_DATA";
export const RECEIVE_API_DATA = "RECEIVE_API_DATA";
export const ADD_TO_CART = "ADD_TO_CART";

export const requestApiData = () => ({ type: REQUEST_API_DATA });
export const receiveApiData = (products, headerItems) => ({
  type: RECEIVE_API_DATA,
  data: { products: products, headerItems: headerItems },
});

export const addToCart = (data, count) => ({ type: ADD_TO_CART, data: {...data, count: count} });
