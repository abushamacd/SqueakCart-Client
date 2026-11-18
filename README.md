# SqueakCart | E-commerce Application

SqueakCart is a full-featured e-commerce web application designed to provide a seamless online shopping experience. It includes product browsing, advanced filtering, shopping cart management, secure online payments, customer reviews, and blog functionality. The application also provides an administrative interface for managing products, categories, brands, and content.

## 🌐 Live Demo

[**Visit Live Application →**](https://squeak-cart-client.vercel.app)

## 📸 Project Preview

<img src="https://i.ibb.co.com/Q3Q0Fwh6/Screenshot-2026-11-18-134409.png" alt="homepage">

## 🚀 Technologies Used

The project is built using the following technologies:

- **React 18** – Building reusable and interactive UI components.
- **JavaScript (ES6+)** – Application logic and functionality.
- **Redux Toolkit** – Centralized state management.
- **React Router DOM** – Client-side routing and navigation.
- **Ant Design (AntD)** – Pre-built UI components and design elements.
- **Tailwind CSS** – Utility-first styling and responsive layouts.
- **Stripe** – Secure online payment integration.
- **Formik** – Form management and handling.
- **Yup** – Schema-based form validation.
- **React Dropzone** – File upload and drag-and-drop functionality.
- **React Quill** – Rich-text editing for blog content.
- **React Slick & Slick Carousel** – Interactive product sliders and carousels.
- **React Toastify** – Toast notifications and user feedback.
- **React Helmet & React Helmet Async** – Managing document metadata.
- **Day.js** – Date formatting and manipulation.
- **JWT Decode** – Decoding JSON Web Tokens.
- **React Icons** – Icon library for the user interface.

## ✨ Key Features

### 🛍️ Customer Features

- Browse products and explore product details.
- Search products by keywords.
- Filter products by category, brand, color, and price.
- Add products to the shopping cart.
- Manage cart items and product quantities.
- Secure online payments using Stripe.
- Create customer accounts and log in.
- Submit product reviews and feedback.
- Manage personal wishlists.
- Read blog articles and explore blog categories.
- Comment on blog posts.
- Like and dislike blog posts.

### 🔐 Admin Features

- Admin dashboard for managing store content.
- Add, update, and delete products.
- Manage product categories, colors, and brands.
- Manage product inventory and availability.
- Create and manage blog posts.
- Manage blog categories.
- Review customer feedback.
- Manage customer information.

### 🎨 UI & Experience

- Responsive and user-friendly interface.
- Interactive product sliders and carousels.
- Dynamic product filtering and search.
- Rich-text editor for blog content.
- Drag-and-drop file uploads.
- Form validation and error handling.
- Toast notifications for user feedback.
- Reusable React components.

## 📦 Dependencies

The project uses the following major dependencies:

| Package                        | Purpose                                   |
| ------------------------------ | ----------------------------------------- |
| `react`                        | Building user interfaces                  |
| `react-dom`                    | Rendering React components                |
| `@reduxjs/toolkit`             | Centralized state management              |
| `react-redux`                  | Connecting React with Redux               |
| `react-router-dom`             | Application routing                       |
| `antd`                         | UI component library                      |
| `@ant-design/charts`           | Data visualization                        |
| `@stripe/react-stripe-js`      | Stripe payment UI integration             |
| `@stripe/stripe-js`            | Stripe JavaScript SDK                     |
| `formik`                       | Form management                           |
| `yup`                          | Form validation                           |
| `react-dropzone`               | File uploads                              |
| `react-quill`                  | Rich-text editing                         |
| `react-rating-stars-component` | Product rating interface                  |
| `react-slick`                  | Carousel functionality                    |
| `slick-carousel`               | Carousel styling and functionality        |
| `react-toastify`               | Toast notifications                       |
| `react-helmet`                 | Document metadata                         |
| `react-helmet-async`           | Asynchronous metadata management          |
| `react-icons`                  | UI icons                                  |
| `jwt-decode`                   | JWT decoding                              |
| `dayjs`                        | Date and time manipulation                |
| `rc-color-picker`              | Color picker component                    |
| `react-accessible-accordion`   | Accessible accordion components           |
| `react-fast-marquee`           | Scrolling content and promotional banners |
| `http-status`                  | HTTP status code utilities                |

### Development Dependencies

- `react-scripts` – Create React App development and build configuration.
- `tailwindcss` – Utility-first CSS framework.
- `daisyui` – Tailwind CSS component library.
- `postcss` – CSS processing.
- `autoprefixer` – Automatic CSS vendor prefixing.

## 💻 Getting Started

Follow these instructions to run the project on your local machine.

### Prerequisites

Make sure you have installed:

- [Node.js](https://nodejs.org/)
- npm (comes with Node.js)
- [Git](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/abushamacd/SqueakCart-Client.git
```

### 2. Navigate to the Project Directory

```bash
cd SqueakCart-Client
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory and add the following environment variables:

```env
REACT_APP_SERVER_URL=your_backend_api_url
REACT_APP_STRIPE_PK=your_stripe_publishable_key
```

Replace the values with your actual backend API URL and Stripe publishable key.

**Important:** Never expose your Stripe secret key or other private credentials in the frontend application.

### 5. Start the Development Server

```bash
npm start
```

The application will be available at:

```text
http://localhost:3000
```

### 6. Build for Production

To create an optimized production build:

```bash
npm run build
```

The production-ready files will be generated inside the `build` directory.

### 7. Run Tests

To run the available test suite:

```bash
npm test
```

## 🔗 Backend Integration

SqueakCart uses a separate backend application for API communication, authentication, database operations, product management, and payment processing.

The frontend communicates with the backend through REST APIs.

**Backend Repository:**

[**SqueakCart Server →**](https://github.com/abushamacd/SqueakCart-Server)

## 🛠️ Why These Technologies?

- **React:** Chosen for its component-based architecture, reusability, and efficient UI development.
- **Redux Toolkit:** Used to manage global application states such as authentication, products, and shopping cart data.
- **Ant Design:** Provides ready-to-use UI components for building a consistent and interactive interface.
- **Tailwind CSS:** Makes responsive styling faster and helps maintain consistent layouts.
- **Stripe:** Integrated to provide secure online payment processing.
- **Formik & Yup:** Simplify form handling and provide structured form validation.
- **React Router:** Enables smooth client-side navigation without unnecessary page reloads.
- **React Quill:** Provides a rich-text editor for creating and managing blog content.
- **React Dropzone:** Simplifies image and file uploads through drag-and-drop interactions.
- **Day.js:** Makes date formatting and manipulation easier.

## 🧩 Challenges & Solutions

During the development of SqueakCart, several technical challenges were addressed:

1. **State Management:** Managing authentication, product information, and shopping cart data across multiple components required centralized state management using Redux Toolkit.

2. **Product Filtering & Search:** Implementing multiple filtering conditions such as category, brand, color, and price required coordinating frontend filters with backend API queries.

3. **Payment Integration:** Integrating Stripe required handling payment-related frontend interactions while keeping sensitive payment credentials on the backend.

4. **Authentication & Authorization:** Managing authenticated users and role-based administrative functionality required handling JWT-based authentication and protected application routes.

5. **Image Uploads:** Handling product images and blog media required integrating file upload functionality with the backend media management system.

6. **Form Validation:** Managing complex forms for products, users, and blog content required structured validation using Formik and Yup.

7. **Dynamic Content Management:** Building reusable interfaces for managing products, categories, brands, and blog posts helped maintain consistency and reduce code duplication.

8. **Shopping Cart Management:** Handling product quantities, colors, and cart updates required synchronizing frontend state with backend data.

## 🎯 What I Learned

Through this project, I gained practical experience in:

- Building full-featured e-commerce applications using React.
- Managing global application state with Redux Toolkit.
- Integrating Stripe for online payment processing.
- Implementing JWT-based authentication.
- Developing role-based administrative interfaces.
- Building advanced product search and filtering functionality.
- Integrating REST APIs with frontend applications.
- Handling image uploads and media management.
- Implementing form validation using Formik and Yup.
- Creating rich-text blog editors.
- Developing reusable and responsive UI components.
- Working with separate frontend and backend repositories.

## 🔗 Relevant Links

- **Live Application:** https://squeak-cart-client.vercel.app
- **Frontend Repository:** https://github.com/abushamacd/SqueakCart-Client
- **Backend Repository:** https://github.com/abushamacd/SqueakCart-Server

## 👨‍💻 Author

**Abu Shama**

- GitHub: [@abushamacd](https://github.com/abushamacd)

---

⭐ If you find this project interesting, consider giving it a star!
