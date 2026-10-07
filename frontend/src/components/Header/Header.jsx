import { useAuthStore } from '../../stores/auth.store';
import { useTasksStore } from '../../stores/tasks.store';
import { Button } from '../ui/Button/Button';
import styles from './Header.module.css';

export function Header() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const clearTasks = useTasksStore((state) => state.clearTasks);

    const handleLogout = () => {
        clearTasks();
        logout();
    };

    return (
        <header className={styles.header}>
            <h1>TaskFlow</h1>
            <p className={styles.account}>
                {user ? (
                    <>Connecté en tant que : <strong>{user.email}</strong></>
                ) : (
                    <span>Gestion simple des tâches</span>
                )}
            </p>
            <nav aria-label="Navigation principale">
                {user && (
                    <Button type="button" onClick={handleLogout}>
                        Se déconnecter
                    </Button>
                )}
            </nav>
        </header>
    );
}