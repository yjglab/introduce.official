import { retainAuthAPI } from "@api/auth";
import { useQuery } from "@tanstack/react-query";

const useRetainAuth = () => {
  return useQuery(["retainAuth"], retainAuthAPI, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export default useRetainAuth;
