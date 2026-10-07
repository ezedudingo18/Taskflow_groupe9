import { Button } from '../../../../components/ui/Button/Button';
import styles from './AuthForm.module.css';

export function AuthForm({
    title,
    intro,
    error,
    loading,
    submitLabel,
    loadingLabel,
    onSubmit,
    children,
}) {
    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <fieldset>
                <legend className={styles.title}>{title}</legend>
                <p className={styles.intro}>{intro}</p>

                {error && <p className={styles.error} role="alert">{error}</p>}

                {children}

                <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? loadingLabel : submitLabel}
                </Button>
            </fieldset>
        </form>
    );
}
