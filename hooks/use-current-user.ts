import { getCurrentUser } from "@/actions/get-current-user";
import { useQuery } from "@tanstack/react-query";

export const useCurrentUser = () => {
  const { data } = useQuery({
    queryKey: ["me"],
    queryFn: () => getCurrentUser(),
  });

  return data;
};
