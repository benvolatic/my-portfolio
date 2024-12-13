import { useState, useEffect } from "react";
import { getPhotos } from "../services/api";

export default function Gallery() {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const photosPerPage = 12;
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(null); // Index of the selected photo

  useEffect(() => {
    getPhotos()
      .then((data) => setPhotos(data))
      .catch((error) => console.error(error));
  }, []);

  const currentPhotos = photos.slice((page - 1) * photosPerPage, page * photosPerPage);

  const openModal = (index) => {
    setCurrentPhotoIndex(index);
  };

  const closeModal = () => {
    setCurrentPhotoIndex(null);
  };

  const showPreviousPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const showNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="p-0">
      <h1 className="sr-only">Photo Gallery</h1>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-0">
        {currentPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative cursor-pointer"
            onClick={() => openModal(index)}
          >
            <img
              src={photo.image_url}
              alt=""
              className="w-full h-64 object-cover" // Larger grid photos
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {currentPhotoIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative max-w-4xl w-full p-4">
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-white text-2xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>

            {/* Image */}
            <div className="flex items-center justify-center">
              <img
                src={photos[currentPhotoIndex]?.image_url}
                alt=""
                className="max-w-full max-h-screen object-contain"
              />
            </div>

            {/* Navigation Arrows */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold"
              onClick={showPreviousPhoto}
            >
              &#10094;
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl font-bold"
              onClick={showNextPhoto}
            >
              &#10095;
            </button>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
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
              photos.length > prev * photosPerPage ? prev + 1 : prev
            )
          }
          disabled={photos.length <= page * photosPerPage}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
