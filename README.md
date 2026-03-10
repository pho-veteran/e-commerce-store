# VStore — E-Commerce Storefront

A full-featured online shopping storefront built with Next.js, integrated with a backend API and VNPay payment gateway.

**Live Demo:** [vstore-sigma.vercel.app](https://vstore-sigma.vercel.app)

> Academic project developed by a university student for learning and demonstration purposes.

---

## Description

VStore is a customer-facing e-commerce web application that allows users to browse products by category, manage a shopping cart and wishlist, and complete purchases through a secure checkout flow. It solves the problem of building a production-ready storefront by connecting to a separate admin/backend API for product and order data. The system supports Vietnamese address input and VNPay as the payment provider.

---

## Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org) (App Router, Server Components)
- React 18, TypeScript
- Tailwind CSS, Radix UI (shadcn/ui component library)

**Authentication**
- [Clerk](https://clerk.com) — user sign-in/sign-up and route protection

**Database**
- MongoDB via [Prisma ORM](https://www.prisma.io) (used for storing user addresses)

**State Management**
- [Zustand](https://zustand-demo.pmnd.rs) — cart, wishlist, and modal state

**Forms & Validation**
- React Hook Form + Zod

**Payment**
- [VNPay](https://vnpay.vn) payment gateway

**Other**
- Axios — API requests
- `idb-keyval` — IndexedDB persistence for cart/wishlist
- `react-hot-toast` — notifications
- `react-share` — social sharing

---

## Features

- Browse products by category with filtering by color, size, and price range
- Product detail page with image gallery and variant selection (color, size)
- Shopping cart with persistent local storage
- Wishlist with persistent local storage
- Secure checkout protected by authentication
- Address book management (add, edit, set default)
- VNPay payment integration with order result page
- Order history and order tracking in the account dashboard

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/pho-veteran/e-commerce-store.git
cd e-commerce-store

# 2. Install dependencies
npm install

# 3. Configure environment variables
# Create a .env file and fill in the required values:
#   DATABASE_URL                        — MongoDB connection string
#   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY   — Clerk publishable key
#   CLERK_SECRET_KEY                    — Clerk secret key
#   PUBLIC_STORE_URL                    — URL of the backend/admin API

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
app/               # Next.js App Router — pages and API routes
  (routes)/        # Public storefront routes (home, category, product, cart, etc.)
  checkout/        # Checkout flow (address selection, payment, result)
  api/             # Internal API routes (addresses, provinces, payment)
actions/           # Server-side data fetching functions (products, categories, orders)
components/        # Reusable UI components
  ui/              # Low-level UI primitives (buttons, inputs, cards, etc.)
  modals/          # Dialog modals (address, confirm, product preview)
  form/            # Form components with validation schemas
hooks/             # Zustand stores (cart, wishlist, modals)
lib/               # Prisma client and utility helpers
prisma/            # Prisma schema (MongoDB — Address model)
providers/         # App-level providers (toast, modals)
public/            # Static assets (province/district/ward data for VN addresses)
```

---

## Author

Developed by **pho-veteran** as a university student project.  
GitHub: [github.com/pho-veteran](https://github.com/pho-veteran)
