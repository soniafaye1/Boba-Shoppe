import axios from "axios";

// ACTION TYPE
const SET_USERS = "SET_USERS";
const DELETE_USER = "DELETE_USER";

// ACTION CREATOR
const setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};

const deleteUser = (user) => {
  return {
    type: DELETE_USER,
    user,
  };
};

// THUNK CREATOR
export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/users");
      dispatch(setUsers(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchDeletedUser = (id, history) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(`/api/users/${id}`);
      dispatch(deleteUser(data));
    } catch (error) {
      console.log(error);
    }
  };
};

// REDUCER
export default function usersReducer(state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    case DELETE_USER:
      return state.filter((user) => user.id !== action.user.id);
    default:
      return state;
  }
}
