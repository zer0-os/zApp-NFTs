import { Spinner } from '@zero-tech/zui/components/LoadingIndicator';

import styles from './Loading.module.scss';

type LoadingProps = {
	isMinting?: boolean;
	text: string;
};

export const Loading = (props: LoadingProps) => {
	return (
		<section className={styles.Container}>
			{props.isMinting && (
				<img
					alt="loading spinner"
					className={styles.Image}
					src="https://res.cloudinary.com/fact0ry/image/upload/fl_lossy,q_50,c_fill,h_290,w_542/v1678125630/zns/gens-mint-progress.gif"
				/>
			)}
			<span>{props.text}</span>
			<Spinner />
		</section>
	);
};
