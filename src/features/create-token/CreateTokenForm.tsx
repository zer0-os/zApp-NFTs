//- React Imports
import React, { FC, useState } from 'react';

//- Style Imports
import styles from './CreateToken.module.scss';

//- Component Imports
import { Wizard } from '@zero-tech/zui/components/Wizard/Wizard';
import { CreateTokenBody } from './CreateTokenBody';
import { CreateTokenHeader } from './CreateTokenHeader';
import { ConnectWallet } from '../ui/ConnectWallet';

// Lib Imports
import { useWeb3 } from '../../lib/hooks/useWeb3';

//- Type Imports
import { Step } from '@zero-tech/zui/components/StepBar/StepBar.types';
import { DetailsFormSubmit, TokenomicsFormSubmit } from './CreateToken.types';
import { MediaType } from '@zero-tech/zui/components/MediaInput';

const steps: Step[] = [
	{
		id: 'details',
		title: 'Details',
	},
	{
		id: 'tokenomics',
		title: 'Tokenomics',
	},
	{
		id: 'launch',
		title: 'Launch',
	},
];

export type CreateTokenFormProps = {
	domainName: string;
	onClose: () => void;
};

export const CreateTokenForm: FC<CreateTokenFormProps> = ({
	domainName,
	onClose,
}) => {
	const { account } = useWeb3();

	const [stepId, setStepId] = useState(steps[0].id);
	const [title, setTitle] = useState('Create Token');

	const [details, setDetails] = useState<DetailsFormSubmit>({
		mediaType: undefined,
		previewUrl: '',
		avatar: null,
		name: '',
		symbol: '',
	});

	const [tokenomics, setTokenomics] = useState<TokenomicsFormSubmit>({
		tokenCount: '',
		initialTokenSupplyWalletAddress: '',
		adminWalletAddress: '',
	});

	const handleDetailsSubmit = (values: DetailsFormSubmit): void => {
		setTitle(`Create "${values.name}" Token`);
		setDetails(values);
		setStepId(steps[1].id);
	};

	const handleTokenomicsSubmit = (values: TokenomicsFormSubmit): void => {
		setTokenomics(values);
		setStepId(steps[2].id);
	};

	const handleMediaInputChange = (
		mediaType: MediaType,
		previewUrl: string,
		image: Buffer,
	): void => {
		setDetails({
			...details,
			mediaType: mediaType,
			previewUrl: previewUrl,
			avatar: image,
		});
	};

	const handleLaunchSubmit = (): void => {
		// TODO - wire up launch action once sdk integrated.
		onClose();
	};

	const content = account ? (
		<Wizard.Container className={styles.Container}>
			<CreateTokenHeader
				title={title}
				subtitle={domainName}
				stepId={stepId}
				steps={steps}
				onClose={onClose}
				onChangeStep={(step: Step) => setStepId(step.id)}
			/>
			<CreateTokenBody
				stepId={stepId}
				detailsFormValues={details}
				onDetailsSubmit={handleDetailsSubmit}
				tokenomicsFormValues={tokenomics}
				onTokenomicsSubmit={handleTokenomicsSubmit}
				onMediaInputChange={handleMediaInputChange}
				onLaunchSubmit={handleLaunchSubmit}
				onClose={onClose}
			/>
		</Wizard.Container>
	) : (
		<ConnectWallet message={'Connect your wallet to create a token.'} />
	);

	return content;
};
