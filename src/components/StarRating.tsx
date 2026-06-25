import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  value: number;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readOnly?: boolean;
}

const sizeMap = {
  sm: { wrapper: 'gap-1', icon: 14 },
  md: { wrapper: 'gap-1.5', icon: 20 },
  lg: { wrapper: 'gap-2', icon: 32 },
};

const StarRating: React.FC<StarRatingProps> = ({
  value,
  onChange,
  size = 'md',
  readOnly = false,
}) => {
  const [hover, setHover] = React.useState<number>(0);
  const { wrapper, icon } = sizeMap[size];
  const display = readOnly ? value : hover || value;

  const handleClick = (i: number) => {
    if (readOnly || !onChange) return;
    onChange(value === i ? i - 1 : i);
  };

  return (
    <div
      className={`inline-flex items-center ${wrapper} ${
        !readOnly ? 'cursor-pointer select-none' : ''
      }`}
      onMouseLeave={() => !readOnly && setHover(0)}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={`评分 ${value} 星`}
    >
      {[1, 2, 3, 4, 5].map((i) => {
        const filled = i <= display;
        return (
          <Star
            key={i}
            size={icon}
            strokeWidth={filled ? 0 : 1.75}
            className={
              filled
                ? 'text-brown transition-colors duration-150 drop-shadow-[0_1px_0_rgba(111,78,55,0.12)]'
                : 'text-brown/25 transition-colors duration-150'
            }
            fill={filled ? 'currentColor' : 'none'}
            onMouseEnter={() => !readOnly && setHover(i)}
            onClick={() => handleClick(i)}
            role={readOnly ? undefined : 'radio'}
            aria-checked={!readOnly ? value === i : undefined}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
