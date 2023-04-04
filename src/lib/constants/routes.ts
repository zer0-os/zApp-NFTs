export enum ROUTE_NAMES {
  MARKET,
  OWNED_DOMAINS,
  PROFILE,
  DROP_ROOT_DOMAIN
}

export const ROUTES: {
  [route in ROUTE_NAMES]: { name: string; slug: string };
} = {
  [ROUTE_NAMES.MARKET]: { name: "Market", slug: "/market" },
  [ROUTE_NAMES.OWNED_DOMAINS]: { name: "Owned Domains", slug: "/ownedDomains" },
  [ROUTE_NAMES.PROFILE]: { name: "Market", slug: "/profile" },
  [ROUTE_NAMES.DROP_ROOT_DOMAIN]: { name: "Market", slug: "/market/motos" },
};
