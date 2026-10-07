import styles from './Button.module.css';

export function Button({ children, variant = 'default', className = '', ...props }) {
    const classes = [styles.button, styles[variant], className].filter(Boolean).join(' ');

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    );
}
