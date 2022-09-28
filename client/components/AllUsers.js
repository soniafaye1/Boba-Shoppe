import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchDeletedUser, fetchUsers } from "../redux/users";
import { me } from "../store/auth";

export class AllUsers extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUsers();
    this.props.currentUserData();
  }

  render() {
    const users = this.props.users || [];
    const isAdmin = this.props.isAdmin;
    return isAdmin ? (
      <div id="allUsers">
        <h2>All Users:</h2>
        <div id="itemContainer">
          {users.map((user) => {
            console.log("user", user);
            return (
              <div id="singleItem" key={user.id}>
                <div className="productDisplayCard">
                  <h2>{user.username}</h2>
                  <img src={user.imageUrl} alt="image" />
                  <Link to={`/users/${user.username}`}>
                    <button
                      type="submit"
                      // onClick={
                      //   () => <Profile user={user} /> /*{
                      //   this.props.setUser(user.username);*/
                      // }
                    >
                      Profile
                    </button>
                  </Link>
                  <button
                    onClick={() => this.props.deleteUser(user.id)}
                    type="submit"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ) : (
      "Access Forbidden"
    );
  }
}

const mapState = (state) => {
  return {
    users: state.users,
    isAdmin: state.auth.adminAccess,
  };
};

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(fetchUsers()),
  currentUserData() {
    dispatch(me());
  },
  deleteUser: (id) => dispatch(fetchDeletedUser(id)),
  //setUser: (username) => dispatch(fetchUser(username)),
});

export default connect(mapState, mapDispatchToProps)(AllUsers);
