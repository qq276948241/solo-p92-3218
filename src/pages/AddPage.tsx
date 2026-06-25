import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Check, Coffee as CoffeeIcon, Pencil } from 'lucide-react';
import StarRating from '@/components/StarRating';
import TagChip from '@/components/TagChip';
import ImageUploader from '@/components/ImageUploader';
import { useCoffeeNotes } from '@/context/CoffeeNoteContext';
import { BEAN_TYPES, type BeanType } from '@/types';

const AddPage: React.FC = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const { addNote, updateNote, getNoteById, getShopInfoById } =
    useCoffeeNotes();

  const editId = params.get('editId');
  const shopId = params.get('shopId');
  const isEdit = Boolean(editId);

  const [prefillLabel, setPrefillLabel] = useState('');

  const [shopName, setShopName] = useState('');
  const [city, setCity] = useState('');
  const [beanType, setBeanType] = useState<BeanType>('手冲');
  const [rating, setRating] = useState<number>(4);
  const [feelings, setFeelings] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editId) {
      const note = getNoteById(editId);
      if (note) {
        setShopName(note.shopName);
        setCity(note.city);
        setBeanType(note.beanType);
        setRating(note.rating);
        setFeelings(note.feelings);
        setImage(note.image);
        setPrefillLabel(note.shopName);
      }
      return;
    }
    if (shopId) {
      const info = getShopInfoById(shopId);
      if (info) {
        setShopName(info.shopName);
        setCity(info.city);
        setPrefillLabel(`${info.shopName} · ${info.city}`);
      }
    }
  }, [editId, shopId, getNoteById, getShopInfoById]);

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!shopName.trim()) next.shopName = '店名不能空';
    if (!city.trim()) next.city = '城市不能空';
    if (rating < 1) next.rating = '至少打 1 颗星';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { shopName, city, beanType, rating, feelings, image };

    if (isEdit && editId) {
      const updated = updateNote(editId, payload);
      navigate(updated ? `/note/${updated.id}` : '/', { replace: true });
    } else {
      const saved = addNote(payload);
      navigate(`/note/${saved.id}`, { replace: true });
    }
  };

  const title = isEdit
    ? '修改这一杯 ✏️'
    : prefillLabel
      ? '再记一杯 ☕️'
      : '记下这一杯 ☕️';

  const subtitle = isEdit
    ? '改好之后保存，创建时间不变'
    : '花两分钟，把今天的味道保存下来吧';

  const badge = isEdit ? (
    <div className="flex items-center gap-2 text-sm text-ink-soft bg-brown/5 border border-brown/10 rounded-full px-3 py-1.5">
      <Pencil size={14} className="text-brown" />
      <span>
        编辑模式：<span className="font-medium text-ink">{prefillLabel}</span>
      </span>
    </div>
  ) : prefillLabel ? (
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

      <form onSubmit={handleSubmit} className="paper-card p-6 sm:p-8 space-y-6">
        <Field label="店名" error={errors.shopName} required>
          <input
            type="text"
            className="input-field"
            placeholder="比如：蓝瓶子咖啡"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            maxLength={50}
          />
        </Field>

        <Field label="城市" error={errors.city} required>
          <input
            type="text"
            className="input-field"
            placeholder="比如：上海"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            maxLength={30}
          />
        </Field>

        <Field label="豆种 / 制作方式">
          <div className="flex flex-wrap gap-2">
            {BEAN_TYPES.map((t) => (
              <TagChip
                key={t}
                label={t}
                size="md"
                selected={beanType === t}
                onClick={() => setBeanType(t)}
              />
            ))}
          </div>
        </Field>

        <Field label="打分" error={errors.rating} required>
          <div className="flex items-center gap-4">
            <StarRating
              value={rating}
              size="lg"
              onChange={(v) => setRating(v)}
            />
            <span className="text-sm text-ink-soft">
              {rating === 0 ? '（点击星星打分）' : `${rating} 星`}
            </span>
          </div>
        </Field>

        <Field label="感受（随便写几句～）">
          <textarea
            className="input-field min-h-[140px] resize-y"
            placeholder="香气？口感？尾韵？店的氛围？"
            value={feelings}
            onChange={(e) => setFeelings(e.target.value)}
            maxLength={1000}
          />
          <div className="mt-1 text-right text-xs text-ink/40">
            {feelings.length}/1000
          </div>
        </Field>

        <Field label="图片（可选）">
          <ImageUploader value={image} onChange={setImage} />
        </Field>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-brown/10">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-ghost w-full sm:w-auto"
          >
            取消
          </button>
          <button type="submit" className="btn-primary w-full sm:w-auto">
            {isEdit ? <Pencil size={18} /> : <CoffeeIcon size={18} />}
            <span>{isEdit ? '保存修改' : '保存这一杯'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

interface FieldProps {
  label: string;
  children: React.ReactNode;
  error?: string;
  required?: boolean;
}

const Field: React.FC<FieldProps> = ({
  label,
  children,
  error,
  required = false,
}) => (
  <div className="space-y-2">
    <label className="flex items-center gap-1 text-sm font-medium text-ink">
      <span>{label}</span>
      {required && <span className="text-brown">*</span>}
    </label>
    {children}
    {error && <div className="text-sm text-red-600">{error}</div>}
  </div>
);

export default AddPage;
