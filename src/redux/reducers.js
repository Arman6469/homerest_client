import * as actions from "./actions";
const initialState = [];

export const fetchData = (state = initialState, { type, data }) => {
  switch (type) {
    case actions.RECEIVE_API_DATA:
      return data;
    default:
      return state;
  }
};

export const addToCart = (state = [], { type, data }) => {
  switch (type) {
    case actions.ADD_TO_CART:
      return [
        ...state,
        { ...data, count: data.count, totalPrice: data.count * data.price },
      ];

    default:
      return state;
  }
};
