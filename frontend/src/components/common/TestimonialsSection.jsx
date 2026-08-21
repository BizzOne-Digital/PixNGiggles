import { useState, useEffect } from 'react';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';
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

  return (
    <section className={`section-padding ${bg === 'gray' ? 'bg-gray-light' : 'bg-white'}`}>
      <div className="container-custom">
        <SectionHeading
          eyebrow="Testimonials"
          title="What Our"
          scriptSuffix="Clients Say"
          subtitle={
            testimonials.length > 0
              ? 'Real feedback from weddings, corporate events, and celebrations across Dallas–Fort Worth.'
              : 'Client reviews will appear here once events are completed.'
          }
        />
        {testimonials.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t._id} className="card-premium p-6">
                <div className="flex gap-1">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <span key={i} className="text-gold">★</span>
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
        ) : (
          <div className="mx-auto max-w-2xl card-premium p-10 text-center">
            <ChatBubbleLeftRightIcon className="mx-auto h-10 w-10 text-gold/60" />
            <p className="mt-4 text-sm leading-relaxed text-gray-600">
              We&apos;re just getting started in DFW. As we complete events, real client reviews will be added here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
