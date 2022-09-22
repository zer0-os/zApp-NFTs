import { FC } from 'react';

import { Wizard } from '@zero-tech/zui/components/Wizard/Wizard';
import { CreateDAOBody, CreateDAOHeader, CreateDAOFormContextProvider } from './';
import { ConnectWallet } from '../ui/ConnectWallet';

import { useWeb3 } from '../../lib/hooks/useWeb3';

import styles from './CreateDAOForm.module.scss';

export type CreateDAOFormProps = {
	domainName: string;
	onClose: () => void;
};

export const CreateDAOForm: FC<CreateDAOFormProps> = ({
	domainName,
	onClose,
}) => {
	const { account } = useWeb3();

	const content = account ? (
		<CreateDAOFormContextProvider>
			<Wizard.Container className={styles.Container}>
				<CreateDAOHeader subtitle={domainName} onClose={onClose} />
				<CreateDAOBody onClose={onClose} />
			</Wizard.Container>
		</CreateDAOFormContextProvider>
	) : (
		<ConnectWallet message={'Connect your wallet to create a DAO.'} />
	);

	return content;
};
