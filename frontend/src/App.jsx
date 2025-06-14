import TodoPage from './pages/TodoPage';

import { Routes, Route } from 'react-router-dom';
import Layout from './Layout/Layout';
import AddTodoPage from './pages/AddTodoPage';
import GithubPage from './pages/GithubPage';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='todo-list' element={<TodoPage />} />
        <Route path='add-todo' element={<AddTodoPage />} />
        <Route path='github-activity' element={<GithubPage />} />
      </Route>
    </Routes>
  );
};
export default App;
