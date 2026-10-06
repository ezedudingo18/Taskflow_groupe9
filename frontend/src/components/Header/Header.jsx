import { useAuthStore } from '../../stores/auth.store';

export function Header() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);

    return (
        <header>
            <h1>TaskFlow</h1>
            <p>Connecté en tant que : <strong>{user?.email}</strong></p>
            <nav>
                <button type="button" onClick={logout}>
                    Se déconnecter
                </button>
            </nav>
        </header>
    );
}