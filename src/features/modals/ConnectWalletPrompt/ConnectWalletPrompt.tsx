//- React Imports
import { FC } from 'react';

export type ConnectWalletPromptProps = {
	onClose: () => void;
};

const ConnectWalletPrompt: FC<ConnectWalletPromptProps> = ({ onClose }) => (
	<>Connect Wallet Prompt - </>
);

export default ConnectWalletPrompt;
