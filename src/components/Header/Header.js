import NavList from "../NavList/NavList";
import NavListItem from "../NavList/NavListItem/NavListItem";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <NavList>
        <NavListItem path={"/"} content={"Home"} />
        <NavListItem path={"/phoneBook"} content={"PhoneBook"} />
      </NavList>

      <NavList>
        <NavListItem path={"/login"} content={"login"} />
        <NavListItem path={"/signup"} content={"sign up"} />
      </NavList>
    </header>
  );
};

export default Header;
