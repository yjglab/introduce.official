import { emailConfirmationAPI } from "@api/auth";
import { toastConfig } from "@constants/chores";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const useEmailConfirmation = () => {
  const mutation = useMutation(emailConfirmationAPI, {
    onSuccess: () => {
      toast.success("이메일이 인증되었습니다", toastConfig);
    },
    onError: () => {
      toast.error("이메일 인증에 실패했습니다", toastConfig);
    },
  });

  return mutation;
};

export default useEmailConfirmation;
