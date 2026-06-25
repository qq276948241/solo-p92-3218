import React from 'react';

interface TagChipProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

const TagChip: React.FC<TagChipProps> = ({
  label,
  selected = false,
  onClick,
  size = 'md',
}) => {
  const sizeClass =
    size === 'sm'
      ? 'text-xs px-2.5 py-1'
      : 'text-sm px-4 py-1.5';

  const base =
    'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200';
  const state = selected
    ? 'bg-brown text-milk shadow-sm'
    : 'bg-white/80 text-brown border border-brown/15 hover:border-brown/35 hover:bg-white';
  const cursor = onClick ? 'cursor-pointer' : 'cursor-default';

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className={`${base} ${state} ${sizeClass} ${cursor} disabled:cursor-default`}
    >
      {label}
    </button>
  );
};

export default TagChip;
