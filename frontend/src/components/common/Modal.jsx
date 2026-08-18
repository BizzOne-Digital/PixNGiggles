import { useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const Modal = ({ isOpen, onClose, title, children, size = 'md', light = true }) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-6xl',
  };

  const panelClass = light
    ? 'bg-white border-gray-200 text-charcoal'
    : 'bg-charcoal-light border-white/10 text-white';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} rounded-lg border shadow-2xl ${panelClass}`}>
        <div className={`flex items-center justify-between border-b px-6 py-4 ${light ? 'border-gray-200' : 'border-white/10'}`}>
          <h3 className="text-lg font-bold">{title}</h3>
          <button onClick={onClose} className={`rounded-lg p-1 ${light ? 'text-gray-500 hover:bg-gray-100' : 'text-white/60 hover:bg-white/10'}`}>
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
