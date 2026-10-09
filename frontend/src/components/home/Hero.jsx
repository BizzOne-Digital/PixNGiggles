import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import {
  CameraIcon,
  DevicePhoneMobileIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';

const Hero = () => {
  const { settings } = useSettings();
  const hero = settings.hero || {};

  const features = [
    { icon: CameraIcon, label: 'Digital Sharing & Optional Prints' },
    { icon: DevicePhoneMobileIcon, label: 'SMS & QR Code Sharing' },
    { icon: PhotoIcon, label: 'Custom Overlays & Backdrops' },
  ];

  return (
    <section className="relative flex h-screen min-h-[600px] flex-col overflow-hidden bg-black">
      <picture className="absolute inset-0 block">
        <source media="(max-width: 639px)" srcSet="/images/hero-mobile.png" />
        <img
          src="/images/hero.png"
          alt="PixNGiggles photo booth at a Dallas event"
          className="h-full w-full object-cover object-center"
          fetchPriority="high"
          decoding="async"
        />
      </picture>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent sm:hidden" />

      {/* Hero text — left aligned, vertically centered in main area */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="container-custom w-full px-4 sm:px-6 lg:px-8 pt-20 lg:pt-24">
          <div className="max-w-lg text-left animate-fade-in-up">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">
              Dallas–Fort Worth&apos;s Premier
            </p>
            <h1 className="mt-3 text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl lg:text-6xl">
              Photo Booth
              <br />
              <span className="font-script text-5xl normal-case text-gold sm:text-6xl lg:text-7xl">
                Experience
              </span>
            </h1>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
              {hero.description ||
                'Premium photo booth experiences for weddings, parties, graduations, and corporate events across the DFW metroplex.'}
            </p>
            <div className="mt-8 flex flex-wrap justify-start gap-4">
              <Link to="/booking" className="btn-primary">
                Get Instant Quote
              </Link>
              <Link to="/services" className="btn-outline">
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom feature bar — bg image continues behind */}
      <div className="relative z-10 shrink-0 border-t border-white/15 bg-black/40 backdrop-blur-[2px]">
        <div className="container-custom px-4 py-5 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-3 text-white">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide sm:text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
