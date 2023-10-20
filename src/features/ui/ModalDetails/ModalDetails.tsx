import React, { ReactNode } from 'react';

import { HTMLTextElement } from '@zero-tech/zui/lib/types';

import { SkeletonText, TextStack } from '@zero-tech/zui/components';

import styles from './ModalDetails.module.scss';

export type DetailsContentType = {
	id: string;
	title?: string;
	text: string;
	isLoading: boolean;
	as?: HTMLTextElement;
};

interface ModalDetailsProps {
	content: DetailsContentType[];
	truncatedZna: string;
	isLoadingTitle: boolean;
	title?: string;
	children?: ReactNode;
}

export const ModalDetails = ({
	content,
	truncatedZna,
	isLoadingTitle,
	title,
	children,
}: ModalDetailsProps) => {
	return (
		<div className={styles.Details}>
			<div className={styles.Domain}>
				<h2 className={styles.Title}>
					<SkeletonText
						asyncText={{ isLoading: isLoadingTitle, text: title }}
					/>
				</h2>
				<span className={styles.ZNA}>0://{truncatedZna}</span>
			</div>
			<ul className={styles.TextContent}>
				{content.map((e) => (
					<li key={e.id}>
						<TextStack
							label={e.title}
							primaryText={{
								text: e.text,
								isLoading: e.isLoading,
							}}
							secondaryText={''}
						/>
					</li>
				))}
			</ul>
			{children}
		</div>
	);
};
