import { useCallback, useEffect, useState } from "react";
import { API_URL } from "./LeaderBoard";
import { toast } from "react-hot-toast/headless";
import axios from "axios";
import Dock from "../components/Dock";

const HistoryPage = () => {
  const [loading, setLoading] = useState(false);
  type HistoryItem = {
    _id: string;
    userId?: { name?: string };
    pointsClaimed: number;
    createdAt: string;
  };
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const fetchHistory = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<any>(`${API_URL}/history`);
      setHistory(response.data);
    } catch (error) {
      toast.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);
  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Claim History</h1>
        </div>

        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <span className="loading loading-lg loading-spinner"></span>
            </div>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Points Claimed</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item._id} className="hover">
                    <td>
                      <div className="font-bold">
                        {item.userId?.name || "Unknown User"}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-accent badge-lg">
                        +{item.pointsClaimed}
                      </span>
                    </td>
                    <td>{new Date(item.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <Dock />
    </div>
  );
};

export default HistoryPage;
