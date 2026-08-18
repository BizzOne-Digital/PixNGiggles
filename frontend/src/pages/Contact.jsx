import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { PhoneIcon, EnvelopeIcon, GlobeAltIcon, MapPinIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import SEO from '../components/common/SEO';
import SectionHeading, { CTASection } from '../components/common/SectionHeading';
import { contactsAPI, faqsAPI } from '../services/api';
import { useSettings } from '../context/SettingsContext';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { settings } = useSettings();
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  useEffect(() => {
    faqsAPI.getAll().then(({ data }) => setFaqs(data.data.slice(0, 5))).catch(console.error);
  }, []);

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
      <section className="bg-white section-padding !pt-28">
        <div className="container-custom">
          <SectionHeading eyebrow="Contact" title="Get In Touch" subtitle="We'd love to hear about your event. Reach out and let's create something unforgettable." />

          <div className="grid gap-12 lg:grid-cols-5">
            <div className="lg:col-span-2 space-y-6">
              <div className="card-premium p-6 space-y-5">
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

              <Link to="/booking" className="btn-primary block text-center">Book Your Event</Link>
            </div>

            <div className="lg:col-span-3">
              <div className="card-premium p-6 sm:p-8">
                <h3 className="text-xl font-bold text-charcoal mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="label-field">Name *</label>
                      <input className="input-field" {...register('name', { required: 'Name is required' })} />
                      {errors.name && <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="label-field">Email *</label>
                      <input type="email" className="input-field" {...register('email', { required: 'Email is required' })} />
                      {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>}
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
                    {errors.message && <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>}
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

      {faqs.length > 0 && (
        <section className="section-padding bg-gray-light">
          <div className="container-custom max-w-3xl">
            <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
            <div className="space-y-3">
              {faqs.map((faq, idx) => (
                <div key={faq._id} className="card-premium overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="flex w-full items-center justify-between p-5 text-left"
                  >
                    <span className="font-semibold text-charcoal">{faq.question}</span>
                    <ChevronDownIcon className={`h-5 w-5 text-gold transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                  </button>
                  {openFaq === idx && (
                    <div className="border-t border-gray-100 px-5 pb-5 pt-3 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection title="Ready to Book?" primaryText="Check Availability" />
    </>
  );
};

export default Contact;
