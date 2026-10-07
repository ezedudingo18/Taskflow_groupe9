import { useState } from 'react';
import { authApi } from '../../../../api/auth';
import { usersApi } from '../../../../api/users';
import { useAuthStore } from '../../../../stores/auth.store';
import { AuthForm } from '../AuthForm/AuthForm';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const setAuth = useAuthStore((state) => state.setAuth);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const { token } = await authApi.login(email, password);
            const user = await usersApi.me(token);
            setAuth(user, token);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthForm
            title="Bienvenue"
            intro="Retrouvez vos tâches et avancez sereinement."
            error={error}
            loading={loading}
            submitLabel="Se connecter"
            loadingLabel="Connexion…"
            onSubmit={handleSubmit}
        >
                <p>
                    <label htmlFor="login-email">Adresse e-mail</label>
                    <input
                        id="login-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </p>

                <p>
                    <label htmlFor="login-password">Mot de passe</label>
                    <input
                        id="login-password"
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>

        </AuthForm>
    );
}