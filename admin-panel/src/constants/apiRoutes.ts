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
      },
    },
  },
  REGISTER: {
    path: "/user/provider/register",
    method: "POST",
    data: {
      name: "string",
      phone: "string",
      password: "string",
    },
    response: {
      message: "string",
    },
  },
  VERIFY_OTP:{
    path: "/user/provider/verify-otp",
    method: "POST",
    data: {
      otp: "string",
    },
    response: {
      message: "string",
      data: {
        id: "string",
        name: "string",
        phone: "string",
      },
    }
  }
};

export type ApiRoutesKey = keyof typeof API_ROUTES;
export type ApiRouteDetails<K extends ApiRoutesKey> = (typeof API_ROUTES)[K];
