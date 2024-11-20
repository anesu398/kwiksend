import React, { useEffect, useState } from "react";
import axios from "axios";

const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const response = await axios.get("/api/transfer");
        setTransfers(response.data);
      } catch (error) {
        console.error("Error fetching transfers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransfers();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Transfers</h2>
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-4 py-2">Sender</th>
            <th className="border px-4 py-2">Receiver</th>
            <th className="border px-4 py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer._id}>
              <td className="border px-4 py-2">{transfer.senderId.name}</td>
              <td className="border px-4 py-2">{transfer.receiverId.name}</td>
              <td className="border px-4 py-2">${transfer.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Transfers;
