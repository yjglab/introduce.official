import { signInAPI } from "@api/auth";
import { toastConfig } from "@constants/chores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useSignIn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(signInAPI, {
    onSuccess: (data) => {
      queryClient.refetchQueries(["user"]);
      toast.success(data.message, toastConfig);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data, toastConfig);
      }
    },
  });

  return mutation;
};

export default useSignIn;
