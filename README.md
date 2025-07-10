🌾 Smart Farm Equipment Rental System – FarmRent
An end-to-end web application where farmers can browse, book, and rent agricultural equipment from nearby owners. Owners can list their farm tools, and admins manage the overall system.

🔧 Features
👨‍🌾 User Roles: Farmer, Owner, Admin

🔐 Authentication: Register, Login, JWT-based session management

🚜 Equipment Listing: Add, filter, search by category, price, and location

📅 Booking System: Book equipment with custom date ranges

📈 Dashboard: Personalized stats for farmers, owners, and admins

📝 Review & Ratings: Star ratings and comments for listed equipment

📦 Admin Panel: Approve listings, monitor users, and manage the platform

📁 Project Structure
bash
Copy
Edit
project/
│
├── public/                # Frontend files (HTML, CSS, JS)
│   ├── index.html
│   ├── login.html
│   ├── register.html
│   ├── equipment.html
│   ├── dashboard.html
│   ├── css/
│   └── js/
│
├── models/                # Mongoose models
│   ├── User.js
│   ├── Equipment.js
│   └── Booking.js
│
├── routes/                # Express routes
│   ├── auth.js
│   ├── user.js
│   ├── equipment.js
│   └── booking.js
│
├── middleware/            # Middleware (auth checks, etc.)
│
├── seed.js                # Default data seeding script
├── server.js              # App entry point
└── README.md              # This file
🚀 Getting Started

.1 Install dependencies
bash
Copy
Edit
npm install
2. Set up environment variables
Create a .env file:

env
Copy
Edit
MONGODB_URI=mongodb://localhost:27017/farmrent
JWT_SECRET=your_jwt_secret_key
PORT=5000
3. Seed default equipment
bash
Copy
Edit
node seed.js
4. Start the server
bash
Copy
Edit
npm start
Open http://localhost:5000 in your browser.

🧪 Sample Credentials (for testing)
txt
Copy
Edit
👨‍🌾 Farmer:
Email: farmer1@example.com
Password: farmer123

🧑‍🔧 Owner:
Email: owner1@example.com
Password: owner123

🛠️ Admin:
Email: admin@example.com
Password: admin123
📷 Screenshots
Home Page with Search & Filter

Equipment Cards with Ratings & Booking

Dashboard with Real-Time Stats

Admin Panel for Approvals

(You can insert images or GIFs of the UI here.)

🛡️ Tech Stack
Frontend: HTML, CSS, JavaScript

Backend: Node.js, Express.js

Database: MongoDB + Mongoose

Auth: JWT (JSON Web Token)

Tools: FontAwesome, Fetch API, LocalStorage

🤝 Contributing
Feel free to submit issues or pull requests to improve the system.

