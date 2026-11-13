// 面包种类数据
// ------------------------------------------------------------
// specificVolume（比容）= 体积 cm³ ÷ 重量 g，数字越大越蓬松。
// shape 决定用哪种几何形状估算尺寸（见 app.js 里的 SHAPES）。
// ratios 是形状比例，比如 boule 的 heightToWidth = 高 ÷ 直径。
//
// ⚠️ 下面所有数字都是“待验证”的起点：
//   - 论文里 sourdough 大约 2.1 – 3.4 cm³/g
//   - 蓬松的吐司可以到 5 cm³/g 以上
// 计划：去常买的 bakery 买面包，称重 + 量长宽高，自己算出真实比容，
// 然后把 verified 改成 true，并在 source 里写清楚来源。

window.BREADS = [
  {
    id: "sourdough-boule",
    name: "圆形 sourdough（boule）",
    specificVolume: 3.0,
    shape: "dome",
    ratios: { heightToWidth: 0.55 },
    verified: false,
    source: "文献范围 2.1–3.4 cm³/g，取中间值",
  },
  {
    id: "sourdough-batard",
    name: "椭圆 sourdough（batard）",
    specificVolume: 3.0,
    shape: "ovalDome",
    ratios: { widthToLength: 0.55, heightToWidth: 0.6 },
    verified: false,
    source: "同上",
  },
  {
    id: "sandwich-loaf",
    name: "吐司 / 方包",
    specificVolume: 5.0,
    shape: "box",
    ratios: { widthToLength: 0.5, heightToWidth: 1.0 },
    verified: false,
    source: "估计值，待实测",
  },
  {
    id: "baguette",
    name: "法棍",
    specificVolume: 4.5,
    shape: "ovalDome",
    ratios: { widthToLength: 0.1, heightToWidth: 0.8 },
    verified: false,
    source: "估计值，待实测",
  },
];
