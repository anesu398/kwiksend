import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/dashboard/users" },
    { name: "Accounts", path: "/dashboard/accounts" },
    { name: "Transfers", path: "/dashboard/transfers" },
    { name: "Settings", path: "/dashboard/settings" },
  ];

  return (
    <aside className="bg-gray-800 text-white h-full w-64">
      <div className="p-4 text-xl font-bold">Admin Panel</div>
      <nav>
        <ul>
          {navItems.map((item) => (
            <li key={item.name} className="p-2 hover:bg-gray-700">
              <Link to={item.path}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
