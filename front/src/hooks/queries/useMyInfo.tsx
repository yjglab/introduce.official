import { loadMyInfo } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

interface User {
  email: "myemail";
}
const useMyInfoQuery = () => {
  return useQuery<User>(["user"], loadMyInfo, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export default useMyInfoQuery;
