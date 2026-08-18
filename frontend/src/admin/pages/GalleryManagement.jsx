import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import Modal from '../../components/common/Modal';
import ConfirmModal from '../../components/common/ConfirmModal';
import LazyImage from '../../components/common/LazyImage';
import { galleryAPI, createFormData } from '../../services/api';
import { GALLERY_CATEGORIES } from '../../utils/constants';

const GalleryManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [bulkOpen, setBulkOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [form, setForm] = useState({ title: '', altText: '', category: 'Weddings', displayOrder: 0, isFeatured: false, isActive: true });
  const [image, setImage] = useState(null);
  const [bulkImages, setBulkImages] = useState(null);
  const [bulkCategory, setBulkCategory] = useState('Weddings');
  const [submitting, setSubmitting] = useState(false);

  const fetch = () => {
    galleryAPI.getAll({ admin: 'true' })
      .then(({ data }) => setItems(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetch(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const data = createFormData({
        ...form,
        isFeatured: form.isFeatured,
        isActive: form.isActive,
      }, 'image', image);

      if (editing) {
        await galleryAPI.update(editing._id, data);
        toast.success('Image updated');
      } else {
        if (!image) { toast.error('Image required'); setSubmitting(false); return; }
        await galleryAPI.create(data);
        toast.success('Image added');
      }
      setModalOpen(false);
      fetch();
    } catch {
      toast.error('Failed to save');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBulkUpload = async (e) => {
    e.preventDefault();
    if (!bulkImages?.length) { toast.error('Select images'); return; }
    setSubmitting(true);
    try {
      const formData = new FormData();
      for (const file of bulkImages) formData.append('images', file);
      formData.append('category', bulkCategory);
      await galleryAPI.createMultiple(formData);
      toast.success(`${bulkImages.length} images uploaded`);
      setBulkOpen(false);
      fetch();
    } catch {
      toast.error('Bulk upload failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await galleryAPI.delete(deleteId);
      toast.success('Deleted');
      setDeleteId(null);
      fetch();
    } catch {
      toast.error('Failed to delete');
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <h1 className="text-2xl font-bold text-white">Gallery</h1>
        <div className="flex gap-2">
          <button onClick={() => { setEditing(null); setModalOpen(true); }} className="btn-primary text-sm">Add Image</button>
          <button onClick={() => setBulkOpen(true)} className="btn-outline text-sm">Bulk Upload</button>
        </div>
      </div>

      {loading ? <LoadingSpinner className="py-20" /> : (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item._id} className="card-premium overflow-hidden group">
              <LazyImage src={item.image} alt={item.altText} className="h-32 w-full object-cover" width={300} />
              <div className="p-3">
                <p className="text-sm font-medium text-white truncate">{item.title || 'Untitled'}</p>
                <p className="text-xs text-gold">{item.category}</p>
                <div className="mt-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => { setEditing(item); setForm({ title: item.title, altText: item.altText, category: item.category, displayOrder: item.displayOrder, isFeatured: item.isFeatured, isActive: item.isActive }); setModalOpen(true); }} className="text-xs text-gold">Edit</button>
                  <button onClick={() => setDeleteId(item._id)} className="text-xs text-red-400">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Image' : 'Add Image'} light={false}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div><label className="label-field">Title</label><input className="input-field" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div><label className="label-field">Alt Text</label><input className="input-field" value={form.altText} onChange={(e) => setForm({ ...form, altText: e.target.value })} /></div>
          <div><label className="label-field">Category</label>
            <select className="input-field" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
              {GALLERY_CATEGORIES.filter(c => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.isFeatured} onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })} className="accent-gold" /> Featured</label>
            <label className="flex items-center gap-2 text-sm text-white/70"><input type="checkbox" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} className="accent-gold" /> Active</label>
          </div>
          <div><label className="label-field">Image</label><input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} className="text-sm text-white/70" /></div>
          <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save'}</button>
        </form>
      </Modal>

      <Modal isOpen={bulkOpen} onClose={() => setBulkOpen(false)} title="Bulk Upload" light={false}>
        <form onSubmit={handleBulkUpload} className="space-y-4">
          <div><label className="label-field">Category</label>
            <select className="input-field" value={bulkCategory} onChange={(e) => setBulkCategory(e.target.value)}>
              {GALLERY_CATEGORIES.filter(c => c !== 'All').map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div><label className="label-field">Images (multiple)</label><input type="file" accept="image/*" multiple onChange={(e) => setBulkImages(e.target.files)} className="text-sm text-white/70" /></div>
          <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Uploading...' : 'Upload All'}</button>
        </form>
      </Modal>

      <ConfirmModal isOpen={!!deleteId} onClose={() => setDeleteId(null)} onConfirm={handleDelete} message="Delete this image?" confirmText="Delete" />
    </AdminLayout>
  );
};

export default GalleryManagement;
