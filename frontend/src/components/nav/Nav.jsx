import { useState } from "react";
import CodeBracketIcon from "../../assets/icons/CodeBracketIcon";
import nav from "../../assets/assets/NavData";
import { NavLink } from "react-router-dom";
import BarIcon from "../../assets/icons/BarIcon";
import ThemeToggle from "../ThemeToggle";

const Nav = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed top-4 left-2 z-50 p-2 rounded-md shadow-md lg:hidden"
        style={{
          backgroundColor: "var(--bg-card)",
          color: "var(--text-primary)",
        }}
        aria-label="Toggle navigation menu"
        aria-expanded={open}
        aria-controls="sidebar"
      >
        <BarIcon />
      </button>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 lg:hidden"
          style={{ backgroundColor: "var(--bg-overlay)" }}
          aria-hidden="true"
        />
      )}

      <aside
        id="sidebar"
        className={`fixed top-0 left-0 h-screen w-64 p-6 pt-10 transform transition-transform duration-300 ease-in-out z-50 md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        } flex flex-col`}
        style={{
          backgroundColor: "var(--bg-sidebar)",
          borderRight: "1px solid var(--border-color)",
        }}
      >
        <div className="flex flex-col gap-10 h-full">
          <div className="flex items-center gap-4">
            <div
              className="flex p-3 rounded-md justify-center items-center h-10 w-10 text-xl"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--text-on-primary)",
              }}
            >
              <CodeBracketIcon />
            </div>
            <div className="flex flex-col">
              <h1
                className="text-2xl font-bold leading-tight"
                style={{ color: "var(--text-primary)" }}
              >
                DevBoard
              </h1>
              <span
                className="font-light text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                Developer Hub
              </span>
            </div>
          </div>

          <nav
            className="flex flex-col gap-2 overflow-y-auto flex-grow"
            aria-label="Primary"
          >
            <p
              className="font-light uppercase tracking-wide text-xs mb-2 select-none"
              style={{ color: "var(--text-muted)" }}
            >
              Navigation
            </p>

            {nav.map((data, index) => {
              const Icon = data.icon;
              return (
                <NavLink
                  key={index}
                  to={data.to}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-md transition-colors duration-200"
                  style={({ isActive }) => ({
                    backgroundColor: isActive
                      ? "var(--primary-light)"
                      : "transparent",
                    color: isActive
                      ? "var(--primary)"
                      : "var(--text-secondary)",
                    fontWeight: isActive ? "600" : "400",
                    borderLeft: isActive
                      ? "3px solid var(--primary)"
                      : "3px solid transparent",
                  })}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="truncate">{data.name}</span>
                </NavLink>
              );
            })}
          </nav>

          <div
            className="flex items-center justify-between pt-4"
            style={{ borderTop: "1px solid var(--border-color)" }}
          >
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>
              Theme
            </span>
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
};

export default Nav;
