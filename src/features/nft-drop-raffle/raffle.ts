const current = new Date().getTime();
const step = 5000;

export enum RaffleStage {
	HIDDEN,
	NOT_STARTED,
	STARTED,
	ENDED,
	FINISHED,
}

export const RAFFLE_TIMES = {
	show: current + step,
	start: current + 2 * step,
	end: current + 3 * step,
	hide: current + 4 * step,
};

export const STAGE_TIMES = {
	[RaffleStage.NOT_STARTED]: RAFFLE_TIMES.show,
	[RaffleStage.STARTED]: RAFFLE_TIMES.start,
	[RaffleStage.ENDED]: RAFFLE_TIMES.end,
};
