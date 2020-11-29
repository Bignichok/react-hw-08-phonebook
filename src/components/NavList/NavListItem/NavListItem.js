import { NavLink } from "react-router-dom";

const NavListItem = ({ path, content }) => {
  return (
    <li>
      <NavLink to={path}>{content}</NavLink>
    </li>
  );
};

export default NavListItem;
