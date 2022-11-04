import { ErrorText, ErrorTextProps } from '../ErrorText/ErrorText';

import styles from './TextContent.module.scss';

export interface TextContentProps {
	variant?: 'success';
	errorText?: ErrorTextProps['text'];
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
