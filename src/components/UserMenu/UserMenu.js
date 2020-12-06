import { connect } from "react-redux";

import { logout } from "../../redux/authReducer";
import { getUserName } from "../../redux/authSelectors";
import { getIsLoading } from "../../redux/loadingSelectors";

import NavList from "../NavList/NavList";
import Spinner from "../Spinner/Spinner";

const UserMenu = ({ name, onLogout, isLoading }) => (
  <NavList>
    <li>
      <span>{name}</span>
    </li>
    <li>
      {isLoading ? (
        <Spinner size={25} />
      ) : (
        <button onClick={onLogout}>logout</button>
      )}
    </li>
  </NavList>
);

const mapStateToProps = (state) => ({
  name: getUserName(state),
  isLoading: getIsLoading(state),
});

const mapDispatchToProps = { onLogout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
