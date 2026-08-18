import { Link } from 'react-router-dom';

const SectionHeading = ({ eyebrow, title, subtitle, centered = true, dark = false, scriptSuffix }) => (
  <div className={`mb-10 ${centered ? 'text-center' : ''}`}>
    {eyebrow && (
      <span className="mb-2 inline-block text-sm font-bold uppercase tracking-[0.2em] text-gold">
        {eyebrow}
      </span>
    )}
    <h2 className={`text-2xl font-extrabold sm:text-3xl ${dark ? 'text-white' : 'text-charcoal'}`}>
      {title}
      {scriptSuffix && (
        <>
          {' '}
          <span className="font-script text-3xl text-gold sm:text-4xl">{scriptSuffix}</span>
        </>
      )}
    </h2>
    {subtitle && (
      <p className={`mt-4 text-sm sm:text-base ${dark ? 'text-white/75' : 'text-gray-600'} ${centered ? 'mx-auto max-w-2xl' : 'max-w-2xl'}`}>
        {subtitle}
      </p>
    )}
  </div>
);

export default SectionHeading;

export const CTASection = ({ title, subtitle, primaryText = 'Check Availability', primaryLink = '/booking' }) => (
  <section className="bg-gold">
    <div className="container-custom flex flex-col items-center justify-between gap-6 px-4 py-8 sm:flex-row sm:px-6 lg:px-8">
      <div className="text-black text-center sm:text-left">
        <h2 className="text-xl font-extrabold sm:text-2xl">{title}</h2>
        {subtitle && <p className="mt-1 text-sm font-medium">{subtitle}</p>}
      </div>
      <Link to={primaryLink} className="btn-primary-dark shrink-0">{primaryText}</Link>
    </div>
  </section>
);
