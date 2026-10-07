import { useState } from 'react';
import { authApi } from '../../../../api/auth';
import { usersApi } from '../../../../api/users';
import { useAuthStore } from '../../../../stores/auth.store';

export function Register() {
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
            await authApi.register(email, password);
            const { token } = await authApi.login(email, password);
            const { user } = await usersApi.me(token);
            setAuth(user, token);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Inscription</legend>

                {error && <p role="alert">{error}</p>}

                <p>
                    <label htmlFor="register-email">Adresse e-mail</label>
                    <input
                        id="register-email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </p>

                <p>
                    <label htmlFor="register-password">Mot de passe (8 caractères min.)</label>
                    <input
                        id="register-password"
                        type="password"
                        required
                        minLength={8}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </p>

                <button type="submit" disabled={loading}>
                    {loading ? 'Création…' : "S'inscrire"}
                </button>
            </fieldset>
        </form>
    );
}