import { FC } from 'react';

import { CreateTokenModal } from './';

interface CreateTokenButtonProps {
	domainName: string;
}

export const CreateTokenButton: FC<CreateTokenButtonProps> = ({
	domainName,
}) => <CreateTokenModal trigger={'Create Token'} domainName={domainName} />;
