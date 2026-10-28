import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { plantsByCategory, plants } from "../data/plants.js";
import { addItem, selectCartItems } from "../redux/CartSlice.jsx";
import { formatPrice } from "../utils/formatPrice.js";

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 10.5 8 14.5 16 6" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M10 4v12M4 10h12" />
    </svg>
  );
}

function PlantCard({ plant, added, onAdd }) {
  return (
    <article className={`plant-card${added ? " plant-card--added" : ""}`}>
      <div className="plant-card__media">
        <img src={plant.image} alt={plant.name} loading="lazy" />
        <span className="plant-card__care">{plant.care}</span>
      </div>

      <div className="plant-card__body">
        <div className="plant-card__title">
          <h3>{plant.name}</h3>
          <span className="plant-card__pot">{plant.potSize}</span>
        </div>
        <p className="plant-card__desc">{plant.description}</p>
        <p className="plant-card__meta">
          <span aria-hidden="true">☀</span> {plant.light}
        </p>

        <div className="plant-card__footer">
          <span className="plant-card__price">{formatPrice(plant.cost)}</span>
          <button
            type="button"
            className="btn btn--add"
            onClick={() => onAdd(plant)}
            disabled={added}
            aria-label={
              added
                ? `${plant.name} is already in your cart`
                : `Add ${plant.name} to cart`
            }
          >
            {added ? (
              <>
                <CheckIcon /> Added
              </>
            ) : (
              <>
                <PlusIcon /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

/**
 * Product listing page: plants grouped into three categories, six per
 * category, each with a thumbnail, name, price and an Add to Cart button that
 * disables itself once the plant is in the cart.
 */
function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const isInCart = (id) => cartItems.some((item) => item.id === id);

  const handleAddToCart = (plant) => {
    if (isInCart(plant.id)) return;
    dispatch(addItem(plant));
    setNotice(`${plant.name} was added to your cart.`);
  };

  return (
    <main className="page products-page">
      <section className="page-header container">
        <p className="eyebrow">The collection</p>
        <h1>Pick your next plant</h1>
        <p className="page-header__lead">
          {plants.length} nursery-grown houseplants, hand-potted and ready for
          your windowsill. Every order ships with a simple care card.
        </p>

        <div className="chip-row" aria-label="Jump to a category">
          {plantsByCategory.map((category) => (
            <a key={category.id} href={`#${category.id}`} className="chip">
              {category.name}
              <span>{category.plants.length}</span>
            </a>
          ))}
        </div>
      </section>

      {plantsByCategory.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="category container"
          aria-labelledby={`${category.id}-title`}
        >
          <div className="category__head">
            <div>
              <h2 id={`${category.id}-title`}>{category.name}</h2>
              <p>{category.tagline}</p>
            </div>
            <span className="category__count">
              {category.plants.length} plants
            </span>
          </div>

          <div className="plant-grid">
            {category.plants.map((plant) => (
              <PlantCard
                key={plant.id}
                plant={plant}
                added={isInCart(plant.id)}
                onAdd={handleAddToCart}
              />
            ))}
          </div>
        </section>
      ))}

      <div
        className={`toast${notice ? " toast--visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        {notice}
      </div>
    </main>
  );
}

export default ProductList;
