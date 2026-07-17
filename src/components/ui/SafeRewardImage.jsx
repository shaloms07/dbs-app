import { useState } from 'react';
import PropTypes from 'prop-types';

const CATEGORY_EMOJIS = {
  travel: '🚗',
  food: '🍔',
  grocery: '🛒',
  electronics: '💻',
  entertainment: '🎟️',
  gifting: '🎁',
  fashion: '👟',
  jewellery: '💎',
};

const CATEGORY_GRADIENTS = {
  travel: 'from-blue-500 to-indigo-600',
  food: 'from-amber-500 to-orange-600',
  grocery: 'from-emerald-500 to-teal-600',
  electronics: 'from-purple-500 to-pink-600',
  entertainment: 'from-rose-500 to-red-600',
  gifting: 'from-pink-500 to-purple-600',
  fashion: 'from-cyan-500 to-blue-600',
  jewellery: 'from-yellow-500 to-amber-600',
};

export default function SafeRewardImage({
  src,
  alt,
  brand,
  category,
  className,
  containerClassName,
}) {
  const [error, setError] = useState(false);

  const cleanCategory = (category || 'gifting').toLowerCase();
  const emoji = CATEGORY_EMOJIS[cleanCategory] || '🎁';
  const gradient = CATEGORY_GRADIENTS[cleanCategory] || 'from-neutral-500 to-neutral-700';

  if (error || !src) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-gradient-to-tr ${gradient} text-white p-4 select-none ${containerClassName}`}
      >
        <span className="text-4xl filter drop-shadow-md">{emoji}</span>
        {brand && (
          <span className="mt-2 text-center text-sm font-extrabold tracking-wider uppercase opacity-90 truncate max-w-full px-1">
            {brand}
          </span>
        )}
      </div>
    );
  }

  return (
    <img src={src} alt={alt} className={className} onError={() => setError(true)} loading="lazy" />
  );
}

SafeRewardImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  brand: PropTypes.string,
  category: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
};

SafeRewardImage.defaultProps = {
  src: '',
  alt: 'Reward image',
  brand: '',
  category: 'gifting',
  className: '',
  containerClassName: 'w-full h-40 rounded-[20px]',
};
