import { NavLink } from "react-router-dom";

export default function Breadcrumb({ Home, Fashion, Favourite, Contact }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="inline-flex items-center py-2 text-sm font-medium">
        <li className="inline-flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-secondary-700 font-semibold"
                : "text-secondary-500 hover:text-secondary-600"
            }
          >
            {Home}
          </NavLink>
        </li>
        <li className="inline-flex items-center ">
        {Fashion ? <span className="text-secondary-400 px-3">/</span> : ""}
          <NavLink
            to="/fashion"
            className={({ isActive }) =>
              isActive
                ? "text-secondary-700 font-semibold"
                : "text-secondary-500 hover:text-secondary-600"
            }
          >
            {Fashion ? Fashion : ""}
          </NavLink>
        </li>
        {Favourite ? <span className="text-secondary-400 px-3">/</span> : ""}
        <li
          className="inline-flex items-center "
          aria-current="page"
        >
          <NavLink
            to="/favourite"
            className={({ isActive }) =>
              isActive
                ? "text-secondary-700 font-semibold"
                : "text-secondary-500 hover:text-secondary-600"
            }
          >
            {Favourite ? Favourite : ""}
          </NavLink>
        </li>
        {Contact ? <span className="text-secondary-400 px-3">/</span> : ""}
        <li
          className="inline-flex items-center"
          aria-current="page"
        >
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-secondary-700 font-semibold"
                : "text-secondary-500 hover:text-secondary-600"
            }
          >
            {Contact ? Contact : ""}
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
