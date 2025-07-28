import { Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import HistoryPage from "./pages/HistoryPage";
import LeaderBoard from "./pages/LeaderBoard";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/leaderboard" />} />
        <Route path="/leaderboard" element={<LeaderBoard />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
    </>
  );
}

export default App;
