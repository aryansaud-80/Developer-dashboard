import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TodoListPage from './pages/TodoListPage';
import Layout from './Layout/Layout';
import AddTodoPage from './pages/AddTodoPage';
import GithubActivityPage from './pages/GithubActivityPage';
import TodoPage from './pages/TodoPage';
import TodoEditPage from './pages/TodoEditPage';
import PomodoroPage from './pages/PomodoroPage';
import SnippetPage from './pages/SnippetPage';
import AddSnippetPage from './pages/AddSnippetPage';
import SnippetEditPage from './pages/SnippetEditPage';
import ErrorPage from './pages/ErrorPage';

const App = () => {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='todo-list' element={<TodoListPage />} />
          <Route path='add-todo' element={<AddTodoPage />} />
          <Route path='todo-list/:id' element={<TodoPage />} />
          <Route path='github-activity' element={<GithubActivityPage />} />
          <Route path='todos/edit/:id' element={<TodoEditPage />} />
          <Route path='pomodoro-timer' element={<PomodoroPage />} />
          <Route path='code-snippets' element={<SnippetPage />} />
          <Route path='add-snippet' element={<AddSnippetPage />} />
          <Route path='snippet/edit/:id' element={<SnippetEditPage />} />
        </Route>

        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  );
};
export default App;
