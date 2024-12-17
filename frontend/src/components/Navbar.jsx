import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="p-4 bg-white text-blue-600">
      <ul className="flex justify-center gap-8">
        <li>
          <Link to="/" className="hover:underline">
            Home
          </Link>
        </li>
        <li>
          <Link to="/gallery" className="hover:underline">
            Film Gallery
          </Link>
        </li>
        <li>
          <Link to="/projectGallery" className="hover:underline">
            Project Gallery
          </Link>
        </li>
      </ul>
    </nav>
  );
}
