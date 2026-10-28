import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  selectCartItems,
  selectTotalQuantity,
} from "../redux/CartSlice.jsx";
import { formatPrice } from "../utils/formatPrice.js";
import monstera from "../assets/plants/monstera.svg";
import fiddle from "../assets/plants/fiddle.svg";
import bird from "../assets/plants/bird.svg";
import philodendron from "../assets/plants/philodendron.svg";
import calathea from "../assets/plants/calathea.svg";
import rubber from "../assets/plants/rubber.svg";
import aloe from "../assets/plants/aloe.svg";
import echeveria from "../assets/plants/echeveria.svg";
import cactus from "../assets/plants/cactus.svg";
import jade from "../assets/plants/jade.svg";
import pearls from "../assets/plants/pearls.svg";
import haworthia from "../assets/plants/haworthia.svg";
import peace from "../assets/plants/peace.svg";
import anthurium from "../assets/plants/anthurium.svg";
import orchid from "../assets/plants/orchid.svg";
import violet from "../assets/plants/violet.svg";
import bromeliad from "../assets/plants/bromeliad.svg";
import kalanchoe from "../assets/plants/kalanchoe.svg";

/* ---------------------------------- navbar --------------------------------- */

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
 * Navigation bar shown on the product listing and cart pages. It links to
 * Home, Plants and Cart, and its badge displays the live cart quantity.
 *
 * It is rendered by ProductList below and exported so App.jsx can render the
 * same navbar on the shopping cart page and the rest of the site.
 */
export function Navbar() {
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
          <NavLink to="/cart">Cart</NavLink>
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
          <span className="cart-badge" aria-hidden="true">
            {totalQuantity}
          </span>
        </NavLink>
      </div>
    </header>
  );
}

/* -------------------------------- plant data ------------------------------- */

/**
 * Three categories with six unique plants in each (18 plants total).
 * Every plant has a thumbnail, name and price, along with its care details.
 */
const plantsArray = [
  {
    category: "Tropical Plants",
    slug: "tropical-plants",
    tagline: "Big leaves, bold shapes, jungle energy.",
    plants: [
      {
        id: "monstera-deliciosa",
        name: "Monstera Deliciosa",
        cost: 34.99,
        image: monstera,
        description:
          "Iconic split leaves that bring instant jungle drama to a bright corner.",
        light: "Bright, indirect light",
        care: "Easy",
        potSize: '6" pot',
      },
      {
        id: "fiddle-leaf-fig",
        name: "Fiddle Leaf Fig",
        cost: 49.99,
        image: fiddle,
        description:
          "Tall, glossy fiddle-shaped leaves that make a statement in any sunny room.",
        light: "Bright, indirect light",
        care: "Moderate",
        potSize: '8" pot',
      },
      {
        id: "bird-of-paradise",
        name: "Bird of Paradise",
        cost: 42.5,
        image: bird,
        description:
          "Bold paddle-shaped leaves straight from the tropics, always reaching sunward.",
        light: "Full sun",
        care: "Moderate",
        potSize: '7" pot',
      },
      {
        id: "philodendron-birkin",
        name: "Philodendron Birkin",
        cost: 28.99,
        image: philodendron,
        description:
          "Deep green leaves pinstriped in cream, with a new pattern on every leaf.",
        light: "Bright, indirect light",
        care: "Easy",
        potSize: '5" pot',
      },
      {
        id: "calathea-orbifolia",
        name: "Calathea Orbifolia",
        cost: 32.0,
        image: calathea,
        description:
          "Round, silver-banded leaves that fold up each evening like small hands.",
        light: "Medium, indirect light",
        care: "Fussy",
        potSize: '6" pot',
      },
      {
        id: "rubber-plant",
        name: "Rubber Plant",
        cost: 26.5,
        image: rubber,
        description:
          "Glossy, burgundy-tinged leaves on a strong upright stem. Nearly indestructible.",
        light: "Bright, indirect light",
        care: "Easy",
        potSize: '6" pot',
      },
    ],
  },
  {
    category: "Succulents & Cacti",
    slug: "succulents-cacti",
    tagline: "Sun lovers that thrive on a little neglect.",
    plants: [
      {
        id: "aloe-vera",
        name: "Aloe Vera",
        cost: 18.99,
        image: aloe,
        description:
          "A spiky, soothing classic that thrives on a sunny windowsill and forgives neglect.",
        light: "Full sun",
        care: "Easy",
        potSize: '5" pot',
      },
      {
        id: "echeveria-elegans",
        name: "Echeveria Elegans",
        cost: 14.5,
        image: echeveria,
        description:
          "A dusty-rose rosette that looks hand-painted, happy in the driest spot.",
        light: "Full sun",
        care: "Easy",
        potSize: '4" pot',
      },
      {
        id: "golden-barrel-cactus",
        name: "Golden Barrel Cactus",
        cost: 22.0,
        image: cactus,
        description:
          "A ribbed golden sphere topped with a bright summer bloom. Zero fuss required.",
        light: "Full sun",
        care: "Easy",
        potSize: '5" pot',
      },
      {
        id: "jade-plant",
        name: "Jade Plant",
        cost: 16.99,
        image: jade,
        description:
          "Coin-shaped leaves on a miniature tree — a classic symbol of good luck.",
        light: "Bright light",
        care: "Easy",
        potSize: '5" pot',
      },
      {
        id: "string-of-pearls",
        name: "String of Pearls",
        cost: 19.5,
        image: pearls,
        description:
          "Trailing strands of tiny green beads that spill beautifully over a shelf.",
        light: "Bright light",
        care: "Moderate",
        potSize: '5" pot',
      },
      {
        id: "zebra-haworthia",
        name: "Zebra Haworthia",
        cost: 15.99,
        image: haworthia,
        description:
          "Zebra-striped spikes in a compact rosette that fits any desk or sill.",
        light: "Bright, indirect light",
        care: "Easy",
        potSize: '4" pot',
      },
    ],
  },
  {
    category: "Flowering Plants",
    slug: "flowering-plants",
    tagline: "Blooms that keep the colour coming.",
    plants: [
      {
        id: "peace-lily",
        name: "Peace Lily",
        cost: 29.99,
        image: peace,
        description:
          "Glossy leaves and elegant white spathes; perfectly content in gentle shade.",
        light: "Medium, indirect light",
        care: "Easy",
        potSize: '6" pot',
      },
      {
        id: "anthurium",
        name: "Anthurium",
        cost: 34.5,
        image: anthurium,
        description:
          "Waxy heart-shaped blooms in deep red that last for weeks, almost year-round.",
        light: "Bright, indirect light",
        care: "Moderate",
        potSize: '6" pot',
      },
      {
        id: "phalaenopsis-orchid",
        name: "Phalaenopsis Orchid",
        cost: 39.99,
        image: orchid,
        description:
          "Long-lasting moth orchids on a graceful arch — the easiest orchid to love.",
        light: "Bright, indirect light",
        care: "Moderate",
        potSize: '5" pot',
      },
      {
        id: "african-violet",
        name: "African Violet",
        cost: 21.5,
        image: violet,
        description:
          "Velvety leaves and clusters of violet blooms that repeat through the year.",
        light: "Bright, indirect light",
        care: "Moderate",
        potSize: '4" pot',
      },
      {
        id: "bromeliad-guzmania",
        name: "Bromeliad Guzmania",
        cost: 27.99,
        image: bromeliad,
        description:
          "A fiery star of bracts rising from a rosette of strappy green leaves.",
        light: "Bright, indirect light",
        care: "Easy",
        potSize: '6" pot',
      },
      {
        id: "kalanchoe",
        name: "Kalanchoe",
        cost: 23.5,
        image: kalanchoe,
        description:
          "Cheerful clusters of pink flowers above scalloped leaves, weeks at a time.",
        light: "Full sun",
        care: "Easy",
        potSize: '5" pot',
      },
    ],
  },
];

/* ---------------------------------- icons ---------------------------------- */

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
 * Product listing page: three categories with six plants each, grouped under
 * headings. Each card has a thumbnail, name, price and an Add to Cart button
 * that dispatches addItem(product) and disables via addedToCart[plant.name].
 */
function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectTotalQuantity);
  const [addedToCart, setAddedToCart] = useState(() =>
    Object.fromEntries(cartItems.map((item) => [item.name, true])),
  );
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return undefined;
    const timer = window.setTimeout(() => setNotice(""), 2600);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const handleAddToCart = (product) => {
    if (addedToCart[product.name]) return;

    dispatch(addItem(product));
    setAddedToCart((current) => ({ ...current, [product.name]: true }));
    setNotice(`${product.name} was added to your cart.`);
  };

  const totalPlants = plantsArray.reduce(
    (total, category) => total + category.plants.length,
    0,
  );

  return (
    <>
      <Navbar />

      <main className="page products-page">
        <section className="page-header container">
          <p className="eyebrow">The collection</p>
          <h1>Pick your next plant</h1>
          <p className="page-header__lead">
            {totalPlants} nursery-grown houseplants, hand-potted and ready for
            your windowsill. Every order ships with a simple care card.
          </p>

          <div className="chip-row" aria-label="Jump to a category">
            {plantsArray.map((category) => (
              <a
                key={category.slug}
                href={`#${category.slug}`}
                className="chip"
              >
                {category.category}
                <span>{category.plants.length}</span>
              </a>
            ))}

            <Link to="/cart" className="chip chip--cart">
              Cart
              <span>{totalQuantity}</span>
            </Link>
          </div>
        </section>

        {plantsArray.map((category) => (
          <section
            key={category.slug}
            id={category.slug}
            className="product-list"
            aria-labelledby={`${category.slug}-title`}
          >
            <div className="category container">
              <div className="category__head">
                <div>
                  <h2 id={`${category.slug}-title`}>{category.category}</h2>
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
                    added={Boolean(addedToCart[plant.name])}
                    onAdd={handleAddToCart}
                  />
                ))}
              </div>
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
    </>
  );
}

export default ProductList;
