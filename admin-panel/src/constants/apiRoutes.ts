export type ApiRoute = {
  path: string; // API endpoint
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // HTTP method
  data?: unknown; // Data type of the request
  queryParams?: Record<string, string | number | boolean>; // Query parameters
  response?: unknown; // Data type of the response
};

export const API_ROUTES = {
  LOGIN: {
    path: "/user/provider/login",
    method: "POST",
    data: {
      phone: "string",
      password: "string",
    },
    response: {
      message: "string",
      data: {
        id: "string",
        name: "string",
        phone: "string",
      }
    },
  },
  REGISTER: {
    path: "/register",
    method: "POST",
    data: {
      name: "string",
      email: "string",
      password: "string",
    },
    response: {
      userId: "string",
    },
  },
  GET_PROFILE: {
    path: "/profile",
    method: "GET",
    queryParams: {
      userId: "string",
    },
    response: {
      id: "string",
      name: "string",
      email: "string",
    },
  },
};

export type ApiRoutesKey = keyof typeof API_ROUTES;
export type ApiRouteDetails<K extends ApiRoutesKey> = typeof API_ROUTES[K];