import { Outlet } from 'react-router-dom';
import Nav from '../components/nav/Nav';
import { AppContext } from '../context/AppContext';
import { useContext } from 'react';

const Layout = () => {
  const { isSettingOpen } = useContext(AppContext);
  return (
    <section
      className={`flex gap-10 min-h-screen ${
        isSettingOpen && 'pointer-events-none'
      }`}
    >
      <Nav />
      <main className='flex-grow'>
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
