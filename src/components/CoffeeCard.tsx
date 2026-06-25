import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import StarRating from './StarRating';
import TagChip from './TagChip';
import type { CoffeeNote } from '@/types';

interface CoffeeCardProps {
  note: CoffeeNote;
}

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(
      d.getDate(),
    ).padStart(2, '0')}`;
  } catch {
    return '';
  }
};

const CoffeeCard: React.FC<CoffeeCardProps> = ({ note }) => {
  return (
    <Link
      to={`/note/${note.id}`}
      className="paper-card group hover:shadow-paper-hover hover:-translate-y-1 block overflow-hidden"
    >
      {note.image ? (
        <div className="w-full h-44 overflow-hidden bg-milk-100">
          <img
            src={note.image}
            alt={note.shopName}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="w-full h-44 bg-gradient-to-br from-brown/10 via-milk-100 to-brown/5 flex items-center justify-center">
          <div className="text-brown/50 font-serif text-5xl select-none tracking-wider">
            咖
          </div>
        </div>
      )}
      <div className="p-5 space-y-3.5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-xl font-semibold text-ink leading-tight line-clamp-1 group-hover:text-brown transition-colors">
            {note.shopName}
          </h3>
          <StarRating value={note.rating} size="sm" readOnly />
        </div>

        <div className="flex items-center gap-4 text-sm text-ink-soft">
          <div className="flex items-center gap-1 min-w-0">
            <MapPin size={14} className="shrink-0" />
            <span className="truncate">{note.city}</span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Calendar size={14} />
            <span>{formatDate(note.createdAt)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-1">
          <TagChip label={note.beanType} size="sm" />
          {note.feelings && (
            <p className="text-sm text-ink/70 line-clamp-1 flex-1 ml-3 min-w-0">
              {note.feelings}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CoffeeCard;
