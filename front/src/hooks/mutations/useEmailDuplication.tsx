import { emailDuplicationAPI } from "@api/auth";
import { useMutation } from "@tanstack/react-query";

const useEmailDuplication = () => {
  const mutation = useMutation(emailDuplicationAPI);
  return mutation;
};

export default useEmailDuplication;
