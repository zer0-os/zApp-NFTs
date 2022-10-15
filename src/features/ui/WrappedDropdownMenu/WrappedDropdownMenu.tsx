import { FC } from 'react';

import { InfoTooltip } from '@zero-tech/zui/components/InfoTooltip';
import { IconChevronDown } from '@zero-tech/zui/components/Icons';
import { DropdownItem, DropdownMenu, Input } from '@zero-tech/zui/components';

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
		<Input type="text" placeholder={placeholder} value={value} onChange={() => {}} error={hasError} helperText={helperText} endEnhancer={<IconChevronDown />} />
	);

	return (
		<div className={classNames(styles.Container, className)}>
			<div className={styles.LabelContainer}>
				<p className={styles.Label}>{label}</p>
				<InfoTooltip content={info} />
			</div>
			<DropdownMenu trigger={trigger} items={items} />
		</div>
	);
}
