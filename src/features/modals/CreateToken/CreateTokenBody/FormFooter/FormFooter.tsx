//- React Imports
import React, { FC } from 'react';

//- Style Imports
import styles from './FormFooter.module.scss';
import classnames from "classnames";
const cx = classnames.bind(styles);

//- Component Imports
import { Button } from '@zero-tech/zui/src/components/Button';

interface FormFooterProps {
	className?: string;
	action?: string;
	onSubmit: () => void;
	onCancel: () => void;
}

export const FormFooter: FC<FormFooterProps> = ({
	className = "",
	action = 'Next',
	onSubmit,
	onCancel,
}) => (
	<div className={cx(styles.FormFooter, className)}>
		<Button onPress={onCancel} variant="negative">
			Cancel
		</Button>
		<Button onPress={onSubmit}>{action}</Button>
	</div>
);
