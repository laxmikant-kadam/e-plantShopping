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

/**
 * Every plant the nursery sells.
 * The cart stores a copy of the fields it needs (id, name, price, image).
 */
export const plants = [
  /* ------------------------------- Tropical ------------------------------- */
  {
    id: "monstera-deliciosa",
    name: "Monstera Deliciosa",
    category: "tropical",
    price: 34.99,
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
    category: "tropical",
    price: 49.99,
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
    category: "tropical",
    price: 42.5,
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
    category: "tropical",
    price: 28.99,
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
    category: "tropical",
    price: 32.0,
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
    category: "tropical",
    price: 26.5,
    cost: 26.5,
    image: rubber,
    description:
      "Glossy, burgundy-tinged leaves on a strong upright stem. Nearly indestructible.",
    light: "Bright, indirect light",
    care: "Easy",
    potSize: '6" pot',
  },

  /* --------------------------- Succulents & cacti -------------------------- */
  {
    id: "aloe-vera",
    name: "Aloe Vera",
    category: "succulents",
    price: 18.99,
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
    category: "succulents",
    price: 14.5,
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
    category: "succulents",
    price: 22.0,
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
    category: "succulents",
    price: 16.99,
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
    category: "succulents",
    price: 19.5,
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
    category: "succulents",
    price: 15.99,
    cost: 15.99,
    image: haworthia,
    description:
      "Zebra-striped spikes in a compact rosette that fits any desk or sill.",
    light: "Bright, indirect light",
    care: "Easy",
    potSize: '4" pot',
  },

  /* ------------------------------- Flowering ------------------------------- */
  {
    id: "peace-lily",
    name: "Peace Lily",
    category: "flowering",
    price: 29.99,
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
    category: "flowering",
    price: 34.5,
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
    category: "flowering",
    price: 39.99,
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
    category: "flowering",
    price: 21.5,
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
    category: "flowering",
    price: 27.99,
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
    category: "flowering",
    price: 23.5,
    cost: 23.5,
    image: kalanchoe,
    description:
      "Cheerful clusters of pink flowers above scalloped leaves, weeks at a time.",
    light: "Full sun",
    care: "Easy",
    potSize: '5" pot',
  },
];

/** Three shopping categories used to group the product listing. */
export const categories = [
  {
    id: "tropical",
    name: "Tropical Plants",
    tagline: "Big leaves, bold shapes, jungle energy.",
  },
  {
    id: "succulents",
    name: "Succulents & Cacti",
    tagline: "Sun lovers that thrive on a little neglect.",
  },
  {
    id: "flowering",
    name: "Flowering Plants",
    tagline: "Blooms that keep the colour coming.",
  },
];

export const plantsByCategory = categories.map((category) => ({
  ...category,
  plants: plants.filter((plant) => plant.category === category.id),
}));
