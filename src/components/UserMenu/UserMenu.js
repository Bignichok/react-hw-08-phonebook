import { connect } from "react-redux";

import { logout } from "../../redux/authReducer";
import { getUserName } from "../../redux/authSelectors";

import NavList from "../NavList/NavList";

const UserMenu = ({ name, onLogout }) => (
  <NavList>
    <li>
      <span>{name}</span>
    </li>
    <li>
      <button onClick={onLogout}>logout</button>
    </li>
  </NavList>
);

const mapStateToProps = (state) => ({ name: getUserName(state) });

const mapDispatchToProps = { onLogout: logout };

export default connect(mapStateToProps, mapDispatchToProps)(UserMenu);
