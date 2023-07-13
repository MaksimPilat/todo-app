import { PropsWithChildren } from 'react';
import styles from './GradientButton.module.css';

export const GradientButton: React.FC<PropsWithChildren> = ({ children }: React.PropsWithChildren) => {
    return (
        <button className={styles.root}>
            <span>{children}</span>
        </button>
    )
}
