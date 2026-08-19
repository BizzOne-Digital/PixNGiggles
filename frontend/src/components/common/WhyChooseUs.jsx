import SectionHeading from './SectionHeading';
import { WHY_CHOOSE_US } from '../../utils/pageContent';

const WhyChooseUs = ({ bg = 'gray' }) => (
  <section className={`section-padding ${bg === 'white' ? 'bg-white' : 'bg-gray-light'}`}>
    <div className="container-custom">
      <SectionHeading
        eyebrow="Why PixNGiggles"
        title="The Premier Choice for"
        scriptSuffix="DFW Events"
        subtitle="We combine premium technology, professional service, and creative customization to elevate every celebration."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {WHY_CHOOSE_US.map((item) => (
          <div key={item.title} className="card-premium p-6">
            <div className="mb-4 h-1 w-10 bg-gold" />
            <h3 className="text-base font-bold text-charcoal">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
