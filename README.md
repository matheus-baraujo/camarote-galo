# Ticket Sale Platform for a Camarote

This project is a website/platform developed to facilitate ticket sales for a camarote (VIP lounge) during events. The application was built with Next.js and JavaScript for the frontend and utilizes PHP and MySQL for backend operations. Communication between the frontend and backend is handled via REST API calls.

---

## Features

- **Ticket sales and management**: Users can browse available tickets and make purchases.
- **Interactive user interface**: Built using `react-bootstrap` and other React libraries for a dynamic and responsive user experience.
- **Data security**: Passwords are securely hashed using `bcrypt`.
- **Photo galleries and lightbox**: Users can view event photos through a visually appealing gallery.
- **Smooth navigation**: Implemented scroll-spy for seamless navigation across sections.

---

## Technologies Used

### Frontend
- **Next.js**: Framework for server-rendered React applications.
- **JavaScript**: Core language for frontend logic.

### Backend
- **PHP**: Handles API routes for database operations.
- **MySQL**: Relational database for storing user and ticket data.

### REST API
- APIs are implemented in PHP and maintained separately from the Next.js project. The frontend communicates with the backend via `fetch` calls for CRUD operations.

---

## NPM Packages

The following npm packages were utilized in this project:

- **bcrypt**: For hashing user passwords securely.
- **react-bootstrap**: For building responsive and modern UI components.
- **dotenv**: For managing environment variables securely.
- **md5**: Used for generating unique hashes.
- **mysql2**: For interacting with the MySQL database.
- **react-photo-album**: For creating photo galleries.
- **react-ui-scrollspy**: To implement smooth navigation with scroll-spy functionality.
- **react-data-table-component**: For displaying tabular data interactively.
- **yet-another-react-lightbox**: For creating a responsive and interactive lightbox for images.

---

## Getting Started

### Prerequisites
Ensure you have the following installed on your system:
- Node.js
- npm or yarn
- PHP (with a server such as Apache or Nginx)
- MySQL

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and define your environment variables. Follow the example

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Ensure the backend PHP server is running and accessible at the API URL specified in your `.env` file.

---

## Folder Structure

- **`(pages)/`**: Contains all Next.js pages.
- **`_components/`**: Reusable React components.
- **`database/`**: Utility functions for the application (in majority associated with password creation).

---

## API Endpoints

The backend API handles operations such as:
- **User Authentication**: Registration and login with secure password handling.
- **Ticket Management**: CRUD operations for tickets.
- **Order Management**: Handling purchase orders.

---

## Deployment

1. Build the Next.js application:
   ```bash
   npm run build
   ```
2. Deploy the application to your preferred hosting service (e.g., Vercel, Netlify, or your own server).
3. Deploy the backend PHP API to a web server and ensure it connects to the MySQL database.

---
