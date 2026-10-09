import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import ProcessSteps from '../components/common/ProcessSteps';
import WhatsIncluded from '../components/common/WhatsIncluded';
import TestimonialsSection from '../components/common/TestimonialsSection';
import FAQSection from '../components/common/FAQSection';
import { CTASection } from '../components/common/SectionHeading';
import SectionHeading from '../components/common/SectionHeading';
import LazyImage from '../components/common/LazyImage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { boothsAPI, addonsAPI } from '../services/api';
import { BOOTH_COMPARISON } from '../utils/pageContent';

const Booths = () => {
  const [booths, setBooths] = useState([]);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    Promise.all([boothsAPI.getAll(), addonsAPI.getAll()])
      .then(([booth, addon]) => {
        setBooths(booth.data.data);
        setAddons(addon.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Photo Booths" description="Explore the Cloee Ring Light and Mirror X Luxury photo booths from PixNGiggles." />
      <PageHero
        eyebrow="Our Booths"
        title="Two Great Options, One"
        scriptSuffix="Unforgettable Experience"
        subtitle="Premium Cloee Ring Light and Mirror X Luxury booths — studio-quality photos with a touch of magic."
      />

      <section className="bg-white section-padding">
        <div className="container-custom">
          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
              {booths.map((booth) => (
                <div key={booth._id} className="card-premium overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setLightbox(booth)}
                    className="block w-full cursor-zoom-in bg-gray-light"
                    aria-label={`View full-size image of ${booth.title}`}
                  >
                    <LazyImage
                      src={booth.image}
                      alt={booth.title}
                      className="h-80 w-full object-contain sm:h-96"
                      width={1000}
                    />
                  </button>
                  <div className="p-6 sm:p-8">
                    <div className="flex flex-row items-start gap-5">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl font-bold text-charcoal">{booth.title}</h3>
                        <p className="mt-1 text-sm font-semibold text-gold">By {booth.manufacturer}</p>
                        <p className="mt-3 text-sm leading-relaxed text-gray-600">{booth.description}</p>
                        <ul className="mt-4 space-y-2">
                          {booth.features?.map((f) => (
                            <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                              <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                              <span>{f}</span>
                            </li>
                          ))}
                        </ul>
                        <Link to="/contact" className="btn-primary mt-6 inline-flex text-sm">Contact for Pricing</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Comparison table */}
      <section className="section-padding bg-gray-light">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Compare"
            title="Which Booth Is"
            scriptSuffix="Right for You?"
            subtitle="Both booths deliver stunning results — here's how they differ."
          />
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] card-premium text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-black text-left text-white">
                  <th className="p-4 font-bold">Feature</th>
                  <th className="p-4 font-bold">Cloee Ring Light</th>
                  <th className="p-4 font-bold">Mirror X Luxury</th>
                </tr>
              </thead>
              <tbody>
                {BOOTH_COMPARISON.map((row) => (
                  <tr key={row.feature} className="border-b border-gray-100">
                    <td className="p-4 text-charcoal">{row.feature}</td>
                    <td className="p-4">
                      {row.cloee ? (
                        <CheckCircleIcon className="h-5 w-5 text-gold" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 text-gray-300" />
                      )}
                    </td>
                    <td className="p-4">
                      {row.mirror ? (
                        <CheckCircleIcon className="h-5 w-5 text-gold" />
                      ) : (
                        <XMarkIcon className="h-5 w-5 text-gray-300" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <WhatsIncluded bg="white" />

      {addons.length > 0 && (
        <section className="section-padding bg-gray-light">
          <div className="container-custom">
            <SectionHeading eyebrow="Customize" title="Booth Add-Ons" subtitle="Pair any booth with premium extras for a fully branded experience." />
            <div className="grid gap-4 sm:grid-cols-2">
              {addons.map((addon) => (
                <div key={addon._id} className="card-premium flex items-center gap-3 p-5">
                  <CheckCircleIcon className="h-5 w-5 shrink-0 text-gold" />
                  <span className="font-medium text-charcoal">{addon.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProcessSteps bg="white" />
      <TestimonialsSection limit={3} bg="gray" />
      <FAQSection limit={4} bg="white" title="Booth Questions" />
      <CTASection title="Not Sure Which Booth Is Right for You?" subtitle="Our team will help you choose the perfect option." />

      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
          <LazyImage
            src={lightbox.image}
            alt={lightbox.title}
            className="max-h-full max-w-full object-contain"
            width={1600}
          />
        </div>
      )}
    </>
  );
};

export default Booths;
