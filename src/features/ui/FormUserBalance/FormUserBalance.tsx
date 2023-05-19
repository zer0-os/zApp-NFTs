import { TextStack } from '@zero-tech/zui/components';

export interface FormUserBalanceProps {
	tokenBalance: string;
	isLoading: boolean;
}

export const FormUserBalance = ({
	tokenBalance,
	isLoading,
}: FormUserBalanceProps) => {
	return (
		<TextStack
			label={'Your Balance'}
			primaryText={{ text: tokenBalance, isLoading: isLoading }}
			secondaryText={''}
		/>
	);
};
