# Inglés con Calma

English-learning web app for Spanish speakers. Built for an iPhone home screen — no App Store, no ads, no accounts, no gamification. Adult-learner dignity is the design requirement.

**Live site:** https://deviousdevv303.github.io/ingles-con-calma/

## v1 (this release)

- Static site on GitHub Pages (published to branch `gh-pages`).
- **Spanish-first UI that progressively shifts to English** — Level 1 chrome is fully Spanish, Level 2 is bilingual, Level 3 is English with Spanish support. Translations are always visible on every phrase.
- **Read-aloud for every phrase** via the Web Speech API (`speechSynthesis`), with normal and slow (🐢) speeds. Prefers `en-US` voices for English and Latin-American Spanish voices for Spanish. iOS-safe: speech is only triggered from a tap.
- **11 lessons, 140 items**, shaped for Spanish speakers:
  - **Level 1 — Everyday phrases:** greetings & polite words, the grocery store, the doctor, phone calls, numbers.
  - **Level 2 — The sounds English has and Spanish doesn't:** TH (voiced/unvoiced), long vs short vowels (sheep/ship, fool/full), B vs V, plus R, H, Y, J — with minimal pairs.
  - **Level 3 — False friends:** actual, embarrassed, library, exit… including the important warnings (embarazada ≠ embarrassed, preservativo ≠ preservative, molestar ≠ molest, constipado ≠ constipated).
- **Large touch targets** (58px+ buttons, full-width cards, tap the phrase itself to hear it), safe-area aware, no tracking, works offline after the first visit (service worker).
- Progress (completed lessons) is stored on the device only, in `localStorage`. Nothing leaves the phone.

## Install on the iPhone

Open the site in **Safari → Share → «Add to Home Screen»**. The app also shows these instructions in Spanish on its home screen.

## Editing content

All lesson content is plain data in `js/data-*.js` — no build step. Edit and commit to `gh-pages` (or open a PR) and the site updates. Bump `CACHE` in `sw.js` when shipping content changes so devices pick them up.

## v2 (planned, not built)

- AI conversation practice with gentle correction (server-backed, opt-in).
