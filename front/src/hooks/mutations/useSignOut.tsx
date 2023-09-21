import { signOutAPI } from "@api/auth";
import { toastConfig } from "@constants/chores";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const useSignOut = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation(signOutAPI, {
    onSuccess: async (data) => {
      toast.success(data, toastConfig);
      queryClient.refetchQueries(["user"]);
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data, toastConfig);
      }
    },
  });

  return mutation;
};

export default useSignOut;
