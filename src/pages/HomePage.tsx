import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Sparkles } from 'lucide-react';
import TagFilterBar from '@/components/TagFilterBar';
import CoffeeCard from '@/components/CoffeeCard';
import { useCoffeeNotes } from '@/context/CoffeeNoteContext';
import type { FilterTag } from '@/types';

const HomePage: React.FC = () => {
  const { notes } = useCoffeeNotes();
  const [filter, setFilter] = useState<FilterTag>('全部');

  const filteredNotes = useMemo(() => {
    const sorted = [...notes].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
    if (filter === '全部') return sorted;
    return sorted.filter((n) => n.beanType === filter);
  }, [notes, filter]);

  return (
    <div className="space-y-8">
      <section className="pt-2 pb-2">
        <div className="flex items-center gap-3 text-brown">
          <Sparkles size={20} />
          <span className="text-sm font-medium tracking-wider">
            你的咖啡记忆 · 共 {notes.length} 条记录
          </span>
        </div>
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl font-bold text-ink leading-tight text-shadow-soft">
          今天，喝了一杯<br className="sm:hidden" />
          <span className="text-brown">什么好咖啡？</span>
        </h1>
      </section>

      <section>
        <TagFilterBar value={filter} onChange={setFilter} />
      </section>

      <section>
        {filteredNotes.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, idx) => (
              <div
                key={note.id}
                style={{
                  animation: `fadeUp 0.5s ease ${idx * 60}ms both`,
                }}
              >
                <CoffeeCard note={note} />
              </div>
            ))}
          </div>
        )}
      </section>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

const EmptyState: React.FC = () => (
  <div className="paper-card py-16 px-6 text-center">
    <div className="mx-auto w-16 h-16 rounded-2xl bg-brown/8 text-brown flex items-center justify-center">
      <Coffee size={28} />
    </div>
    <h3 className="mt-5 font-serif text-2xl font-semibold text-ink">
      还没有笔记哦
    </h3>
    <p className="mt-2 text-ink-soft text-sm">
      快去记录下一杯让你心动的咖啡吧
    </p>
    <Link to="/add" className="btn-primary mt-6 text-sm">
      写下第一条笔记
    </Link>
  </div>
);

export default HomePage;
