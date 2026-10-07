import { useState } from 'react';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Header } from '../../components/Header/Header';

export function AuthPage() {
    const [mode, setMode] = useState('login');

    return (
        <main>
            <Header />

            <nav>
                <button
                    type="button"
                    aria-pressed={mode === 'login'}
                    onClick={() => setMode('login')}
                >
                    Se connecter
                </button>
                <button
                    type="button"
                    aria-pressed={mode === 'register'}
                    onClick={() => setMode('register')}
                >
                    S'inscrire
                </button>
            </nav>

            <section>
                {mode === 'login' ? <Login /> : <Register />}
            </section>
        </main>
    );
}