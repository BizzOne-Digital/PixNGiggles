import { Link } from 'react-router-dom';
import { CameraIcon } from '@heroicons/react/24/solid';

const Logo = ({ className = '', light = false }) => (
  <Link to="/" className={`inline-flex flex-col items-center ${className}`}>
    <div className="flex items-center gap-0.5">
      <CameraIcon className="h-5 w-5 text-gold -mr-1" />
      <span className={`text-2xl font-bold tracking-tight ${light ? 'text-white' : 'text-charcoal'}`}>
        <span className="text-gold">PixN</span>
        <span className={light ? 'text-white' : 'text-charcoal'}>Giggles</span>
      </span>
    </div>
  </Link>
);

export default Logo;
