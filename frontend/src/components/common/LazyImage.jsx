import { useState } from 'react';
import { getImageUrl } from '../../utils/helpers';

const LazyImage = ({ src, alt, className = '', width = 800, ...props }) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const imageUrl = typeof src === 'object' ? getImageUrl(src, width) : src;

  if (!imageUrl || error) {
    return (
      <div className={`skeleton ${className}`} />
    );
  }

  return (
    <img
      src={imageUrl}
      alt={alt || ''}
      className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'} ${className}`}
      onLoad={() => setLoaded(true)}
      onError={() => setError(true)}
      loading="lazy"
      {...props}
    />
  );
};

export default LazyImage;
