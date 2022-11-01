import styles from './ErrorText.module.scss';

export interface ErrorTextProps {
	text: string;
}

export const ErrorText = ({ text }: ErrorTextProps) => (
	<span className={styles.Error}>{text}</span>
);
