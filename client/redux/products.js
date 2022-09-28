import axios from "axios";

// ACTION TYPE
const SET_PRODUCTS = "SET_PRODUCTS";
const DELETE_PRODUCT = "DELETE_PRODUCT";

// ACTION CREATOR
const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

export const deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

// THUNK CREATOR
export const fetchProducts = (category) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products?category=${category}`);
      dispatch(setProducts(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDeletedProduct = (id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/products/${id}`);
      dispatch(deleteProduct(data));
      //history.push("/products");
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function productsReducer(state = [], action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state;
  }
}
