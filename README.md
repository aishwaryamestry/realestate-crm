# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

## Property Management System

> > Overview
> > This project is a Real Estate Management Web Application where users can view and manage property listings, tenants, payments, and maintenance requests. The application allows for role-based access, with an Admin and Tenant role, and it includes features such as dynamic property filtering, payment history, and a dark/light mode toggle.

# Key Features

1. Dashboard: Displays an overview of properties, tenants, payments, and maintenance requests.
2. Property Listings: View properties with search, filtering, and sorting options (type, location, price).
3. Tenant Management: View tenant details with search and sorting functionality.
4. Payment History: Displays a record of past payments with the option to download reports.
5. Maintenance Requests: Manage and track reported maintenance issues.
6. Role-based Authentication: Login as an admin or tenant, with separate dashboards for each.
7. Responsive Layout: Optimized for mobile, tablet, and desktop screens.
8. Dark/Light Mode Toggle: Switch between light and dark themes.
9. API Integration: Fetch data dynamically from a JSON Server backend.
10. State Management: Use React Context API to manage authentication state and theme.

# Tech Stack

> > Frontend:

1. React - JavaScript library for building user interfaces.
2. Tailwind CSS - Utility-first CSS framework for custom, responsive design.
3. React Router DOM@6- Routing library for navigating between pages.
4. React Context API - For managing global state (authentication, theme).
5. Framer Motion - For animations and transitions.
6. Axios - For making HTTP requests to the backend.
7. React-toastify - For displaying toast notifications.
8. react-leaflet - For displaying maps.

> > Backend:

1. JSON Server - A mock REST API server to simulate a backend (already included in the project).
2. Local Storage - For storing authentication data (JWT tokens, user information).

> > State Management

1. The application uses React Context API to manage global state:
2. Authentication (useAuth): Manages login, logout, and user roles (Admin/Tenant).
3. Theme (useTheme): Manages the dark/light mode theme.

> > Custom Hooks:

1. useAuth: Custom hook for managing authentication (login, logout, user data).
2. useTheme: Custom hook for managing theme (light/dark mode).

> > Authentication Flow:

1. Admin and Tenant Roles: The user authentication flow checks the role and redirects to the appropriate dashboard (Admin/Tenant).
2. Local Storage: After login, user data and JWT token are stored in localStorage to maintain user session.

> > API Integration

    This project uses JSON Server as the backend to simulate real API requests. The backend is set up in db.json.

Endpoints:

    GET /users: Fetches a list of users (used for login authentication).
    GET /properties: Fetches the list of properties.
    GET /tenants:fetches tenants.
    GET /payments: Fetches the list of payment records.
    GET /maintenance: Fetches maintenance requests.
    Note: The application fetches data from these endpoints and updates the UI dynamically using Axios.

> > Responsive Design

    The application uses Tailwind CSS with a mobile-first design approach to ensure responsiveness on all devices. It adjusts its layout for different screen sizes:
    Desktop: Full-width content with large layout.
    Tablet: Adjusted layout for medium screens.
    Mobile: Compact layout with collapsible elements and stacked content.

# API Error Handling: The app uses Axios interceptors to handle API errors gracefully and display toast notifications in case of failed requests.

# Prerequisites

Make sure you have the following installed on your machine:

> > Node.js: Version 14 or higher
> > npm or yarn: For managing dependencies

# Setup and Installation

Follow these steps to set up the project locally:

1. Clone the Repository
   git clone https://github.com/aishwaryamestry/realestate-crm.git
2. Install Dependencies
   This project uses npm (or yarn) for package management. Install all necessary dependencies by running:

   > > npm install

   This will install the following dependencies as defined in your package.json:

   > > React and related libraries.
   > > Tailwind CSS for styling.
   > > Axios for making API requests.
   > > React Router DOM for routing.
   > > Framer Motion for animations.
   > > JSON Server for the mock backend.

3. Start the Application
   You do not need to run or install JSON Server separately.
   It is already included in the project and will be started automatically with the following command:

   > > npm start

   # or

   > > yarn start

   This command uses Concurrently to run two processes in parallel:

   # Starts the React app on http://localhost:3000.

   # Starts JSON Server on http://localhost:5000, which will serve the mock API data from db.json.

   Endpoints:
   http://localhost:5000/users
   http://localhost:5000/properties
   http://localhost:5000/tenants
   http://localhost:5000/payments
   http://localhost:5000/maintenance

4. Open the Application
   Once the app is running, you can open your browser and visit http://localhost:3000 to access the application.

5. Login Details:

# Admin login:

    username - admin
    password - admin
    role- admin

# Tenant login:

    username - tenant
    password - tenant
    role- tenant
