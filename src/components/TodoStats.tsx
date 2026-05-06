import styles from './TodoStats.module.css';

type TodoStatsProps = {
  activeCount: number;
  completedCount: number;
  onClearCompleted: () => void;
};

export default function TodoStats({ activeCount, completedCount, onClearCompleted }: TodoStatsProps) {
  return (
    <div className={styles.stats}>
      <span className={styles.count}>
        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
      </span>
      {completedCount > 0 && (
        <button className={styles.clear} onClick={onClearCompleted}>
          Clear completed ({completedCount})
        </button>
      )}
    </div>
  );
}
