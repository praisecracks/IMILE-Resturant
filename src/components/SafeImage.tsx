import { useState } from 'react';

interface SafeImageProps {
  src: string;
  fallback?: string;
  alt?: string;
  className?: string;
  referrerPolicy?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export function SafeImage({ src, fallback, alt = '', className = '', referrerPolicy = 'no-referrer', ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallback) {
      setHasError(true);
      setCurrentSrc(fallback);
    }
  };

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={handleError}
      className={className}
      referrerPolicy={referrerPolicy}
      {...props}
    />
  );
}

const FALLBACK_IMAGES = {
  hero: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"%3E%3Crect fill="%230A0705" width="100%25" height="100%25"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="24" fill="%23D98C45" text-anchor="middle" dominant-baseline="middle"%3EÌMÍLÈ%3C/text%3E%3C/svg%3E',
  menu: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%231C140E" width="100%25" height="100%25"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="16" fill="%23D98C45" text-anchor="middle" dominant-baseline="middle"%3E%F0%9F%8D%8C%3C/text%3E%3C/svg%3E',
  experience: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="500"%3E%3Crect fill="%23150E0A" width="100%25" height="100%25"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="16" fill="%23D98C45" text-anchor="middle" dominant-baseline="middle"%3F%3C/text%3E%3C/svg%3E',
  gallery: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400"%3E%3Crect fill="%23000000" width="100%25" height="100%25"/%3E%3Ctext x="50%25" y="50%25" font-family="sans-serif" font-size="16" fill="%23D98C45" text-anchor="middle" dominant-baseline="middle"%3E%F0%9F%8E%AE%3C/text%3E%3C/svg%3E',
};

export { FALLBACK_IMAGES };