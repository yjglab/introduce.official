import useSignIn from "@hooks/mutations/useSignIn";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners";

interface Form {
  email: string;
  emailConfirmationCode: string;
  username: string;
  password: string;
  passwordConfirm: string;
  position: string;
}
const SignInForm = () => {
  const router = useRouter();
  const { mutate: signInMutate, isLoading: isSignInLoading, isSuccess: isSignInSuccess } = useSignIn();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Form>({
    mode: "all",
  });

  const handleSignInSubmit = handleSubmit(async (data) => {
    const { email, password } = data;
    console.log(email, password);
    signInMutate({
      email,
      password,
    });
  });

  useEffect(() => {
    if (isSignInSuccess) {
      router.replace("/");
    }
  }, [isSignInSuccess]);

  return (
    <form key='register-form' onSubmit={handleSignInSubmit} className=''>
      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='email-address' className='sr-only'>
            Email address
          </label>
          <span>이메일</span>
          <input
            {...register("email", {
              required: true,
            })}
            id='email-address'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='email'
            autoComplete='email'
          />
        </div>
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='password' className='sr-only'>
            password
          </label>
          <span>비밀번호</span>
          <input
            {...register("password", {
              required: true,
              maxLength: {
                value: 12,
                message: "비밀번호 제한",
              },
            })}
            id='password'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='password'
            autoComplete='password'
          />
        </div>
      </div>

      <button type='submit' className='disabled:opacity-50 bg-white' disabled={isSignInLoading}>
        로그인
      </button>

      <PropagateLoader color='white' loading={false} size={10} />
    </form>
  );
};

export default SignInForm;
