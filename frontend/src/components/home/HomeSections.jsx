import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  CalendarDaysIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/solid';
import {
  BriefcaseIcon,
  AcademicCapIcon,
} from '@heroicons/react/24/outline';
import Hero from './Hero';
import LazyImage from '../common/LazyImage';
import LoadingSpinner from '../common/LoadingSpinner';
import StatsBar from '../common/StatsBar';
import ProcessSteps from '../common/ProcessSteps';
import WhyChooseUs from '../common/WhyChooseUs';
import TestimonialsSection from '../common/TestimonialsSection';
import ServiceAreaSection from '../common/ServiceAreaSection';
import FAQSection from '../common/FAQSection';
import { servicesAPI, boothsAPI, addonsAPI, galleryAPI } from '../../services/api';

const RingIcon = () => (
  <svg viewBox="0 0 24 24" className="h-8 w-8 text-gold" fill="currentColor">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

const SERVICE_ICONS = [RingIcon, BriefcaseIcon, AcademicCapIcon];

const HomeSections = () => {
  const [services, setServices] = useState([]);
  const [booths, setBooths] = useState([]);
  const [addons, setAddons] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [svc, booth, addon, gal] = await Promise.all([
          servicesAPI.getAll(),
          boothsAPI.getAll(),
          addonsAPI.getAll(),
          galleryAPI.getAll(),
        ]);
        setServices(svc.data.data.slice(0, 3));
        setBooths(booth.data.data);
        setAddons(addon.data.data.slice(0, 4));
        setGallery(gal.data.data.slice(0, 8));
      } catch (err) {
        console.error('Failed to load home data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <LoadingSpinner className="py-32" size="lg" />;

  return (
    <>
      <Hero />
      <StatsBar />

      {/* About Us */}
      <section className="bg-white section-padding">
        <div className="container-custom grid items-center gap-12 lg:grid-cols-2">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/images/about-us.png"
              alt="PixNGiggles event moments collage"
              className="w-full max-w-lg object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">About Us</p>
            <h2 className="mt-2 text-3xl font-extrabold text-charcoal sm:text-4xl">
              Turning Moments Into{' '}
              <span className="font-script text-4xl text-gold sm:text-5xl">Memories</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-gray-600 sm:text-base">
              PixNGiggles is a premier photo booth provider serving the Dallas–Fort Worth area. We specialize in creating unforgettable experiences that capture the joy and laughter of your most special moments.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-gray-600 sm:text-base">
              From elegant weddings to dynamic corporate events, our professional setups engage guests and deliver high-quality digital and printed keepsakes.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-gray-light p-4">
                <p className="text-2xl font-extrabold text-gold">500+</p>
                <p className="text-xs font-semibold uppercase text-gray-600">Events Hosted</p>
              </div>
              <div className="rounded-lg bg-gray-light p-4">
                <p className="text-2xl font-extrabold text-gold">24hr</p>
                <p className="text-xs font-semibold uppercase text-gray-600">Response Time</p>
              </div>
            </div>
            <Link to="/about" className="btn-primary-dark mt-8 inline-flex">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-light">
        <div className="bg-black py-12 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Our Services</p>
          <h2 className="mt-2 text-2xl font-extrabold uppercase text-white sm:text-3xl">
            Photo Booths for Every Occasion
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/70">
            Weddings, corporate events, graduations, and private celebrations — tailored packages for every milestone.
          </p>
        </div>
        <div className="container-custom section-padding !pt-10">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, idx) => {
              const Icon = SERVICE_ICONS[idx] || BriefcaseIcon;
              return (
                <div key={service._id} className="card-premium overflow-hidden text-center">
                  <div className="flex justify-center pt-8">
                    {idx === 0 ? <RingIcon /> : <Icon className="h-8 w-8 text-gold" strokeWidth={1.5} />}
                  </div>
                  <div className="px-6 pb-4 pt-4">
                    <h3 className="text-lg font-bold uppercase text-charcoal">{service.title.replace(' Photo Booth', '')}</h3>
                    <p className="mt-2 text-sm text-gray-600">{service.shortDescription}</p>
                  </div>
                  <LazyImage
                    src={service.image}
                    alt={service.title}
                    className="h-52 w-full object-cover"
                    width={800}
                  />
                </div>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Link to="/services" className="btn-primary-dark">View All Services</Link>
          </div>
        </div>
      </section>

      <ProcessSteps bg="white" />

      {/* Booths */}
      <section className="bg-white section-padding">
        <div className="container-custom text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Our Booths</p>
          <h2 className="mt-2 text-2xl font-extrabold text-charcoal sm:text-3xl">
            Two Great Options, One{' '}
            <span className="font-script text-3xl text-gold sm:text-4xl">Unforgettable</span> Experience
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600">
            Choose the Cloee Ring Light for compact elegance or the Mirror X Luxury for a full interactive mirror experience.
          </p>
        </div>
        <div className="container-custom mt-12 grid gap-10 lg:grid-cols-2 lg:gap-12">
          {booths.map((booth) => (
            <div key={booth._id} className="card-premium p-6">
              <div className="flex flex-row items-start gap-5 sm:gap-6">
                <div className="shrink-0 w-32 sm:w-40">
                  <LazyImage
                    src={booth.image}
                    alt={booth.title}
                    className="h-auto w-full object-contain"
                    width={600}
                  />
                </div>
                <div className="min-w-0 flex-1 text-left">
                  <h3 className="text-base font-bold leading-snug text-charcoal sm:text-lg">{booth.title}</h3>
                  <p className="mt-1 text-xs font-semibold text-gold sm:text-sm">By {booth.manufacturer}</p>
                  <ul className="mt-3 space-y-1.5">
                    {booth.features?.slice(0, 4).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-600 sm:text-sm">
                        <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="container-custom mt-10 text-center">
          <Link to="/booths" className="text-sm font-bold uppercase text-gold hover:text-gold-dark">
            Compare Our Booths →
          </Link>
        </div>

        {/* Add-ons */}
        <div className="container-custom mt-14">
          <div className="rounded-lg bg-black px-6 py-10 sm:px-10">
            <h3 className="text-center text-lg font-bold text-gold sm:text-xl">Special Add-Ons & Offers</h3>
            <p className="mt-2 text-center text-sm text-white/70">
              Elevate your event with custom backdrops, branded overlays, green screen, and premium props.
            </p>
            <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {addons.map((addon) => (
                <div key={addon._id} className="text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
                    <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="mt-3 text-xs font-bold uppercase tracking-wide text-white">{addon.name}</p>
                  {addon.description && (
                    <p className="mt-1 text-xs text-white/60">{addon.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs bg="gray" />

      {/* Gallery preview */}
      <section className="bg-white section-padding !pt-8">
        <div className="container-custom">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Gallery</p>
            <h2 className="mt-2 text-2xl font-extrabold text-charcoal sm:text-3xl">Memories Captured</h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-600">
              A glimpse at weddings, corporate events, and celebrations across DFW.
            </p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.map((item) => (
              <LazyImage
                key={item._id}
                src={item.image}
                alt={item.altText}
                className="h-40 w-full object-cover sm:h-48"
                width={800}
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/gallery" className="text-sm font-bold uppercase text-gold hover:text-gold-dark">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      <TestimonialsSection limit={3} bg="gray" />
      <FAQSection limit={4} bg="white" title="Common Questions" />
      <ServiceAreaSection bg="black" />

      {/* Gold CTA */}
      <section className="bg-gold">
        <div className="container-custom flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 text-black">
            <CalendarDaysIcon className="h-10 w-10 shrink-0" />
            <div>
              <p className="text-lg font-extrabold sm:text-xl">
                Let&apos;s Make Your Event{' '}
                <span className="font-script text-2xl sm:text-3xl">Unforgettable!</span>
              </p>
              <p className="text-sm font-medium">Check availability and book your date today.</p>
            </div>
          </div>
          <Link to="/booking" className="btn-primary-dark shrink-0">
            Check Availability
          </Link>
        </div>
      </section>
    </>
  );
};

export default HomeSections;
