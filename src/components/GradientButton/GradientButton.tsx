import styles from './GradientButton.module.css';
import { PropsWithChildren } from 'react';

export const GradientButton: React.FC<PropsWithChildren> = ({ children }: React.PropsWithChildren) => {
    return (
        <button className={styles.root}>
            <span>{children}</span>
        </button>
    )
}
