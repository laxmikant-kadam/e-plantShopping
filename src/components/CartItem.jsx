import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
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

function CartRow({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="cart-row">
      <div className="cart-row__plant">
        <div className="cart-row__thumb">
          <img src={item.image} alt={item.name} />
        </div>
        <div className="cart-row__info">
          <h3>{item.name}</h3>
          <p className="cart-row__unit">
            {item.potSize}
            {item.care ? ` · ${item.care} care` : ""}
          </p>
        </div>
      </div>

      <div className="cart-row__pricing">
        <span className="cart-row__label">Unit price</span>
        <span className="cart-row__price">{formatPrice(item.price)}</span>
      </div>

      <div className="cart-row__qty">
        <span className="cart-row__label">Quantity</span>
        <div className="qty-control">
          <button
            type="button"
            className="qty-control__btn"
            onClick={() => onDecrease(item.id)}
            aria-label={`Decrease quantity of ${item.name}`}
          >
            &minus;
          </button>
          <span className="qty-control__value" aria-live="polite">
            {item.quantity}
          </span>
          <button
            type="button"
            className="qty-control__btn"
            onClick={() => onIncrease(item.id)}
            aria-label={`Increase quantity of ${item.name}`}
          >
            +
          </button>
        </div>
      </div>

      <div className="cart-row__line">
        <span className="cart-row__label">Total</span>
        <span className="cart-row__line-total">
          {formatPrice(item.price * item.quantity)}
        </span>
      </div>

      <button
        type="button"
        className="cart-row__remove"
        onClick={() => onRemove(item.id)}
        aria-label={`Remove ${item.name} from cart`}
      >
        <TrashIcon />
        <span>Delete</span>
      </button>
    </article>
  );
}

/**
 * Shopping cart page: totals for the whole cart and for each plant, quantity
 * controls, delete buttons, a checkout button and a way back to the shop.
 */
function CartItem() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const totalAmount = useSelector(selectTotalAmount);
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const handleCheckout = () => {
    setCheckoutMessage(
      "Coming Soon! Checkout isn't available in this demo yet — thanks for shopping at Paradise Nursery. 🌱",
    );
  };

  if (items.length === 0) {
    return (
      <main className="page cart-page container">
        <div className="cart-empty">
          <div className="cart-empty__art">
            <img src={emptyPlant} alt="" />
          </div>
          <p className="eyebrow">Your basket</p>
          <h1>Your cart is empty</h1>
          <p>
            Nothing green in here yet. Browse the collection and add a plant or
            two — your windowsill will thank you.
          </p>
          <Link to="/plants" className="btn btn--primary">
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page cart-page">
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

            {items.map((item) => (
              <CartRow
                key={item.id}
                item={item}
                onIncrease={(id) => dispatch(increaseQuantity(id))}
                onDecrease={(id) => dispatch(decreaseQuantity(id))}
                onRemove={(id) => dispatch(removeFromCart(id))}
              />
            ))}

            <Link to="/plants" className="btn btn--ghost cart-back">
              ← Continue Shopping
            </Link>
          </section>

          <aside className="cart-summary" aria-label="Order summary">
            <h2>Order Summary</h2>

            <dl className="cart-summary__rows">
              <div>
                <dt>Plants ({totalQuantity})</dt>
                <dd>{formatPrice(totalAmount)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd className="cart-summary__free">Free</dd>
              </div>
            </dl>

            <div className="cart-summary__total">
              <span>Total cart amount</span>
              <strong>{formatPrice(totalAmount)}</strong>
            </div>

            <button
              type="button"
              className="btn btn--primary btn--block"
              onClick={handleCheckout}
            >
              Checkout
            </button>

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
    </main>
  );
}

export default CartItem;
