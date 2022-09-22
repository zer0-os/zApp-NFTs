import { FC } from 'react';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import { Wizard } from '@zero-tech/zui/components';
import {
	CreateTokenBody,
	CreateTokenHeader,
	CreateTokenFormContextProvider,
} from './';
import { ConnectWallet } from '../ui/ConnectWallet';

import styles from './CreateToken.module.scss';

export type CreateTokenFormProps = {
	domainName: string;
	onClose: () => void;
};

export const CreateTokenForm: FC<CreateTokenFormProps> = ({
	domainName,
	onClose,
}) => {
	const { account } = useWeb3();

	const content = account ? (
		<CreateTokenFormContextProvider>
			<Wizard.Container className={styles.Container}>
				<CreateTokenHeader subtitle={domainName} onClose={onClose} />
				<CreateTokenBody onClose={onClose} />
			</Wizard.Container>
		</CreateTokenFormContextProvider>
	) : (
		<ConnectWallet message={'Connect your wallet to create a token.'} />
	);

	return content;
};
