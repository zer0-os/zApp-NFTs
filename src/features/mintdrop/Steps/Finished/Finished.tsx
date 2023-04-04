import { Button } from '@zero-tech/zui/components';

import styles from './Finished.module.scss';

type FinishedProps = {
	onFinish: () => void;
};

const Finished = (props: FinishedProps) => {
	return (
		<section className={styles.Container}>
			<span>Your GENs were minted successfully!</span>
			
			<Button  onPress={props.onFinish} variant="primary">
				View My Profile
			</Button>
		</section>
	);
};

export default Finished;
