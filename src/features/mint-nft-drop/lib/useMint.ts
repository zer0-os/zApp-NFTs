import { useWeb3, useZsaleSdk } from '../../../lib/hooks';
import { useDrop } from './useDrop';
import { CURRENT_SALE } from './drop-data';
import { useDropUserPurchases } from './useDropUserPurchases';
import { BigNumber } from 'ethers';

export const useMint = () => {
	const { account } = useWeb3();

	const drop = useZsaleSdk({ dropInstance: CURRENT_SALE });
	const { data: dropData } = useDrop(CURRENT_SALE);
	const { data: userPurchaseData } = useDropUserPurchases(CURRENT_SALE);

	const remainingUserMints = userPurchaseData?.max - userPurchaseData?.minted;
	const remainingMints = dropData?.amountForSale - dropData?.amountSold;

	const mint = async (amount: number) => {
		if (!account) {
			return;
		}

		// @todo better error messages
		if (isNaN(amount)) {
			throw new Error('Invalid amount');
		}

		if (amount > remainingMints) {
			throw new Error('Cannot mint more than remaining mints');
		}

		if (amount > remainingUserMints) {
			throw new Error('Cannot mint more than remaining user mints');
		}

		await drop.purchaseDomains(BigNumber.from(amount));
	};

	return {
		mint,
	};
};
