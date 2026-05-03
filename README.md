# 🏠 HostelEase — Hostel Management System

A modern, fully client-side Hostel Management System built with pure HTML, CSS, and JavaScript. Features role-based portals for Students, Wardens, and Admins with a premium glassmorphic UI.

🔗 **Live Demo:** [hostel-management-system-umber.vercel.app](https://hostel-management-system-umber.vercel.app)

---

## ✨ Features

### 🎓 Student Portal
- Submit and track complaints (Electricity, Water, Furniture, etc.)
- Apply for leave with date range and reason
- Request outpass for short exits
- View approval status and warden remarks
- Personal dashboard with stats

### 🛡️ Warden Portal
- Block-scoped access — only sees students from their assigned block
- Approve / Reject leave and outpass requests
- Update complaint status with remarks
- Student activity overview per block

### ⚙️ Admin Portal
- Full user management (add, edit, delete)
- System-wide stats and charts
- Set/change the **Admin Safe Password** required for warden registration
- Reports overview

---

## 🔐 Role-Based Access

| Role    | Registration         | Access Scope         |
|---------|----------------------|----------------------|
| Student | Open self-register   | Own data only        |
| Warden  | Requires admin safe password | Assigned block only |
| Admin   | Seeded only          | Full system          |

---

## 🚀 Getting Started

No installation needed. Just open `login.html` in a browser.

### Demo Credentials
| Role    | Email                    | Password     |
|---------|--------------------------|--------------|
| Admin   | admin@gmail.com          | admin        |
| Warden  | warden@hostel.com        | warden123    |
| Student | student@hostel.com       | student123   |

> Default warden registration safe password: `admin` (changeable from Admin Dashboard)

---

## 🏗️ Project Structure

```
HostelEase/
├── login.html              # Entry point
├── register.html           # Student & Warden registration
├── app.js                  # Core logic: Auth, Store, Particles
├── style.css               # Global styles
├── student/
│   ├── dashboard.html
│   ├── complaints.html
│   ├── leave.html
│   ├── outpass.html
│   └── profile.html
├── warden/
│   ├── dashboard.html
│   ├── complaints.html
│   ├── leave.html
│   └── outpass.html
├── admin/
│   ├── dashboard.html
│   ├── users.html
│   └── reports.html
└── vercel.json
```

---

## 🛠️ Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Frontend    | HTML5, CSS3, Vanilla JavaScript   |
| Storage     | Browser localStorage              |
| Fonts       | Google Fonts — Inter              |
| Animation   | CSS keyframes + Canvas API        |
| Deployment  | Vercel                            |

---

## 🏠 Room System

- **4 Blocks:** A, B, C, D
- **8 Floors** per block
- **30 Rooms** per floor
- Room format: `B-204` (Block-FloorRoom)
- Total: **960 rooms** across all blocks

---

## 🎨 UI Highlights

- Animated particle network background (Canvas API)
- Glassmorphic cards with backdrop blur
- Animated gradient mesh background
- Premium Inter font
- Responsive design
- Role-colored badges and stat cards

---

## 📦 Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

---

## 👨‍💻 Author

**Nithin VR** — [github.com/nithin-vr](https://github.com/nithin-vr)
