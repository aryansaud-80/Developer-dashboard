import Nav from './components/nav/Nav';
import Todo from './components/todo/Todo';

const App = () => {
  return (
    <div className='flex gap-3 relative'>
      <div className='min-w-64'>
        <Nav />
      </div>
      <Todo />
    </div>
  );
};
export default App;
