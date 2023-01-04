import styles from './FormErrorText.module.scss';

export interface FormErrorTextProps {
	text: string;
}

export const FormErrorText = ({ text }: FormErrorTextProps) => (
	<span className={styles.Error}>{text}</span>
);
