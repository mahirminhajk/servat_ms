import { ROUTES } from "./routes";

export interface BreadcrumbData {
  label: string;
  path?: string; // Optional, for links
}

export const breadcrumbConfig: Record<string, BreadcrumbData[]> = {
  [ROUTES.DASHBOARD]: [{ label: "Dashboard" }],
  [ROUTES.SERVICES]: [{ label: "Home", path: "/" }, { label: "Services" }],
  [ROUTES.CUSTOMERS]: [{ label: "Home", path: "/" }, { label: "Customers" }],
  [ROUTES.BOOKING]: [{ label: "Home", path: "/" }, { label: "Booking" }],
  [ROUTES.SETTINGS]: [{ label: "Home", path: "/" }, { label: "Settings" }],
};
