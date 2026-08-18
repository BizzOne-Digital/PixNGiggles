import { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import LazyImage from '../components/common/LazyImage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import { galleryAPI } from '../services/api';
import { GALLERY_CATEGORIES } from '../utils/constants';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    const params = category !== 'All' ? { category } : {};
    galleryAPI.getAll(params)
      .then(({ data }) => setImages(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [category]);

  return (
    <>
      <SEO title="Gallery" description="Browse our photo booth gallery featuring weddings, corporate events, and celebrations." />
      <section className="bg-white section-padding !pt-28">
        <div className="container-custom">
          <h1 className="text-center text-2xl font-extrabold text-charcoal sm:text-3xl">Memories Captured</h1>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                  category === cat ? 'bg-gold text-black' : 'bg-gray-100 text-charcoal hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : images.length === 0 ? (
            <p className="text-center text-gray-500 py-20">No images found in this category.</p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className="overflow-hidden cursor-pointer"
                >
                  <LazyImage
                    src={item.image}
                    alt={item.altText || item.title}
                    className="h-40 w-full object-cover transition-opacity hover:opacity-90 sm:h-48"
                    width={400}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || 'Gallery'} size="lg">
        {selected && (
          <LazyImage src={selected.image} alt={selected.altText} className="w-full rounded-md max-h-[70vh] object-contain" width={1200} />
        )}
      </Modal>
    </>
  );
};

export default Gallery;
