import axiosClient from "./axiosClient";

export const verifyUser = async (id: string) => {
  const res = await axiosClient.get(`/users/verify/${id}`);
  return res.data;
};
