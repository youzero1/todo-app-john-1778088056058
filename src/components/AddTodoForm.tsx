import { useState } from 'react';
import { Plus } from 'lucide-react';
import styles from './AddTodoForm.module.css';

type AddTodoFormProps = {
  onAdd: (text: string) => void;
};

export default function AddTodoForm({ onAdd }: AddTodoFormProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (value.trim()) {
      onAdd(value);
      setValue('');
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="text"
        placeholder="What needs to be done?"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        autoFocus
      />
      <button className={styles.button} type="submit" aria-label="Add todo">
        <Plus size={20} strokeWidth={2.5} />
        <span>Add</span>
      </button>
    </form>
  );
}
