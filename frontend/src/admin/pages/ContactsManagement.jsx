import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/common/ConfirmModal';
import { contactsAPI } from '../../services/api';
import { formatDateTime } from '../../utils/helpers';

const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selected, setSelected] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const fetchContacts = () => {
    setLoading(true);
    const params = filter === 'unread' ? { isRead: 'false' } : filter === 'read' ? { isRead: 'true' } : {};
    contactsAPI.getAll(params)
      .then(({ data }) => setContacts(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchContacts(); }, [filter]);

  const markRead = async (id, isRead) => {
    try {
      await contactsAPI.update(id, { isRead });
      toast.success(isRead ? 'Marked as read' : 'Marked as unread');
      fetchContacts();
      if (selected) setSelected({ ...selected, isRead });
    } catch {
      toast.error('Failed to update');
    }
  };

  const handleDelete = async () => {
    try {
      await contactsAPI.delete(deleteId);
      toast.success('Deleted');
      setDeleteId(null);
      setSelected(null);
      fetchContacts();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-white mb-6">Contact Inquiries</h1>
      <div className="mb-6 flex gap-3">
        <select className="input-field max-w-[160px]" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="unread">Unread</option>
          <option value="read">Read</option>
        </select>
      </div>

      {loading ? <LoadingSpinner className="py-20" /> : (
        <div className="space-y-3">
          {contacts.map((c) => (
            <div key={c._id} className={`card-premium p-4 flex flex-wrap items-center justify-between gap-4 ${!c.isRead ? 'border-gold/30' : ''}`}>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{c.name}</p>
                  {!c.isRead && <span className="rounded-full bg-gold/20 px-2 py-0.5 text-xs text-gold">New</span>}
                </div>
                <p className="text-sm text-white/50">{c.email} · {formatDateTime(c.createdAt)}</p>
                {c.subject && <p className="text-sm text-white/70 mt-1">{c.subject}</p>}
              </div>
              <div className="flex gap-2">
                <button onClick={() => setSelected(c)} className="text-sm text-gold">View</button>
                <button onClick={() => markRead(c._id, !c.isRead)} className="text-sm text-white/60">{c.isRead ? 'Unread' : 'Read'}</button>
                <button onClick={() => setDeleteId(c._id)} className="text-sm text-red-400">Delete</button>
              </div>
            </div>
          ))}
          {contacts.length === 0 && <p className="text-center text-white/50 py-10">No inquiries</p>}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title="Contact Details" size="md" light={false}>
        {selected && (
          <div className="space-y-3 text-sm">
            <p><span className="text-white/50">From:</span> <span className="text-white">{selected.name}</span></p>
            <p><span className="text-white/50">Email:</span> <span className="text-white">{selected.email}</span></p>
            {selected.phone && <p><span className="text-white/50">Phone:</span> <span className="text-white">{selected.phone}</span></p>}
            {selected.subject && <p><span className="text-white/50">Subject:</span> <span className="text-white">{selected.subject}</span></p>}
            <p className="text-white/70 mt-4">{selected.message}</p>
            <button onClick={() => markRead(selected._id, true)} className="btn-primary mt-4">Mark as Read</button>
          </div>
        )}
      </Modal>

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} message="Delete this inquiry?" confirmText="Delete" />
    </AdminLayout>
  );
};

export default ContactsManagement;
