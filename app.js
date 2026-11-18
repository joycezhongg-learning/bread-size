// How Big Is This Bread? — main logic
// ------------------------------------------------------------
// Flow: read inputs → volume → work back to length/width/height → slices & unit price → draw

const SLICE_THICKNESS_CM = 1.5; // A typical slice is ~1.5 cm thick (could become a user setting)

// Reference object: front of an iPhone (cm). Could later be a hand, credit card, etc.
const REFERENCE = { name: "iPhone", length: 14.7, width: 7.2 };

// ---------- 1. Geometry: volume → dimensions ----------
// Each shape takes a volume in cm³ plus its ratios and returns { length, width, height } in cm
const SHAPES = {
  // Round dome (boule): approximated as half an ellipsoid, V = π · d² · h / 6
  dome(volume, { heightToWidth }) {
    const d = Math.cbrt((6 * volume) / (Math.PI * heightToWidth));
    return { length: d, width: d, height: d * heightToWidth };
  },

  // Oval dome (batard, baguette): V = π · L · W · H / 6
  ovalDome(volume, { widthToLength, heightToWidth }) {
    const L = Math.cbrt((6 * volume) / (Math.PI * widthToLength * widthToLength * heightToWidth));
    const W = L * widthToLength;
    return { length: L, width: W, height: W * heightToWidth };
  },

  // Box (sandwich loaf): V = L · W · H
  box(volume, { widthToLength, heightToWidth }) {
    const L = Math.cbrt(volume / (widthToLength * widthToLength * heightToWidth));
    const W = L * widthToLength;
    return { length: L, width: W, height: W * heightToWidth };
  },
};

function estimate(bread, grams, price) {
  const volume = grams * bread.specificVolume; // cm³
  const size = SHAPES[bread.shape](volume, bread.ratios);
  const slices = Math.max(1, Math.floor(size.length / SLICE_THICKNESS_CM));
  const pricePer100g = price > 0 ? (price / grams) * 100 : null;
  return { volume, size, slices, pricePer100g };
}

// Size category (S / M / L / XL) from the bread's sizeBands in data/breads.js.
// Bands are ordered smallest → largest; take the first one the weight is under.
// The last band has no "under", so it catches everything heavier.
// Breads without sizeBands return null (no category shown).
function sizeBand(bread, grams) {
  if (!bread.sizeBands) return null;
  return bread.sizeBands.find((band) => band.under === undefined || grams < band.under);
}

// ---------- 2. Drawing: top-down outline + reference object ----------
// TODO (Yiwei): this is where the design work really happens
//   - Right now it's a simple top view; add a side view to show height
//   - Make the reference object switchable (hand / iPhone / credit card)
//   - Later: a true 1:1 "actual size" mode (calibrate the screen with a credit card first)
function renderVisual(bread, size) {
  const pad = 2; // cm
  const viewW = size.length + REFERENCE.width + pad * 3;
  const viewH = Math.max(size.width, REFERENCE.length) + pad * 2;

  const breadShape =
    bread.shape === "box"
      ? `<rect x="${pad}" y="${pad}" width="${size.length}" height="${size.width}" rx="1.2" class="bread" />`
      : `<ellipse cx="${pad + size.length / 2}" cy="${pad + size.width / 2}" rx="${size.length / 2}" ry="${size.width / 2}" class="bread" />`;

  const refX = pad * 2 + size.length;
  const refShape = `
    <rect x="${refX}" y="${pad}" width="${REFERENCE.width}" height="${REFERENCE.length}" rx="1" class="ref" />
    <text x="${refX + REFERENCE.width / 2}" y="${pad + REFERENCE.length / 2}" class="ref-label">${REFERENCE.name}</text>`;

  return `<svg viewBox="0 0 ${viewW} ${viewH}" role="img" aria-label="Bread size compared with an ${REFERENCE.name}">
    ${breadShape}${refShape}
  </svg>`;
}

// ---------- 3. Page interaction ----------
const form = document.getElementById("bread-form");
const typeSelect = document.getElementById("bread-type");

// Fill the dropdown with the bread types from the data file
window.BREADS.forEach((b) => {
  const opt = document.createElement("option");
  opt.value = b.id;
  opt.textContent = b.name;
  typeSelect.append(opt);
});

const fmt = (n) => n.toFixed(0);

form.addEventListener("submit", (event) => {
  event.preventDefault(); // Don't reload the page

  const bread = window.BREADS.find((b) => b.id === typeSelect.value);
  const grams = parseFloat(document.getElementById("grams").value);
  const price = parseFloat(document.getElementById("price").value);
  if (!bread || !(grams > 0)) return;

  const r = estimate(bread, grams, price);

  // Headline: badge + name for sourdough, plain heading for everything else
  const band = sizeBand(bread, grams);
  const badge = document.getElementById("size-badge");
  badge.hidden = !band;
  badge.textContent = band ? band.label : "";
  document.getElementById("result-heading").textContent =
    band ? `${band.name} loaf` : "Roughly this big";

  document.getElementById("visual").innerHTML = renderVisual(bread, r.size);
  document.getElementById("stat-size").textContent =
    `${fmt(r.size.length)} × ${fmt(r.size.width)} × ${fmt(r.size.height)} cm`;
  document.getElementById("stat-slices").textContent = `about ${r.slices}`;
  document.getElementById("stat-price").textContent =
    r.pricePer100g ? `S$${r.pricePer100g.toFixed(2)}` : "Add a price to see this";

  const result = document.getElementById("result");
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});
