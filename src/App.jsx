import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateCampaign from "./pages/CreateCampaign";
import Report from "./pages/Report";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <nav className="bg-blue-600 text-white p-4 flex gap-4">
          <Link to="/" className="font-semibold">Create Campaign</Link>
          <Link to="/report">Report</Link>
        </nav>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<CreateCampaign />} />
            <Route path="/report" element={<Report />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
