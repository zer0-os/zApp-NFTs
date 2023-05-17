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

const currentTime = new Date().getTime();

// test values
export const RAFFLE_START_TIME = currentTime - 10000;
export const RAFFLE_END_TIME = currentTime - 50000;
export const SALE_START_TIME = currentTime + 10000;
export const PRIVATE_SALE_END_TIME = currentTime + 90000;
