import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SectionHeading from './SectionHeading';
import { WHATS_INCLUDED } from '../../utils/pageContent';

const WhatsIncluded = ({ bg = 'gray' }) => (
  <section className={`section-padding ${bg === 'white' ? 'bg-white' : 'bg-gray-light'}`}>
    <div className="container-custom">
      <SectionHeading
        eyebrow="Packages"
        title="What's"
        scriptSuffix="Included"
        subtitle="Every PixNGiggles package is designed to deliver a complete, premium photo booth experience."
      />
      <div className="mx-auto grid max-w-3xl gap-3 sm:grid-cols-2">
        {WHATS_INCLUDED.map((item) => (
          <div key={item} className="flex items-start gap-3 rounded-lg bg-white p-4 shadow-sm">
            <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
            <span className="text-sm font-medium text-charcoal">{item}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatsIncluded;
