import clsx from 'clsx';
import styles from './FilterBar.module.css';
import { FilterType } from '@/types';

type FilterBarProps = {
  filter: FilterType;
  setFilter: (f: FilterType) => void;
  activeCount: number;
  completedCount: number;
  totalCount: number;
};

const FILTERS: { label: string; value: FilterType }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export default function FilterBar({
  filter,
  setFilter,
  activeCount,
  completedCount,
  totalCount,
}: FilterBarProps) {
  const counts: Record<FilterType, number> = {
    all: totalCount,
    active: activeCount,
    completed: completedCount,
  };

  return (
    <div className={styles.bar}>
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={clsx(styles.btn, filter === f.value && styles.active)}
          onClick={() => setFilter(f.value)}
        >
          {f.label}
          <span className={clsx(styles.badge, filter === f.value && styles.badgeActive)}>
            {counts[f.value]}
          </span>
        </button>
      ))}
    </div>
  );
}
