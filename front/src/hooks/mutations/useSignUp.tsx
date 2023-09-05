import { signUpAPI } from "@api/auth";
import { toastConfig } from "@constants/chores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useSignUp = () => {
  const mutation = useMutation(signUpAPI, {
    onSuccess: () => {
      toast.success("회원가입 성공", toastConfig);
    },
    onError: () => {
      toast.error("회원가입 실패", toastConfig);
    },
  });

  return mutation;
};

export default useSignUp;
