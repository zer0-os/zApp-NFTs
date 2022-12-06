import classNames from 'classnames/bind';
import styles from './TextValue.module.scss';

const cx = classNames.bind(styles);

interface TextValueProps {
	tokenValue: string;
	fiatValue: string;
	isSingleAction?: boolean;
}

export const TextValue = ({
	tokenValue,
	fiatValue,
	isSingleAction,
}: TextValueProps) => (
	<div
		className={cx(styles.Values, {
			isSingleAction: isSingleAction,
		})}
	>
		<span className={styles.TokenValue}>{tokenValue}</span>
		<span className={styles.FiatValue}>{fiatValue}</span>
	</div>
);
