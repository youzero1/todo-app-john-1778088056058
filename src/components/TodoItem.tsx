import { useState, useEffect, useRef } from 'react';
import { Trash2, Pencil, Check, X } from 'lucide-react';
import clsx from 'clsx';
import styles from './TodoItem.module.css';
import { Todo } from '@/types';

type TodoItemProps = {
  todo: Todo;
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
};

export default function TodoItem({
  todo,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onStartEdit,
  onCancelEdit,
}: TodoItemProps) {
  const [editValue, setEditValue] = useState(todo.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  function handleEditSubmit() {
    onEdit(todo.id, editValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') handleEditSubmit();
    if (e.key === 'Escape') {
      setEditValue(todo.text);
      onCancelEdit();
    }
  }

  return (
    <li className={clsx(styles.item, todo.completed && styles.completed, isEditing && styles.editing)}>
      {isEditing ? (
        <div className={styles.editRow}>
          <input
            ref={inputRef}
            className={styles.editInput}
            value={editValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className={clsx(styles.iconBtn, styles.confirmBtn)} onClick={handleEditSubmit} title="Save">
            <Check size={16} />
          </button>
          <button
            className={clsx(styles.iconBtn, styles.cancelBtn)}
            onClick={() => {
              setEditValue(todo.text);
              onCancelEdit();
            }}
            title="Cancel"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className={styles.row}>
          <button
            className={clsx(styles.checkbox, todo.completed && styles.checkboxChecked)}
            onClick={() => onToggle(todo.id)}
            aria-label={todo.completed ? 'Mark incomplete' : 'Mark complete'}
          >
            {todo.completed && <Check size={13} strokeWidth={3} />}
          </button>
          <span className={clsx(styles.text, todo.completed && styles.textCompleted)}>{todo.text}</span>
          <div className={styles.actions}>
            <button
              className={clsx(styles.iconBtn, styles.editBtn)}
              onClick={onStartEdit}
              title="Edit"
            >
              <Pencil size={15} />
            </button>
            <button
              className={clsx(styles.iconBtn, styles.deleteBtn)}
              onClick={() => onDelete(todo.id)}
              title="Delete"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </div>
      )}
    </li>
  );
}
