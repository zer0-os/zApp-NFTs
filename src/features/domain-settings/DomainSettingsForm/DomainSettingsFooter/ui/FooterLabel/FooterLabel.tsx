import { FC } from 'react';

import { StatusTextType } from '../../../hooks';

import styles from './FooterLabel.module.scss';

export interface FooterLabelProps {
	footerStatusText: StatusTextType;
}

export const FooterLabel: FC<FooterLabelProps> = ({ footerStatusText }) => {
	return (
		<label className={styles.Label} data-variant={footerStatusText?.variant}>
			{footerStatusText.text ?? ''}
		</label>
	);
};
