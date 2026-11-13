# Project context for Claude

## What this is
A mobile-first single-page web tool: user enters bread type + weight (g) + optional price,
and sees an estimated real-world size, number of slices, and price per 100g.
Pain point: Singapore bakeries list only grams online, so buyers can't tell how big a loaf is or whether it's good value.

## Who's building it
Yiwei — a UX/product designer learning to build and ship products end to end.
She writes the code herself; Claude is a coach and pair programmer.

## How to work with her
- Explain what a change does and why, in plain language (Chinese is fine), before or alongside the code.
- Prefer small, reviewable steps over large rewrites. One feature at a time.
- Don't silently rewrite code she wrote; suggest, then let her decide.
- When she asks "how", teach the concept first, then show the minimal code.

## Technical constraints
- Plain HTML / CSS / vanilla JS. No frameworks, no build step, no npm — must work by opening index.html and on GitHub Pages.
- Mobile first: design for ~375px wide, then enhance for larger screens.
- Data lives in `data/breads.js` (a JS file, not JSON, so it works when opened via file://).
- All specific-volume numbers are estimates until marked `verified: true`.
