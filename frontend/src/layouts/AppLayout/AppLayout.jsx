import { Header } from '../../components/Header/Header';
import styles from './AppLayout.module.css';

export function AppLayout({ children, className = '' }) {
    return (
        <main className={`${styles.layout} ${className}`}>
            <Header />
            {children}
        </main>
    );
}
