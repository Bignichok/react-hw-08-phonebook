import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { getIsAuth } from "../../redux/loggedInSelectors";

const PublicRoute = ({ component: Component, isAuth, ...routeProps }) => (
  <Route
    {...routeProps}
    render={(props) =>
      isAuth && routeProps.restricted ? (
        <Redirect to={"/phoneBook"} />
      ) : (
        <Component {...props} />
      )
    }
  />
);

const mapStateToProps = (state) => ({
  isAuth: getIsAuth(state),
});

export default connect(mapStateToProps, null)(PublicRoute);
