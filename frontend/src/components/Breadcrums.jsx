import { NavLink } from "react-router-dom";

export default function Breadcrumb({ Home, Fashion, About, Contact }) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="inline-flex items-center space-x-4 py-2 text-sm font-medium">
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
        {Fashion ? <span className="text-secondary-400">/</span> : ""}
        <li className="inline-flex items-center space-x-4">
          <NavLink
            to="/fashion"
            className={({ isActive }) =>
              isActive
            ? "text-secondary-700 font-semibold"
            : "text-secondary-500 hover:text-secondary-600"
          }
          >
            {Fashion}
          </NavLink>
        </li>
            {About ? <span className="text-secondary-400">/</span> : ""}
        <li
          className="inline-flex items-center space-x-4"
          aria-current="page"
          >
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
            ? "text-secondary-700 font-semibold"
            : "text-secondary-500 hover:text-secondary-600"
          }
          >
            {About}
          </NavLink>
        </li>
            {Contact ? <span className="text-secondary-400">/</span> : ""}
        <li
          className="inline-flex items-center space-x-4"
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
            {Contact}
          </NavLink>
        </li>
      </ol>
    </nav>
  );
}
