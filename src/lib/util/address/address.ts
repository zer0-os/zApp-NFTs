// Address validation
export const isValidEthAddress = (text: string) =>
	/^0x[a-fA-F0-9]{40}$/.test(String(text).toLowerCase());
