import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useContext } from "react";
import { AppContext } from "./context/AppContext";
import { useTheme } from "./context/ThemeContext";

// Pages
import TodoListPage from "./pages/TodoListPage";
import Layout from "./Layout/Layout";
import AddTodoPage from "./pages/AddTodoPage";
import GithubActivityPage from "./pages/GithubActivityPage";
import TodoPage from "./pages/TodoPage";
import TodoEditPage from "./pages/TodoEditPage";
import PomodoroPage from "./pages/PomodoroPage";
import SnippetPage from "./pages/SnippetPage";
import AddSnippetPage from "./pages/AddSnippetPage";
import SnippetEditPage from "./pages/SnippetEditPage";
import ErrorPage from "./pages/ErrorPage";
import TechNewsPage from "./pages/TechNewsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import DashboardPage from "./pages/DashboardPage";
import SettingsPage from "./pages/SettingsPages";
import TodayTaskPage from "./pages/TodayTaskPage";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { accessToken, isLoading } = useContext(AppContext);

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "var(--primary)" }}
        ></div>
      </div>
    );
  }

  return accessToken ? children : <Navigate to="/login" />;
};

const App = () => {
  const { accessToken, isLoading } = useContext(AppContext);
  const { theme } = useTheme();

  if (isLoading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div
          className="animate-spin rounded-full h-12 w-12 border-b-2"
          style={{ borderColor: "var(--primary)" }}
        ></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme}
      />
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={accessToken ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/register"
          element={accessToken ? <Navigate to="/" /> : <RegisterPage />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="todo-list" element={<TodoListPage />} />
          <Route path="today-task" element={<TodayTaskPage />} />
          <Route path="add-todo" element={<AddTodoPage />} />
          <Route path="todo-list/:id" element={<TodoPage />} />
          <Route path="github-activity" element={<GithubActivityPage />} />
          <Route path="todos/edit/:id" element={<TodoEditPage />} />
          <Route path="pomodoro-timer" element={<PomodoroPage />} />
          <Route path="code-snippets" element={<SnippetPage />} />
          <Route path="add-snippet" element={<AddSnippetPage />} />
          <Route path="snippet/edit/:id" element={<SnippetEditPage />} />
          <Route path="news" element={<TechNewsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Error Route */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  );
};

export default App;
