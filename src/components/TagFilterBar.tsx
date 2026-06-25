import React from 'react';
import TagChip from './TagChip';
import type { FilterTag } from '@/types';
import { ALL_FILTER_TAGS } from '@/types';

interface TagFilterBarProps {
  value: FilterTag;
  onChange: (tag: FilterTag) => void;
}

const TagFilterBar: React.FC<TagFilterBarProps> = ({ value, onChange }) => {
  return (
    <div className="w-full">
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-thin pb-2 -mx-1 px-1">
        {ALL_FILTER_TAGS.map((tag) => (
          <TagChip
            key={tag}
            label={tag}
            size="md"
            selected={value === tag}
            onClick={() => onChange(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default TagFilterBar;
