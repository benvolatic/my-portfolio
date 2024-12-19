import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Replace `api` if using axios directly

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/login`,
        { username, password },
        { withCredentials: true } // Ensures cookies are sent
      );

      console.log("Login response:", response.data);

      // Save token in localStorage
      localStorage.setItem("adminToken", response.data.token || "Bearer " + response.data.admin_id);

      alert("Login successful!");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Admin Login</h1>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="border p-2 mb-4"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4"
      />
      <button onClick={handleLogin} className="px-4 py-2 bg-blue-600 text-white">
        Login
      </button>
    </div>
  );
}
