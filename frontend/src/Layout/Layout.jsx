import { Outlet } from 'react-router-dom';
import Nav from '../components/nav/Nav';

const Layout = () => {
  return (
    <section className='flex gap-10 min-h-screen '>
      <Nav />
      <main className='flex-grow'>
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
