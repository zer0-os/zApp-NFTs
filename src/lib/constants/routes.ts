export enum ROUTE_NAMES {
  MARKET,
}

export const ROUTES: {
  [route in ROUTE_NAMES]: { name: string; slug: string };
} = {
  [ROUTE_NAMES.MARKET]: { name: "Market", slug: "/market" },
};
