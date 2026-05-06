import styles from './TodoPage.module.css';
import { useTodos } from '@/hooks/useTodos';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import FilterBar from '@/components/FilterBar';
import TodoStats from '@/components/TodoStats';

export default function TodoPage() {
  const todoState = useTodos();

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles.logoWrap}>
            <span className={styles.logoIcon}>✓</span>
          </div>
          <h1 className={styles.title}>My Todos</h1>
          <p className={styles.subtitle}>Stay organized, get things done.</p>
        </header>

        <main className={styles.main}>
          <AddTodoForm onAdd={todoState.addTodo} />

          {todoState.todos.length > 0 && (
            <>
              <FilterBar
                filter={todoState.filter}
                setFilter={todoState.setFilter}
                activeCount={todoState.activeCount}
                completedCount={todoState.completedCount}
                totalCount={todoState.todos.length}
              />
              <TodoList
                filteredTodos={todoState.filteredTodos}
                editingId={todoState.editingId}
                setEditingId={todoState.setEditingId}
                onToggle={todoState.toggleTodo}
                onDelete={todoState.deleteTodo}
                onEdit={todoState.editTodo}
                onToggleAll={todoState.toggleAll}
                allCompleted={todoState.activeCount === 0 && todoState.todos.length > 0}
              />
              <TodoStats
                activeCount={todoState.activeCount}
                completedCount={todoState.completedCount}
                onClearCompleted={todoState.clearCompleted}
              />
            </>
          )}

          {todoState.todos.length === 0 && (
            <div className={styles.empty}>
              <span className={styles.emptyIcon}>📋</span>
              <p className={styles.emptyText}>No todos yet. Add one above!</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
