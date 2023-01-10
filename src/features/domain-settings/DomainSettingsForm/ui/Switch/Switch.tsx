import { FC } from 'react';

import styles from './Switch.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface SwitchProps {
	className?: string;
	label?: string;
	toggled: boolean;
	hideOnOffLabels?: boolean;
	onPress: () => void;
}

export const Switch: FC<SwitchProps> = ({
	className,
	hideOnOffLabels,
	label,
	onPress,
	toggled,
}) => (
	<div className={cx(styles.Container, className)}>
		<div
			onClick={onPress}
			// TODO: - use data variant
			className={`${styles.Toggle} ${toggled ? styles.On : ''}`}
		>
			<div>
				{hideOnOffLabels !== true && (
					<>
						<span>On</span>
						<span>Off</span>
					</>
				)}
			</div>
		</div>

		<span className={styles.Label}>{label}</span>
	</div>
);
