import React, { useEffect, useState } from "react";
import DataTable from "../../components/dashboard/DataTable";
import { fetchData } from "../../utils/api";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAccounts = async () => {
      try {
        setLoading(true);
        setError(null);

        // Assuming fetchData accepts `method` and `url` arguments
        const data = await fetchData("GET", "/api/accounts/all");

        if (data && Array.isArray(data)) {
          setAccounts(data);
        } else {
          throw new Error("Invalid data format received.");
        }
      } catch (err) {
        setError(err.message || "Failed to fetch accounts.");
      } finally {
        setLoading(false);
      }
    };

    getAccounts();
  }, []);

  const tableHeaders = ["Account Number", "User", "Balance", "Created At"];

  // Safely map through accounts if the response is valid
  const tableRows = accounts.map((account) => [
    account.accountNumber || "N/A",
    account.user?.name || "N/A",
    `$${(account.balance || 0).toLocaleString()}`,
    account.createdAt
      ? new Date(account.createdAt).toLocaleString()
      : "N/A",
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Account Management</h1>

      {loading ? (
        <p>Loading accounts...</p>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : accounts.length > 0 ? (
        <DataTable headers={tableHeaders} rows={tableRows} />
      ) : (
        <p>No accounts found.</p>
      )}
    </div>
  );
};

export default Accounts;
