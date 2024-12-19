import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // Import Navbar
import Layout from "./components/Layout";
import Home from "./pages/Home"; // Import Home page
import Gallery from "./pages/Gallery"; // Import Gallery page
import ProjectGallery from "./pages/ProjectGallery";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      {/* Add Navbar at the top */}
      
      <Routes>
        {/* Wrap routes with Layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/projectGallery" element={<ProjectGallery />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Route>
        {/* Routes that don’t use Layout */}
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </Router>
    
  );
}

export default App;