import React, { useRef, useState } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface ImageUploaderProps {
  value?: string;
  onChange: (dataUrl: string | undefined) => void;
  maxSizeMB?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  value,
  onChange,
  maxSizeMB = 3,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string>('');

  const handleFile = (file: File) => {
    setError('');
    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件');
      return;
    }
    if (file.size > maxSizeMB * 1024 * 1024) {
      setError(`图片不能大于 ${maxSizeMB}MB`);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onChange(reader.result);
      }
    };
    reader.onerror = () => setError('图片读取失败');
    reader.readAsDataURL(file);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = '';
  };

  return (
    <div className="w-full">
      {value ? (
        <div className="relative group rounded-card overflow-hidden border border-brown/15 bg-milk-100">
          <img
            src={value}
            alt="预览"
            className="w-full h-56 object-cover"
          />
          <button
            type="button"
            onClick={() => onChange(undefined)}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/55 text-white
                       opacity-0 group-hover:opacity-100 transition-opacity
                       hover:bg-black/70 backdrop-blur-sm"
            aria-label="删除图片"
          >
            <X size={18} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full h-56 rounded-card border-2 border-dashed border-brown/25
                     bg-milk-100/60 hover:bg-milk-100 hover:border-brown/50
                     transition-all duration-200 flex flex-col items-center justify-center
                     gap-2 text-ink-soft group"
        >
          <div
            className="p-3 rounded-full bg-brown/8 text-brown
                       group-hover:bg-brown/15 transition-colors"
          >
            <ImagePlus size={26} />
          </div>
          <div className="text-sm font-medium">点击选择本地图片</div>
          <div className="text-xs text-ink/50">支持 JPG / PNG，最大 {maxSizeMB}MB</div>
        </button>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />
      {error && <div className="mt-2 text-sm text-red-600">{error}</div>}
    </div>
  );
};

export default ImageUploader;
