import { useDispatch } from "react-redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Link } from "react-router-dom";
import { logoutConfirmed } from "../../store/actions/AuthActions";
import { isAuthenticated } from "../../store/selectors/AuthSelectors";

function Header(props) {
  const dispatch = useDispatch();

  function onLogout(e) {
    e.preventDefault();
    dispatch(logoutConfirmed(props.history));
  }
  return (
    <div>
      <div className="bg-red-400 text-white px-2 py-2 flex items-center ">
        <h2 className="font-bold text-lg mr-4">React Router</h2>

        <div>
          <Link to="/" className="px-2">
            Home
          </Link>

          {!props.isAuthenticated ? (
            <>
              <Link to="/signup" className="px-2">
                SignUp
              </Link>
              <Link to="/login" className="px-2">
                Login
              </Link>
            </>
          ) : (
            <>
              <Link to="/posts" className="px-2">
                Posts
              </Link>
              <button onClick={onLogout} className="px-2">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};
export default withRouter(connect(mapStateToProps)(Header));
