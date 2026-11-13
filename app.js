// 这个面包有多大？— 主逻辑
// ------------------------------------------------------------
// 流程：读取输入 → 算体积 → 按形状反推长宽高 → 算片数和单价 → 画图

const SLICE_THICKNESS_CM = 1.5; // 一片面包大约 1.5cm 厚（可以之后让用户调）

// 参照物：iPhone 正面尺寸（cm）。之后可以换成手掌、信用卡等
const REFERENCE = { name: "iPhone", length: 14.7, width: 7.2 };

// ---------- 1. 几何：体积 → 尺寸 ----------
// 每种形状给一个函数：输入体积 cm³ 和比例，返回 { length, width, height }（cm）
const SHAPES = {
  // 圆顶（圆形 boule）：近似成半个椭球，V = π · d² · h / 6
  dome(volume, { heightToWidth }) {
    const d = Math.cbrt((6 * volume) / (Math.PI * heightToWidth));
    return { length: d, width: d, height: d * heightToWidth };
  },

  // 椭圆圆顶（batard、法棍）：V = π · L · W · H / 6
  ovalDome(volume, { widthToLength, heightToWidth }) {
    const L = Math.cbrt((6 * volume) / (Math.PI * widthToLength * widthToLength * heightToWidth));
    const W = L * widthToLength;
    return { length: L, width: W, height: W * heightToWidth };
  },

  // 长方体（吐司）：V = L · W · H
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

// ---------- 2. 画图：俯视轮廓 + 参照物 ----------
// TODO（Yiwei）：这里是最值得你发挥设计的地方
//   - 现在只是简单的俯视图，可以加侧视图（看高度）
//   - 参照物可以做成可切换（手掌 / iPhone / 信用卡）
//   - 之后可以做“真实 1:1 尺寸”模式（需要先用信用卡校准屏幕）
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

  return `<svg viewBox="0 0 ${viewW} ${viewH}" role="img" aria-label="面包与${REFERENCE.name}的大小对比">
    ${breadShape}${refShape}
  </svg>`;
}

// ---------- 3. 页面交互 ----------
const form = document.getElementById("bread-form");
const typeSelect = document.getElementById("bread-type");

// 把数据里的面包种类填进下拉框
window.BREADS.forEach((b) => {
  const opt = document.createElement("option");
  opt.value = b.id;
  opt.textContent = b.name;
  typeSelect.append(opt);
});

const fmt = (n) => n.toFixed(0);

form.addEventListener("submit", (event) => {
  event.preventDefault(); // 不刷新页面

  const bread = window.BREADS.find((b) => b.id === typeSelect.value);
  const grams = parseFloat(document.getElementById("grams").value);
  const price = parseFloat(document.getElementById("price").value);
  if (!bread || !(grams > 0)) return;

  const r = estimate(bread, grams, price);

  document.getElementById("visual").innerHTML = renderVisual(bread, r.size);
  document.getElementById("stat-size").textContent =
    `长 ${fmt(r.size.length)} × 宽 ${fmt(r.size.width)} × 高 ${fmt(r.size.height)} cm`;
  document.getElementById("stat-slices").textContent = `约 ${r.slices} 片`;
  document.getElementById("stat-price").textContent =
    r.pricePer100g ? `S$${r.pricePer100g.toFixed(2)}` : "填价格后显示";

  const result = document.getElementById("result");
  result.hidden = false;
  result.scrollIntoView({ behavior: "smooth", block: "start" });
});
