import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Coffee,
  RefreshCcw,
} from 'lucide-react';
import StarRating from '@/components/StarRating';
import TagChip from '@/components/TagChip';
import { useCoffeeNotes } from '@/context/CoffeeNoteContext';

const formatDate = (iso: string): string => {
  try {
    const d = new Date(iso);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hh = String(d.getHours()).padStart(2, '0');
    const mm = String(d.getMinutes()).padStart(2, '0');
    return `${y} 年 ${m} 月 ${day} 日 · ${hh}:${mm}`;
  } catch {
    return '';
  }
};

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getNoteById } = useCoffeeNotes();

  const note = id ? getNoteById(id) : undefined;

  if (!note) {
    return <NotFoundState onBack={() => navigate('/')} />;
  }

  return (
    <article className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-ghost text-sm"
        >
          <ArrowLeft size={18} />
          <span>返回</span>
        </button>

        <Link to={`/add?shopId=${note.id}`} className="btn-primary text-sm">
          <RefreshCcw size={18} />
          <span>再记一杯</span>
        </Link>
      </div>

      {note.image ? (
        <div className="rounded-card overflow-hidden shadow-paper border border-brown/[0.08]">
          <img
            src={note.image}
            alt={note.shopName}
            className="w-full h-72 sm:h-96 object-cover"
          />
        </div>
      ) : (
        <div className="rounded-card h-56 sm:h-72 bg-gradient-to-br from-brown/10 via-milk-100 to-brown/5 border border-brown/[0.08] shadow-paper flex items-center justify-center">
          <Coffee size={64} className="text-brown/40" strokeWidth={1.5} />
        </div>
      )}

      <header className="space-y-4">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div className="space-y-2 min-w-0">
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink leading-tight text-shadow-soft">
              {note.shopName}
            </h1>
            <div className="flex items-center gap-4 text-sm text-ink-soft flex-wrap">
              <div className="flex items-center gap-1.5">
                <MapPin size={16} />
                <span>{note.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar size={16} />
                <span>{formatDate(note.createdAt)}</span>
              </div>
            </div>
          </div>
          <div className="shrink-0">
            <StarRating value={note.rating} size="lg" readOnly />
            <div className="mt-1 text-xs text-ink-soft text-right font-medium">
              {note.rating}.0
            </div>
          </div>
        </div>

        <div className="pt-2">
          <TagChip label={note.beanType} size="md" />
        </div>
      </header>

      <section className="paper-card p-6 sm:p-8 leading-relaxed">
        {note.feelings ? (
          <p className="text-ink/90 whitespace-pre-wrap text-[15px] leading-8 tracking-wide font-sans">
            {note.feelings}
          </p>
        ) : (
          <p className="text-ink/40 italic text-center py-8">
            （这次没有写下感受，下次一定～）
          </p>
        )}
      </section>

      <div className="flex items-center justify-center pt-2">
        <Link to="/" className="btn-ghost text-sm">
          ← 回到所有笔记
        </Link>
      </div>
    </article>
  );
};

const NotFoundState: React.FC<{ onBack: () => void }> = ({ onBack }) => (
  <div className="max-w-lg mx-auto paper-card py-16 px-6 text-center">
    <div className="text-6xl">☕️</div>
    <h2 className="mt-5 font-serif text-2xl font-semibold text-ink">
      找不到这条笔记
    </h2>
    <p className="mt-2 text-ink-soft text-sm">
      可能是数据被清掉了，或者链接不对～
    </p>
    <button type="button" onClick={onBack} className="btn-primary mt-6 text-sm">
      回到首页
    </button>
  </div>
);

export default DetailPage;
