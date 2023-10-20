import { Button } from '@zero-tech/zui/components';

import styles from './Finished.module.scss';

export interface FinishedProps {
	onFinish: () => void;
}

export const Finished = (props: FinishedProps) => {
	return (
		<section className={styles.Container}>
			<span>Your GENs were minted successfully!</span>

			<Button onPress={props.onFinish} variant="primary">
				View My Profile
			</Button>
		</section>
	);
};
