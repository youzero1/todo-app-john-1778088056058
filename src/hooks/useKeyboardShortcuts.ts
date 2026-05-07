import { useEffect, useCallback } from 'react';
import { FilterType } from '@/types';

type UseKeyboardShortcutsOptions = {
  onFocusInput: () => void;
  onSetFilter: (f: FilterType) => void;
  onToggleAll: () => void;
  onClearCompleted: () => void;
  isEditing: boolean;
};

export function useKeyboardShortcuts({
  onFocusInput,
  onSetFilter,
  onToggleAll,
  onClearCompleted,
  isEditing,
}: UseKeyboardShortcutsOptions) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Don't fire shortcuts when user is typing in any input/textarea
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      if (isEditing) return;

      switch (e.key) {
        case 'n':
        case 'N':
          e.preventDefault();
          onFocusInput();
          break;
        case '1':
          e.preventDefault();
          onSetFilter('all');
          break;
        case '2':
          e.preventDefault();
          onSetFilter('active');
          break;
        case '3':
          e.preventDefault();
          onSetFilter('completed');
          break;
        case 't':
        case 'T':
          e.preventDefault();
          onToggleAll();
          break;
        case 'c':
        case 'C':
          e.preventDefault();
          onClearCompleted();
          break;
        case '?':
          e.preventDefault();
          // Handled by the page component via a toggle
          document.dispatchEvent(new CustomEvent('todo:toggle-help'));
          break;
        default:
          break;
      }
    },
    [onFocusInput, onSetFilter, onToggleAll, onClearCompleted, isEditing]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
}
