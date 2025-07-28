import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import Dock from "../components/Dock";
import AddUserModal from "../components/AddUserModal";
export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api/users";

type User = {
  _id: string;
  name: string;
  points: number;
};

const LeaderBoard = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchAllUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get<any>(API_URL);
      setUsers(response.data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers]);

  const handleClaim = async (userId: string, userName: string) => {
    setLoading(true);
    try {
      await axios.post<any>(`${API_URL}/claim`, { userId });
      toast.success(`Points claimed for ${userName}!`);
      fetchAllUsers();
    } catch (error) {
      toast.error("Failed to claim points");
      console.error("Error claiming points:", error);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(users.length / 10);
  const indexOfFirstUser = (currentPage - 1) * 10;
  const indexOfLastUser = indexOfFirstUser + 10;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  return (
    <div className="min-h-screen bg-base-200 p-4 sm:p-8">
      <Toaster position="bottom-center" />
      <div className="max-w-7xl mx-auto pb-18">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-4xl font-bold">Leaderboard</h1>
          <button
            className="btn btn-primary"
            onClick={() => {
              (
                document.getElementById(
                  "add_user_modal"
                ) as HTMLDialogElement | null
              )?.showModal();
            }}
          >
            Add User
          </button>
        </div>

        <div className="overflow-x-auto bg-base-100 rounded-xl shadow-lg">
          {loading ? (
            <div className="flex justify-center items-center h-96">
              <span className="loading loading-lg loading-spinner"></span>
            </div>
          ) : (
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Points</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user._id}>
                    <th>{indexOfFirstUser + index + 1}</th>
                    <td>
                      <div className="font-bold">{user.name}</div>
                    </td>
                    <td>
                      <span className="badge badge-ghost badge-lg">
                        {user.points}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => handleClaim(user._id, user.name)}
                      >
                        Claim
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <div className="pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  className={`join-item btn ${
                    currentPage === pageNumber ? "btn-active" : ""
                  }`}
                >
                  {pageNumber}
                </button>
              )
            )}
          </div>
        </div>
      </div>
      <Dock />
      <AddUserModal modalId={"add_user_modal"} onSuccess={fetchAllUsers} />
    </div>
  );
};

export default LeaderBoard;
