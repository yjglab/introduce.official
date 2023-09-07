import useEmailConfirmation from "@hooks/mutations/useEmailConfirmation";
import useEmailDuplication from "@hooks/mutations/useEmailDuplication";
import useSignUp from "@hooks/mutations/useSignUp";
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners";

interface Form {
  email: string;
  emailConfirmationCode: string;
  name: string;
  password: string;
  passwordConfirm: string;
  position: string;
}
const SignUpForm = () => {
  const { mutateAsync: signUpMutate, isLoading: isSignUpLoading } = useSignUp();
  const { mutateAsync: emailDuplicationMutate, isLoading: isEmailDuplicationLoading } = useEmailDuplication();
  const { mutateAsync: emailConfirmationMutate, isLoading: isEmailConfirmLoading } = useEmailConfirmation();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Form>({
    mode: "all",
  });

  const handleEmailDuplication = async () => {
    const email = getValues("email");
    console.log(email);
    await emailDuplicationMutate({ email });
  };
  const handleEmailConfirmation = async () => {
    const email = getValues("email");
    const emailConfirmationCode = getValues("emailConfirmationCode");
    await emailConfirmationMutate({ email, emailConfirmationCode });
  };
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
      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='email-address' className='sr-only'>
            Email address
          </label>
          <span>이메일</span>
          <input
            {...register("email", {
              required: true,
              validate: (value) => {
                return value.includes("@") ? true : "올바른 이메일 형식이 아닙니다";
              },
            })}
            id='email-address'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='email'
            autoComplete='email'
            disabled={isEmailDuplicationLoading}
          />
          <button
            type='button'
            onClick={handleEmailDuplication}
            className='disabled:opacity-50 bg-white'
            disabled={isEmailDuplicationLoading || !!errors.email?.message}
          >
            확인
          </button>
        </div>
        {errors.email?.message && <p className='m-1 text-sm text-red-500'>{errors.email.message}</p>}
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='emailConfirmationCode' className='sr-only'>
            emailConfirmationCode
          </label>
          <span>코드</span>
          <input
            {...register("emailConfirmationCode", {
              required: true,
              maxLength: 20,
            })}
            id='emailConfirmationCode'
            required
            className='border border-black'
            placeholder='코드'
            size={6}
            type='text'
            autoComplete='emailConfirmationCode'
            disabled={isEmailConfirmLoading}
          />
          <button
            type='button'
            onClick={handleEmailConfirmation}
            className='disabled:opacity-50 bg-white'
            disabled={isEmailConfirmLoading || !!errors.emailConfirmationCode?.message}
          >
            인증확인
          </button>
        </div>
        {errors.emailConfirmationCode?.message && (
          <p className='m-1 text-sm text-red-500'>{errors.emailConfirmationCode.message}</p>
        )}
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='email-address' className='sr-only'>
            user name
          </label>
          <span>사용자명</span>
          <input
            {...register("name", {
              required: true,
              maxLength: {
                value: 10,
                message: "사용자명 제한",
              },
            })}
            id='name'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='text'
            autoComplete='name'
            disabled={isSignUpLoading}
          />
        </div>
        {errors.name?.message && <p className='m-1 text-sm text-red-500'>{errors.name.message}</p>}
      </div>

      <button
        type='submit'
        className='disabled:opacity-50 bg-white'
        disabled={isSignUpLoading || !!errors.email?.message}
      >
        제출
      </button>

      <PropagateLoader color='white' loading={false} size={10} />
    </form>
  );
};

export default SignUpForm;
