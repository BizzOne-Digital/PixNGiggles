import { MapPinIcon } from '@heroicons/react/24/outline';
import SectionHeading from './SectionHeading';
import { SERVICE_AREAS } from '../../utils/pageContent';
import { useSettings } from '../../context/SettingsContext';

const ServiceAreaSection = ({ bg = 'black' }) => {
  const { settings } = useSettings();

  return (
    <section className={`section-padding ${bg === 'white' ? 'bg-white' : 'bg-black'}`}>
      <div className="container-custom">
        <SectionHeading
          eyebrow="Service Area"
          title="Proudly Serving"
          scriptSuffix="DFW"
          subtitle={settings.serviceArea || 'Dallas–Fort Worth and surrounding communities.'}
          dark={bg !== 'white'}
        />
        <div className="flex flex-wrap justify-center gap-3">
          {SERVICE_AREAS.map((city) => (
            <span
              key={city}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide ${
                bg === 'white'
                  ? 'bg-gray-light text-charcoal'
                  : 'border border-gold/30 bg-gold/10 text-white'
              }`}
            >
              <MapPinIcon className="h-3.5 w-3.5 text-gold" />
              {city}
            </span>
          ))}
        </div>
        <p className={`mt-8 text-center text-sm ${bg === 'white' ? 'text-gray-600' : 'text-white/70'}`}>
          Don&apos;t see your city? Contact us — we often serve venues throughout North Texas.
        </p>
      </div>
    </section>
  );
};

export default ServiceAreaSection;
