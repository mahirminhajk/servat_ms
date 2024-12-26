import { useQuery } from "@tanstack/react-query";
import { verifyUser } from "../authApi";

export const useVerifyUser = (id: string) => {
  return useQuery({
    queryKey: ["verifyUser", id],
    queryFn: () => verifyUser(id),
  });
};
