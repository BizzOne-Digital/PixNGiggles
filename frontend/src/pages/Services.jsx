import { useState, useEffect } from 'react';
import SEO from '../components/common/SEO';
import SectionHeading, { CTASection } from '../components/common/SectionHeading';
import LazyImage from '../components/common/LazyImage';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { servicesAPI } from '../services/api';

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    servicesAPI.getAll()
      .then(({ data }) => setServices(data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <SEO title="Services" description="Wedding, corporate, and celebration photo booth services in Dallas–Fort Worth." />
      <div className="bg-black py-14 text-center !pt-28">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Our Services</p>
        <h1 className="mt-2 text-2xl font-extrabold uppercase text-white sm:text-3xl">Photo Booths for Every Occasion</h1>
      </div>
      <section className="bg-gray-light section-padding">
        <div className="container-custom">
          {loading ? (
            <LoadingSpinner className="py-20" />
          ) : (
            <div className="grid gap-8 md:grid-cols-3">
              {services.map((service) => (
                <div key={service._id} className="card-premium overflow-hidden">
                  <LazyImage src={service.image} alt={service.title} className="h-48 w-full object-cover" width={500} />
                  <div className="p-6">
                    <h3 className="text-lg font-bold uppercase text-charcoal">{service.title}</h3>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTASection title="Find the Perfect Service for Your Event" />
    </>
  );
};

export default Services;
