import SEO from '../components/common/SEO';
import SectionHeading, { CTASection } from '../components/common/SectionHeading';

const About = () => (
  <>
    <SEO title="About Us" description="Learn about PixNGiggles, the premier photo booth provider serving Dallas–Fort Worth and surrounding areas." />
    <section className="section-padding !pt-28 bg-white">
      <div className="container-custom">
        <SectionHeading
          eyebrow="About PixNGiggles"
          title="Turning Moments Into"
          scriptSuffix="Memories"
          subtitle="A premier photo booth provider dedicated to creating unforgettable experiences across the Dallas–Fort Worth metroplex."
        />
        <div className="mx-auto max-w-3xl space-y-5 text-sm leading-relaxed text-gray-600 sm:text-base">
          <p>
            PixNGiggles is a premier photo booth provider serving the Dallas–Fort Worth area. We specialize in creating unforgettable experiences that capture the joy and laughter of life&apos;s most special moments.
          </p>
          <p>
            From elegant weddings and intimate rehearsal dinners to dynamic corporate conferences and milestone birthday celebrations, our professional photo booth setups engage guests, encourage interaction, and create high-quality digital and printed keepsakes that last a lifetime.
          </p>
          <p>
            At PixNGiggles, we believe every celebration deserves to be remembered. Our team combines professional service with cutting-edge photo booth technology to deliver an experience your guests will love and you&apos;ll cherish forever.
          </p>
        </div>
      </div>
    </section>
    <CTASection title="Let's Make Your Event Unforgettable!" subtitle="Contact us today to discuss your photo booth needs." />
  </>
);

export default About;
