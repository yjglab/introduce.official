import { emailDuplicationAPI } from "@api/auth";
import { toastConfig } from "@constants/chores";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useEmailDuplication = () => {
  const mutation = useMutation(emailDuplicationAPI, {
    onSuccess: (data) => {
      toast.success(data.message, toastConfig);
    },
    onError: (error) => {
      console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message, toastConfig);
      }
    },
  });
  return mutation;
};

export default useEmailDuplication;
