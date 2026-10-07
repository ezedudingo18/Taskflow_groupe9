import { TaskItem } from '../TaskItem/TaskItem';

export function TaskList({ tasks }) {
    if (tasks.length === 0) {
        return <p>Aucune tâche pour le moment.</p>;
    }

    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task._id} task={task} />
            ))}
        </ul>
    );
}