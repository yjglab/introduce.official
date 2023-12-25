import { FC, useState } from "react";
import useLocalRegister from "@hooks/mutations/auth/useLocalRegister";
import { ErrorField } from "@components/Common/ErrorField";
import useLocalLogin from "@hooks/mutations/auth/useLocalLogin";
import Link from "next/link";

interface Props {
  ApiErrors: any;
  setAPIErrors: (error: any) => void;
}
type LoginValues = {
  email: string;
  password: string;
};

const LoginForm: FC<Props> = ({ ApiErrors, setAPIErrors }) => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    mutate: localLoginMutate,
    isLoading: isLocalLoginLoading,
    isSuccess: isLocalLoginSuccess,
    isError: isLocalLoginError,
    data: me,
    error: localLoginError,
  } = useLocalLogin();

  const loginValues: LoginValues = { email: "", password: "" };
  // const loginSchema = Yup.object().shape({
  //   email: Yup.string()
  //     .email("이메일 형식이어야 합니다")
  //     .required("이메일은 비워둘 수 없거나 공백일 수 없습니다"),
  //   password: Yup.string().required("비밀번호는 비워둘 수 없거나 공백일 수 없습니다"),
  // });

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

  const toggle = () => {
    setOpen(!open);
  };

  return <></>;
};

export default LoginForm;
