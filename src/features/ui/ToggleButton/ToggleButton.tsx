import { FC } from 'react';

import styles from './ToggleButton.module.scss';

type ToggleButtonProps = {
	label?: string | React.ReactNode;
	toggled: boolean;
	hideOnOffLabels?: boolean;
	onClick: () => void;
};

export const ToggleButton: FC<ToggleButtonProps> = ({
	hideOnOffLabels,
	label,
	onClick,
	toggled,
}) => (
	<div className={styles.Container}>
		<div
			onClick={onClick}
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
		{typeof label === 'string' ? (
			<span className={styles.Label}>{label}</span>
		) : (
			{ label }
		)}
	</div>
);
