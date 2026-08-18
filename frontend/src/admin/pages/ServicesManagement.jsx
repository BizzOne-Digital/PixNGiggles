import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/common/ConfirmModal';
import LazyImage from '../../components/common/LazyImage';
import { servicesAPI, createFormData } from '../../services/api';

const ServicesManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', shortDescription: '', features: '', displayOrder: 0, isActive: true });
  const [image, setImage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const fetch = () => {
    servicesAPI.getAll({ admin: 'true' })
      .then(({ data }) => setItems(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ title: '', description: '', shortDescription: '', features: '', displayOrder: 0, isActive: true });
    setImage(null);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      description: item.description,
      shortDescription: item.shortDescription || '',
      features: (item.features || []).join('\n'),
      displayOrder: item.displayOrder || 0,
      isActive: item.isActive,
    });
    setImage(null);
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = createFormData({
        ...form,
        features: form.features.split('\n').filter(Boolean),
        isActive: form.isActive,
      }, 'image', image);

      if (editing) {
        await servicesAPI.update(editing._id, data);
        toast.success('Service updated');
      } else {
        await servicesAPI.create(data);
        toast.success('Service created');
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
      await servicesAPI.delete(deleteId);
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
        <h1 className="text-2xl font-bold text-white">Services</h1>
        <button onClick={openCreate} className="btn-primary text-sm">Add Service</button>
      </div>

      {loading ? <LoadingSpinner className="py-20" /> : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div key={item._id} className="card-premium overflow-hidden">
              <LazyImage src={item.image} alt={item.title} className="h-40 w-full object-cover" width={400} />
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white">{item.title}</h3>
                  <span className={`text-xs ${item.isActive ? 'text-green-400' : 'text-red-400'}`}>{item.isActive ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(item)} className="text-sm text-gold">Edit</button>
                  <button onClick={() => setDeleteId(item._id)} className="text-sm text-red-400">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Service' : 'Add Service'} size="lg" light={false}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="label-field">Title</label><input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></div>
          <div><label className="label-field">Short Description</label><input className="input-field" value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })} /></div>
          <div><label className="label-field">Description</label><textarea rows={3} className="input-field" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required /></div>
          <div><label className="label-field">Features (one per line)</label><textarea rows={4} className="input-field" value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} /></div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="label-field">Display Order</label><input type="number" className="input-field" value={form.displayOrder} onChange={(e) => setForm({ ...form, displayOrder: e.target.value })} /></div>
            <div className="flex items-end"><label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /> Active</label></div>
          </div>
          <div><label className="label-field">Image</label><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="text-sm text-white/70" /></div>
          <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} message="Delete this service?" confirmText="Delete" />
    </AdminLayout>
  );
};

export default ServicesManagement;
