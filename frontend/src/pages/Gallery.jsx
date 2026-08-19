import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import StatsBar from '../components/common/StatsBar';
import TestimonialsSection from '../components/common/TestimonialsSection';
import { CTASection } from '../components/common/SectionHeading';
import SectionHeading from '../components/common/SectionHeading';
import LazyImage from '../components/common/LazyImage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Modal from '../components/common/Modal';
import { galleryAPI } from '../services/api';
import { GALLERY_CATEGORIES } from '../utils/constants';
import { GALLERY_INTRO } from '../utils/pageContent';

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    galleryAPI.getAll()
      .then(({ data }) => setFeatured(data.data.slice(0, 3)))
      .catch(console.error);
  }, []);

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
      <PageHero
        eyebrow="Gallery"
        title="Memories"
        scriptSuffix="Captured"
        subtitle="Browse real moments from weddings, corporate events, graduations, and celebrations across Dallas–Fort Worth."
      />
      <StatsBar />

      {/* Featured strip */}
      {featured.length > 0 && (
        <section className="bg-white section-padding !pb-8">
          <div className="container-custom">
            <SectionHeading eyebrow="Featured" title="Recent Highlights" centered />
            <div className="grid gap-4 md:grid-cols-3">
              {featured.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className="group overflow-hidden rounded-lg"
                >
                  <LazyImage
                    src={item.image}
                    alt={item.altText || item.title}
                    className="h-56 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:h-64"
                    width={1000}
                  />
                  {item.title && (
                    <p className="mt-2 text-sm font-bold text-charcoal">{item.title}</p>
                  )}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-gray-light section-padding">
        <div className="container-custom">
          <SectionHeading
            title="Browse by Category"
            subtitle="Filter our gallery to find inspiration for your event type."
          />

          <div className="flex flex-wrap justify-center gap-2">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`rounded-md px-4 py-2 text-xs font-bold uppercase tracking-wide transition-all ${
                  category === cat ? 'bg-gold text-black' : 'bg-white text-charcoal hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {category !== 'All' && GALLERY_INTRO[category] && (
            <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-gray-600">
              {GALLERY_INTRO[category]}
            </p>
          )}

          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : images.length === 0 ? (
            <p className="py-20 text-center text-gray-500">No images found in this category.</p>
          ) : (
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {images.map((item) => (
                <button
                  key={item._id}
                  onClick={() => setSelected(item)}
                  className="overflow-hidden cursor-pointer rounded-md"
                >
                  <LazyImage
                    src={item.image}
                    alt={item.altText || item.title}
                    className="h-44 w-full object-cover transition-opacity hover:opacity-90 sm:h-52"
                    width={800}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom text-center">
          <SectionHeading
            title="Want Your Event"
            scriptSuffix="Featured Here?"
            subtitle="Book PixNGiggles and create gallery-worthy moments your guests will love."
          />
          <Link to="/booking" className="btn-primary">Book Your Event</Link>
        </div>
      </section>

      <TestimonialsSection limit={3} bg="gray" />
      <CTASection title="Ready to Create Your Own Memories?" primaryText="Check Availability" />

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={selected?.title || 'Gallery'} size="lg">
        {selected && (
          <LazyImage
            src={selected.image}
            alt={selected.altText}
            className="w-full rounded-md max-h-[70vh] object-contain"
            width={1600}
          />
        )}
      </Modal>
    </>
  );
};

export default Gallery;
