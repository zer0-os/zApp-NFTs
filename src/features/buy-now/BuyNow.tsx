//- React Imports
import { FC } from 'react';

//- Hooks Imports
import useWeb3 from '../../lib/hooks/useWeb3';

//- Components Imports
import { ConnectWallet } from '../../features/ui/ConnectWallet';

const BuyNow: FC = () => {
	const { account } = useWeb3();

	const content = account ? (
		<>Buy Now</>
	) : (
		<ConnectWallet message={'Connect your wallet to buy now.'} />
	);

	return content;
};

export default BuyNow;
