import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, Pencil } from 'lucide-react';
import CoffeeNoteForm from '@/components/CoffeeNoteForm';
import { useCoffeeNotes } from '@/context/CoffeeNoteContext';
import type { CoffeeNoteInput } from '@/types';

const AddPage: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { addNote, updateNote, getNoteById, getShopInfoById } =
    useCoffeeNotes();

  const editId = params.get('editId');
  const shopId = params.get('shopId');
  const mode = editId ? 'edit' : 'create';

  const [prefillLabel, setPrefillLabel] = useState('');

  const initialData = useMemo<CoffeeNoteInput | undefined>(() => {
    if (editId) {
      const note = getNoteById(editId);
      if (note) {
        return {
          shopName: note.shopName,
          city: note.city,
          beanType: note.beanType,
          rating: note.rating,
          feelings: note.feelings,
          image: note.image,
        };
      }
      return undefined;
    }
    if (shopId) {
      const info = getShopInfoById(shopId);
      if (info) {
        return {
          shopName: info.shopName,
          city: info.city,
          beanType: '手冲',
          rating: 4,
          feelings: '',
        };
      }
    }
    return undefined;
  }, [editId, shopId, getNoteById, getShopInfoById]);

  useEffect(() => {
    if (editId) {
      const note = getNoteById(editId);
      if (note) setPrefillLabel(note.shopName);
      return;
    }
    if (shopId) {
      const info = getShopInfoById(shopId);
      if (info) setPrefillLabel(`${info.shopName} · ${info.city}`);
    }
  }, [editId, shopId, getNoteById, getShopInfoById]);

  const handleSubmit = (data: CoffeeNoteInput) => {
    if (mode === 'edit' && editId) {
      const updated = updateNote(editId, data);
      navigate(updated ? `/note/${updated.id}` : '/', { replace: true });
    } else {
      const saved = addNote(data);
      navigate(`/note/${saved.id}`, { replace: true });
    }
  };

  const title =
    mode === 'edit'
      ? '修改这一杯 ✏️'
      : prefillLabel
        ? '再记一杯 ☕️'
        : '记下这一杯 ☕️';

  const subtitle =
    mode === 'edit'
      ? '改好之后保存，创建时间不变'
      : '花两分钟，把今天的味道保存下来吧';

  const badge =
    mode === 'edit' && prefillLabel ? (
      <div className="flex items-center gap-2 text-sm text-ink-soft bg-brown/5 border border-brown/10 rounded-full px-3 py-1.5">
        <Pencil size={14} className="text-brown" />
        <span>
          编辑模式：<span className="font-medium text-ink">{prefillLabel}</span>
        </span>
      </div>
    ) : prefillLabel && mode === 'create' ? (
      <div className="flex items-center gap-2 text-sm text-ink-soft bg-brown/5 border border-brown/10 rounded-full px-3 py-1.5">
        <Check size={14} className="text-brown" />
        <span>
          快速记录：
          <span className="font-medium text-ink">{prefillLabel}</span>
        </span>
      </div>
    ) : null;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="btn-ghost text-sm"
        >
          <ArrowLeft size={18} />
          <span>返回</span>
        </button>
        {badge}
      </div>

      <div className="text-center sm:text-left">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-ink text-shadow-soft">
          {title}
        </h1>
        <p className="mt-2 text-sm text-ink-soft">{subtitle}</p>
      </div>

      <CoffeeNoteForm
        key={`${mode}-${editId ?? shopId ?? 'new'}`}
        mode={mode}
        initialData={initialData}
        onSubmit={handleSubmit}
        onCancel={() => navigate(-1)}
      />
    </div>
  );
};

export default AddPage;
