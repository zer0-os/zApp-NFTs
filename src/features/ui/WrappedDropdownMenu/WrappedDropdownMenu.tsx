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
	info: string;
	hasError: boolean;
	helperText: string;
};

export const WrappedDropdownMenu: FC<WrappedDropdownMenuProps> = ({
	className = '',
	items = [],
	value,
	label,
	placeholder,
	info,
	hasError,
	helperText,
}) => {
	return (
		<InputWrapper
			className={classNames(styles.Container, className)}
			label={label}
			info={info}
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
