import { FC, useState } from "react";
import useLocalLogin from "@hooks/mutations/auth/useLocalLogin";

interface Props {
  ApiErrors: any;
  setAPIErrors: (error: any) => void;
}
type LoginValues = {
  email: string;
  password: string;
};

const LoginForm: FC<Props> = ({ ApiErrors, setAPIErrors }) => {
  const {
    mutate: localLoginMutate,
    isLoading: isLocalLoginLoading,
    isSuccess: isLocalLoginSuccess,
    isError: isLocalLoginError,
    data: me,
    error: localLoginError,
  } = useLocalLogin();

  const loginValues: LoginValues = { email: "", password: "" };

  const submitLoginForm = (values) => {
    console.log(values);

    try {
      localLoginMutate(values);
      if (isLocalLoginError) {
        setAPIErrors(localLoginError);
      }
      if (me) {
        // router.push("/me");
        console.log("login 성공");
      }
    } catch (err: any) {
      console.log("ERROR", err);
    }
  };

  return <></>;
};

export default LoginForm;
