# 🚀 DevDash — Developer Productivity Dashboard

**DevDash** is a full-stack productivity web application tailored for developers. It combines task management, code snippet storage, session tracking, and future plans for learning and fun — all in one beautiful dashboard.

> ⚠️ Project is in active development. Contributions & feedback are welcome!

---

## 📸 Features (Implemented)

### ✅ Todo Manager

- Add, edit, delete your daily tasks.
- Secure user authentication (backend).
- Data is persistent across sessions.

### ✅ Pomodoro Timer

- Fully functional Pomodoro timer with work, short break, and long break sessions.
- Auto-switching sessions after each interval.
- Customizable durations saved per user.
- Responsive UI.

### ✅ Code Snippet Manager

- Create, update, delete, and view your personal code snippets.
- Tags support for better organization.
- Secure, user-based access with backend validation.

---

## 📌 Tech Stack

### 🧠 Frontend

- **React** (with Hooks)
- **Tailwind CSS**
- **React Router DOM**
- **React Toastify**

### 🛠 Backend

- **Node.js + Express**
- **MongoDB + Mongoose**
- **JWT Auth with HTTP-only cookies**
- **RESTful API structure**
- Custom `ApiResponse` and `ApiError` handling

---

## 🧩 Planned Features

- 🟨 **GitHub Productivity Tracker** — fetch commit data and display dev streaks.
- 🟨 **Today’s Focus / Goals** — log what you want to achieve daily.
- 🟨 **Games for Breaks** — play mini-games like Hangman, Tic-Tac-Toe.
- 🟨 **Developer Dashboard** — overview panel for todos, pomodoro history, GitHub, snippets, and more.
- 🟨 **Syntax Highlighting** in code snippets (via Prism or Monaco).
- 🟨 **Theme Toggle** — Light/Dark mode for better experience.

---

## 🧪 Local Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/aryansaud-80/Developer-dashboard.git
   cd Developer-dashboard
   ```

2. **Backend Setup**

   ```bash
   cd backend
   npm install
   npm run dev
   ```

3. **Frontend Setup**

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Environment Variables**
   Create .env in backend:

   ```
   env

   PORT = 4001

   MONGODB_URI = your mongodb atlas connection

   ACCESS_TOKEN_SECRET = 
   REFRESH_TOKEN_SECRET = 
   ACCESS_TOKEN_EXPIRY = 15m
   REFRESH_TOKEN_EXPIRY = 7d

   CORS_ORIGIN = http://localhost:5173
   ```

---

## 🛣️ Roadmap

Here's what's planned next:

- [x] Todo with backend and frontend
- [x] Pomodoro with session and break tracking
- [x] Code Snippet feature (basic CRUD)
- [x] GitHub productivity tracker
- [ ] Daily tasks and goals
- [ ] Fun section (e.g. Hangman game)
- [ ] Dashboard overview (weekly stats)
- [ ] Dark mode and personalization
- [ ] Deployment to production (Vercel + Mongo Atlas)

---

## 🧑‍💻 Contributing

This is currently a solo project by Aryan Saud, but PRs and ideas are welcome! Feel free to open issues for bugs, improvement, or suggestions.

---

# 📄 License

This project is under the MIT License.

---

## 📬 Contact

Have feedback or want to connect?

- 📧 Email: work.aryansaud@gmail.com
- 🌐 LinkedIn: [@aryan-saud](https://www.linkedin.com/in/aryan-saud)
- 🐙 GitHub: [@aryansaud-80](https://github.com/aryansaud-80)
