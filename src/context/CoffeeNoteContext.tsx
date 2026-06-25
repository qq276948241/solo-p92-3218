import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import type { BeanType, CoffeeNote, ShopInfo } from '@/types';
import { loadNotes, saveNotes, generateId } from '@/utils/storage';
import { SAMPLE_NOTES } from '@/utils/sampleData';

interface NewNoteInput {
  shopName: string;
  city: string;
  beanType: BeanType;
  rating: number;
  feelings: string;
  image?: string;
}

interface CoffeeNoteContextValue {
  notes: CoffeeNote[];
  addNote: (input: NewNoteInput) => CoffeeNote;
  updateNote: (id: string, input: NewNoteInput) => CoffeeNote | undefined;
  getNoteById: (id: string) => CoffeeNote | undefined;
  getShopInfoById: (id: string) => ShopInfo | undefined;
}

const CoffeeNoteContext = createContext<CoffeeNoteContextValue | undefined>(
  undefined,
);

export const CoffeeNoteProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notes, setNotes] = useState<CoffeeNote[]>(() => {
    const existing = loadNotes();
    if (existing.length > 0) return existing;
    saveNotes(SAMPLE_NOTES);
    return SAMPLE_NOTES;
  });

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const addNote = useCallback((input: NewNoteInput): CoffeeNote => {
    const newNote: CoffeeNote = {
      id: generateId(),
      shopName: input.shopName.trim(),
      city: input.city.trim(),
      beanType: input.beanType,
      rating: Math.max(1, Math.min(5, Math.round(input.rating))),
      feelings: input.feelings.trim(),
      image: input.image,
      createdAt: new Date().toISOString(),
    };
    setNotes((prev) => [newNote, ...prev]);
    return newNote;
  }, []);

  const updateNote = useCallback(
    (id: string, input: NewNoteInput): CoffeeNote | undefined => {
      let updated: CoffeeNote | undefined;
      setNotes((prev) => {
        const idx = prev.findIndex((n) => n.id === id);
        if (idx === -1) return prev;
        updated = {
          ...prev[idx],
          shopName: input.shopName.trim(),
          city: input.city.trim(),
          beanType: input.beanType,
          rating: Math.max(1, Math.min(5, Math.round(input.rating))),
          feelings: input.feelings.trim(),
          image: input.image,
        };
        const next = [...prev];
        next[idx] = updated;
        return next;
      });
      return updated;
    },
    [],
  );

  const getNoteById = useCallback(
    (id: string): CoffeeNote | undefined => {
      return notes.find((n) => n.id === id);
    },
    [notes],
  );

  const getShopInfoById = useCallback(
    (id: string): ShopInfo | undefined => {
      const note = notes.find((n) => n.id === id);
      if (!note) return undefined;
      return { shopName: note.shopName, city: note.city };
    },
    [notes],
  );

  const value = useMemo<CoffeeNoteContextValue>(
    () => ({ notes, addNote, updateNote, getNoteById, getShopInfoById }),
    [notes, addNote, updateNote, getNoteById, getShopInfoById],
  );

  return (
    <CoffeeNoteContext.Provider value={value}>
      {children}
    </CoffeeNoteContext.Provider>
  );
};

export function useCoffeeNotes(): CoffeeNoteContextValue {
  const ctx = useContext(CoffeeNoteContext);
  if (!ctx) {
    throw new Error('useCoffeeNotes 必须在 CoffeeNoteProvider 内部使用');
  }
  return ctx;
}
