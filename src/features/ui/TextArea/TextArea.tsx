import styles from './TextArea.module.scss';

interface TextAreaProps {
	label?: string;
	description?: string;
	placeholder?: string;
	isDisabled?: boolean;
	onChange: (event: any) => void;
}

export const TextArea = ({
	label,
	description,
	placeholder,
	isDisabled,
	onChange,
}: TextAreaProps) => {
	return (
		<>
			<div className={styles.TextAreaContainer}>
				{label && <label className={styles.TextAreaLabel}>{label}</label>}
				<textarea
					className={styles.TextArea}
					onChange={onChange}
					inputMode={'text'}
					placeholder={placeholder}
					value={description}
					disabled={isDisabled}
				/>
			</div>
		</>
	);
};
