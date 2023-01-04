import { FormErrorText } from '../FormErrorText';

import styles from './FormTextContent.module.scss';

export interface FormTextContentProps {
	variant?: 'success';
	errorText?: string;
	textContent: string;
}

export const FormTextContent = ({
	variant,
	errorText,
	textContent,
}: FormTextContentProps) => {
	return (
		<>
			<span className={styles.TextContent} data-variant={variant}>
				{textContent}
			</span>
			{errorText !== undefined && <FormErrorText text={errorText} />}
		</>
	);
};
