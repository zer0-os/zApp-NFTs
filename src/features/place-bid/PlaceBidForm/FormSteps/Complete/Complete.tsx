import { FC } from 'react';

import { NFTDetails } from '../../ui/NFTDetails';
import { Button } from '@zero-tech/zui/components';

import styles from '../FormSteps.module.scss';

interface CompleteProps {
	domainId: string;
	onClose: () => void;
}

export const Complete: FC<CompleteProps> = ({ domainId, onClose }) => {
	return (
		<>
			<NFTDetails domainId={domainId} />

			<div className={styles.Container}>
				<span className={styles.TextContent} data-variant={'success'}>
					{'Your bid was successfully placed.'}
				</span>

				<Button className={styles.Button} onPress={onClose}>
					Finish
				</Button>
			</div>
		</>
	);
};
