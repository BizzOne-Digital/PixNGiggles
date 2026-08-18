import { Link } from 'react-router-dom';
import { PhoneIcon, EnvelopeIcon, GlobeAltIcon } from '@heroicons/react/24/solid';
import { FOOTER_NAV_LINKS } from '../../utils/constants';
import { useSettings } from '../../context/SettingsContext';
import Logo from '../common/Logo';

const Footer = () => {
  const { settings } = useSettings();
  const social = settings.socialLinks || {};

  return (
    <footer className="bg-black text-white">
      <div className="container-custom section-padding !py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-white/70">
              {settings.footer?.description ||
                'Creating unforgettable photo booth experiences across Dallas–Fort Worth and surrounding areas.'}
            </p>
            <div className="mt-5 flex gap-3">
              {social.facebook && (
                <a
                  href={social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold hover:bg-gold hover:text-black transition-colors"
                >
                  f
                </a>
              )}
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold hover:bg-gold hover:text-black transition-colors"
                >
                  ig
                </a>
              )}
              {social.tiktok && (
                <a
                  href={social.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-xs font-bold hover:bg-gold hover:text-black transition-colors"
                >
                  tk
                </a>
              )}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-sm text-white/70 hover:text-gold transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold">Contact Us</h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-gold shrink-0" />
                <a href={`tel:${settings.phone}`} className="hover:text-gold">{settings.phone}</a>
              </li>
              <li className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-gold shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-gold">{settings.email}</a>
              </li>
              <li className="flex items-center gap-2">
                <GlobeAltIcon className="h-4 w-4 text-gold shrink-0" />
                <span>{settings.website}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-gold">Service Area</h4>
            <p className="text-sm text-white/70">{settings.serviceArea}</p>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/50">
            &copy; {new Date().getFullYear()} {settings.businessName}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
