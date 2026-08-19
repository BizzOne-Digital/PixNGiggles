const PageHero = ({ eyebrow, title, scriptSuffix, subtitle, dark = true }) => (
  <section className={`${dark ? 'bg-black' : 'bg-white'} py-16 text-center !pt-28 sm:py-20`}>
    <div className="container-custom">
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">{eyebrow}</p>
      )}
      <h1 className={`mt-2 text-3xl font-extrabold sm:text-4xl ${dark ? 'text-white' : 'text-charcoal'}`}>
        {title}
        {scriptSuffix && (
          <>
            {' '}
            <span className="font-script text-4xl text-gold sm:text-5xl">{scriptSuffix}</span>
          </>
        )}
      </h1>
      {subtitle && (
        <p className={`mx-auto mt-4 max-w-2xl text-sm sm:text-base ${dark ? 'text-white/75' : 'text-gray-600'}`}>
          {subtitle}
        </p>
      )}
    </div>
  </section>
);

export default PageHero;
