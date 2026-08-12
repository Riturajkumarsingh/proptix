# Proptix — Enterprise Real Estate Platform

Proptix is a premium, modern real estate web application built to connect buyers, sellers, and associates. Designed with a luxury aesthetic, Proptix offers seamless property discovery, site visit booking, and comprehensive management dashboards for all user roles.

## 🌟 Features

- **Luxury User Interface:** Built with a stunning dark emerald, gold, and white theme. Fully responsive on all mobile and desktop devices.
- **Dynamic Property Search:** Filter properties by location, type, and budget.
- **Role-Based Dashboards:** 
  - **Customer:** Track property interests, saved homes, and site visits.
  - **Associate:** Manage clients, track commissions, and monitor sub-associates.
  - **Admin:** Full oversight over properties, users, bookings, and franchise applications.
- **Book Site Visits:** Integrated 3-step wizard for clients to schedule property visits.
- **Franchise Applications:** Dedicated portal for aspiring franchise partners.
- **Secure Authentication:** JWT-based authentication system with encrypted passwords.

## 🛠 Tech Stack

### Frontend
- **Framework:** React + Vite
- **Routing:** React Router v6
- **Styling:** CSS (Custom luxury theme) + Tailwind CSS (Utility classes)
- **Animations:** Framer Motion
- **Icons:** React Icons (Feather Icons)
- **HTTP Client:** Axios

### Backend
- **Framework:** Node.js + Express.js
- **Database:** SQLite (via Prisma ORM)
- **Authentication:** JSON Web Tokens (JWT) & bcryptjs
- **Validation:** Express Validator

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd realstate
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   
   # Create a .env file based on .env.example (or manually)
   # Run Prisma Migrations and Seed Database
   npx prisma generate
   npx prisma migrate dev --name init
   npm run seed
   
   # Start the backend server
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   # In a new terminal window
   cd frontend
   npm install
   
   # Start the frontend dev server
   npm run dev
   ```

4. **Access the Application**
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:5000`

## 📦 Project Structure

```text
realstate/
├── backend/               # Node/Express API
│   ├── prisma/            # Prisma schema and migrations
│   └── src/
│       ├── controllers/   # Route handlers
│       ├── middlewares/   # Auth and validation middlewares
│       ├── routes/        # API route definitions
│       └── utils/         # Helpers (logger, error handling)
└── frontend/              # React Application
    ├── src/
    │   ├── assets/        # Images and icons
    │   ├── components/    # Reusable UI components & layouts
    │   ├── context/       # React Context (Auth)
    │   └── pages/         # Page components (Website, Auth, Dashboards)
```

## 🤝 Contributing

Contributions are welcome! Please follow the standard fork, branch, and pull request workflow.

## 📄 License

This project is licensed under the MIT License.
