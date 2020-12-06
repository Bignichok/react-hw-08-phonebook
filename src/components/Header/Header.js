import { connect } from "react-redux";
import NavList from "../NavList/NavList";
import NavListItem from "../NavList/NavListItem/NavListItem";
import UserMenu from "../UserMenu/UserMenu";

import { getIsAuth } from "../../redux/loggedInSelectors";

import styles from "./Header.module.css";

const Header = ({ isAuth }) => {
  return (
    <header className={styles.header}>
      <NavList>
        <NavListItem path={"/"} content={"Home"} />
        <NavListItem path={"/phoneBook"} content={"PhoneBook"} />
      </NavList>

      {isAuth ? (
        <UserMenu />
      ) : (
        <NavList>
          <NavListItem path={"/login"} content={"login"} />
          <NavListItem path={"/signup"} content={"sign up"} />
        </NavList>
      )}
    </header>
  );
};

const mapStateToProps = (state) => ({ isAuth: getIsAuth(state) });

export default connect(mapStateToProps, null)(Header);
