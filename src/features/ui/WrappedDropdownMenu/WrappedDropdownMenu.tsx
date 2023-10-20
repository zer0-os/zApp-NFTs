import { FC } from 'react';

import { IconChevronDown } from '@zero-tech/zui';
import { DropdownItem, DropdownMenu, Input } from '@zero-tech/zui';
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
	const trigger = (
		<Input
			type="text"
			placeholder={placeholder}
			value={value}
			onChange={() => {}}
			error={hasError}
			helperText={helperText}
			endEnhancer={<IconChevronDown />}
		/>
	);

	return (
		<InputWrapper
			className={classNames(styles.Container, className)}
			label={label}
			info={info}
		>
			<DropdownMenu trigger={trigger} items={items} />
		</InputWrapper>
	);
};
