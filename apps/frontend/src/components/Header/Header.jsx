import { useAuthStore } from '../../stores/auth.store';
import { useTasksStore } from '../../stores/tasks.store';

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const clearTasks = useTasksStore((state) => state.clearTasks);

  const handleLogout = () => {
    clearTasks();
    logout();
  };

  return (
    <header>
      <h1>TaskFlow</h1>
      <p>
        Connecté en tant que : <strong>{user?.email}</strong>
      </p>
      <nav>
        <button type="button" onClick={handleLogout}>
          Se déconnecter
        </button>
      </nav>
    </header>
  );
}
