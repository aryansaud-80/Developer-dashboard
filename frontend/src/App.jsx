import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import TodoListPage from './pages/TodoListPage';
import Layout from './Layout/Layout';
import AddTodoPage from './pages/AddTodoPage';
import GithubPage from './pages/GithubPage';
import TodoPage from './pages/TodoPage';

const App = () => {
  return (
    <>
      <ToastContainer
        position='top-right'
        autoClose={5000}
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
          <Route path='/todo-list/:id' element={<TodoPage />} />
          <Route path='github-activity' element={<GithubPage />} />
        </Route>
      </Routes>
    </>
  );
};
export default App;
