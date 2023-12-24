import { SET_USER } from "@/store/slices/user.slice";
import { toastConfig } from "@/utils/toast";
import { api } from "@api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

async function loginAPI(data: { email: string; password: string }) {
  const response = await api.post("/auth/local/login", data);
  return response.data;
}

const useLocalLogin = () => {
  const dispatch = useDispatch();
  const mutation = useMutation(loginAPI, {
    onSuccess: (response) => {
      toast.success(`${response.user.displayName}님, 로그인 되었습니다.`, toastConfig);
      dispatch(SET_USER(response.user));
    },
  });

  return mutation;
};

export default useLocalLogin;
