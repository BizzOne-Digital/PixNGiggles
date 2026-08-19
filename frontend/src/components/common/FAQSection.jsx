import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import SectionHeading from './SectionHeading';
import LoadingSpinner from './LoadingSpinner';
import { faqsAPI } from '../../services/api';

const FAQSection = ({ limit, bg = 'gray', title = 'Frequently Asked Questions' }) => {
  const [faqs, setFaqs] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    faqsAPI.getAll()
      .then(({ data }) => setFaqs(limit ? data.data.slice(0, limit) : data.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading) return <LoadingSpinner className="py-16" />;
  if (faqs.length === 0) return null;

  return (
    <section className={`section-padding ${bg === 'white' ? 'bg-white' : 'bg-gray-light'}`}>
      <div className="container-custom max-w-3xl">
        <SectionHeading eyebrow="FAQ" title={title} />
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={faq._id} className="card-premium overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="flex w-full items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-charcoal">{faq.question}</span>
                <ChevronDownIcon
                  className={`h-5 w-5 shrink-0 text-gold transition-transform ${openFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {openFaq === idx && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-3 text-sm leading-relaxed text-gray-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
