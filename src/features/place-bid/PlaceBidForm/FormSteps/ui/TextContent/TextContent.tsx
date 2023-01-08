import { ErrorText } from '../ErrorText/ErrorText';

import styles from './TextContent.module.scss';

export interface TextContentProps {
	variant?: 'success' | 'warning';
	errorText?: string;
	textContent: string;
}

export const TextContent = ({
	variant,
	errorText,
	textContent,
}: TextContentProps) => {
	return (
		<>
			<span className={styles.TextContent} data-variant={variant}>
				{textContent}
			</span>
			{errorText !== undefined && <ErrorText text={errorText} />}
		</>
	);
};
