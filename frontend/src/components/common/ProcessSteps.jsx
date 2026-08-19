import SectionHeading from './SectionHeading';
import { PROCESS_STEPS } from '../../utils/pageContent';

const ProcessSteps = ({ bg = 'white' }) => (
  <section className={`section-padding ${bg === 'gray' ? 'bg-gray-light' : 'bg-white'}`}>
    <div className="container-custom">
      <SectionHeading
        eyebrow="How It Works"
        title="Your Event in"
        scriptSuffix="Four Easy Steps"
        subtitle="From first inquiry to final photo delivery, we make photo booth rental simple and stress-free."
      />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESS_STEPS.map((item) => (
          <div key={item.step} className="card-premium p-6">
            <span className="text-2xl font-extrabold text-gold">{item.step}</span>
            <h3 className="mt-3 text-base font-bold text-charcoal">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ProcessSteps;
