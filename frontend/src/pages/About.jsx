import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import SEO from '../components/common/SEO';
import PageHero from '../components/common/PageHero';
import ProcessSteps from '../components/common/ProcessSteps';
import WhyChooseUs from '../components/common/WhyChooseUs';
import TestimonialsSection from '../components/common/TestimonialsSection';
import ServiceAreaSection from '../components/common/ServiceAreaSection';
import { CTASection } from '../components/common/SectionHeading';
import SectionHeading from '../components/common/SectionHeading';
import { VALUES, TEAM } from '../utils/pageContent';

const About = () => (
  <>
    <SEO
      title="About Us"
      description="Learn about PixNGiggles, the premier photo booth provider serving Dallas–Fort Worth and surrounding areas."
    />
    <PageHero
      eyebrow="About PixNGiggles"
      title="Turning Moments Into"
      scriptSuffix="Memories"
      subtitle="A premier photo booth provider dedicated to creating unforgettable experiences across the Dallas–Fort Worth metroplex."
    />
    {/* Our Story */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Story"
          title="Built on Passion for"
          scriptSuffix="Celebration"
          subtitle="What started as a love for capturing joy has grown into DFW's trusted photo booth partner."
        />
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
          <div className="space-y-5 text-sm leading-relaxed text-gray-600 sm:text-base">
            <p>
              PixNGiggles is a premier photo booth provider serving the Dallas–Fort Worth area. We specialize in creating unforgettable experiences that capture the joy and laughter of life&apos;s most special moments.
            </p>
            <p>
              From elegant weddings and intimate rehearsal dinners to dynamic corporate conferences and milestone birthday celebrations, our professional photo booth setups engage guests, encourage interaction, and create high-quality digital and printed keepsakes.
            </p>
          </div>
          <div className="space-y-5 text-sm leading-relaxed text-gray-600 sm:text-base">
            <p>
              At PixNGiggles, we believe every celebration deserves to be remembered. Our team combines professional service with cutting-edge photo booth technology to deliver an experience your guests will love and you&apos;ll cherish forever.
            </p>
            <p>
              We invest in premium Cloee and Mirror X equipment, train every attendant thoroughly, and treat every event — from intimate gatherings to grand galas — with the same level of care and attention.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* Mission & Vision */}
    <section className="section-padding bg-gray-light">
      <div className="container-custom grid gap-8 md:grid-cols-2">
        <div className="card-premium p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Our Mission</p>
          <h3 className="mt-3 text-xl font-extrabold text-charcoal">Elevate Every Celebration</h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            To deliver premium photo booth experiences that bring people together, spark joy, and create lasting memories through exceptional service and innovative technology.
          </p>
        </div>
        <div className="card-premium p-8">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-gold">Our Vision</p>
          <h3 className="mt-3 text-xl font-extrabold text-charcoal">DFW&apos;s Photo Booth Standard</h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-600">
            To be the most trusted and sought-after photo booth company in North Texas — known for reliability, creativity, and an unmatched guest experience at every event.
          </p>
        </div>
      </div>
    </section>

    {/* Values */}
    <section className="section-padding bg-white">
      <div className="container-custom">
        <SectionHeading eyebrow="Our Values" title="What Drives Us" subtitle="The principles behind every event we serve." />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="card-premium p-6 text-center">
              <div className="mx-auto mb-4 h-1 w-10 bg-gold" />
              <h3 className="font-bold text-charcoal">{v.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{v.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Team */}
    <section className="section-padding bg-gray-light">
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Team"
          title="The People Behind"
          scriptSuffix="The Magic"
          subtitle="A dedicated team of event professionals, creatives, and client success specialists."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {TEAM.map((member) => (
            <div key={member.name} className="card-premium p-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/15">
                <CheckCircleIcon className="h-7 w-7 text-gold" />
              </div>
              <h3 className="mt-4 font-bold text-charcoal">{member.name}</h3>
              <p className="text-xs font-semibold uppercase tracking-wide text-gold">{member.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">{member.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    <ProcessSteps bg="white" />
    <WhyChooseUs bg="gray" />
    <TestimonialsSection limit={3} bg="white" />
    <ServiceAreaSection bg="black" />

  {/* Experience CTA */}
    <section className="section-padding bg-white">
      <div className="container-custom text-center">
        <SectionHeading
          title="Ready to Experience"
          scriptSuffix="PixNGiggles?"
          subtitle="Explore our services, compare booths, or reach out to start planning your event."
        />
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/services" className="btn-primary">Our Services</Link>
          <Link to="/booths" className="btn-outline-dark">View Booths</Link>
          <Link to="/contact" className="btn-primary-dark">Contact Us</Link>
        </div>
      </div>
    </section>

    <CTASection title="Let's Make Your Event Unforgettable!" subtitle="Contact us today to discuss your photo booth needs." />
  </>
);

export default About;
