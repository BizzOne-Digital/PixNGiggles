import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { getImageUrl } from '../../utils/helpers';

const SIZES = {
  sm: 'h-8',
  md: 'h-10',
  lg: 'h-12',
};

const Logo = ({ className = '', size = 'md', linkTo = '/' }) => {
  const { settings } = useSettings();
  const uploadedLogo = settings.logo?.secureUrl || settings.logo?.url;
  const src = uploadedLogo ? getImageUrl(settings.logo, 600) : '/images/logo.png';

  const image = (
    <img
      src={src}
      alt={`${settings.businessName || 'PixNGiggles'} logo`}
      className={`${SIZES[size]} w-auto max-w-[220px] object-contain`}
    />
  );

  if (!linkTo) {
    return <span className={`inline-flex items-center ${className}`}>{image}</span>;
  }

  return (
    <Link to={linkTo} className={`inline-flex items-center ${className}`}>
      {image}
    </Link>
  );
};

export default Logo;
