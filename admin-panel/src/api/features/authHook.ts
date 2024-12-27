import { useQuery, useMutation } from "@tanstack/react-query";
import { providerLogin, verifyUser } from "../authApi";
import { API_ROUTES } from "@/constants/apiRoutes";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: typeof API_ROUTES.LOGIN.data) => providerLogin(data),
  });
};

export const useVerifyUser = (id: string) => {
  return useQuery({
    queryKey: ["verifyUser", id],
    queryFn: () => verifyUser(id),
  });
};
