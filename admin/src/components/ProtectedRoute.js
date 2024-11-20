import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "pages/login";
import Dashboard from "components/dashboard";
import Users from "pages/dashboard/users";
import Unauthorized from "pages/authorized";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "manager"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
