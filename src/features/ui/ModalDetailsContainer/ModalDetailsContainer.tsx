import React from 'react';

import styles from './ModalDetailsContainer.module.scss';

interface ModalDetailsContainerProps {
	children: React.ReactNode;
	variant: string;
}

export const ModalDetailsContainer = ({
	children,
	variant,
}: ModalDetailsContainerProps) => (
	<div className={styles.Container} data-variant={variant}>
		{children}
	</div>
);
