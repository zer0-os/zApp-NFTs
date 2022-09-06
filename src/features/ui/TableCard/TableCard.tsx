//- React Imports
import type { FC, ReactNode } from 'react';

//- Styles Imports
import styles from './TableCard.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type TableCardProps = {
	children: ReactNode;
	header?: string;
	subHeader?: string;
	className?: string;
	onClick?: (event?: any) => void;
};

export const TableCard: FC<TableCardProps> = ({
	children,
	header,
	subHeader,
	className,
	onClick,
}) => {
	return (
		<div className={cx(styles.TableCardContainer, className)} onClick={onClick}>
			<div className={styles.Footer}>
				<h5 className={styles.Header}>{header ?? ''}</h5>
				<div className={styles.Subheader}>{subHeader ?? ''}</div>
				<div className={styles.Container}>{children}</div>
			</div>
		</div>
	);
};
