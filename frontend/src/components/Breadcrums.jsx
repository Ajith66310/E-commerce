import { NavLink } from "react-router-dom";

export default function Breadcrumb({ Home, Fashion, Favourite, Contact,Orders }) {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center text-sm font-medium text-gray-600">
        {/* Home */}
        <li className="inline-flex items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-red-600 font-semibold"
                : "text-gray-500 hover:text-red-500"
            }
          >
            {Home}
          </NavLink>
        </li>

        {/* Fashion */}
        {Fashion && (
          <>
            <span className="text-gray-400 px-2">/</span>
            <li>
              <NavLink
                to="/fashion"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-gray-500 hover:text-red-500"
                }
              >
                {Fashion}
              </NavLink>
            </li>
          </>
        )}

        {/* Favourite */}
        {Favourite && (
          <>
            <span className="text-gray-400 px-2">/</span>
            <li>
              <NavLink
                to="/favourite"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-gray-500 hover:text-red-500"
                }
              >
                {Favourite}
              </NavLink>
            </li>
          </>
        )}

        {/* Contact */}
        {Contact && (
          <>
            <span className="text-gray-400 px-2">/</span>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-gray-500 hover:text-red-500"
                }
              >
                {Contact}
              </NavLink>
            </li>
          </>
        )}

        {/* Orders */}
        {Orders && (
          <>
            <span className="text-gray-400 px-2">/</span>
            <li>
              <NavLink
                to="/orders"
                className={({ isActive }) =>
                  isActive
                    ? "text-red-600 font-semibold"
                    : "text-gray-500 hover:text-red-500"
                }
              >
                {Orders}
              </NavLink>
            </li>
          </>
        )}
      </ol>
    </nav>
  );
}
