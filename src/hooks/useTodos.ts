import { useState, useCallback } from 'react';
import { Todo, FilterType } from '@/types';

function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const stored = localStorage.getItem('todos');
      return stored ? (JSON.parse(stored) as Todo[]) : [];
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [editingId, setEditingId] = useState<string | null>(null);

  const saveTodos = useCallback((updated: Todo[]) => {
    setTodos(updated);
    localStorage.setItem('todos', JSON.stringify(updated));
  }, []);

  const addTodo = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      const newTodo: Todo = {
        id: generateId(),
        text: trimmed,
        completed: false,
        createdAt: Date.now(),
      };
      saveTodos([newTodo, ...todos]);
    },
    [todos, saveTodos]
  );

  const toggleTodo = useCallback(
    (id: string) => {
      saveTodos(todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
    },
    [todos, saveTodos]
  );

  const deleteTodo = useCallback(
    (id: string) => {
      saveTodos(todos.filter((t) => t.id !== id));
    },
    [todos, saveTodos]
  );

  const editTodo = useCallback(
    (id: string, text: string) => {
      const trimmed = text.trim();
      if (!trimmed) {
        deleteTodo(id);
        return;
      }
      saveTodos(todos.map((t) => (t.id === id ? { ...t, text: trimmed } : t)));
      setEditingId(null);
    },
    [todos, saveTodos, deleteTodo]
  );

  const clearCompleted = useCallback(() => {
    saveTodos(todos.filter((t) => !t.completed));
  }, [todos, saveTodos]);

  const toggleAll = useCallback(() => {
    const allCompleted = todos.every((t) => t.completed);
    saveTodos(todos.map((t) => ({ ...t, completed: !allCompleted })));
  }, [todos, saveTodos]);

  const filteredTodos = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.filter((t) => t.completed).length;

  return {
    todos,
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
  };
}
