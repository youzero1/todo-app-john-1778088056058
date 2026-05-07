import { X } from 'lucide-react';
import styles from './KeyboardShortcutsHelp.module.css';

type Props = {
  onClose: () => void;
};

const SHORTCUTS = [
  { keys: ['N'], description: 'Focus the new todo input' },
  { keys: ['1'], description: 'Show All todos' },
  { keys: ['2'], description: 'Show Active todos' },
  { keys: ['3'], description: 'Show Completed todos' },
  { keys: ['T'], description: 'Toggle all todos complete / incomplete' },
  { keys: ['C'], description: 'Clear completed todos' },
  { keys: ['?'], description: 'Toggle this help panel' },
  { keys: ['Enter'], description: 'Save edited todo' },
  { keys: ['Esc'], description: 'Cancel editing' },
];

export default function KeyboardShortcutsHelp({ onClose }: Props) {
  return (
    <div className={styles.overlay} onClick={onClose} role="dialog" aria-modal="true" aria-label="Keyboard shortcuts">
      <div className={styles.panel} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={styles.title}>Keyboard Shortcuts</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>
        <ul className={styles.list}>
          {SHORTCUTS.map((s) => (
            <li key={s.description} className={styles.row}>
              <span className={styles.keys}>
                {s.keys.map((k) => (
                  <kbd key={k} className={styles.kbd}>{k}</kbd>
                ))}
              </span>
              <span className={styles.desc}>{s.description}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
