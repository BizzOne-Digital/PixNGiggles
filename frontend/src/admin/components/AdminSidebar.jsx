import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon, UsersIcon, EnvelopeIcon, BriefcaseIcon,
  CameraIcon, PlusCircleIcon, PhotoIcon, ChatBubbleLeftIcon,
  QuestionMarkCircleIcon, Cog6ToothIcon, ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';
import Logo from '../../components/common/Logo';

const navItems = [
  { name: 'Dashboard', path: '/admin/dashboard', icon: HomeIcon },
  { name: 'Leads', path: '/admin/leads', icon: UsersIcon },
  { name: 'Contacts', path: '/admin/contacts', icon: EnvelopeIcon },
  { name: 'Services', path: '/admin/services', icon: BriefcaseIcon },
  { name: 'Booths', path: '/admin/booths', icon: CameraIcon },
  { name: 'Add-Ons', path: '/admin/addons', icon: PlusCircleIcon },
  { name: 'Gallery', path: '/admin/gallery', icon: PhotoIcon },
  { name: 'Testimonials', path: '/admin/testimonials', icon: ChatBubbleLeftIcon },
  { name: 'FAQs', path: '/admin/faqs', icon: QuestionMarkCircleIcon },
  { name: 'Settings', path: '/admin/settings', icon: Cog6ToothIcon },
];

const AdminSidebar = ({ isOpen, onClose }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}
      <aside className={`fixed top-0 left-0 z-50 h-full w-64 bg-charcoal-light border-r border-white/10 transform transition-transform lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-16 items-center border-b border-white/10 px-4">
          <Logo size="sm" linkTo="/admin/dashboard" />
        </div>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive ? 'bg-gold/20 text-gold' : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="border-t border-white/10 p-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white">
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
