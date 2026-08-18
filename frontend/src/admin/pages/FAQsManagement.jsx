import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/common/ConfirmModal';
import { faqsAPI } from '../../services/api';

const FAQsManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ question: '', answer: '', displayOrder: 0, isActive: true });
  const [submitting, setSubmitting] = useState(false);

  const fetch = () => {
    faqsAPI.getAll({ admin: 'true' })
      .then(({ data }) => setItems(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editing) {
        await faqsAPI.update(editing._id, { ...form, isActive: form.isActive });
        toast.success('FAQ updated');
      } else {
        await faqsAPI.create({ ...form, isActive: form.isActive });
        toast.success('FAQ created');
      }
      setModalOpen(false);
      fetch();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await faqsAPI.delete(deleteId);
      toast.success('Deleted');
      setDeleteId(null);
      fetch();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">FAQs</h1>
        <button onClick={() => { setEditing(null); setForm({ question: '', answer: '', displayOrder: 0, isActive: true }); setModalOpen(true); }} className="btn-primary text-sm">Add FAQ</button>
      </div>

      {loading ? <LoadingSpinner className="py-20" /> : (
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item._id} className="card-premium p-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <p className="font-medium text-white">{item.question}</p>
                  <p className="mt-2 text-sm text-white/60">{item.answer}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button onClick={() => { setEditing(item); setForm({ question: item.question, answer: item.answer, displayOrder: item.displayOrder, isActive: item.isActive }); setModalOpen(true); }} className="text-sm text-gold">Edit</button>
                  <button onClick={() => setDeleteId(item._id)} className="text-sm text-red-400">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit FAQ' : 'Add FAQ'} size="lg" light={false}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="label-field">Question</label><input className="input-field" value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} required /></div>
          <div><label className="label-field">Answer</label><textarea rows={4} className="input-field" value={form.answer} onChange={(e) => setForm({ ...form, answer: e.target.value })} required /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label-field">Display Order</label><input type="number" className="input-field" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} /></div>
            <div className="flex items-end"><label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /> Active</label></div>
          </div>
          <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} message="Delete this FAQ?" confirmText="Delete" />
    </AdminLayout>
  );
};

export default FAQsManagement;
