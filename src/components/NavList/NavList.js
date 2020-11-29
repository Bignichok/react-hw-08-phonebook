import styles from "./NavList.module.css";

const NavList = ({ children }) => {
  return <ul className={styles.navigationList}>{children}</ul>;
};
export default NavList;
