import { FC } from 'react';

import {
	CreateTokenBody,
	CreateTokenHeader,
	CreateTokenFormContextProvider,
} from './';
import { Wizard } from '@zero-tech/zui/components';

import styles from './CreateToken.module.scss';

export type CreateTokenFormProps = {
	zna: string;
	onClose: () => void;
};

export const CreateTokenForm: FC<CreateTokenFormProps> = ({ zna, onClose }) => {
	return (
		<CreateTokenFormContextProvider>
			<Wizard.Container className={styles.Container}>
				<CreateTokenHeader subtitle={zna} onClose={onClose} />
				<CreateTokenBody onClose={onClose} />
			</Wizard.Container>
		</CreateTokenFormContextProvider>
	);
};
