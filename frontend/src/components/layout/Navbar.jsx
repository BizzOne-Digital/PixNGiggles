import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, PhoneIcon } from '@heroicons/react/24/solid';
import { HEADER_NAV_LINKS } from '../../utils/constants';
import { useSettings } from '../../context/SettingsContext';
import Logo from '../common/Logo';

const Navbar = ({ variant = 'default' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { settings } = useSettings();
  const isHero = variant === 'hero' && !scrolled && location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navBg = isHero
    ? 'bg-transparent'
    : 'bg-black/95 backdrop-blur-md shadow-lg';

  const linkClass = (path) =>
    `text-sm font-semibold uppercase tracking-wide transition-colors ${
      location.pathname === path
        ? 'text-gold'
        : isHero ? 'text-white hover:text-gold' : 'text-white/90 hover:text-gold'
    }`;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <nav className="container-custom flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo size="md" />

        <div className="hidden items-center gap-8 lg:flex">
          {HEADER_NAV_LINKS.map((link) => (
            <Link key={link.path} to={link.path} className={linkClass(link.path)}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex">
          <a href={`tel:${settings.phone}`} className="btn-phone">
            <PhoneIcon className="h-4 w-4" />
            {settings.phone}
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <a
            href={`tel:${settings.phone}`}
            className="flex h-11 w-11 items-center justify-center rounded-lg text-gold"
            aria-label={`Call ${settings.phone}`}
          >
            <PhoneIcon className="h-5 w-5" />
          </a>
          <button
            className={`flex h-11 w-11 items-center justify-center rounded-lg ${isHero ? 'text-white' : 'text-white'}`}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-white/10 bg-black lg:hidden">
          <div className="container-custom px-4 py-4 space-y-1">
            {HEADER_NAV_LINKS.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block rounded-lg px-4 py-3 text-sm font-semibold uppercase ${
                  location.pathname === link.path ? 'text-gold' : 'text-white hover:text-gold'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a href={`tel:${settings.phone}`} className="btn-phone mt-3 w-full justify-center">
              <PhoneIcon className="h-4 w-4" />
              {settings.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
