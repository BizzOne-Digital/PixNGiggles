import { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import AdminSidebar from '../components/AdminSidebar';
import { useAuth } from '../../context/AuthContext';

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-charcoal">
      <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-charcoal/95 backdrop-blur px-4 sm:px-6">
          <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-white lg:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/60">Welcome, {user?.name || 'Admin'}</span>
          </div>
        </header>
        <main className="admin-panel p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
