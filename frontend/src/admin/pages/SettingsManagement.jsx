import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import AdminLayout from '../layouts/AdminLayout';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { settingsAPI, createFormData } from '../../services/api';
import { useSettings } from '../../context/SettingsContext';

const SettingsManagement = () => {
  const { refreshSettings } = useSettings();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({});

  useEffect(() => {
    settingsAPI.get()
      .then(({ data }) => {
        setForm({
          businessName: data.data.businessName,
          tagline: data.data.tagline,
          phone: data.data.phone,
          email: data.data.email,
          website: data.data.website,
          serviceArea: data.data.serviceArea,
          address: data.data.address || '',
          socialLinks: data.data.socialLinks || {},
          hero: data.data.hero || {},
          footer: data.data.footer || {},
          businessHours: data.data.businessHours || {},
          seo: data.data.seo || {},
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await settingsAPI.update(form);
      toast.success('Settings saved');
      refreshSettings();
    } catch {
      toast.error('Failed to save settings');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageUpload = async (field, file, index) => {
    const data = createFormData({ field, index: index || 0 }, 'image', file);
    try {
      await settingsAPI.uploadImage(data);
      toast.success('Image uploaded');
      const { data: res } = await settingsAPI.get();
      setForm({
        businessName: res.data.businessName,
        tagline: res.data.tagline,
        phone: res.data.phone,
        email: res.data.email,
        website: res.data.website,
        serviceArea: res.data.serviceArea,
        address: res.data.address || '',
        socialLinks: res.data.socialLinks || {},
        hero: res.data.hero || {},
        footer: res.data.footer || {},
        businessHours: res.data.businessHours || {},
        seo: res.data.seo || {},
      });
      refreshSettings();
    } catch {
      toast.error('Upload failed');
    }
  };

  if (loading) return <AdminLayout><LoadingSpinner className="py-20" /></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold text-white mb-6">Website Settings</h1>

      <form onSubmit={handleSave} className="space-y-8 max-w-3xl">
        <section className="card-premium p-6 space-y-4">
          <h2 className="font-bold text-gold">Business Info</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label className="label-field">Business Name</label><input className="input-field" value={form.businessName || ''} onChange={(e) => setForm({ ...form, businessName: e.target.value })} /></div>
            <div><label className="label-field">Tagline</label><input className="input-field" value={form.tagline || ''} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /></div>
            <div><label className="label-field">Phone</label><input className="input-field" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div><label className="label-field">Email</label><input className="input-field" value={form.email || ''} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><label className="label-field">Website</label><input className="input-field" value={form.website || ''} onChange={(e) => setForm({ ...form, website: e.target.value })} /></div>
            <div><label className="label-field">Service Area</label><input className="input-field" value={form.serviceArea || ''} onChange={(e) => setForm({ ...form, serviceArea: e.target.value })} /></div>
          </div>
        </section>

        <section className="card-premium p-6 space-y-4">
          <h2 className="font-bold text-gold">Hero Section</h2>
          <div><label className="label-field">Eyebrow</label><input className="input-field" value={form.hero?.eyebrow || ''} onChange={(e) => setForm({ ...form, hero: { ...form.hero, eyebrow: e.target.value } })} /></div>
          <div><label className="label-field">Heading</label><input className="input-field" value={form.hero?.heading || ''} onChange={(e) => setForm({ ...form, hero: { ...form.hero, heading: e.target.value } })} /></div>
          <div><label className="label-field">Description</label><textarea rows={3} className="input-field" value={form.hero?.description || ''} onChange={(e) => setForm({ ...form, hero: { ...form.hero, description: e.target.value } })} /></div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div><label className="label-field">CTA Primary</label><input className="input-field" value={form.hero?.ctaPrimary || ''} onChange={(e) => setForm({ ...form, hero: { ...form.hero, ctaPrimary: e.target.value } })} /></div>
            <div><label className="label-field">CTA Secondary</label><input className="input-field" value={form.hero?.ctaSecondary || ''} onChange={(e) => setForm({ ...form, hero: { ...form.hero, ctaSecondary: e.target.value } })} /></div>
            <div><label className="label-field">CTA Tertiary</label><input className="input-field" value={form.hero?.ctaTertiary || ''} onChange={(e) => setForm({ ...form, hero: { ...form.hero, ctaTertiary: e.target.value } })} /></div>
          </div>
          <div><label className="label-field">Hero Image 1</label><input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleImageUpload('heroImage', e.target.files[0], 0)} className="text-sm text-white/70" /></div>
          <div><label className="label-field">Hero Image 2</label><input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleImageUpload('heroImage', e.target.files[0], 1)} className="text-sm text-white/70" /></div>
        </section>

        <section className="card-premium p-6 space-y-4">
          <h2 className="font-bold text-gold">Social Links</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {['facebook', 'instagram', 'whatsapp', 'twitter', 'tiktok', 'youtube'].map((platform) => (
              <div key={platform}>
                <label className="label-field capitalize">{platform}</label>
                <input className="input-field" value={form.socialLinks?.[platform] || ''} onChange={(e) => setForm({ ...form, socialLinks: { ...form.socialLinks, [platform]: e.target.value } })} />
              </div>
            ))}
          </div>
        </section>

        <section className="card-premium p-6 space-y-4">
          <h2 className="font-bold text-gold">Business Hours</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {Object.keys(form.businessHours || {}).map((day) => (
              <div key={day}>
                <label className="label-field capitalize">{day}</label>
                <input className="input-field" value={form.businessHours[day] || ''} onChange={(e) => setForm({ ...form, businessHours: { ...form.businessHours, [day]: e.target.value } })} />
              </div>
            ))}
          </div>
        </section>

        <section className="card-premium p-6 space-y-4">
          <h2 className="font-bold text-gold">SEO Defaults</h2>
          <div><label className="label-field">Default Title</label><input className="input-field" value={form.seo?.defaultTitle || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, defaultTitle: e.target.value } })} /></div>
          <div><label className="label-field">Default Description</label><textarea rows={2} className="input-field" value={form.seo?.defaultDescription || ''} onChange={(e) => setForm({ ...form, seo: { ...form.seo, defaultDescription: e.target.value } })} /></div>
          <div><label className="label-field">Logo</label><input type="file" accept="image/*" onChange={(e) => e.target.files[0] && handleImageUpload('logo', e.target.files[0])} className="text-sm text-white/70" /></div>
        </section>

        <button type="submit" disabled={submitting} className="btn-primary">{submitting ? 'Saving...' : 'Save All Settings'}</button>
      </form>
    </AdminLayout>
  );
};

export default SettingsManagement;
