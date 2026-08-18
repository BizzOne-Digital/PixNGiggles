import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { settingsAPI } from '../../services/api';
import { formatDateTime } from '../../utils/helpers';

const StatCard = ({ label, value, color = 'gold' }) => (
  <div className="card-premium p-6">
    <p className="text-sm text-white/60">{label}</p>
    <p className={`mt-2 text-3xl font-bold text-${color}`} style={{ color: color === 'gold' ? '#c9a962' : undefined }}>{value}</p>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    settingsAPI.getDashboard()
      .then(({ data }) => setStats(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <AdminLayout><LoadingSpinner className="py-20" /></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Leads" value={stats?.totalLeads || 0} />
        <StatCard label="New Leads" value={stats?.newLeads || 0} />
        <StatCard label="Booked" value={stats?.bookedLeads || 0} />
        <StatCard label="Contact Inquiries" value={stats?.contactInquiries || 0} />
        <StatCard label="Unread Contacts" value={stats?.unreadContacts || 0} />
        <StatCard label="Gallery Images" value={stats?.totalGallery || 0} />
        <StatCard label="Services" value={stats?.totalServices || 0} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Recent Bookings</h2>
            <Link to="/admin/leads" className="text-sm text-gold hover:text-gold-light">View All</Link>
          </div>
          {stats?.recentBookings?.length === 0 ? (
            <p className="text-white/50 text-sm">No bookings yet</p>
          ) : (
            <div className="space-y-3">
              {stats?.recentBookings?.map((b) => (
                <div key={b._id} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <p className="text-sm font-medium text-white">{b.fullName}</p>
                    <p className="text-xs text-white/50">{b.eventType}</p>
                  </div>
                  <span className="text-xs text-white/40">{formatDateTime(b.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card-premium p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-white">Recent Contacts</h2>
            <Link to="/admin/contacts" className="text-sm text-gold hover:text-gold-light">View All</Link>
          </div>
          {stats?.recentContacts?.length === 0 ? (
            <p className="text-white/50 text-sm">No contacts yet</p>
          ) : (
            <div className="space-y-3">
              {stats?.recentContacts?.map((c) => (
                <div key={c._id} className="flex justify-between items-center border-b border-white/5 pb-3">
                  <div>
                    <p className="text-sm font-medium text-white">{c.name}</p>
                    <p className="text-xs text-white/50">{c.email}</p>
                  </div>
                  <span className="text-xs text-white/40">{formatDateTime(c.createdAt)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
