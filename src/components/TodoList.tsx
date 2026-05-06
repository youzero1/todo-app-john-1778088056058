import styles from './TodoList.module.css';
import TodoItem from '@/components/TodoItem';
import { Todo } from '@/types';
import { CheckCheck } from 'lucide-react';
import clsx from 'clsx';

type TodoListProps = {
  filteredTodos: Todo[];
  editingId: string | null;
  setEditingId: (id: string | null) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
  onToggleAll: () => void;
  allCompleted: boolean;
};

export default function TodoList({
  filteredTodos,
  editingId,
  setEditingId,
  onToggle,
  onDelete,
  onEdit,
  onToggleAll,
  allCompleted,
}: TodoListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <button
          className={clsx(styles.toggleAll, allCompleted && styles.toggleAllActive)}
          onClick={onToggleAll}
          title="Toggle all"
        >
          <CheckCheck size={16} />
          <span>Mark all {allCompleted ? 'active' : 'complete'}</span>
        </button>
      </div>

      {filteredTodos.length === 0 ? (
        <div className={styles.empty}>
          <p>No todos in this filter.</p>
        </div>
      ) : (
        <ul className={styles.list}>
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              isEditing={editingId === todo.id}
              onEdit={onEdit}
              onToggle={onToggle}
              onDelete={onDelete}
              onStartEdit={() => setEditingId(todo.id)}
              onCancelEdit={() => setEditingId(null)}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
