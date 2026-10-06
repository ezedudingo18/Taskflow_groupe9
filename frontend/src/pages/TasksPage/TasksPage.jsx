import { useEffect, useRef } from 'react';
import { useAuthStore } from '../../stores/auth.store';
import { useTasksStore } from '../../stores/tasks.store';
import { TaskList } from './components/TaskList/TaskList';
import { CreateTaskModal } from './components/CreateTaskModal/CreateTaskModal';
import { Header } from '../../components/Header/Header';

export function TasksPage() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    const { tasks, isLoading, error, fetchTasks } = useTasksStore();
    const dialogRef = useRef(null);

    useEffect(() => {
        fetchTasks();
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

                {error && <p role="alert">{error}</p>}
                {isLoading ? <p>Chargement des tâches…</p> : <TaskList tasks={tasks} />}
            </section>
        </main>
    );
}