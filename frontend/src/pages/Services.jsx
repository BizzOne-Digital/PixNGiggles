import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
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
import { servicesAPI, addonsAPI } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [addons, setAddons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([servicesAPI.getAll(), addonsAPI.getAll()])
      .then(([svc, addon]) => {
        setServices(svc.data.data);
        setAddons(addon.data.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Services" description="Wedding, corporate, and celebration photo booth services in Dallas–Fort Worth." />
      <PageHero
        eyebrow="Our Services"
        title="Photo Booths for"
        scriptSuffix="Every Occasion"
        subtitle="Tailored photo booth packages for weddings, corporate events, graduations, and private celebrations across DFW."
      />

      {/* Service overview */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading
            centered
            title="Events We Specialize In"
            subtitle="Every package includes a professional attendant, unlimited sessions, digital sharing, and full setup."
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {['Weddings', 'Corporate Events', 'Graduations', 'Private Parties'].map((type) => (
              <div key={type} className="card-premium p-5 text-center">
                <CheckCircleIcon className="mx-auto h-8 w-8 text-gold" />
                <p className="mt-3 text-sm font-bold uppercase text-charcoal">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gray-light section-padding">
        <div className="container-custom">
          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {services.map((service) => (
                <div key={service._id} className="card-premium overflow-hidden">
                  <LazyImage src={service.image} alt={service.title} className="h-56 w-full object-cover" width={900} />
                  <div className="p-6">
                    <h3 className="text-lg font-bold uppercase text-charcoal">{service.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-gray-600">{service.description}</p>
                    {service.shortDescription && (
                      <p className="mt-2 text-xs font-semibold text-gold">{service.shortDescription}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <WhatsIncluded bg="white" />

      {/* Add-ons */}
      {addons.length > 0 && (
        <section className="section-padding bg-gray-light">
          <div className="container-custom">
            <SectionHeading
              eyebrow="Enhance Your Event"
              title="Available"
              scriptSuffix="Add-Ons"
              subtitle="Customize your package with premium extras designed to make your event stand out."
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {addons.map((addon) => (
                <div key={addon._id} className="card-premium flex items-start gap-4 p-5">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                  <div>
                    <p className="font-bold text-charcoal">{addon.name}</p>
                    {addon.description && (
                      <p className="mt-1 text-sm text-gray-600">{addon.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <ProcessSteps bg="white" />

      <section className="section-padding bg-gray-light">
        <div className="container-custom text-center">
          <SectionHeading
            title="Not Sure Which Service Fits?"
            subtitle="Our team will recommend the perfect package based on your event type, guest count, and venue."
          />
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/booths" className="btn-outline-dark">Compare Booths</Link>
            <Link to="/booking" className="btn-primary">Get a Custom Quote</Link>
          </div>
        </div>
      </section>

      <TestimonialsSection limit={3} bg="white" />
      <FAQSection limit={5} bg="gray" />
      <CTASection title="Find the Perfect Service for Your Event" />
    </>
  );
};

export default Services;
