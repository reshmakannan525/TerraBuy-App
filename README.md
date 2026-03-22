# ◆ ARTEFACT — React Native Ecommerce App

A premium ecommerce mobile app with a distinctive editorial aesthetic — dark ink tones, warm cream accents, and rust orange highlights.

## Features

- **Auth Flow** — Login & Signup with validation and local state management
- **Home Screen** — Product grid with category filter, search, and badges
- **Product Detail** — Full product view with add-to-cart
- **Cart Screen** — Quantity control, remove items, order summary, checkout
- **Redux Toolkit** — Global cart & auth state management
- **NativeWind** — Tailwind CSS styling for React Native

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Start Expo
npx expo start
```

Scan the QR code with **Expo Go** on your phone, or press `i` for iOS simulator / `a` for Android emulator.

## Demo Account

```
Email:    demo@shop.com
Password: demo123
```

Or create a new account from the Sign Up tab.

## Project Structure

```
ShopApp/
├── App.js                          # Root with Redux Provider
├── babel.config.js                 # NativeWind babel plugin
├── tailwind.config.js              # Tailwind theme config
├── package.json
└── src/
    ├── data/
    │   └── products.js             # 8 dummy products
    ├── redux/
    │   ├── store.js                # Redux store
    │   ├── cartSlice.js            # Cart state (add/remove/qty)
    │   └── authSlice.js            # Auth state (login/signup/logout)
    ├── navigation/
    │   └── AppNavigator.js         # Stack navigator, auth gating
    └── screens/
        ├── AuthScreen.js           # Login / Signup
        ├── HomeScreen.js           # Product grid + search + filter
        ├── ProductDetailScreen.js  # Product info + add to cart
        └── CartScreen.js           # Cart management + checkout
```

## Design System

| Token   | Color     | Usage                        |
|---------|-----------|------------------------------|
| ink     | `#0D0D0D` | Primary dark, headers        |
| paper   | `#F5F0E8` | Background, cards            |
| cream   | `#EDE8DC` | Inputs, chips, subtle fills  |
| rust    | `#C4522A` | CTA buttons, prices, badges  |
| gold    | `#D4A853` | Brand accent, stars, labels  |
| sage    | `#7A8C6E` | Success states, "New" badge  |
