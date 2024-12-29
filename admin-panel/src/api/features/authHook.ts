import { useQuery, useMutation } from "@tanstack/react-query";
import { providerLogin, providerRegister, providerVerifyOTP, verifyUser } from "../authApi";
import { API_ROUTES } from "@/constants/apiRoutes";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: typeof API_ROUTES.LOGIN.data) => providerLogin(data),
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (data: typeof API_ROUTES.REGISTER.data) => providerRegister(data),
  });
};

export const useVerifyOTP = () => {
  return useMutation({
    mutationFn: (data: typeof API_ROUTES.VERIFY_OTP.data) => providerVerifyOTP(data),
  });
};

export const useVerifyUser = (id: string) => {
  return useQuery({
    queryKey: ["verifyUser", id],
    queryFn: () => verifyUser(id),
  });
};
