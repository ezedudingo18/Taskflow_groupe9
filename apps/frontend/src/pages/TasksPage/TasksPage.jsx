import { useEffect, useMemo, useRef, useState } from 'react';
import { useTasksStore } from '../../stores/tasks.store';
import { TaskList } from './components/TaskList/TaskList';
import { TaskFilters } from './components/TaskFilters/TaskFilters';
import { CreateTaskModal } from './components/CreateTaskModal/CreateTaskModal';
import { Header } from '../../components/Header/Header';

export function TasksPage() {
  const { tasks, isLoading, error, fetchTasks } = useTasksStore();
  const dialogRef = useRef(null);
  const [status, setStatus] = useState('all');
  const [deadline, setDeadline] = useState('all');

  const filteredTasks = useMemo(() => {
    const now = new Date();
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

    return tasks.filter((task) => {
      if (status !== 'all' && task.status !== status) return false;
      if (deadline === 'all') return true;
      if (!task.deadline) return false;
      const day = task.deadline.slice(0, 10);
      return deadline === 'past' ? day < today : day >= today;
    });
  }, [tasks, status, deadline]);

  useEffect(() => {
    const controller = new AbortController();
    fetchTasks(controller.signal);

    return () => controller.abort();
  }, [fetchTasks]);

  return (
    <main>
      <Header />

      <section>
        <button type="button" onClick={() => dialogRef.current?.showModal()}>
          + Nouvelle tâche
        </button>

        <CreateTaskModal dialogRef={dialogRef} />
      </section>

      <section>
        <h2>Mes tâches</h2>

        <TaskFilters
          status={status}
          onStatusChange={setStatus}
          deadline={deadline}
          onDeadlineChange={setDeadline}
        />

        {error && <p role="alert">{error}</p>}
        {isLoading ? (
          <p>Chargement des tâches…</p>
        ) : (
          <TaskList
            tasks={filteredTasks}
            emptyMessage={tasks.length ? 'Aucune tâche ne correspond au filtre.' : undefined}
          />
        )}
      </section>
    </main>
  );
}
