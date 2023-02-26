import { FC } from 'react';

import { DropdownItem, SelectInput } from '@zero-tech/zui/components';
import { InputWrapper } from '../InputWrapper/InputWrapper';

import styles from './WrappedDropdownMenu.module.scss';
import classNames from 'classnames';

export type WrappedDropdownMenuProps = {
	className?: string;
	items: DropdownItem[];
	value: string;
	label: string;
	placeholder: string;
	infoTooltipText: string;
	hasError: boolean;
	helperText: string;
};

export const WrappedDropdownMenu: FC<WrappedDropdownMenuProps> = ({
	className = '',
	items = [],
	value,
	label,
	placeholder,
	infoTooltipText,
	hasError,
	helperText,
}) => {
	return (
		<InputWrapper
			className={classNames(styles.Container, className)}
			label={label}
			infoTooltipText={infoTooltipText}
		>
			<SelectInput
				items={items}
				className={className}
				value={value}
				label=""
				helperText={helperText}
				placeholder={placeholder}
				error={hasError}
			/>
		</InputWrapper>
	);
};
