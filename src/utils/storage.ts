import type { CoffeeNote } from '@/types';

const STORAGE_KEY = 'cup-diary-notes';

export function loadNotes(): CoffeeNote[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as CoffeeNote[];
  } catch {
    return [];
  }
}

export function saveNotes(notes: CoffeeNote[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    console.error('保存笔记失败：', e);
  }
}

export function generateId(): string {
  return (
    Date.now().toString(36) +
    Math.random().toString(36).slice(2, 8)
  );
}
