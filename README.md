# E-Commerce Store

A Next.js-based e-commerce application built with TypeScript and Tailwind CSS. The application integrates with the Fake Store API to display products, manage shopping cart functionality, and provide filtering and search capabilities.

## Setup Instructions

### Prerequisites
- Node.js 18 or higher
- Yarn package manager

### Installation

1. Clone the repository
```bash
git clone https://github.com/lyella/tmi-technical-assestment
cd tmi-technical-assestment
```

2. Install dependencies
```bash
yarn install
```

3. Run the development server
```bash
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Build for Production
```bash
yarn build
yarn start
```

## Features Implemented

### Product Listing
- Display all products from the Fake Store API
- Grid layout that adjusts based on screen size
- Product cards show image, title, price, and rating
- Category filter to view products by category or view all
- Real-time search functionality across product titles and descriptions
- Price range filtering with slider control
- Sort options: price (low to high, high to low), name (A-Z, Z-A)

### Product Details
- Individual product page with detailed information
- Product image, full description, and specifications
- Category badge and star rating display
- Quantity selector
- Add to cart functionality

### Shopping Cart
- Add products to cart with specified quantities
- Update quantities directly from cart page
- Remove items from cart
- Display subtotal per item and total cart value
- Shipping calculation: free over $50, otherwise $5.99
- Cart badge in navigation showing total item count
- Cart state persists across page refreshes using localStorage

### User Interface
- Loading spinners during API calls
- Empty state messages for cart and search results
- Error handling with user-friendly messages
- Mobile-responsive design
- Form validation for quantity inputs

### Additional Pages
- Home page with featured products
- About page
- Contact page with form
- FAQ section
- Privacy policy
- Terms and conditions

## Technical Implementation

**Frontend Stack**
- Next.js 15 (App Router)
- TypeScript for type safety
- Tailwind CSS for styling
- Redux Toolkit for state management

**API Integration**
- Fake Store API (https://fakestoreapi.com)
- Client-side data fetching
- Error handling and loading states

**State Management**
- Redux Toolkit for cart state
- localStorage integration for persistence
- Type-safe actions and reducers

**Routing**
- Next.js App Router
- Dynamic routes for product details
- Server-side rendering where applicable

## Project Structure

```
app/                    - Next.js pages and routing
  cart/                - Shopping cart page
  products/           - Product listing and detail pages
    [id]/            - Dynamic product detail route
  layout.tsx         - Root layout component
  page.tsx           - Home page

components/           - Reusable React components
  CartItem.tsx       - Cart item display
  EmptyState.tsx     - Empty state component
  Footer.tsx         - Footer component
  LoadingSpinner.tsx - Loading indicator
  Navbar.tsx         - Navigation bar
  ProductCard.tsx    - Product card component
  Providers.tsx      - Redux provider wrapper
  ReviewSection.tsx  - Product review display
  SearchBar.tsx      - Search input component

hooks/               - Custom React hooks
  useCart.ts        - Cart management hooks

lib/                - Utility functions
  api.ts           - API service functions
  utils.ts         - Helper utilities

store/              - Redux configuration
  cartSlice.ts     - Cart state and actions
  index.ts         - Store setup

types/              - TypeScript definitions
  index.ts         - Shared type definitions
```

## Assumptions Made

1. **API Limitations**: The Fake Store API has limited endpoints. Category filtering is done client-side after fetching all products.

2. **Authentication**: No user authentication is implemented as it was not part of the requirements. The cart is session-based and stored locally.

3. **Checkout Process**: The checkout button is present but does not process actual payments. This would require integration with a payment gateway.

4. **Product Inventory**: No stock management is implemented. All products are assumed to be available in unlimited quantities.

5. **Image Handling**: Product images from the API are used as-is. Some images may load slowly depending on the source.

6. **Search**: Search is performed on the client-side across product titles and descriptions after initial fetch.

7. **Shipping**: Simplified shipping calculation - free shipping for orders over $50, flat $5.99 rate otherwise.

8. **Browser Support**: The application is built for modern browsers. Older browsers may require additional polyfills.

9. **Static Generation**: Some pages use static generation while others use client-side rendering based on data requirements.

10. **Error Recovery**: Network errors show user-friendly messages but automatic retry is not implemented.

## Browser Compatibility

Tested and working on:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project was created as a technical assessment.
