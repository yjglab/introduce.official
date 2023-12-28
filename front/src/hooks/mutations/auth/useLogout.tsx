import { LOGOUT } from "@/store/slices/user.slice";
import { toastConfig } from "@/utils/toast";
import { api } from "@api";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

async function logoutAPI() {
  return await api.delete("/auth/logout");
}

const useLogout = () => {
  const dispatch = useDispatch();
  const mutation = useMutation(logoutAPI, {
    onSuccess: () => {
      toast.success(`로그아웃 되었습니다.`, toastConfig);
      dispatch(LOGOUT());
    },
  });

  return mutation;
};

export default useLogout;
