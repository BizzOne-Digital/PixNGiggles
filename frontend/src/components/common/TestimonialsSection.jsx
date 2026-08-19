import { useState, useEffect } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import SectionHeading from './SectionHeading';
import LoadingSpinner from './LoadingSpinner';
import { testimonialsAPI } from '../../services/api';

const TestimonialsSection = ({ limit = 3, bg = 'white' }) => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    testimonialsAPI.getAll()
      .then(({ data }) => setTestimonials(data.data.slice(0, limit)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading) return <LoadingSpinner className="py-16" />;
  if (testimonials.length === 0) return null;

  return (
    <section className={`section-padding ${bg === 'gray' ? 'bg-gray-light' : 'bg-white'}`}>
      <div className="container-custom">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our"
          scriptSuffix="Clients Say"
          subtitle="Real feedback from weddings, corporate events, and celebrations across Dallas–Fort Worth."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t._id} className="card-premium p-6">
              <div className="flex gap-1">
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 text-gold" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-600 italic">&ldquo;{t.review}&rdquo;</p>
              <div className="mt-5 border-t border-gray-100 pt-4">
                <p className="font-bold text-charcoal">{t.customerName}</p>
                {t.eventType && (
                  <p className="text-xs font-semibold uppercase tracking-wide text-gold">{t.eventType}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
