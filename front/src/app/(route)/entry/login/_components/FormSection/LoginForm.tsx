"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginAPI } from "@api/auth";
import { useDispatch } from "react-redux";
import { SET_USER } from "@/store/slices/user.slice";
import { useRouter } from "next/navigation";
import Tooltip from "@app/_common/Parts/Tooltip";
import LoadingSpinner from "@app/_common/Parts/LoadingSpinner";
import { RiErrorWarningFill } from "@remixicon/react";
import { RiSize } from "@constants/styles";
import EntryHeader from "@app/(route)/entry/_components/EntryHeader";
import Link from "next/link";
import { loadMyDataKey } from "@constants/queryKey";
import { DEVELOPMENT } from "@constants/service";

interface Props {}
interface LoginValues {
  email: string;
  password: string;
}

const LoginForm: FC<Props> = () => {
  const [apiError, setApiError] = useState<{ [key: string]: string } | null>(null);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    mutate: localLoginMutate,
    isPending: isLocalLoginPending,
    isSuccess: isLocalLoginSuccess,
  } = useMutation({
    mutationFn: loginAPI,
    onSuccess: (response) => {
      queryClient.refetchQueries({
        queryKey: [loadMyDataKey],
      });
      dispatch(SET_USER(response.user));
      setApiError(null);
      router.push("/");
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        setApiError(error.response?.data);
      }
    },
  });

  const {
    register,
    handleSubmit,
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
    <>
      <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20'>
        <div className='relative mx-auto max-w-4xl grid'>
          <EntryHeader role='login' />
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mx-auto max-w-3xl sm:flex sm:space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]'>
              <div className='hs-tooltip [--placement:bottom] relative pb-2 sm:pb-0 sm:flex-[1_0_0%]'>
                <label htmlFor='email' className='block text-sm font-medium dark:text-white'>
                  <span className='sr-only'>User Email</span>
                </label>

                <input
                  type='text'
                  id='email'
                  className='hs-tooltip-toggle py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600'
                  placeholder='이메일'
                  disabled={isLocalLoginSuccess}
                  defaultValue={DEVELOPMENT ? "yjgdesign@gmail.com" : ""}
                  {...register("email", {
                    required: "이메일을 입력해주세요.",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                      message: "이메일 형식이 아닙니다.",
                    },
                  })}
                />
                <Tooltip content={errors.email?.message || apiError?.email} />
                {(errors.email || apiError?.email) && (
                  <RiErrorWarningFill
                    size={RiSize.sm}
                    className='absolute my-auto inset-y-0 end-2.5 text-red-500'
                  />
                )}
              </div>

              <div className='hs-tooltip [--placement:bottom] relative pt-2 sm:pt-0 sm:ps-3 border-t border-gray-200 sm:border-t-0 sm:border-s sm:flex-[1_0_0%] dark:border-gray-700'>
                <label htmlFor='password' className='block text-sm font-medium dark:text-white'>
                  <span className='sr-only'>User Password</span>
                </label>
                <input
                  type='password'
                  id='password'
                  className='hs-tooltip-toggle py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600'
                  placeholder='비밀번호'
                  disabled={isLocalLoginSuccess}
                  defaultValue={DEVELOPMENT ? "Ab2@" : ""}
                  {...register("password", {
                    required: "비밀번호를 입력해주세요.",
                  })}
                />
                <Tooltip content={errors.password?.message} />
                {errors.password && (
                  <RiErrorWarningFill
                    size={RiSize.sm}
                    className='absolute my-auto inset-y-0 end-2.5 text-red-500'
                  />
                )}
              </div>

              <div className='pt-2 sm:pt-0 grid sm:block sm:flex-[0_0_auto] relative'>
                <button
                  className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                  type='submit'
                  disabled={isLocalLoginPending || isLocalLoginSuccess}
                >
                  로그인
                </button>
                {isLocalLoginPending && <LoadingSpinner backdrop={true} />}
              </div>
            </div>

            <p className='max-w-3xl mx-auto flex justify-end mt-5 text-sm text-gray-600 dark:text-gray-200'>
              아직 계정이 없으신가요?
              <Link
                href={"/entry/register"}
                className='ml-1 text-primary-500 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                회원가입
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
