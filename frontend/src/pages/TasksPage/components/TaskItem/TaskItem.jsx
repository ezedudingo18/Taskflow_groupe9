import { useState } from 'react';
import { useTasksStore } from '../../../../stores/tasks.store';
import { Button } from '../../../../components/ui/Button/Button';
import styles from './TaskItem.module.css';

export function TaskItem({ task }) {
    const { updateTask, deleteTask } = useTasksStore();
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description || '');
    const [deadline, setDeadline] = useState(task.deadline || '');

    const isDone = task.status === 'done';

    const handleToggleDone = async (e) => {
        await updateTask(task.id, {
            status: e.target.checked ? 'done' : 'todo',
        });
    };

    const handleSaveEdit = async (e) => {
        e.preventDefault();
        await updateTask(task.id, {
            title: title.trim(),
            description: description.trim() || undefined,
            deadline: deadline || null,
        });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await deleteTask(task.id);
    };

    return (
        <li className={`${styles.item} ${isDone ? styles.done : ''}`}>
            <article>
                <header className={styles.header}>
                    <p className={styles.title}>
                        <input
                            type="checkbox"
                            id={`task-check-${task.id}`}
                            checked={isDone}
                            onChange={handleToggleDone}
                        />
                        <label htmlFor={`task-check-${task.id}`}>
                            <strong>{task.title}</strong>
                        </label>
                    </p>
                </header>

                {task.deadline && (
                    <p className={styles.meta}>
                        Échéance : <time dateTime={task.deadline}>{task.deadline}</time>
                    </p>
                )}

                {task.description && (
                    <details className={styles.details}>
                        <summary>Voir la description</summary>
                        <p>{task.description}</p>
                    </details>
                )}

                <footer className={styles.actions}>
                    <Button type="button" onClick={() => setIsEditing(!isEditing)}>
                        {isEditing ? 'Annuler' : 'Éditer'}
                    </Button>
                    <Button variant="danger" type="button" onClick={handleDelete}>
                        Supprimer
                    </Button>
                </footer>

                {isEditing && (
                    <form className={styles.edit} onSubmit={handleSaveEdit}>
                        <fieldset>
                            <legend>Modifier la tâche</legend>
                            <p>
                                <label htmlFor={`edit-title-${task.id}`}>Titre</label>
                                <input
                                    id={`edit-title-${task.id}`}
                                    type="text"
                                    required
                                    maxLength={120}
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </p>
                            <p>
                                <label htmlFor={`edit-desc-${task.id}`}>Description</label>
                                <textarea
                                    id={`edit-desc-${task.id}`}
                                    maxLength={1000}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </p>
                            <p>
                                <label htmlFor={`edit-date-${task.id}`}>Date d'échéance</label>
                                <input
                                    id={`edit-date-${task.id}`}
                                    type="date"
                                    value={deadline}
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </p>
                            <Button variant="primary" type="submit">Enregistrer les modifications</Button>
                        </fieldset>
                    </form>
                )}
            </article>
        </li>
    );
}