import { FC } from 'react';

import styles from './Switch.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

interface SwitchProps {
	className?: string;
	label?: string;
	toggled: boolean;
	hideOnOffLabels?: boolean;
	onPress: (toggled: boolean) => void;
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
			className={`${styles.Switch} ${toggled ? styles.On : ''}`}
			onClick={() => onPress(!toggled)}
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
