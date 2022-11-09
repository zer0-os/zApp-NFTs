import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import {
	CreateTokenBody,
	CreateTokenHeader,
	CreateTokenFormContextProvider,
} from './';
import { ConnectWallet } from '../ui/ConnectWallet';
import { Wizard } from '@zero-tech/zui/components';

import styles from './CreateToken.module.scss';

export type CreateTokenFormProps = {
	zna: string;
	onClose: () => void;
};

export const CreateTokenForm: FC<CreateTokenFormProps> = ({ zna, onClose }) => {
	const { account } = useWeb3();

	const content = account ? (
		<CreateTokenFormContextProvider>
			<Wizard.Container className={styles.Container}>
				<CreateTokenHeader subtitle={zna} onClose={onClose} />
				<CreateTokenBody onClose={onClose} />
			</Wizard.Container>
		</CreateTokenFormContextProvider>
	) : (
		<ConnectWallet message={'Connect your wallet to create a token.'} />
	);

	return content;
};
