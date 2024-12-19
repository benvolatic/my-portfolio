import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();

  // State for admin status
  const [status, setStatus] = useState({ logged_in: false });

  // State for Photos
  const [photos, setPhotos] = useState([]);
  const [newPhotos, setNewPhotos] = useState([]); // Hold multiple photos

  // State for Projects
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "" });

  // Check admin status and fetch data on load
  useEffect(() => {
    checkStatus();
    fetchPhotos();
    fetchProjects();
  }, []);

  // ======== ADMIN STATUS ========
  const checkStatus = async () => {
    try {
      const response = await api.get("/admin/status");
      setStatus(response.data);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.delete("/admin/logout");
      localStorage.removeItem("adminToken"); // Clear token
      alert("Logged out successfully!");
      navigate("/admin/login");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to logout.");
    }
  };

  // ======== PHOTO CRUD OPERATIONS ========
  const fetchPhotos = async () => {
    try {
      const response = await api.get("/photos"); // Public API
      setPhotos(response.data);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  };

  const handleAddPhotos = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Unauthorized: no token found");
      return;
    }

    if (!newPhotos.length) {
      alert("Please select at least one photo");
      return;
    }

    const formData = new FormData();
    newPhotos.forEach((file) => {
      formData.append("images[]", file); // Append multiple files
    });

    try {
      const response = await api.post("/admin/photos", formData, {
        headers: { Authorization: token, "Content-Type": "multipart/form-data" },
      });
      console.log("Uploaded photos:", response.data); // Debug response
      alert("Photos added successfully!");
      setNewPhotos([]); // Reset after successful upload
      fetchPhotos(); // Refresh the gallery
    } catch (error) {
      console.error("Error adding photos:", error);
      alert("Failed to add photos");
    }
  };

  const handleDeletePhoto = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      await api.delete(`/admin/photos/${id}`, {
        headers: { Authorization: token },
      });
      alert("Photo deleted!");
      fetchPhotos();
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  // ======== PROJECT CRUD OPERATIONS ========
  const fetchProjects = async () => {
    try {
      const response = await api.get("/projects"); // Public API
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  const handleAddProject = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      await api.post(
        "/admin/projects",
        newProject,
        { headers: { Authorization: token } }
      );
      alert("Project added successfully!");
      setNewProject({ title: "", description: "" });
      fetchProjects();
    } catch (error) {
      console.error("Error adding project:", error);
      alert("Failed to add project");
    }
  };

  const handleDeleteProject = async (id) => {
    const token = localStorage.getItem("adminToken");
    try {
      await api.delete(`/admin/projects/${id}`, {
        headers: { Authorization: token },
      });
      alert("Project deleted!");
      fetchProjects();
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* Admin Status, Login, and Logout */}
      <div className="mb-8">
        <h2>Status: {status.logged_in ? "Logged In" : "Logged Out"}</h2>
        {!status.logged_in && (
          <Link
            to="/admin/login"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Login
          </Link>
        )}
        {status.logged_in && (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
          >
            Logout
          </button>
        )}
      </div>

      {/* Section for Photos */}
      <div className="mb-8">
        <h2 className="font-bold">Manage Photos</h2>
        <div>
          <input
            type="file"
            multiple
            onChange={(e) => setNewPhotos(Array.from(e.target.files))} // Convert FileList to array
            className="border p-2 mb-2"
          />
          <button onClick={handleAddPhotos} className="px-4 py-2 bg-blue-600 text-white">
            Add Photos
          </button>
        </div>
        <ul className="mt-4">
          {photos.map((photo) => (
            <li key={photo.id} className="mb-2">
              <img src={photo.image_url} alt="Uploaded" className="w-32 h-32 object-cover" />
              <button
                onClick={() => handleDeletePhoto(photo.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Section for Projects */}
      <div>
        <h2 className="font-bold">Manage Projects</h2>
        <div>
          <input
            type="text"
            placeholder="Project Title"
            value={newProject.title}
            onChange={(e) =>
              setNewProject({ ...newProject, title: e.target.value })
            }
            className="border p-2 mb-2"
          />
          <textarea
            placeholder="Project Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
            className="border p-2 mb-2 w-full"
          />
          <button onClick={handleAddProject} className="px-4 py-2 bg-blue-600 text-white">
            Add Project
          </button>
        </div>
        <ul className="mt-4">
          {projects.map((project) => (
            <li key={project.id} className="mb-2">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <button
                onClick={() => handleDeleteProject(project.id)}
                className="text-red-600"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
