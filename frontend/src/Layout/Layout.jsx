import { Outlet } from "react-router-dom";
import Nav from "../components/nav/Nav";
import { AppContext } from "../context/AppContext";
import { useContext } from "react";

const Layout = () => {
  const { isSettingOpen } = useContext(AppContext);
  return (
    <section
      className={`flex min-h-screen ${isSettingOpen ? "pointer-events-none" : ""}`}
      style={{ backgroundColor: "var(--bg-secondary)" }}
    >
      <Nav />
      <main className="flex-grow w-full">
        <Outlet />
      </main>
    </section>
  );
};

export default Layout;
