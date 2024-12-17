import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet"; // Import Helmet
import { getProjects } from "../services/api";

export default function ProjectGallery() {
  const [projects, setProjects] = useState([]);
  const [page, setPage] = useState(1);
  const projectsPerPage = 12;

  useEffect(() => {
    getProjects()
      .then((data) => setProjects(data))
      .catch((error) => console.error(error));
  }, []);

  const currentProjects = projects.slice((page - 1) * projectsPerPage, page * projectsPerPage);

  return (
    <div className="p-8">
      {/* Helmet for dynamic page title and metadata */}
      <Helmet>
        <title>Volatic - Project Gallery</title>
        <meta
          name="description"
          content="Browse through a collection of projects, showcasing full-stack development, React, and more."
        />
      </Helmet>

      <h1 className="text-2xl font-bold mb-4">Project Gallery</h1>
      <div className="grid grid-cols-3 gap-4">
        {currentProjects.map((project) => (
          <div
            key={project.id}
            className="border rounded overflow-hidden shadow-md"
          >
            <img
              src={project.image_url}
              alt={project.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-2 text-center">
              <h2 className="text-sm font-medium">{project.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() =>
            setPage((prev) =>
              projects.length > prev * projectsPerPage ? prev + 1 : prev
            )
          }
          disabled={projects.length <= page * projectsPerPage}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
