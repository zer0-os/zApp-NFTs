//- React Imports
import { FC } from 'react';

//- Component Imports
import { Modal } from '@zero-tech/zui/components';
import { CreateTokenForm } from './CreateTokenForm';

//- Lib Imports
import { BasicModalProps } from '../../lib/types/ui';

export interface CreateTokenModalProps extends BasicModalProps {}

// TODO - discuss with zer0 how to get domainName and manage close of modal.
export const CreateTokenModal: FC<CreateTokenModalProps> = (props) => (
	<Modal {...props}>
		<CreateTokenForm domainName="0://meow.dao" onClose={() => {}} />
	</Modal>
);
