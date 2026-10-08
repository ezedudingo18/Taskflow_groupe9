import { TaskItem } from '../TaskItem/TaskItem';

export function TaskList({ tasks, emptyMessage = 'Aucune tâche pour le moment.' }) {
  if (tasks.length === 0) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <ul>
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
}
