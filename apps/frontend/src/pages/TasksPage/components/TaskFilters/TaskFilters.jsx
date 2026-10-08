export function TaskFilters({ status, onStatusChange, deadline, onDeadlineChange }) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <p>
        <label htmlFor="task-filter-status">Statut</label>
        <select
          id="task-filter-status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="all">Toutes</option>
          <option value="todo">À faire</option>
          <option value="done">Terminées</option>
        </select>
      </p>
      <p>
        <label htmlFor="task-filter-deadline">Échéance</label>
        <select
          id="task-filter-deadline"
          value={deadline}
          onChange={(e) => onDeadlineChange(e.target.value)}
        >
          <option value="all">Toutes</option>
          <option value="past">Passées</option>
          <option value="upcoming">À venir</option>
        </select>
      </p>
    </form>
  );
}
