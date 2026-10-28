import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTotalQuantity } from "../redux/CartSlice.jsx";

function LeafMark() {
  return (
    <svg
      className="brand__leaf"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M26 5C14 5 5 12 5 23c0 2 .4 3.4.4 3.4S9 15 22 11c-8 4-13 9-14.6 15.4C17 29 27 23 27 11.6c0-2.3-.4-4.3-.4-4.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      className="cart-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4h2.2l2.3 11.2a1.8 1.8 0 0 0 1.8 1.4h8.9a1.8 1.8 0 0 0 1.8-1.4L21.4 8H6" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="18" cy="20" r="1.4" />
    </svg>
  );
}

/**
 * Navigation bar shown on every page: Home, Plants, About Us and the cart,
 * with a live badge holding the total number of plants in the cart.
 */
function Navbar() {
  const totalQuantity = useSelector(selectTotalQuantity);

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="brand" aria-label="Paradise Nursery — home">
          <span className="brand__mark">
            <LeafMark />
          </span>
          <span className="brand__name">
            Paradise <span>Nursery</span>
          </span>
        </Link>

        <nav className="navbar__links" aria-label="Main navigation">
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="/plants">Plants</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </nav>

        <NavLink
          to="/cart"
          className="navbar__cart"
          aria-label={`Shopping cart, ${totalQuantity} ${
            totalQuantity === 1 ? "item" : "items"
          }`}
        >
          <CartIcon />
          <span className="navbar__cart-label">Cart</span>
          <span className="cart-badge" aria-hidden="true">
            {totalQuantity}
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
