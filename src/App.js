import logo from "./logo.svg";
import React, { Suspense, lazy, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { checkAutoLogin } from "./services/AuthService";
import { useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { isAuthenticated } from "./store/selectors/AuthSelectors";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
const Home = lazy(() => import("./pages/Home/Home"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const Login = lazy(() => import("./pages/login/Login"));
const Posts = lazy(() => import("./components/Posts/Posts"));
const createPost = lazy(() => import("./pages/CreatePost/CreatePost"));

function App(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    checkAutoLogin(dispatch, props.history);
  }, []);

  let routes = (
    <Switch>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
    </Switch>
  );
  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/posts" component={Posts} />

        <Route path="/createpost" component={createPost} />
        <Route path="/" component={Home} exact />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Header />
      <div className="container px-3 mx-auto"></div>
      <Suspense fallback={<div>Loading..</div>}> {routes}</Suspense>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
