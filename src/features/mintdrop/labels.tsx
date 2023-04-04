import { Countdown } from '../../features/ui';
import { Stage } from './types';

const totalLabel = (wheelsMinted: number, wheelsTotal: number) => (
	<span>
		<b>{Math.max(wheelsTotal - wheelsMinted, 0)} Remaining</b>
	</span>
);

export const getBannerButtonText = (
	dropStage?: Stage,
	isDesktopBreakpoint?: boolean,
): string => {
	if (!isDesktopBreakpoint) {
		return 'Learn More';
	}
	if (dropStage === Stage.Public || dropStage === Stage.Whitelist) {
		return 'Mint Now';
	}
	if (dropStage === Stage.Sold || dropStage === Stage.Ended) {
		return 'See GENs';
	}

	return 'Learn More';
};

export const getBannerLabel = (
	dropStage?: Stage,
	wheelsMinted?: number,
	wheelsTotal?: number,
	countdownDate?: number,
	onFinish?: () => void,
	isFinished?: boolean,
	isInTransitionMode?: boolean,
): React.ReactNode => {
	if (dropStage === Stage.Upcoming) {
		return <>Presale Mint Period Coming Soon - waiting for contract to begin</>;
	}
	if (dropStage === Stage.Whitelist) {
		// if (isFinished) {
		// 	<>Wilder Beasts public release starting - you may need to refresh</>;
		// } else {
		// if (isInTransitionMode) {
		// if (countdownDate && !isFinished) {
		// 	return (
		// 		<div style={{ display: 'flex', flexDirection: 'column' }}>
		// 			<span>
		// 				Available to public in{' '}
		// 				{countdownDate && (
		// 					<Countdown to={countdownDate} onFinish={onFinish} />
		// 				)}
		// 			</span>
		// 		</div>
		// 	);
		// }
		if (countdownDate && isFinished) {
			return (
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<span>
						Mintlist sale starting now - waiting for contract to begin
					</span>
				</div>
			);
		}
		// }
		return (
			<div style={{ display: 'flex', flexDirection: 'column' }}>
				<span>
					The Trinity Keeper claim is now live, secure your GENs!{' '}
					{countdownDate && (
						<Countdown to={countdownDate} onFinish={onFinish} />
					)}{' '}
					({totalLabel(wheelsMinted!, wheelsTotal!)})
				</span>
			</div>
		);
		// }
	}
	if (dropStage === Stage.Public) {
		// if (Math.max(wheelsTotal! - wheelsMinted!, 0) !== 0) {
		// 	return (
		// 		<>
		// 			The beasts sale is finished.{' '}
		// 			{Math.max(wheelsTotal! - wheelsMinted!, 0)} remaining beasts have been
		// 			transferred to the Wilder DAO.
		// 		</>
		// 	);
		// }
		return (
			<>
				Mintlist sale is now open for Trinity Keepers, act now to secure your
				GENs! {totalLabel(wheelsMinted!, wheelsTotal!)}
			</>
		);
	}

	if (dropStage === Stage.Sold || dropStage === Stage.Ended) {
		return <>Wilder GENs mint complete!</>;
	}

	return <>Loading drop data...</>;
};
