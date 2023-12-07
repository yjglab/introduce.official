import { SET_USER } from "@/store/slices/user.slice";
import { toastConfig } from "@/utils/toast";
import { api } from "@api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

async function registerAPI(data: { email: string; displayName: string; password: string; position: string }) {
  const response = await api.post("/auth/local/register", data);
  return response.data;
}

const useLocalRegister = () => {
  // const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation(registerAPI, {
    onSuccess: (response) => {
      // queryClient.refetchQueries(["setMyInfo"]);
      toast.success(
        `${response.user.displayName}님, 회원가입 되었습니다. 이메일 인증 후 정상 이용 가능합니다.`,
        toastConfig,
      );
      dispatch(SET_USER(response.user));
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data, toastConfig);
      }
    },
  });

  return mutation;
};

export default useLocalRegister;
