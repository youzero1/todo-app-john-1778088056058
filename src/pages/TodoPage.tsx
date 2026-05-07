import { useRef, useEffect, useState } from 'react';
import { CheckSquare, Keyboard } from 'lucide-react';
import styles from './TodoPage.module.css';
import AddTodoForm from '@/components/AddTodoForm';
import FilterBar from '@/components/FilterBar';
import TodoList from '@/components/TodoList';
import TodoStats from '@/components/TodoStats';
import KeyboardShortcutsHelp from '@/components/KeyboardShortcutsHelp';
import { useTodos } from '@/hooks/useTodos';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

export default function TodoPage() {
  const {
    filteredTodos,
    filter,
    setFilter,
    editingId,
    setEditingId,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo,
    clearCompleted,
    toggleAll,
    activeCount,
    completedCount,
    todos,
  } = useTodos();

  const inputRef = useRef<HTMLInputElement>(null);
  const [showHelp, setShowHelp] = useState(false);

  const allCompleted = todos.length > 0 && todos.every((t) => t.completed);

  useKeyboardShortcuts({
    onFocusInput: () => inputRef.current?.focus(),
    onSetFilter: setFilter,
    onToggleAll: toggleAll,
    onClearCompleted: clearCompleted,
    isEditing: editingId !== null,
  });

  useEffect(() => {
    const handler = () => setShowHelp((v) => !v);
    document.addEventListener('todo:toggle-help', handler);
    return () => document.removeEventListener('todo:toggle-help', handler);
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoWrap}>
            <CheckSquare className={styles.logoIcon} />
          </div>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organized, stay productive</p>
          <button className={styles.helpBtn} onClick={() => setShowHelp((v) => !v)}>
            <Keyboard size={14} />
            Keyboard Shortcuts
          </button>
        </header>

        <main className={styles.main}>
          <AddTodoForm onAdd={addTodo} inputRef={inputRef as React.RefObject<HTMLInputElement>} />

          {todos.length === 0 ? (
            <div className={styles.empty}>
              <p className={styles.emptyText}>No todos yet. Add one above!</p>
            </div>
          ) : (
            <>
              <FilterBar
                filter={filter}
                setFilter={setFilter}
                activeCount={activeCount}
                completedCount={completedCount}
                totalCount={todos.length}
              />
              <TodoList
                filteredTodos={filteredTodos}
                editingId={editingId}
                setEditingId={setEditingId}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                onToggleAll={toggleAll}
                allCompleted={allCompleted}
              />
              <TodoStats
                activeCount={activeCount}
                completedCount={completedCount}
                onClearCompleted={clearCompleted}
              />
            </>
          )}
        </main>
      </div>

      {showHelp && <KeyboardShortcutsHelp onClose={() => setShowHelp(false)} />}
    </div>
  );
}
