# How Big Is This Bread? 🍞

Bakeries list their loaves by weight, but grams don't tell you how big a loaf actually is — or whether it's good value.
This page takes a **bread type + weight + price** and shows:

- A size comparison next to a familiar object (an iPhone)
- Roughly how many slices you'll get
- Price per 100g

Mobile first, single page, plain HTML / CSS / JavaScript. Nothing to install.

## Project structure

```
index.html       Page structure
style.css        Styles (mobile first)
app.js           Calculations, drawing and interaction
data/breads.js   Bread types and specific-volume data (to be calibrated)
```

## Run locally

Open `index.html` in a browser.
To test on your phone: run `python3 -m http.server 8000` on your computer, connect your phone to the same Wi-Fi, and open `http://<your-computer's-IP>:8000`.

## Deploy (Vercel, free)

The site will be deployed on [Vercel](https://vercel.com). It's a static site with no build step, so there's nothing to configure.

1. Push the code to GitHub
2. On Vercel: **Add New → Project**, then import this repo
3. Framework Preset: **Other**. Leave the build command empty and the output directory as the root (`./`)
4. Click **Deploy**. The site goes live at `https://<project-name>.vercel.app`

After that, every push to `main` redeploys automatically, and every other branch or pull request gets its own preview URL.

## Roadmap

- [x] v0: project skeleton, basic calculation working
- [ ] Measure 4–5 real loaves (weigh + measure) and replace the estimates in `data/breads.js`
- [ ] Design the size visual: side view, switchable reference objects (hand / iPhone / credit card)
- [ ] True 1:1 "actual size" mode (calibrate the screen with a credit card)
- [ ] Compare bakeries (enter several loaves, compare price per 100g)
- [ ] AR preview (`<model-viewer>`; iOS needs a USDZ model)
