# ProjectRoute

<p align="center">
  <img src="https://img.shields.io/badge/Stack-MERN-brightgreen?style=for-the-badge" alt="MERN Stack">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB">
  <img src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge" alt="License">
</p>

<p align="center">
  <strong>Academic Project Management System</strong><br>
  Streamlining student project workflows in educational institutions
</p>

---

## 🎯 Overview

**ProjectRoute** is a comprehensive full-stack web application that revolutionizes how academic institutions manage student projects. It provides a centralized platform where students can submit proposals, request supervisors, manage deadlines, and receive structured feedback — all in one unified system.

Built with modern web technologies, this project demonstrates production-grade patterns including role-based access control, secure authentication, cloud file storage, and real-time notifications.

---

## 🚀 Key Features

### 👨‍💼 Admin Dashboard
- **User Management** — Complete CRUD operations for students, teachers, and admins
- **Deadline Management** — Create and manage project submission deadlines globally
- **Supervisor Assignment** — Manually assign supervisors to students
- **Analytics** — Visual dashboard with project statistics and overview
- **Notifications** — Broadcast system-wide announcements

### 👨‍🏫 Teacher / Supervisor Panel
- **Request Management** — Review and respond to student supervisor requests
- **Student Oversight** — View and manage all assigned student projects
- **Feedback System** — Provide structured feedback (positive, negative, general)
- **Progress Tracking** — Monitor project status from proposal to completion

### 🎓 Student Portal
- **Project Submission** — Submit proposals with detailed descriptions
- **Supervisor Requests** — Request specific supervisors based on expertise
- **File Management** — Upload project files and documentation
- **Deadline Tracking** — View all upcoming deadlines and submissions
- **Feedback View** — Access supervisor feedback and suggestions

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (React 19)                       │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │   Redux     │ │   Router    │ │   Axios     │ │  Tailwind │ │
│  │   Toolkit   │ │   v7        │ │             │ │  CSS      │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────┬───────────────────────────────┘
                                  │ REST API
┌─────────────────────────────────┴───────────────────────────────┐
│                       SERVER (Express 5)                         │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌───────────┐ │
│  │  JWT Auth   │ │  Rate       │ │  File       │ │  Email    │ │
│  │  + bcrypt   │ │  Limiter    │ │  Upload     │ │  Service  │ │
│  └─────────────┘ └─────────────┘ └─────────────┘ └───────────┘ │
└─────────────────────────────────┬───────────────────────────────┘
                                  │
        ┌─────────────────────────┼─────────────────────────┐
        │                         │                         │
        ▼                         ▼                         ▼
┌───────────────┐       ┌─────────────────┐       ┌───────────────┐
│   MongoDB     │       │   Cloudinary   │       │     SMTP      │
│   Database    │       │   (Files/CDN)  │       │   (Email)     │
└───────────────┘       └─────────────────┘       └───────────────┘
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 19** | Modern UI framework with hooks |
| **Vite** | Fast build tool and dev server |
| **Redux Toolkit** | Predictable state management |
| **React Router v7** | Client-side routing |
| **Tailwind CSS** | Utility-first styling |
| **Recharts** | Data visualization and charts |
| **React Toastify** | User notifications |
| **Axios** | HTTP client for API calls |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime |
| **Express 5** | Web application framework |
| **MongoDB** | NoSQL database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Stateless authentication |
| **bcrypt** | Secure password hashing |
| **Cloudinary** | Cloud file storage & CDN |
| **Nodemailer** | Email delivery |
| **express-rate-limit** | API security |

---

## 📋 Database Schema

### User Model
```
- name, email, password (hashed)
- role (Student | Teacher | Admin)
- department, expertise
- maxStudents, assignedStudents
- supervisor (reference)
- project (reference)
```

### Project Model
```
- student (reference)
- supervisor (reference)
- title, description
- status (pending | approved | rejected | completed)
- files [{ fileType, fileUrl, originalName }]
- feedback [{ supervisorId, type, title, message }]
- deadline
```

### SupervisorRequest Model
```
- student, supervisor (references)
- message
- status (pending | accepted | rejected)
```

### Deadline Model
```
- name, dueDate
- createdBy (reference)
- project (optional reference)
```

---

## 🔐 Security Implementation

- **JWT Authentication** with HTTP-only cookies (CSRF protected)
- **Password Hashing** using bcrypt with salt rounds
- **Rate Limiting** to prevent brute force attacks
- **Input Validation** on all forms and API endpoints
- **Environment Variables** for sensitive configuration
- **CORS** configured for specific origins only

---

## 📦 Getting Started

### Prerequisites

| Requirement | Version |
|-------------|---------|
| Node.js | 18+ |
| MongoDB | Latest |
| npm | 9+ |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/ProjectRoute.git
cd ProjectRoute

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install

# 4. Configure environment variables
# Create server/.env with required values (see below)

# 5. Run development servers
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd client && npm run dev
```

### Environment Variables (server/.env)

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/projectroute
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

---

## 💡 Engineering Decisions

### Why JWT over Sessions?
JWT provides stateless authentication, perfect for RESTful APIs. Storing tokens in HTTP-only cookies adds an extra layer of CSRF protection while maintaining scalability.

### Why Cloudinary?
Offloads file storage from the server, provides CDN for fast delivery, and offers image transformations. Essential for handling student project files at scale.

### Why Redux Toolkit?
Redux Toolkit simplifies state management with `createSlice` and `createAsyncThunk`, reducing boilerplate while providing powerful DevTools and time-travel debugging.

### Why MongoDB?
Flexible schema design accommodates evolving project requirements. Compound indexes ensure performance for complex queries across projects, users, and deadlines.

---

## ⚡ Performance Optimizations

- **Database Indexing** — Strategic indexes on status, dates, user references
- **Query Optimization** — Mongoose `.populate()` and selective field retrieval
- **API Rate Limiting** — Prevents abuse and ensures fair usage
- **Vite HMR** — Instant hot module replacement during development
- **Optimized Builds** — Production bundles with code splitting

---

## 🔮 Future Enhancements

- [ ] Real-time notifications with Socket.io
- [ ] Student-supervisor chat/messaging system
- [ ] Plagiarism detection integration
- [ ] Mobile responsive PWA
- [ ] Advanced analytics and reporting
- [ ] Project templates and categories
- [ ] Team collaboration features
- [ ] Export to PDF/Word

---

## 📊 Project Status

```
✅ Core Features Implemented
✅ Role-Based Access Control
✅ File Upload System
✅ Email Notifications
✅ RESTful API
✅ Responsive UI
🔄 Continuous Improvements
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📬 Contact

**Project Maintainer**: [Krishna Mohan Vadlapatla](https://github.com/krishnamohan-vadlapatla)

- 💻 **GitHub Repository**: [Repository](https://github.com/krishnamohan-vadlapatla/projectroute)
- 💼 **LinkedIn**: [Krishna Mohan Vadlapatla](https://www.linkedin.com/in/krishna-mohan-vadlapatla/)
---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <sub>Built with ❤️ using the MERN Stack</sub>
</p>
