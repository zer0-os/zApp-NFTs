//- React Imports
import React, { FC } from 'react';

//- Component Imports
import { FormFooter } from '../FormFooter/FormFooter';

interface TokenSummaryProps {
	onSubmit: () => void;
	onClose: () => void;
}

export const TokenSummary: FC<TokenSummaryProps> = ({ onSubmit, onClose }) => (
	<>
		<p>Insert summary content here...</p>
		<FormFooter action="Confirm" onSubmit={onSubmit} onCancel={onClose} />
	</>
);
