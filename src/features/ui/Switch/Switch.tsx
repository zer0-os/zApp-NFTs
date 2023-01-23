import { FC } from 'react';

import styles from './Switch.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface SwitchProps {
	label?: string;
	toggled: boolean;
	className?: string;
	isDisabled?: boolean;
	hideOnOffLabels?: boolean;
	onPress: (toggled: boolean) => void;
}

export const Switch: FC<SwitchProps> = ({
	label,
	toggled,
	className,
	isDisabled,
	hideOnOffLabels,
	onPress,
}) => (
	<div className={cx(styles.Container, className)}>
		<div
			className={`${styles.Switch} ${toggled ? styles.On : ''}`}
			data-variant={isDisabled ? 'locked' : 'unlocked'}
			onClick={() => !isDisabled && onPress(!toggled)}
		>
			<div data-variant={isDisabled ? 'locked' : 'unlocked'}>
				{hideOnOffLabels !== true && (
					<>
						<span data-variant={isDisabled ? 'locked' : 'unlocked'}>On</span>
						<span data-variant={isDisabled ? 'locked' : 'unlocked'}>Off</span>
					</>
				)}
			</div>
		</div>

		<span className={styles.Label}>{label}</span>
	</div>
);
