import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PhoneIcon, EnvelopeIcon, ClockIcon } from '@heroicons/react/24/outline';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import ProcessSteps from '../components/common/ProcessSteps';
import WhatsIncluded from '../components/common/WhatsIncluded';
import FAQSection from '../components/common/FAQSection';
import { SocialLinksBar } from '../components/common/SocialLinks';
import { bookingsAPI, addonsAPI } from '../services/api';
import { EVENT_TYPES, BOOTH_OPTIONS, HEAR_ABOUT_OPTIONS } from '../utils/constants';
import { useSettings } from '../context/SettingsContext';

export const BookingForm = ({ className = '' }) => {
  const [addons, setAddons] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({ defaultValues: { interestedAddons: [] } });
  const selectedAddons = watch('interestedAddons') || [];

  useEffect(() => {
    addonsAPI.getAll().then(({ data }) => setAddons(data.data)).catch(console.error);
  }, []);

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      await bookingsAPI.create({
        ...data,
        guestCount: Number(data.guestCount),
        interestedAddons: data.interestedAddons || [],
      });
      setSubmitted(true);
      reset();
      toast.success('Your booking inquiry has been submitted!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className={`text-center ${className}`}>
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/20">
          <span className="text-2xl text-gold">✓</span>
        </div>
        <h3 className="text-2xl font-bold text-charcoal">Thank You!</h3>
        <p className="mt-3 text-gray-600">
          Your booking inquiry has been received. Our team will contact you within 24 hours.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-outline-dark mt-6">Submit Another Inquiry</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-5 ${className}`}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="label-field">Full Name *</label>
          <input className="input-field" {...register('fullName', { required: 'Name is required' })} />
          {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
        </div>
        <div>
          <label className="label-field">Email Address *</label>
          <input type="email" className="input-field" {...register('email', { required: 'Email is required' })} />
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="label-field">Phone Number *</label>
          <input type="tel" className="input-field" {...register('phone', { required: 'Phone is required' })} />
          {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
        </div>
        <div>
          <label className="label-field">Event Type *</label>
          <select className="input-field" {...register('eventType', { required: 'Event type is required' })}>
            <option value="">Select event type</option>
            {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          {errors.eventType && <p className="mt-1 text-sm text-red-500">{errors.eventType.message}</p>}
        </div>
        <div>
          <label className="label-field">Event Date *</label>
          <input type="date" className="input-field" {...register('eventDate', { required: 'Date is required' })} />
          {errors.eventDate && <p className="mt-1 text-sm text-red-500">{errors.eventDate.message}</p>}
        </div>
        <div>
          <label className="label-field">Event Time *</label>
          <input type="time" className="input-field" {...register('eventTime', { required: 'Time is required' })} />
          {errors.eventTime && <p className="mt-1 text-sm text-red-500">{errors.eventTime.message}</p>}
        </div>
        <div>
          <label className="label-field">Venue *</label>
          <input className="input-field" {...register('venue', { required: 'Venue is required' })} />
          {errors.venue && <p className="mt-1 text-sm text-red-500">{errors.venue.message}</p>}
        </div>
        <div>
          <label className="label-field">City *</label>
          <input className="input-field" {...register('city', { required: 'City is required' })} />
          {errors.city && <p className="mt-1 text-sm text-red-500">{errors.city.message}</p>}
        </div>
        <div>
          <label className="label-field">Expected Guest Count *</label>
          <input type="number" min="1" className="input-field" {...register('guestCount', { required: 'Guest count is required' })} />
          {errors.guestCount && <p className="mt-1 text-sm text-red-500">{errors.guestCount.message}</p>}
        </div>
        <div>
          <label className="label-field">Preferred Booth</label>
          <select className="input-field" {...register('preferredBooth')}>
            {BOOTH_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      {addons.length > 0 && (
        <div>
          <label className="label-field">Interested Add-Ons</label>
          <div className="grid gap-2 sm:grid-cols-2">
            {addons.map((addon) => (
              <label key={addon._id} className="flex items-center gap-3 rounded-md border border-gray-200 p-3 cursor-pointer hover:border-gold">
                <input
                  type="checkbox"
                  checked={selectedAddons.includes(addon.name)}
                  onChange={(e) => {
                    const next = e.target.checked
                      ? [...selectedAddons, addon.name]
                      : selectedAddons.filter((n) => n !== addon.name);
                    setValue('interestedAddons', next);
                  }}
                  className="accent-gold"
                />
                <span className="text-sm text-charcoal">{addon.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="label-field">How Did You Hear About Us?</label>
        <select className="input-field" {...register('hearAboutUs')}>
          <option value="">Select an option</option>
          {HEAR_ABOUT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      <div>
        <label className="label-field">Message</label>
        <textarea rows={4} className="input-field" placeholder="Tell us about your event..." {...register('message')} />
      </div>

      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
        {submitting ? 'Submitting...' : 'Submit Booking Inquiry'}
      </button>
    </form>
  );
};

const Booking = () => {
  const { settings } = useSettings();

  return (
    <>
      <SEO title="Book Your Event" description="Submit a booking inquiry for your Dallas–Fort Worth photo booth rental." />
      <PageHero
        eyebrow="Booking"
        title="Book Your"
        scriptSuffix="Photo Booth"
        subtitle="Fill out the form below and our team will get back to you within 24 hours with availability and pricing."
      />

      <section className="bg-black py-6">
        <div className="container-custom space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white">
            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 hover:text-gold">
              <PhoneIcon className="h-5 w-5 text-gold" />
              {settings.phone}
            </a>
            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 hover:text-gold">
              <EnvelopeIcon className="h-5 w-5 text-gold" />
              {settings.email}
            </a>
            <span className="flex items-center gap-2">
              <ClockIcon className="h-5 w-5 text-gold" />
              Response within 24 hours
            </span>
          </div>
          <SocialLinksBar />
        </div>
      </section>

      <section className="bg-gray-light section-padding">
        <div className="container-custom grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <div className="card-premium p-6 sm:p-8">
              <h2 className="text-xl font-bold text-charcoal">Booking Inquiry Form</h2>
              <p className="mt-2 text-sm text-gray-600">
                Tell us about your event and we&apos;ll send a custom quote with package options.
              </p>
              <div className="mt-6">
                <BookingForm />
              </div>
            </div>
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="card-premium p-6">
              <h3 className="font-bold text-charcoal">Why Book With Us?</h3>
              <ul className="mt-4 space-y-3 text-sm text-gray-600">
                <li>✓ Premium Cloee & Mirror X booths</li>
                <li>✓ Professional on-site attendants</li>
                <li>✓ Unlimited photo sessions</li>
                <li>✓ Instant digital sharing</li>
                <li>✓ Custom overlays & backdrops</li>
                <li>✓ Serving all of DFW</li>
              </ul>
            </div>
            <div className="card-premium p-6">
              <h3 className="font-bold text-charcoal">Prefer to Talk?</h3>
              <p className="mt-2 text-sm text-gray-600">
                Call or email us directly — we&apos;re happy to walk through options and answer questions.
              </p>
              <div className="mt-4 space-y-2">
                <a href={`tel:${settings.phone}`} className="block text-sm font-semibold text-gold hover:underline">
                  {settings.phone}
                </a>
                <a href={`mailto:${settings.email}`} className="block text-sm font-semibold text-gold hover:underline">
                  {settings.email}
                </a>
              </div>
              <Link to="/contact" className="btn-outline-dark mt-4 inline-flex text-xs">
                Contact Page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ProcessSteps bg="white" />
      <WhatsIncluded bg="gray" />
      <FAQSection limit={5} bg="white" title="Booking Questions" />

      <section className="bg-gold">
        <div className="container-custom flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
          <div className="text-black text-center sm:text-left">
            <h2 className="text-xl font-extrabold sm:text-2xl">Questions Before You Book?</h2>
            <p className="mt-1 text-sm font-medium">Our team is ready to help plan your perfect photo booth experience.</p>
          </div>
          <Link to="/contact" className="btn-primary-dark shrink-0">Contact Us</Link>
        </div>
      </section>
    </>
  );
};

export default Booking;
