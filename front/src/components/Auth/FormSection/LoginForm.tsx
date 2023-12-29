import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import Tooltip from "@components/Common/Tooltip";
import SocialAuth from "./SocialAuth";
import LoadingSpinner from "@components/Common/LoadingSpinner";
import { DEVELOPMENT } from "@/utils/constants";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { loginAPI } from "@api/auth";
import { useDispatch } from "react-redux";
import { SET_USER } from "@/store/slices/user.slice";
import { useRouter } from "next/navigation";

interface Props {
  setFormType: (type: "login" | "register") => void;
}
interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: FC<Props> = ({ setFormType }) => {
  const [apiError, setApiError] = useState<{ [key: string]: string } | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    mutate: localLoginMutate,
    isLoading: isLocalLoginLoading,
    isSuccess: isLocalLoginSuccess,
  } = useMutation(loginAPI, {
    onSuccess: (response) => {
      dispatch(SET_USER(response.user));
      setApiError(null);
      router.push("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data);

        setApiError(error.response?.data);
      }
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm<LoginValues>();

  const onSubmit = (values: LoginValues) => {
    const { email, password } = values;
    try {
      localLoginMutate({ email, password });
    } catch (err: any) {
      console.log("ERROR", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='lg:max-w-lg lg:mx-auto lg:me-0 ms-auto'>
        <div className='p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-slate-900'>
          <div className='text-center'>
            <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>로그인</h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              계정이 없으신가요?
              <button
                type='button'
                onClick={() => setFormType("register")}
                className='ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                회원가입
              </button>
            </p>
          </div>

          <div className='mt-5'>
            <SocialAuth />
            <div className='py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-700 dark:after:border-gray-700'>
              Or
            </div>

            {/* 이메일 */}
            <div className='grid grid-cols-2 gap-4'>
              <div className='hs-tooltip [--placement:bottom] relative col-span-full'>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    {...register("email", {
                      required: "이메일을 입력해주세요.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                        message: "이메일 형식이 아닙니다.",
                      },
                    })}
                    defaultValue={DEVELOPMENT ? "yjgdesign@gmail.com" : ""}
                    disabled={isLocalLoginSuccess}
                    id='email'
                    className='peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2'
                    placeholder=''
                  />
                  <label
                    htmlFor='email'
                    className='absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500'
                  >
                    이메일
                  </label>
                  <Tooltip content={errors.email?.message || apiError?.email} />
                  {(errors.email || apiError?.email) && (
                    <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <i className='bi bi-exclamation-circle text-red-500 flex-shrink-0'></i>
                    </div>
                  )}
                </div>
              </div>

              <div className='hs-tooltip [--placement:bottom] relative col-span-full'>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
                    })}
                    disabled={isLocalLoginSuccess}
                    defaultValue={DEVELOPMENT ? "Ab2@" : ""}
                    type='password'
                    id='password'
                    className='peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2'
                    placeholder=''
                  />
                  <label
                    htmlFor='password'
                    className='absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500'
                  >
                    비밀번호
                  </label>
                  <Tooltip content={errors.password?.message || apiError?.password} />
                  {(errors.password || apiError?.password) && (
                    <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <i className='bi bi-exclamation-circle text-red-500 flex-shrink-0'></i>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 제출 */}
            <div className='mt-5 relative'>
              <button
                type='submit'
                disabled={isLocalLoginLoading || isLocalLoginSuccess}
                className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                로그인
              </button>
              {isLocalLoginLoading && <LoadingSpinner backdrop={true} />}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
