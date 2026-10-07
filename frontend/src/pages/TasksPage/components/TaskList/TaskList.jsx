import { TaskItem } from '../TaskItem/TaskItem';
import styles from '../../TasksPage.module.css';

export function TaskList({ tasks }) {
    if (tasks.length === 0) {
        return <p className={styles.empty}>Aucune tâche pour le moment.</p>;
    }

    return (
        <ul className={styles.list}>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
}