import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity,
  selectCartItems,
  selectTotalAmount,
  selectTotalQuantity,
} from "../redux/CartSlice.jsx";
import { formatPrice } from "../utils/formatPrice.js";
import emptyPlant from "../assets/plants/monstera.svg";

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 7h16M9 7V5h6v2M6.5 7l.9 12.1a1.6 1.6 0 0 0 1.6 1.4h6a1.6 1.6 0 0 0 1.6-1.4L18.5 7" />
      <path d="M10 11v5.5M14 11v5.5" />
    </svg>
  );
}

/**
 * Shopping cart page.
 *
 * Shows the total cart amount, the total cost of every plant based on its
 * quantity, the plant image/name/unit price, quantity controls, a delete
 * button, a checkout message and a link back to the product listing.
 */
function CartItem() {
  const dispatch = useDispatch();
  const cart = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  // The total cart amount is kept in Redux and updates with every change.
  const calculateTotalAmount = () => totalAmount;

  // Total cost of one plant: unit cost multiplied by its quantity.
  const calculateTotalCost = (item) => item.cost * item.quantity;

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        name: item.name,
        quantity: item.quantity + 1,
      }),
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          name: item.name,
          quantity: item.quantity - 1,
        }),
      );
    } else {
      // The quantity would reach zero, so the plant leaves the cart.
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckoutShopping = () => {
    setCheckoutMessage(
      "Coming Soon! Checkout isn't available in this demo yet — thanks for shopping at Paradise Nursery. 🌱",
    );
  };

  const handleContinueShopping = () => {
    setCheckoutMessage("");
  };

  if (cart.length === 0) {
    return (
      <main className="page cart-page">
        <div className="cart-container">
          <div className="container">
            <div className="cart-empty">
              <div className="cart-empty__art">
                <img src={emptyPlant} alt="" />
              </div>
              <p className="eyebrow">Your basket</p>
              <h1>Your cart is empty</h1>
              <p>
                Nothing green in here yet. Browse the collection and add a
                plant or two — your windowsill will thank you.
              </p>
              <Link
                to="/plants"
                className="btn btn--primary get-started-button"
                onClick={handleContinueShopping}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="page cart-page">
      <div className="cart-container">
        <div className="container">
          <div className="cart-head">
          <div>
            <p className="eyebrow">Your basket</p>
            <h1>Shopping Cart</h1>
          </div>
          <p className="cart-head__count">
            <strong>{totalQuantity}</strong>{" "}
            {totalQuantity === 1 ? "plant" : "plants"} in your cart
          </p>
        </div>

        <div className="cart-layout">
          <section className="cart-list" aria-label="Plants in your cart">
            <div className="cart-list__head" aria-hidden="true">
              <span>Plant</span>
              <span>Unit price</span>
              <span>Qty</span>
              <span>Total</span>
              <span />
            </div>

            {cart.map((item) => (
              <article className="cart-item" key={item.name}>
                <div className="cart-item-plant">
                  <div className="cart-item-thumb">
                    <img
                      className="cart-item-image"
                      src={item.image}
                      alt={item.name}
                    />
                  </div>
                  <div className="cart-item-info">
                    <h3 className="cart-item-name">{item.name}</h3>
                    <p className="cart-item-pot">
                      {item.potSize}
                      {item.care ? ` · ${item.care} care` : ""}
                    </p>
                  </div>
                </div>

                <div className="cart-item-pricing">
                  <span className="cart-line-label">Unit price</span>
                  <span className="cart-item-cost">
                    {formatPrice(item.cost)}
                  </span>
                </div>

                <div className="cart-item-quantity">
                  <span className="cart-line-label">Quantity</span>
                  <div className="qty-control">
                    <button
                      type="button"
                      className="qty-control__btn cart-item-button cart-item-button-dec"
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      &minus;
                    </button>
                    <span
                      className="qty-control__value cart-item-quantity-value"
                      aria-live="polite"
                    >
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="qty-control__btn cart-item-button cart-item-button-inc"
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="cart-item-line">
                  <span className="cart-line-label">Total</span>
                  <span className="cart-item-total">
                    Total: {formatPrice(calculateTotalCost(item))}
                  </span>
                </div>

                <button
                  type="button"
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <TrashIcon />
                  <span>Delete</span>
                </button>
              </article>
            ))}
          </section>

          <aside className="cart-summary" aria-label="Order summary">
            <h2>Order Summary</h2>

            <dl className="cart-summary__rows">
              <div>
                <dt>Plants ({totalQuantity})</dt>
                <dd>{formatPrice(calculateTotalAmount())}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd className="cart-summary__free">Free</dd>
              </div>
            </dl>

            <div className="cart-summary__total total_cart_amount">
              <span>Total Cart Amount</span>
              <strong>{formatPrice(calculateTotalAmount())}</strong>
            </div>

            <div className="continue_shopping_btn">
              <Link
                to="/plants"
                className="btn btn--ghost cart-back get-started-button"
                onClick={handleContinueShopping}
              >
                ← Continue Shopping
              </Link>

              <button
                type="button"
                className="get-started-button1"
                onClick={handleCheckoutShopping}
              >
                Checkout
              </button>
            </div>

            {checkoutMessage && (
              <p className="cart-summary__note" role="status">
                {checkoutMessage}
              </p>
            )}

            <p className="cart-summary__small">
              Every plant ships in a recyclable pot with a printed care card.
            </p>
          </aside>
        </div>
      </div>
    </div>
  </main>
  );
}

export default CartItem;
