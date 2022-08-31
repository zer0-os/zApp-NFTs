//- React Imports
import React, { FC } from 'react';

//- Component Imports
import { WrappedInput } from '../WrappedInput/WrappedInput';

export const DetailsForm: FC = () => (
	<div>
		<WrappedInput
			value=""
			placeholder="Enter total supply..."
			info="Initial number of tokens available. This will be put into an initial wallet account."
			onChange={null}
		/>
	</div>
);
