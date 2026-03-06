# Expenses Tracking App

A simple, fast, and elegant personal expense tracker built with React and Vite. It lets you log your daily expenses, categorizes them, and tracks your total spending against a live currency conversion pull. 

![Expense Tracker Dashboard](./images/Home%20Screen.png)

I built this specifically to practice building a clean, modern UI from scratch without relying on heavy component libraries. All styling is pure CSS using a custom "slate light" glassmorphic aesthetic.

## Features
- **Local Storage:** All your data saves directly in your browser. No database setup needed.
- **Live Currency Exchange:** Fetches real-time conversion rates against your main balance using the Frankfurter API.
- **Categorization:** Breaks down spending into categories (Food, Travel, Marketing, Utilities, etc.)
- **Custom UI:** A fully responsive, 3-column dashboard built purely with CSS Grid and Flexbox.

## Tech Stack
- **React 18** (Hooks: `useState`, `useEffect`)
- **Vite** (for fast building and HMR)
- **Vanilla CSS** (CSS Variables, Flexbox, Grid, keyframe animations)
- **Frankfurter API** (for currency info)

## Running Locally

To get this running on your own machine:

1. Clone this repo
2. Run `npm install` to grab the dependencies
3. Run `npm run dev` to start the Vite server
4. Open `http://localhost:5173` in your browser

That's it! No environment variables or API keys required.
