import { useEffect, useMemo, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
  Bell,
  Briefcase,
  Home,
  Menu,
  Moon,
  Search,
  Sun,
  Users,
  X,
} from 'lucide-react';
import { Contents } from '../content';

type SearchItem = {
  title: string;
  type: string;
  keywords: string;
  path: string;
};

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') {
      return 'light';
    }

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { personaldetails } = Contents;

  const navItems = [
    { to: '/', icon: <Home size={22} />, label: 'Home', end: true },
    { to: '/projects', icon: <Briefcase size={22} />, label: 'Projects' },
    { to: '/experience', icon: <Users size={22} />, label: 'Experience' },
    { to: '/contact', icon: <Bell size={22} />, label: 'Contact' },
  ];

  const searchItems = useMemo<SearchItem[]>(
    () => [
      {
        title: 'Profile',
        type: 'Section',
        keywords: `${personaldetails.name} ${personaldetails.tagline}`,
        path: '/#profile',
      },
      {
        title: 'About',
        type: 'Section',
        keywords: 'about bio software developer backend systems',
        path: '/#about',
      },
      {
        title: 'Activity',
        type: 'Section',
        keywords: 'activity leetcode github recent work',
        path: '/#activity',
      },
      {
        title: 'GitHub Contributions',
        type: 'Section',
        keywords: `${personaldetails.socials.github} contribution graph calendar commits`,
        path: '/#github',
      },
      {
        title: 'Experience',
        type: 'Page',
        keywords: Contents.experience.map((exp) => `${exp.role} ${exp.company}`).join(' '),
        path: '/experience',
      },
      {
        title: 'Projects',
        type: 'Page',
        keywords: Contents.projects.map((project) => `${project.title} ${project.skills?.join(' ')}`).join(' '),
        path: '/projects',
      },
      {
        title: 'Contact',
        type: 'Page',
        keywords: `${personaldetails.email} ${personaldetails.location} linkedin github leetcode`,
        path: '/contact',
      },
      ...Contents.projects.map((project) => ({
        title: project.title.trim(),
        type: 'Project',
        keywords: `${project.description} ${project.skills?.join(' ')}`,
        path: '/#projects',
      })),
      ...Contents.experience.map((exp) => ({
        title: `${exp.role} at ${exp.company}`,
        type: 'Experience',
        keywords: `${exp.location} ${exp.period} ${exp.desc} ${exp.extra.join(' ')}`,
        path: '/#experience',
      })),
      ...Contents.certifications.map((cert) => ({
        title: cert.title,
        type: 'Certification',
        keywords: `${cert.organization} ${cert.issued} ${cert.credentialId}`,
        path: '/#certifications',
      })),
    ],
    [personaldetails],
  );

  const searchResults = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) {
      return searchItems.slice(0, 5);
    }

    return searchItems
      .filter((item) => `${item.title} ${item.type} ${item.keywords}`.toLowerCase().includes(normalizedQuery))
      .slice(0, 7);
  }, [query, searchItems]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    window.setTimeout(() => {
      document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }, [location]);

  const goToResult = (path: string) => {
    navigate(path);
    setQuery('');
    setIsSearchOpen(false);
    setIsOpen(false);
  };

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchResults[0]) {
      goToResult(searchResults[0].path);
    }
  };

  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === 'dark' ? 'light' : 'dark'));
  };

  const renderSearch = (isMobile = false) => (
    <div ref={isMobile ? undefined : searchRef} className={`relative ${isMobile ? 'w-full px-6' : 'w-56 lg:w-72'}`}>
      <form onSubmit={handleSearchSubmit} className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setIsSearchOpen(true);
          }}
          onFocus={() => setIsSearchOpen(true)}
          placeholder="Search portfolio"
          className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-800 outline-none transition focus:border-blue-400 focus:bg-white"
        />
      </form>

      {isSearchOpen && (
        <div
          className={`absolute left-0 right-0 top-12 z-50 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg ${
            isMobile ? 'mx-6' : ''
          }`}
        >
          {searchResults.length > 0 ? (
            searchResults.map((item) => (
              <button
                key={`${item.type}-${item.title}`}
                type="button"
                onClick={() => goToResult(item.path)}
                className="block w-full px-4 py-3 text-left transition hover:bg-gray-50"
              >
                <span className="block text-sm font-medium text-gray-900">{item.title}</span>
                <span className="block text-xs text-gray-500">{item.type}</span>
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">No matches found</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-5 px-6 py-2">
        {/* Logo */}
        <div className="text-blue-600 font-bold text-2xl cursor-pointer">rp</div>

        <div className="hidden md:block">{renderSearch()}</div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs transition-all duration-200 relative ${
                  isActive ? 'text-black font-medium' : 'text-gray-500 hover:text-black'
                }`
              }>
              {({ isActive }) => (
                <>
                  {item.icon}
                  <span className="mt-1">{item.label}</span>

                  {/* Active underline */}
                  {isActive && <span className="absolute -bottom-2 w-full h-[2px] bg-black rounded-full"></span>}
                </>
              )}
            </NavLink>
          ))}

          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600 transition hover:bg-gray-100"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Profile */}
          <img
            src={personaldetails.avtar}
            alt="profile"
            className="w-8 h-8 rounded-full object-cover border cursor-pointer"
          />
        </nav>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-600"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="text-gray-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="flex flex-col items-center gap-6 py-6">
            {renderSearch(true)}

            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex flex-col items-center text-sm ${isActive ? 'text-black font-medium' : 'text-gray-600'}`
                }>
                {item.icon}
                <span className="mt-1">{item.label}</span>
              </NavLink>
            ))}

            <img src={personaldetails.avtar} alt="profile" className="w-10 h-10 rounded-full object-cover border" />
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;
