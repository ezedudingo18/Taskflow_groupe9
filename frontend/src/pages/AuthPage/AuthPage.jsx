import { useState } from 'react';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { AppLayout } from '../../layouts/AppLayout/AppLayout';
import styles from './AuthPage.module.css';

export function AuthPage() {
    const [mode, setMode] = useState('login');

    return (
        <AppLayout className={styles.page}>
            <nav className={styles.tabs} aria-label="Accès au compte">
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

            <section className={styles.panel}>
                {mode === 'login' ? <Login /> : <Register />}
            </section>
        </AppLayout>
    );
}