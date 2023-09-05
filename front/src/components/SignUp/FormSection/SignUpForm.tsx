import useSignUp from "@hooks/mutations/useSignUp";
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners";

interface Form {
  email: string;
  emailConfirmCode: string;
  name: string;
  password: string;
  passwordConfirm: string;
  position: string;
}
const SignUpForm = () => {
  const { mutateAsync: signUpMutate, isLoading: isSignUpLoading } = useSignUp();
  const { mutateAsync: emailConfirmMutate, isLoading: isEmailConfirmLoading } = useSignUp();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({
    mode: "all",
  });

  const handleSignUpSubmit = handleSubmit(async (data) => {
    const { email, name, password, passwordConfirm, position } = data;
    await signUpMutate({
      email,
      name,
      password,
      passwordConfirm,
      position,
    });
  });
  return (
    <form key='register-form' onSubmit={handleSignUpSubmit} className=''>
      <div className='flex gap-x-4'>
        <label htmlFor='email-address' className='sr-only'>
          Email address
        </label>
        <input
          {...register("email", {
            required: true,
            validate: (value) => {
              return value.includes("@") ? true : "올바른 이메일 형식이 아닙니다";
            },
          })}
          id='email-address'
          required
          className=''
          placeholder={"작성해주세요"}
          size={30}
          type='email'
          autoComplete='email'
          disabled={isSignUpLoading}
        />
        <button
          type='submit'
          className='disabled:opacity-50 bg-white'
          disabled={isSignUpLoading || !!errors.email?.message}
        >
          제출
        </button>
      </div>
      {errors.email?.message && <p className='m-1 text-sm text-red-500'>{errors.email.message}</p>}
      <PropagateLoader color='white' loading={false} size={10} />
    </form>
  );
};

export default SignUpForm;
