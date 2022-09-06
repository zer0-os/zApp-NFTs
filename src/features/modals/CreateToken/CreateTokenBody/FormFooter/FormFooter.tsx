//- React Imports
import React, { FC } from 'react';

//- Style Imports
import styles from './FormFooter.module.scss';

//- Component Imports
import { Button } from '@zero-tech/zui/src/components/Button';

interface FormFooterProps {
	action?: string;
	onSubmit: () => void;
	onCancel: () => void;
}

export const FormFooter: FC<FormFooterProps> = ({
	action = 'Next',
	onSubmit,
	onCancel,
}) => (
	<div className={styles.FormFooter}>
		<Button onPress={onCancel} variant="negative">
			Cancel
		</Button>
		<Button onPress={onSubmit}>{action}</Button>
	</div>
);
