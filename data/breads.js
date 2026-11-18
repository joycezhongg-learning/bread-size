// Bread types
// ------------------------------------------------------------
// specificVolume = volume (cm³) ÷ weight (g). Higher = airier.
// shape picks the geometry used to estimate size (see SHAPES in app.js).
// ratios describe proportions, e.g. for a dome, heightToWidth = height ÷ diameter.
//
// ⚠️ Every number below is an unverified starting point:
//   - Published studies put sourdough at roughly 2.1–3.4 cm³/g
//   - A fluffy sandwich loaf can exceed 5 cm³/g
// Plan: buy loaves from the bakeries I use, weigh and measure them,
// calculate the real specific volume, then set verified: true and note the source.

window.BREADS = [
  {
    id: "sourdough-boule",
    name: "Sourdough (round boule)",
    specificVolume: 3.0,
    shape: "dome",
    ratios: { heightToWidth: 0.55 },
    sizeBands: [
      { label: "S", name: "Small", under: 500 },
      { label: "M", name: "Medium", under: 750 },
      { label: "L", name: "Large", under: 1000 },
      { label: "XL", name: "Extra large" }, // no "under" = everything heavier
    ],
    verified: false,
    source: "Midpoint of published range (2.1–3.4 cm³/g)",
  },
  {
    id: "sourdough-batard",
    name: "Sourdough (oval batard)",
    specificVolume: 3.0,
    shape: "ovalDome",
    ratios: { widthToLength: 0.55, heightToWidth: 0.6 },
    sizeBands: [
      { label: "S", name: "Small", under: 500 },
      { label: "M", name: "Medium", under: 750 },
      { label: "L", name: "Large", under: 1000 },
      { label: "XL", name: "Extra large" }, // no "under" = everything heavier
    ],
    verified: false,
    source: "Same as above",
  },
  {
    id: "sandwich-loaf",
    name: "Sandwich loaf",
    specificVolume: 5.0,
    shape: "box",
    ratios: { widthToLength: 0.5, heightToWidth: 1.0 },
    verified: false,
    source: "Estimate, to be measured",
  },
  {
    id: "baguette",
    name: "Baguette",
    specificVolume: 4.5,
    shape: "ovalDome",
    ratios: { widthToLength: 0.1, heightToWidth: 0.8 },
    verified: false,
    source: "Estimate, to be measured",
  },
];
