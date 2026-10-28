import { useEffect } from "react";
import { Link, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import ProductList from "./components/ProductList.jsx";
import CartItem from "./components/CartItem.jsx";
import AboutUs from "./components/AboutUs.jsx";
import monstera from "./assets/plants/monstera.svg";
import peace from "./assets/plants/peace.svg";
import orchid from "./assets/plants/orchid.svg";
import "./App.css";

const highlights = [
  { title: "Grown in our greenhouse", text: "Hand-potted, never mass-produced." },
  { title: "Free delivery over $50", text: "Packed with care, shipped in 2 days." },
  { title: "30-day plant promise", text: "Unhappy plant? We replace it." },
];

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/**
 * Paradise Nursery landing page: the company name, a short introduction and
 * the "Get Started" button that opens the product listing.
 */
function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="landing">
      <div className="landing__scrim" aria-hidden="true" />

      <div className="landing__content container">
        <div className="landing__copy">
          <p className="landing__badge">
            <span aria-hidden="true">🌿</span> Est. 2016 · Half Moon Bay,
            California
          </p>

          <h1 className="landing__title">Paradise Nursery</h1>

          <p className="landing__tagline">
            Bring the outside in — one happy houseplant at a time.
          </p>

          <p className="landing__text">
            Thoughtfully grown tropicals, sun-loving succulents and
            long-blooming flowers, potted by hand and delivered to your door
            with a care card. Find the plant that suits your light.
          </p>

          <div className="landing__actions">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={() => navigate("/plants")}
            >
              Get Started
              <span aria-hidden="true">→</span>
            </button>
            <Link to="/about" className="btn btn--ghost-light btn--lg">
              Our Story
            </Link>
          </div>

          <ul className="landing__highlights">
            {highlights.map((item) => (
              <li key={item.title}>
                <strong>{item.title}</strong>
                <span>{item.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <aside className="landing__panel" aria-label="This week's favourites">
          <p className="landing__panel-eyebrow">This week&apos;s favourites</p>
          <p className="landing__panel-title">
            Three plants our growers can&apos;t stop talking about.
          </p>

          <div className="landing__panel-plants">
            {[
              { img: monstera, name: "Monstera", price: "$34.99" },
              { img: peace, name: "Peace Lily", price: "$29.99" },
              { img: orchid, name: "Orchid", price: "$39.99" },
            ].map((plant) => (
              <div key={plant.name} className="landing__panel-plant">
                <img src={plant.img} alt={plant.name} />
                <div>
                  <span>{plant.name}</span>
                  <small>{plant.price}</small>
                </div>
              </div>
            ))}
          </div>

          <Link to="/plants" className="landing__panel-link">
            Browse the full collection <span aria-hidden="true">→</span>
          </Link>

          <p className="landing__panel-note">
            <span aria-hidden="true">★★★★★</span> Loved by 25,000+ plant
            parents
          </p>
        </aside>
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <main className="page container not-found">
      <p className="eyebrow">404</p>
      <h1>This page wandered off</h1>
      <p>The path you followed doesn&apos;t lead anywhere in the greenhouse.</p>
      <Link to="/" className="btn btn--primary">
        Back to the nursery
      </Link>
    </main>
  );
}

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <div className="site-footer__brand">
          <span>Paradise Nursery</span>
          <p>148 Cypress Lane, Half Moon Bay, CA 94019</p>
        </div>

        <nav className="site-footer__links" aria-label="Footer navigation">
          <Link to="/">Home</Link>
          <Link to="/plants">Plants</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/about">About Us</Link>
        </nav>

        <p className="site-footer__copy">
          © {year} Paradise Nursery · Grown with patience.
        </p>
      </div>
    </footer>
  );
}

function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plants" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
