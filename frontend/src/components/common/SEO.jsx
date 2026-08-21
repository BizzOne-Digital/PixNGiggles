import { useEffect } from 'react';

const SEO = ({ title, description, image, url }) => {
  const siteTitle = title ? `${title} | PixNGiggles` : 'PixNGiggles | Premium Photo Booth Rentals in DFW';
  const siteDescription = description || 'PixNGiggles offers premium photo booth rentals for weddings, corporate events, and celebrations in Dallas–Fort Worth, Texas.';
  const siteImage = image || 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=85&auto=format&fit=crop';
  const siteUrl = url || 'https://pixngiggles.com';

  useEffect(() => {
    document.title = siteTitle;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', siteDescription);
    setMeta('og:title', siteTitle, true);
    setMeta('og:description', siteDescription, true);
    setMeta('og:image', siteImage, true);
    setMeta('og:url', siteUrl, true);
    setMeta('og:type', 'website', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', siteTitle);
    setMeta('twitter:description', siteDescription);
    setMeta('twitter:image', siteImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', siteUrl);
  }, [siteTitle, siteDescription, siteImage, siteUrl]);

  return null;
};

export default SEO;
