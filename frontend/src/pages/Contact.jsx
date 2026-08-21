import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import {
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import ProcessSteps from '../components/common/ProcessSteps';
import ServiceAreaSection from '../components/common/ServiceAreaSection';
import FAQSection from '../components/common/FAQSection';
import TestimonialsSection from '../components/common/TestimonialsSection';
import { SocialLinksBar } from '../components/common/SocialLinks';
import { CTASection } from '../components/common/SectionHeading';
import SectionHeading from '../components/common/SectionHeading';
import { contactsAPI } from '../services/api';
import { useSettings } from '../context/SettingsContext';

const Contact = () => {
  const { settings } = useSettings();
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await contactsAPI.create(data);
      reset();
      toast.success('Message sent successfully!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  const hours = settings.businessHours || {};

  return (
    <>
      <SEO title="Contact Us" description="Contact PixNGiggles for photo booth rentals in Dallas–Fort Worth." />
      <PageHero
        eyebrow="Contact"
        title="Get In"
        scriptSuffix="Touch"
        subtitle="We'd love to hear about your event. Reach out and let's create something unforgettable."
      />

      {/* Response promise */}
      <section className="bg-black py-6">
        <div className="container-custom space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-white">
            <span className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gold" />
              We respond within 24 hours
            </span>
            <span className="flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-gold" />
              {settings.serviceArea}
            </span>
          </div>
          <SocialLinksBar />
        </div>
      </section>

      <section className="bg-white section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
              <div className="card-premium p-6 space-y-5">
                <h3 className="font-bold text-charcoal">Contact Information</h3>
                <a href={`tel:${settings.phone}`} className="flex items-center gap-4 text-gray-700 hover:text-gold transition-colors">
                  <PhoneIcon className="h-5 w-5 text-gold shrink-0" />
                  <span>{settings.phone}</span>
                </a>
                <a href={`mailto:${settings.email}`} className="flex items-center gap-4 text-gray-700 hover:text-gold transition-colors">
                  <EnvelopeIcon className="h-5 w-5 text-gold shrink-0" />
                  <span>{settings.email}</span>
                </a>
                <div className="flex items-center gap-4 text-gray-700">
                  <GlobeAltIcon className="h-5 w-5 text-gold shrink-0" />
                  <span>{settings.website}</span>
                </div>
                <div className="flex items-center gap-4 text-gray-700">
                  <MapPinIcon className="h-5 w-5 text-gold shrink-0" />
                  <span>{settings.serviceArea}</span>
                </div>
              </div>

              {Object.keys(hours).length > 0 && (
                <div className="card-premium p-6">
                  <h4 className="font-bold text-gold mb-4">Business Hours</h4>
                  <ul className="space-y-2 text-sm">
                    {Object.entries(hours).map(([day, time]) => (
                      <li key={day} className="flex justify-between text-gray-600">
                        <span className="capitalize">{day}</span>
                        <span>{time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="card-premium p-6">
                <h4 className="font-bold text-charcoal">Quick Links</h4>
                <div className="mt-4 flex flex-wrap gap-3">
                  <Link to="/booking" className="btn-primary text-xs">Book Your Event</Link>
                  <Link to="/services" className="btn-outline-dark text-xs">Our Services</Link>
                  <Link to="/gallery" className="btn-outline-dark text-xs">View Gallery</Link>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <div className="card-premium p-6 sm:p-8">
                <h3 className="text-xl font-bold text-charcoal mb-2">Send Us a Message</h3>
                <p className="text-sm text-gray-600 mb-6">
                  Have a question about packages, booths, or availability? Send us a message and we&apos;ll get back to you promptly.
                </p>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="label-field">Name *</label>
                      <input className="input-field" {...register('name', { required: 'Name is required' })} />
                      {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="label-field">Email *</label>
                      <input type="email" className="input-field" {...register('email', { required: 'Email is required' })} />
                      {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="label-field">Phone</label>
                      <input type="tel" className="input-field" {...register('phone')} />
                    </div>
                    <div>
                      <label className="label-field">Subject</label>
                      <input className="input-field" {...register('subject')} />
                    </div>
                  </div>
                  <div>
                    <label className="label-field">Message *</label>
                    <textarea rows={5} className="input-field" {...register('message', { required: 'Message is required' })} />
                    {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>}
                  </div>
                  <button type="submit" disabled={submitting} className="btn-primary">
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-light">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Before You Reach Out"
            title="What to Include"
            subtitle="The more details you share, the faster we can help."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Event date & time', 'Venue & city', 'Guest count', 'Booth preference'].map((tip) => (
              <div key={tip} className="card-premium p-5 text-center">
                <p className="text-sm font-bold text-charcoal">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ProcessSteps bg="white" />
      <TestimonialsSection limit={3} bg="gray" />
      <FAQSection bg="white" />
      <ServiceAreaSection bg="black" />
      <CTASection title="Ready to Book?" primaryText="Check Availability" />
    </>
  );
};

export default Contact;
