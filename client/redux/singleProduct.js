import axios from "axios";

// ACTION TYPE
const SET_PRODUCT = "SET_PRODUCT";
const EDIT_PRODUCT = "EDIT_PRODUCT";

// ACTION CREATOR
export const setProduct = (product) => {
  return {
    type: SET_PRODUCT,
    product,
  };
};

export const editProduct = (product) => {
  return {
    type: EDIT_PRODUCT,
    product,
  };
};

// THUNK CREATOR
export const fetchProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.get(`/api/products/${id}`);
      dispatch(setProduct(product));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchEditedProduct = (product) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(editProduct(data));
    } catch (error) {
      return error;
    }
  };
};

// REDUCER
export default function productReducer(state = {}, action) {
  switch (action.type) {
    case SET_PRODUCT:
      return action.product;
    case EDIT_PRODUCT:
      return action.product;
    default:
      return state;
  }
}
