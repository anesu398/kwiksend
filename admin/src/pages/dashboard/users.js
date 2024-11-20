import React, { useEffect, useState } from "react";
import DataTable from "../../components/dashboard/DataTable";
import { fetchData } from "../../utils/api";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const data = await fetchData("/api/users");
      setUsers(data);
    };
    getUsers();
  }, []);

  const tableHeaders = ["Name", "Email", "Created At", "Actions"];
  const tableRows = users.map((user) => [
    user.name,
    user.email,
    new Date(user.createdAt).toLocaleString(),
    <button className="text-red-500">Delete</button>,
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <DataTable headers={tableHeaders} rows={tableRows} />
    </div>
  );
};

export default Users;
