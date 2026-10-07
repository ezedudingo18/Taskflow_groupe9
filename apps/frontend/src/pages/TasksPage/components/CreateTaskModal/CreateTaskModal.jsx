import { useState } from 'react';
import { useTasksStore } from '../../../../stores/tasks.store';

export function CreateTaskModal({ dialogRef }) {
  const addTask = useTasksStore((state) => state.addTask);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');

  const handleClose = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    dialogRef.current?.close();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await addTask({
      title: title.trim(),
      status: 'todo',
      description: description.trim() || undefined,
      deadline: deadline || null,
    });

    handleClose();
  };

  return (
    <dialog ref={dialogRef}>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>Nouvelle tâche</legend>
          <p>
            <label htmlFor="task-title">Titre (1 à 120 caractères) *</label>
            <input
              id="task-title"
              type="text"
              required
              maxLength={120}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="task-desc">Description (facultative)</label>
            <textarea
              id="task-desc"
              maxLength={1000}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </p>
          <p>
            <label htmlFor="task-date">Date d'échéance (facultative)</label>
            <input
              id="task-date"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </p>
          <footer>
            <button type="submit">Ajouter la tâche</button>
            <button type="button" onClick={handleClose}>
              Annuler
            </button>
          </footer>
        </fieldset>
      </form>
    </dialog>
  );
}
