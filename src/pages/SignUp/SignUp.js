import { useState } from "react";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { Loder } from "../../components/loder/Loder";
import { signupAction } from "../../store/actions/AuthActions";

function SignUp(props) {
  const [email, setEmail] = useState("");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }

    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }

    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(signupAction(email, password, props.history));
  }

  return (
    <div className="flex justify-center my-5">
      {props.showLoading && <Loder />}
      <div className="w-1/3 shadow p-3 border border-gray-400">
        <h1 className="text-2xl font-extrabold">Sign Up</h1>
        {props.errorMessage && (
          <div className="bg-red-300 text-900 border broder-red-900 p-1 my-2">
            {props.errorMessage}
          </div>
        )}

        {props.sucessMessage && (
          <div className="bg-green-300 text-900 border border-green-900 p-1 my-2">
            {props.sucessMessage}
          </div>
        )}

        <form onSubmit={onSignUp}>
          <div>
            <label>Email</label>
            <div>
              <input
                type="text"
                className="border border-gray-600 p-1 w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {errors.email && <div>{errors.email}</div>}
          </div>
          <div>
            <label>Password</label>
            <div>
              <input
                type="password"
                className="border border-gray-600 p-1 w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {errors.password && <div>{errors.password}</div>}
          </div>

          <div className="my-3">
            <button type="submit" className="bg-green-700 text-white px-3 py-1">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMsg,
    sucessMessage: state.auth.sucessMsg,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(SignUp);
