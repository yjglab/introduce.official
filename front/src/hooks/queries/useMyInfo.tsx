import { loadMyInfoAPI } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

// interface User {
//   email: "myemail";
// }
const useMyInfoQuery = () => {
  return useQuery<any>(["user"], loadMyInfoAPI, {
    staleTime: Infinity,
    cacheTime: Infinity,
  });
};

export default useMyInfoQuery;
