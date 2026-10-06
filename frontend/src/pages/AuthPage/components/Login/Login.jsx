import { useState } from 'react';
import { authApi } from '../../../../api/auth';
import { useAuthStore } from '../../../../stores/auth.store';

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
            const data = await authApi.login(email, password);
            setAuth(data.user, data.token);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <legend>Connexion</legend>

                {error && <p role="alert">{error}</p>}

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

                <button type="submit" disabled={loading}>
                    {loading ? 'Connexion…' : 'Se connecter'}
                </button>
            </fieldset>
        </form>
    );
}