import { useEffect, useRef } from 'react';
import { useTasksStore } from '../../stores/tasks.store';
import { TaskList } from './components/TaskList/TaskList';
import { CreateTaskModal } from './components/CreateTaskModal/CreateTaskModal';
import { Button } from '../../components/ui/Button/Button';
import { AppLayout } from '../../layouts/AppLayout/AppLayout';
import styles from './TasksPage.module.css';

export function TasksPage() {
    const { tasks, isLoading, error, fetchTasks } = useTasksStore();
    const dialogRef = useRef(null);

    useEffect(() => {
        const controller = new AbortController();
        fetchTasks(controller.signal);

        return () => controller.abort();
    }, [fetchTasks]);

    return (
        <AppLayout className={styles.page}>
            <section className={styles.actions} aria-label="Actions des tâches">
                <Button variant="primary" type="button" onClick={() => dialogRef.current?.showModal()}>
                    Nouvelle tâche
                </Button>

                <CreateTaskModal dialogRef={dialogRef} />
            </section>

            <section className={styles.overview} aria-labelledby="tasks-title">
                <h2 id="tasks-title">Mes tâches</h2>

                {error && <p role="alert">{error}</p>}
                {isLoading ? <p role="status">Chargement des tâches…</p> : <TaskList tasks={tasks} />}
            </section>
        </AppLayout>
    );
}