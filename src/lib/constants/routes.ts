export enum ROUTE_NAMES {
	MARKET,
  DROP_ROOT_DOMAIN
}

export const ROUTES: {
	[route in ROUTE_NAMES]: { name: string; slug: string };
} = {
	[ROUTE_NAMES.MARKET]: { name: 'Market', slug: '/market' },
  [ROUTE_NAMES.DROP_ROOT_DOMAIN]: { name: "Market", slug: "/market/motos" },
};
