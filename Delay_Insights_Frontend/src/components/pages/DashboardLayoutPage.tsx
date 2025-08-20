import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  ChartBar,
  Store,
  PackageSearch,
  HardHat,
  X,
  Menu,
} from "lucide-react";
import { useState } from "react";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((prev) => !prev);
  }

  function handleClose() {
    setIsOpen(false);
  }

  return (
    <div className="relative min-h-screen flex ">
      <aside
        className={`fixed top-0 left-0 z-40 w-56 bg-neutral-200 text-neutral-900 flex 
          flex-col px-2 py-3 h-screen transition-transform duration-300
           md:translate-x-0 shadow-lg
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="px-4">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="text-2xl font-bold">DMS</div>
              <div className="text-xs text-gray-600 mt-1">
                Delay Management System
              </div>
            </div>
            <button
              onClick={handleToggle}
              className="md:hidden p-2 hover:bg-gray-300 transition-all duration-300 rounded-full"
            >
              <X />
            </button>
          </div>
        </div>

        <nav className="flex-1 space-y-3">
          <NavLink
            to="/dashboard"
            onClick={handleClose}
            end
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200  ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-neutral-700 hover:text-neutral-200"
              }`
            }
          >
            <span className="p-1.5 bg-yellow-100 rounded-md text-yellow-500">
              <ChartBar className="w-5 h-5" />
            </span>
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/dashboard/shop-data"
            onClick={handleClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-neutral-700 hover:text-neutral-200"
              }`
            }
          >
            <span className="p-1.5 bg-yellow-100 rounded-md text-yellow-500">
              <Store className="w-5 h-5" />
            </span>
            <span>Shop Data</span>
          </NavLink>

          <NavLink
            to="/dashboard/eqpt-data"
            onClick={handleClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-neutral-700 hover:text-neutral-200"
              }`
            }
          >
            <span className="p-1.5 bg-yellow-100 rounded-md text-yellow-500">
              <PackageSearch className="w-5 h-5" />
            </span>
            <span>Eqpt Data</span>
          </NavLink>

          <NavLink
            to="/dashboard/sub-eqpt-data"
            onClick={handleClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-neutral-700 hover:text-neutral-200"
              }`
            }
          >
            <span className="p-1.5 bg-yellow-100 rounded-md text-yellow-500">
              <HardHat className="w-5 h-5" />
            </span>
            <span>Sub-Eqpt Data</span>
          </NavLink>


          <NavLink
            to="/dashboard/add-delay"
            onClick={handleClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-neutral-700 hover:text-neutral-200"
              }`
            }
          >
            <span className="p-1.5 bg-yellow-100 rounded-md text-yellow-500">
              <HardHat className="w-5 h-5" />
            </span>
            <span>Add Delay</span>
          </NavLink>

          <NavLink
            to="/"
            onClick={handleClose}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-yellow-400 text-black"
                  : "hover:bg-neutral-700 hover:text-neutral-200"
              }`
            }
          >
            <span className="p-1.5 bg-yellow-100 rounded-md text-yellow-500">
              <Home className="w-5 h-5" />
            </span>
            <span>Back to Home</span>
          </NavLink>
        </nav>
      </aside>

      <div className="fixed top-3 left-3 z-30 md:hidden">
        <button
          id="sidebar-toggle"
          onClick={handleToggle}
          className="p-2 bg-gray-200 rounded-full shadow hover:bg-gray-300 transition-all"
        >
          <Menu />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative flex-1 min-h-screen flex flex-col md:ml-56 transition-all">
        <div
          className="fixed right-3 md:right-5 top-3 flex items-center w-fit gap-1 bg-slate-200 
          rounded-[50px] hover:bg-slate-300 transition-all duration-500 z-10"
        >
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-10 h-10 rounded-l-[45px] object-cover"
          />
          <span className="font-semibold text-gray-800 py-1 px-2">
            Employee
          </span>
        </div>

        <main className="flex-1 overflow-y-auto">
          {isOpen && (
            <div
              className="fixed z-10 inset-0 bg-black bg-opacity-50"
              onClick={() => setIsOpen(false)}
            ></div>
          )}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
