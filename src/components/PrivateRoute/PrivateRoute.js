import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getIsAuth } from "../../redux/loggedInSelectors";

const PrivateRoute = ({ component: Component, isAuth, ...routeProps }) => (
  <Route
    {...routeProps}
    render={(props) =>
      isAuth ? <Component {...props} /> : <Redirect to={"/login"} />
    }
  />
);

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps, null)(PrivateRoute);
