import { toastConfig } from "@constants/chores";
import useEmailConfirmation from "@hooks/mutations/useEmailConfirmation";
import useEmailDuplication from "@hooks/mutations/useEmailDuplication";
import useSignUp from "@hooks/mutations/useSignUp";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PropagateLoader } from "react-spinners";
import { toast } from "react-toastify";

interface Form {
  email: string;
  emailConfirmationCode: string;
  username: string;
  password: string;
  passwordConfirm: string;
  position: string;
}
const SignUpForm = () => {
  const router = useRouter();
  const { mutateAsync: signUpMutate, isLoading: isSignUpLoading, isSuccess: isSignUpSuccess } = useSignUp();
  const {
    data: { hashedCode: assignedConfirmationCode } = {},
    mutateAsync: emailDuplicationMutate,
    isLoading: isEmailDuplicationLoading,
    isSuccess: isEamilDuplicationSuccess,
  } = useEmailDuplication();
  const {
    mutateAsync: emailConfirmationMutate,
    isLoading: isEmailConfirmationLoading,
    isSuccess: isEmailConfirmationSuccess,
  } = useEmailConfirmation();

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
    await emailDuplicationMutate({ email });
  };
  const handleEmailConfirmation = async () => {
    const email = getValues("email");
    const emailConfirmationCode = getValues("emailConfirmationCode");
    await emailConfirmationMutate({ email, emailConfirmationCode, assignedConfirmationCode });
  };
  const handleSignUpSubmit = handleSubmit(async (data) => {
    const { email, username, password, passwordConfirm, position } = data;
    if (!isEmailConfirmationSuccess) {
      return toast.error("이메일 인증이 필요합니다.", toastConfig);
    }
    if (password !== passwordConfirm) {
      return toast.error("비밀번호가 일치하지 않습니다.", toastConfig);
    }
    if (position === "default") {
      return toast.error("직무를 선택해주세요.", toastConfig);
    }
    await signUpMutate({
      email,
      username,
      password,
      passwordConfirm,
      position,
    });
  });

  useEffect(() => {
    if (isSignUpSuccess) {
      setTimeout(() => {
        // !todo: 가입 완료페이지로 이동
        router.replace("/");
      }, 3000);
    }
  }, [isSignUpSuccess]);
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
            disabled={isEmailDuplicationLoading || isEmailConfirmationSuccess}
          />
          <button
            type='button'
            onClick={handleEmailDuplication}
            className='disabled:opacity-50 bg-white'
            disabled={isEmailDuplicationLoading || isEmailConfirmationSuccess || !!errors.email?.message}
          >
            확인
          </button>
        </div>
      </div>

      {isEamilDuplicationSuccess && (
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
              className='disabled:opacity-50 border border-black'
              placeholder='코드'
              size={6}
              type='password'
              autoComplete='emailConfirmationCode'
              disabled={isEmailConfirmationLoading || isEmailConfirmationSuccess}
            />
            <button
              type='button'
              onClick={handleEmailConfirmation}
              className='disabled:opacity-50 bg-white'
              disabled={isEmailConfirmationLoading || isEmailConfirmationSuccess}
            >
              {isEmailConfirmationSuccess ? "인증완료" : "인증확인"}
            </button>
          </div>
        </div>
      )}

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='username' className='sr-only'>
            user name
          </label>
          <span>사용자명</span>
          <input
            {...register("username", {
              required: true,
              maxLength: {
                value: 10,
                message: "사용자명 제한",
              },
            })}
            id='username'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='text'
            autoComplete='username'
            disabled={isSignUpLoading}
          />
        </div>
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='email-address' className='sr-only'>
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
            disabled={isSignUpLoading}
          />
        </div>
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='email-address' className='sr-only'>
            password Confirm
          </label>
          <span>비밀번호 확인</span>
          <input
            {...register("passwordConfirm", {
              required: true,
              maxLength: {
                value: 12,
                message: "비밀번호 제한",
              },
            })}
            id='passwordConfirm'
            required
            className='border border-black'
            placeholder='작성해주세요'
            size={30}
            type='password'
            autoComplete='passwordConfirm'
            disabled={isSignUpLoading}
          />
        </div>
      </div>

      <div>
        <div className='flex gap-y-4'>
          <label htmlFor='position' className='sr-only'>
            Position
          </label>
          <span>직무 선택</span>

          <select
            id='position'
            {...register("position", {
              required: true,
            })}
            placeholder='선택하쇼'
          >
            <option value='default'>직무를 선택해주세요</option>
            <option value='developer'>개발자</option>
            <option value='designer'>디자이너</option>
          </select>
        </div>
      </div>

      <button
        type='submit'
        className='disabled:opacity-50 bg-white'
        disabled={isSignUpLoading || !!errors.email?.message}
      >
        가입
      </button>

      <PropagateLoader color='white' loading={false} size={10} />
    </form>
  );
};

export default SignUpForm;
