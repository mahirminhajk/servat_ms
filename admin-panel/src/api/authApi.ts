import { API_ROUTES } from "@/constants/apiRoutes";
import axiosClient from "./axiosClient";
import { isAxiosError } from "axios";

export const verifyUser = async (id: string) => {
  const res = await axiosClient.get(`/users/verify/${id}`);
  return res.data;
};

export const providerLogin = async (data: typeof API_ROUTES.LOGIN.data) => {
  try {
    const res = await axiosClient.post(API_ROUTES.LOGIN.path, data);
    return res.data;
  } catch (error: unknown) {
    console.log(error);
    if (isAxiosError(error) && error.response) {
      throw error.response.data;
    }else if (error instanceof Error) {
      throw { message: error.message };
    } else {
      throw { message: "An error occurred. Please try again later." };
    }
  }
};
