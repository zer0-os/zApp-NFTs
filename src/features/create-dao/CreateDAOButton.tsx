import { FC } from 'react';

import { CreateDAOModal } from './';

interface CreateDAOButtonProps {
	domainName: string;
}

export const CreateDAOButton: FC<CreateDAOButtonProps> = ({ domainName }) => (
	<CreateDAOModal trigger={'Create DAO'} domainName={domainName} />
);
