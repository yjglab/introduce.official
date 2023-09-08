import { emailConfirmationAPI } from "@api/auth";
import { toastConfig } from "@constants/chores";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useEmailConfirmation = () => {
  const mutation = useMutation(emailConfirmationAPI, {
    onSuccess: (data) => {
      toast.success(data, toastConfig);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data, toastConfig);
      }
    },
  });

  return mutation;
};

export default useEmailConfirmation;
