//- React Imports
import { FC } from 'react';

//- Hooks Imports
import useWeb3 from '../../lib/hooks/useWeb3';

//- Components Imports
import { ConnectWallet } from '../ui/ConnectWallet';

const ViewBids: FC = () => {
	const { account } = useWeb3();

	const content = account ? (
		<>View Bids</>
	) : (
		<ConnectWallet message={'Connect your wallet to view bids.'} />
	);

	return content;
};

export default ViewBids;
