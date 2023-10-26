import { signUpAPI } from "@api/auth";
import { toastConfig } from "@constants/chores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useSignUp = () => {
  const mutation = useMutation(signUpAPI, {
    onSuccess: (data) => {
      toast.success(data, toastConfig);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, toastConfig);
      }
    },
  });

  return mutation;
};

export default useSignUp;
