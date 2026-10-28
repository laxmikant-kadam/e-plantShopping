import { Link } from "react-router-dom";
import storyImage from "../assets/story.svg";

const values = [
  {
    icon: "🌱",
    title: "Grown, not just shipped",
    text: "Every plant is raised in our own greenhouse in Half Moon Bay and acclimatised before it ever reaches a box.",
  },
  {
    icon: "💧",
    title: "Care that follows you home",
    text: "Each order includes a printed care card with light, water and feeding notes written by the grower who potted it.",
  },
  {
    icon: "♻️",
    title: "Kinder by design",
    text: "Recyclable pots, peat-free soil and plastic-free packing. If a plant arrives unhappy, we replace it free.",
  },
];

const stats = [
  { value: "2016", label: "Founded in Half Moon Bay" },
  { value: "25k+", label: "Plants rehomed" },
  { value: "40", label: "Local growers partnered" },
];

/**
 * About Us page with the Paradise Nursery story, values and visiting details.
 */
function AboutUs() {
  return (
    <main className="page about-page">
      <div className="about-us-container">
        <section className="about-hero container">
          <div className="about-hero__copy">
            <p className="eyebrow">About us</p>
            <h1>
              A little paradise,
              <br /> grown by hand.
            </h1>
            <p>
              Paradise Nursery began in 2016 with a single greenhouse, three
              shelves of Monstera cuttings and a stall at the Half Moon Bay
              farmers&apos; market. A decade later we still pot every plant
              ourselves — only now we send them to homes in all fifty states.
            </p>
            <p>
              We believe a home feels finished when something in it is alive. So
              we grow plants that forgive a missed watering, choose varieties
              that suit real apartments, and write care notes in plain English
              instead of botanical Latin.
            </p>
            <div className="about-hero__actions">
              <Link to="/plants" className="btn btn--primary">
                Shop the nursery
              </Link>
              <Link to="/cart" className="btn btn--ghost">
                View your cart
              </Link>
            </div>
          </div>

          <figure className="about-hero__media">
            <img
              src={storyImage}
              alt="Three potted plants on a wooden bench inside the Paradise Nursery greenhouse"
            />
            <figcaption>
              The original grow house — still where every cutting starts.
            </figcaption>
          </figure>
        </section>

        <section
          className="about-stats container"
          aria-label="Paradise Nursery at a glance"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="about-stats__item">
              <span>{stat.value}</span>
              <p>{stat.label}</p>
            </div>
          ))}
        </section>

        <section className="about-values container">
          <div className="section-heading">
            <p className="eyebrow">What we stand for</p>
            <h2>Good plants, grown the slow way</h2>
          </div>

          <div className="value-grid">
            {values.map((value) => (
              <article key={value.title} className="value-card">
                <span className="value-card__icon" aria-hidden="true">
                  {value.icon}
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="about-visit container">
          <div className="about-visit__card">
            <div>
              <p className="eyebrow">Come say hello</p>
              <h2>Visit the nursery</h2>
              <p>
                Our greenhouse shop is open to the public on weekends. Bring a
                cutting, take home a friend.
              </p>
            </div>

            <dl className="about-visit__details">
              <div>
                <dt>Address</dt>
                <dd>148 Cypress Lane, Half Moon Bay, CA 94019</dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>Sat &amp; Sun · 9am – 5pm</dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href="mailto:hello@paradisenursery.com">
                    hello@paradisenursery.com
                  </a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href="tel:+16505550142">(650) 555-0142</a>
                </dd>
              </div>
            </dl>
          </div>
        </section>
      </div>
    </main>
  );
}

export default AboutUs;
