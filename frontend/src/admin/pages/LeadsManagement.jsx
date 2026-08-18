import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/common/ConfirmModal';
import { bookingsAPI } from '../../services/api';
import { LEAD_STATUSES, EVENT_TYPES } from '../../utils/constants';
import { formatDate, formatDateTime, getStatusColor } from '../../utils/helpers';

const LeadsManagement = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: '', eventType: '', search: '', sort: 'newest' });
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [notes, setNotes] = useState('');
  const [status, setStatus] = useState('');

  const fetchLeads = () => {
    setLoading(true);
    bookingsAPI.getAll(filters)
      .then(({ data }) => setLeads(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchLeads(); }, [filters]);

  const openDetail = (lead) => {
    setSelected(lead);
    setNotes(lead.internalNotes || '');
    setStatus(lead.status);
  };

  const handleUpdate = async () => {
    try {
      await bookingsAPI.update(selected._id, { status, internalNotes: notes });
      toast.success('Lead updated');
      setSelected(null);
      fetchLeads();
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async () => {
    try {
      await bookingsAPI.delete(deleteId);
      toast.success('Lead deleted');
      setDeleteId(null);
      fetchLeads();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-white mb-6">Lead Management</h1>

      <div className="mb-6 flex flex-wrap gap-3">
        <input
          placeholder="Search leads..."
          className="input-field max-w-xs"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
        <select className="input-field max-w-[160px]" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
          <option value="">All Statuses</option>
          {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="input-field max-w-[160px]" value={filters.eventType} onChange={(e) => setFilters({ ...filters, eventType: e.target.value })}>
          <option value="">All Events</option>
          {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
        <select className="input-field max-w-[140px]" value={filters.sort} onChange={(e) => setFilters({ ...filters, sort: e.target.value })}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {loading ? <LoadingSpinner className="py-20" /> : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-left text-white/60">
                <th className="pb-3 pr-4">Name</th>
                <th className="pb-3 pr-4">Event</th>
                <th className="pb-3 pr-4">Date</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 pr-4">Submitted</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead._id} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 pr-4 text-white">{lead.fullName}</td>
                  <td className="py-3 pr-4 text-white/70">{lead.eventType}</td>
                  <td className="py-3 pr-4 text-white/70">{formatDate(lead.eventDate)}</td>
                  <td className="py-3 pr-4"><span className={`rounded-full px-2 py-1 text-xs ${getStatusColor(lead.status)}`}>{lead.status}</span></td>
                  <td className="py-3 pr-4 text-white/50">{formatDateTime(lead.createdAt)}</td>
                  <td className="py-3 space-x-2">
                    <button onClick={() => openDetail(lead)} className="text-gold hover:text-gold-light text-xs">View</button>
                    <button onClick={() => setDeleteId(lead._id)} className="text-red-400 hover:text-red-300 text-xs">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {leads.length === 0 && <p className="text-center text-white/50 py-10">No leads found</p>}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Lead Details" size="lg" light={false}>
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid gap-3 sm:grid-cols-2">
              <div><span className="text-white/50">Name:</span> <span className="text-white">{selected.fullName}</span></div>
              <div><span className="text-white/50">Email:</span> <span className="text-white">{selected.email}</span></div>
              <div><span className="text-white/50">Phone:</span> <span className="text-white">{selected.phone}</span></div>
              <div><span className="text-white/50">Event:</span> <span className="text-white">{selected.eventType}</span></div>
              <div><span className="text-white/50">Date:</span> <span className="text-white">{formatDate(selected.eventDate)} {selected.eventTime}</span></div>
              <div><span className="text-white/50">Venue:</span> <span className="text-white">{selected.venue}, {selected.city}</span></div>
              <div><span className="text-white/50">Guests:</span> <span className="text-white">{selected.guestCount}</span></div>
              <div><span className="text-white/50">Booth:</span> <span className="text-white">{selected.preferredBooth}</span></div>
            </div>
            {selected.interestedAddons?.length > 0 && (
              <div><span className="text-white/50">Add-ons:</span> <span className="text-white">{selected.interestedAddons.join(', ')}</span></div>
            )}
            {selected.message && <div><span className="text-white/50">Message:</span> <p className="text-white mt-1">{selected.message}</p></div>}
            <div>
              <label className="label-field">Status</label>
              <select className="input-field" value={status} onChange={(e) => setStatus(e.target.value)}>
                {LEAD_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="label-field">Internal Notes</label>
              <textarea rows={3} className="input-field" value={notes} onChange={(e) => setNotes(e.target.value)} />
            </div>
            <button onClick={handleUpdate} className="btn-primary">Save Changes</button>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} message="Delete this lead permanently?" confirmText="Delete" />
    </AdminLayout>
  );
};

export default LeadsManagement;
