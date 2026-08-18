import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/common/ConfirmModal';
import { testimonialsAPI, createFormData } from '../../services/api';

const TestimonialsManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ customerName: '', eventType: '', rating: 5, review: '', displayOrder: 0, isActive: true });
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetch = () => {
    testimonialsAPI.getAll({ admin: 'true' })
      .then(({ data }) => setItems(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = createFormData({ ...form, rating: Number(form.rating), isActive: form.isActive }, 'image', image);
      if (editing) {
        await testimonialsAPI.update(editing._id, data);
        toast.success('Testimonial updated');
      } else {
        await testimonialsAPI.create(data);
        toast.success('Testimonial created');
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
      await testimonialsAPI.delete(deleteId);
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
        <h1 className="text-2xl font-bold text-white">Testimonials</h1>
        <button onClick={() => { setEditing(null); setForm({ customerName: '', eventType: '', rating: 5, review: '', displayOrder: 0, isActive: true }); setModalOpen(true); }} className="btn-primary text-sm">Add Testimonial</button>
      </div>

      {loading ? <LoadingSpinner className="py-20" /> : (
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item._id} className="card-premium p-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-bold text-white">{item.customerName}</p>
                  <p className="text-sm text-gold">{item.eventType} · {'★'.repeat(item.rating)}</p>
                  <p className="mt-2 text-sm text-white/70 italic">"{item.review}"</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => { setEditing(item); setForm({ customerName: item.customerName, eventType: item.eventType, rating: item.rating, review: item.review, displayOrder: item.displayOrder, isActive: item.isActive }); setModalOpen(true); }} className="text-sm text-gold">Edit</button>
                  <button onClick={() => setDeleteId(item._id)} className="text-sm text-red-400">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'} size="lg" light={false}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label-field">Customer Name</label><input className="input-field" value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} required /></div>
            <div><label className="label-field">Event Type</label><input className="input-field" value={form.eventType} onChange={(e) => setForm({ ...form, eventType: e.target.value })} /></div>
          </div>
          <div><label className="label-field">Rating (1-5)</label><input type="number" min="1" max="5" className="input-field" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })} /></div>
          <div><label className="label-field">Review</label><textarea rows={4} className="input-field" value={form.review} onChange={(e) => setForm({ ...form, review: e.target.value })} required /></div>
          <div className="flex gap-4">
            <div><label className="label-field">Display Order</label><input type="number" className="input-field" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} /></div>
            <div className="flex items-end"><label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /> Active</label></div>
          </div>
          <div><label className="label-field">Image</label><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="text-sm text-white/70" /></div>
          <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} message="Delete this testimonial?" confirmText="Delete" />
    </AdminLayout>
  );
};

export default TestimonialsManagement;
