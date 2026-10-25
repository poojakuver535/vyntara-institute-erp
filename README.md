# Vyntara Institute — College Website + ERP System

A complete, responsive **College Website** integrated with an **Institute ERP System** built using pure HTML, CSS, and JavaScript (no backend required — uses LocalStorage).

## 🚀 How to Run

1. Extract the zip file.
2. Open the `college-erp` folder.
3. Double-click **`index.html`** to open in your browser.
4. For ERP, click **"ERP Login"** button in the navbar.

## 🔑 Demo Login Credentials

| Role    | Username | Password     |
|---------|----------|--------------|
| Admin   | admin    | admin123     |
| Faculty | faculty  | faculty123   |

## ✨ Features

### College Website
- ✅ Home page with hero, stats, programs, features, notices
- ✅ About Us, Courses, Departments, Admissions, Faculty, Facilities, Notices, Contact
- ✅ Fully responsive (desktop / tablet / mobile)
- ✅ Interactive forms with validation
- ✅ Modern UI with smooth animations

### ERP System
- ✅ **Login & Authentication** (sessionStorage-based)
- ✅ **Dashboard** with live stats
- ✅ **Student Management** — Add, Edit, Delete (CRUD)
- ✅ **Faculty Management** — Add, Edit, Delete (CRUD)
- ✅ **Course Management** — Add, Delete
- ✅ **Attendance Marking** — Daily Present/Absent per student
- ✅ **Notice Management** — Post and manage announcements
- ✅ Data persists in browser via **LocalStorage**

## 🛠️ Technologies Used
- **HTML5** — Semantic markup
- **CSS3** — Flexbox, Grid, Media Queries, Custom Properties
- **Vanilla JavaScript** — DOM manipulation, LocalStorage API
- **No frameworks, no build tools** — Just open and run

## 📁 Project Structure
```
college-erp/
├── index.html              # Homepage
├── README.md
├── css/
│   ├── style.css           # Website styles
│   └── erp.css             # ERP dashboard styles
├── js/
│   ├── main.js             # Website scripts
│   └── erp.js              # ERP logic + CRUD + LocalStorage DB
├── pages/
│   ├── about.html
│   ├── courses.html
│   ├── departments.html
│   ├── admissions.html
│   ├── faculty.html
│   ├── facilities.html
│   ├── notices.html
│   └── contact.html
└── erp/
    ├── login.html
    ├── dashboard.html
    ├── students.html
    ├── faculty.html
    ├── courses.html
    ├── attendance.html
    └── notices.html
```

## 🌐 Deployment

**Deploy to Netlify (fastest):**
1. Go to [netlify.com/drop](https://app.netlify.com/drop)
2. Drag & drop the `college-erp` folder.
3. Get your live URL instantly!

**Deploy to Vercel:**
1. Push the folder to GitHub.
2. Import repo on [vercel.com](https://vercel.com).
3. Deploy with one click.

**Deploy to GitHub Pages:**
1. Create a new GitHub repo named `college-erp`.
2. Push the folder contents.
3. Settings → Pages → Deploy from main branch.

## 📝 Notes
- All data is stored in your browser's LocalStorage — clear browser data to reset.
- Sample data is auto-loaded on first visit.
- For a production system, replace LocalStorage with a real backend (Node.js + MongoDB, Django, PHP+MySQL, etc.).

---
Built with ❤️ as a learning project.
