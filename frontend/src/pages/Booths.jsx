import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SEO from '../components/common/SEO';
import { CTASection } from '../components/common/SectionHeading';
import LazyImage from '../components/common/LazyImage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { boothsAPI } from '../services/api';

const Booths = () => {
  const [booths, setBooths] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    boothsAPI.getAll()
      .then(({ data }) => setBooths(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Photo Booths" description="Explore the Cloee Ring Light and Mirror X Luxury photo booths from PixNGiggles." />
      <section className="bg-white section-padding !pt-28">
        <div className="container-custom text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Our Booths</p>
          <h1 className="mt-2 text-2xl font-extrabold text-charcoal sm:text-3xl">
            Two Great Options, One <span className="font-script text-3xl text-gold">Unforgettable</span> Experience
          </h1>
        </div>
        <div className="container-custom mt-12">
          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              {booths.map((booth) => (
                <div key={booth._id} className="flex flex-row items-start gap-5 sm:gap-6">
                  <div className="shrink-0 w-28 sm:w-32 lg:w-40">
                    <LazyImage
                      src={booth.image}
                      alt={booth.title}
                      className="h-auto w-full object-contain"
                      width={500}
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-left">
                    <h3 className="text-base font-bold leading-snug text-charcoal sm:text-xl">{booth.title}</h3>
                    <p className="mt-1 text-xs font-semibold text-gold sm:text-sm">By {booth.manufacturer}</p>
                    <p className="mt-2 text-xs text-gray-600 sm:text-sm">{booth.description}</p>
                    <ul className="mt-3 space-y-1.5">
                      {booth.features?.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs text-gray-600 sm:text-sm">
                          <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link to="/contact" className="btn-primary mt-5 inline-flex text-xs sm:text-sm">Contact for Pricing</Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTASection title="Not Sure Which Booth Is Right for You?" subtitle="Our team will help you choose the perfect option." />
    </>
  );
};

export default Booths;
