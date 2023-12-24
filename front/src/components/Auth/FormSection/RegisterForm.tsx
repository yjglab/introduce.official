import { FC, useState } from "react";
import useLocalRegister from "@hooks/mutations/auth/useLocalRegister";
import { ErrorField } from "@components/Common/ErrorField";

import { useForm } from "react-hook-form";

interface Props {
  ApiErrors: any;
  setAPIErrors: (error: any) => void;
}
interface RegisterValues {
  email: string;
  password: string;
  position: string;
  displayName: string;
}

const RegisterForm: FC<Props> = ({ ApiErrors, setAPIErrors }) => {
  const [open, setOpen] = useState<boolean>(false);

  const {
    mutate: localRegisterMutate,
    isLoading: isLocalRegisterLoading,
    isSuccess: isLocalRegisterSuccess,
    isError: isLocalRegisterError,
    data: me,
    error: localRegisterError,
  } = useLocalRegister();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterValues>();

  const onSubmit = (values: RegisterValues) => {
    console.log(values);
    try {
      localRegisterMutate(values);
      if (isLocalRegisterError) {
        setAPIErrors(localRegisterError);
      }
      if (me) {
        // router.push("/me");
        console.log("register 성공");
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

export default RegisterForm;
