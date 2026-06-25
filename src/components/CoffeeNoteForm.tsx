import React, { useEffect, useState } from 'react';
import { Pencil, Coffee as CoffeeIcon } from 'lucide-react';
import StarRating from './StarRating';
import TagChip from './TagChip';
import ImageUploader from './ImageUploader';
import { BEAN_TYPES, type BeanType, type CoffeeNoteInput } from '@/types';

interface CoffeeNoteFormProps {
  initialData?: Partial<CoffeeNoteInput>;
  mode?: 'create' | 'edit';
  onSubmit: (data: CoffeeNoteInput) => void;
  onCancel: () => void;
}

interface FieldErrors {
  shopName?: string;
  city?: string;
  rating?: string;
}

const CoffeeNoteForm: React.FC<CoffeeNoteFormProps> = ({
  initialData,
  mode = 'create',
  onSubmit,
  onCancel,
}) => {
  const [shopName, setShopName] = useState('');
  const [city, setCity] = useState('');
  const [beanType, setBeanType] = useState<BeanType>('手冲');
  const [rating, setRating] = useState<number>(4);
  const [feelings, setFeelings] = useState('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    setShopName(initialData?.shopName ?? '');
    setCity(initialData?.city ?? '');
    setBeanType(initialData?.beanType ?? '手冲');
    setRating(initialData?.rating ?? 4);
    setFeelings(initialData?.feelings ?? '');
    setImage(initialData?.image);
    setErrors({});
    setFormKey((k) => k + 1);
  }, [initialData]);

  const validate = (): boolean => {
    const next: FieldErrors = {};
    if (!shopName.trim()) next.shopName = '店名不能空';
    if (!city.trim()) next.city = '城市不能空';
    if (rating < 1) next.rating = '至少打 1 颗星';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      shopName: shopName.trim(),
      city: city.trim(),
      beanType,
      rating: Math.max(1, Math.min(5, Math.round(rating))),
      feelings: feelings.trim(),
      image,
    });
  };

  const submitLabel = mode === 'edit' ? '保存修改' : '保存这一杯';
  const SubmitIcon = mode === 'edit' ? Pencil : CoffeeIcon;

  return (
    <form
      key={formKey}
      onSubmit={handleSubmit}
      className="paper-card p-6 sm:p-8 space-y-6"
      noValidate
    >
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
        <ImageUploader
          key={`img-${formKey}`}
          value={image}
          onChange={setImage}
        />
      </Field>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-end gap-3 border-t border-brown/10">
        <button
          type="button"
          onClick={onCancel}
          className="btn-ghost w-full sm:w-auto"
        >
          取消
        </button>
        <button type="submit" className="btn-primary w-full sm:w-auto">
          <SubmitIcon size={18} />
          <span>{submitLabel}</span>
        </button>
      </div>
    </form>
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

export default CoffeeNoteForm;
