import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, Briefcase, Users, MessageSquare, Bell } from "lucide-react";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const baseClasses =
    "flex flex-col items-center text-sm transition-all duration-200";
  const inactiveClasses =
    "text-gray-600 hover:text-gray-800 hover:scale-105"; // subtle hover
  const activeClasses = "text-black font-medium scale-110"; // active route highlight

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(""); // clear input if desired
    }
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-2">
        {/* Logo + Search */}
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 text-white font-bold text-xl px-2 py-1 rounded">
            in
          </div>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-gray-100 rounded-full px-4 py-1 text-sm outline-none w-64"
            />
          </form>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-8 text-gray-600">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses} active:scale-95 active:opacity-80`
            }
          >
            <Home size={20} />
            Home
          </NavLink>

          <NavLink
            to="/projects"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses} active:scale-95 active:opacity-80`
            }
          >
            <Briefcase size={20} />
            Projects
          </NavLink>

          <NavLink
            to="/experience"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses} active:scale-95 active:opacity-80`
            }
          >
            <Users size={20} />
            Experience
          </NavLink>

          <NavLink
            to="/blog"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses} active:scale-95 active:opacity-80`
            }
          >
            <MessageSquare size={20} />
            Blog
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${baseClasses} ${isActive ? activeClasses : inactiveClasses} active:scale-95 active:opacity-80`
            }
          >
            <Bell size={20} />
            Contact
          </NavLink>

          <img
            src="https://i.postimg.cc/bDDVzT76/Gemini-Generated-Image-5o5wiq5o5wiq5o5w.png"
            alt="profile"
            className="w-8 h-8 rounded-full border object-cover"
          />
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
