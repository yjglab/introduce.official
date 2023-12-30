"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import SocialAuth from "./SocialAuth";
import { DEVELOPMENT } from "@/utils/constants";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "@api/auth";
import { useDispatch } from "react-redux";
import { SET_USER } from "@/store/slices/user.slice";
import { useRouter } from "next/navigation";
import Modal from "@app/_common/_Modal";
import LoadingSpinner from "@app/_common/_Parts/LoadingSpinner";
import Tooltip from "@app/_common/_Parts/Tooltip";

interface Props {
  setFormType: (type: "login" | "register") => void;
}
interface RegisterValues {
  email: string;
  password: string;
  passwordCheck: string;
  position: string;
  displayName: string;
  term: boolean;
}

const RegisterForm: FC<Props> = ({ setFormType }) => {
  const [apiError, setApiError] = useState<{ [key: string]: string } | null>(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    mutate: localRegisterMutate,
    isPending: isLocalRegisterPending,
    isSuccess: isLocalRegisterSuccess,
    data: me,
  } = useMutation({
    mutationFn: registerAPI,
    onSuccess: (response) => {
      dispatch(SET_USER(response.user));
      setApiError(null);
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
    reset,
    getValues,
    formState: { errors },
  } = useForm<RegisterValues>();

  const onSubmit = (values: RegisterValues) => {
    const { email, displayName, password, position } = values;
    try {
      localRegisterMutate({ email, displayName, password, position });
    } catch (err: any) {
      console.log("ERROR", err);
    }
  };

  const submitCallback = () => {
    router.push("/");
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {isLocalRegisterSuccess && (
        <Modal
          title='회원가입 완료'
          description={`${me.user.displayName}님, 회원가입 되었습니다. 이메일 함에서 인증 후 정상 이용 가능합니다.`}
          callback={submitCallback}
          externalClick={false}
        ></Modal>
      )}

      <div className='lg:max-w-lg lg:mx-auto lg:me-0 ms-auto'>
        <div className='p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-slate-900'>
          <div className='text-center'>
            <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>가입하기</h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              이미 계정이 있으신가요?
              <button
                type='button'
                onClick={() => setFormType("login")}
                className='ml-1 text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                로그인
              </button>
            </p>
          </div>

          <div className='mt-5'>
            <SocialAuth />
            <div className='py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-700 dark:after:border-gray-700'>
              Or
            </div>

            <div className='grid grid-cols-2 gap-4'>
              {/* 이메일 */}
              <div className='hs-tooltip [--placement:bottom] '>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    {...register("email", {
                      required: "이메일을 입력해주세요.",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                        message: "이메일 형식이 아닙니다.",
                      },
                    })}
                    disabled={isLocalRegisterSuccess}
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

              {/* 표시 이름 */}
              <div className='hs-tooltip [--placement:bottom] '>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    {...register("displayName", {
                      required: "표시 이름을 입력해주세요.",
                      pattern: {
                        value: /^(?=.*[a-zA-Z0-9가-힣])[a-zA-Z0-9가-힣]{3,12}$/,
                        message: "3~12자 이하의 영문 소문자, 숫자 또는 한글로 구성되어야 합니다",
                      },
                    })}
                    disabled={isLocalRegisterSuccess}
                    type='text'
                    id='displayName'
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
                    htmlFor='displayName'
                    className='absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500'
                  >
                    표시 이름
                  </label>
                  <Tooltip content={errors.displayName?.message || apiError?.displayName} />
                  {(errors.displayName || apiError?.displayName) && (
                    <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <i className='bi bi-exclamation-circle text-red-500 flex-shrink-0'></i>
                    </div>
                  )}
                </div>
              </div>

              {/* 비밀번호 */}
              <div className='hs-tooltip [--placement:bottom] relative col-span-full'>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    {...register("password", {
                      required: "비밀번호를 입력해주세요.",
                      pattern: {
                        value:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{3,14}$/,
                        message: "비밀번호 형식을 준수해주세요.",
                      },
                    })}
                    disabled={isLocalRegisterSuccess}
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
                  <Tooltip content={errors.password?.message} />
                  {errors.password && (
                    <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <i className='bi bi-exclamation-circle text-red-500 flex-shrink-0'></i>
                    </div>
                  )}
                </div>

                <div
                  id='password-popover'
                  className='hidden absolute z-10 w-full bg-blue-50 rounded-lg p-4 dark:bg-blue-950'
                >
                  <div
                    id='hs-strong-password-in-popover'
                    data-hs-strong-password='{
              "target": "#password",
              "hints": "#password-popover",
              "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blue-500 opacity-50 mx-1",
              "mode": "popover",
              "minLength": "3"
            }'
                    className='flex mt-2 -mx-1'
                  />

                  <h4 className='mt-3 text-sm font-semibold text-gray-800 dark:text-white'>
                    비밀번호는 다음의 규칙을 준수해야 합니다.
                  </h4>

                  <ul className='space-y-1 text-sm text-gray-500'>
                    <li
                      data-hs-strong-password-hints-rule-text='min-length'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <i className='bi bi-check-lg text-teal-500'></i>
                      </span>
                      <span data-uncheck>
                        <i className='bi bi-check-lg'></i>
                      </span>
                      최소 3~14자가 필요합니다.
                    </li>
                    <li
                      data-hs-strong-password-hints-rule-text='lowercase'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <i className='bi bi-check-lg text-teal-500'></i>
                      </span>
                      <span data-uncheck>
                        <i className='bi bi-check-lg'></i>
                      </span>
                      영문 소문자를 포함해야 합니다.
                    </li>
                    <li
                      data-hs-strong-password-hints-rule-text='uppercase'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <i className='bi bi-check-lg text-teal-500'></i>
                      </span>
                      <span data-uncheck>
                        <i className='bi bi-check-lg'></i>
                      </span>
                      영문 대문자를 포함해야 합니다.
                    </li>
                    <li
                      data-hs-strong-password-hints-rule-text='numbers'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <i className='bi bi-check-lg text-teal-500'></i>
                      </span>
                      <span data-uncheck>
                        <i className='bi bi-check-lg'></i>
                      </span>
                      숫자를 포함해야 합니다.
                    </li>
                    <li
                      data-hs-strong-password-hints-rule-text='special-characters'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <i className='bi bi-check-lg text-teal-500'></i>
                      </span>
                      <span data-uncheck>
                        <i className='bi bi-check-lg'></i>
                      </span>
                      특수문자를 포함해야 합니다.
                    </li>
                  </ul>
                </div>
              </div>

              {/* 비밀번호 확인 */}
              <div className='hs-tooltip [--placement:bottom] col-span-full'>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    {...register("passwordCheck", {
                      validate: {
                        matched: (value) =>
                          value === getValues("password") || "비밀번호가 일치하지 않습니다.",
                      },
                      required: "비밀번호가 일치하지 않습니다.",
                    })}
                    disabled={isLocalRegisterSuccess}
                    type='password'
                    id='passwordCheck'
                    defaultValue={DEVELOPMENT ? "Ab2@" : ""}
                    className='peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2'
                    placeholder=''
                  />
                  <Tooltip content={errors.passwordCheck?.message} />
                  {errors.passwordCheck && (
                    <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <i className='bi bi-exclamation-circle text-red-500 flex-shrink-0'></i>
                    </div>
                  )}
                  <label
                    htmlFor='passwordCheck'
                    className='absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500'
                  >
                    비밀번호 확인
                  </label>
                </div>
              </div>

              {/* Position 선택 */}
              <div className='hs-tooltip [--placement:bottom] col-span-full'>
                <div className='hs-tooltip-toggle relative'>
                  <select
                    {...register("position", {
                      validate: {
                        matched: (value) =>
                          value === "개발자" || value === "디자이너" || "직무를 선택해주세요.",
                      },
                      required: "직무를 선택해주세요.",
                    })}
                    disabled={isLocalRegisterSuccess}
                    id='position'
                    className='peer p-4 pe-9 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
                    focus:pt-6
                    focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6
                    [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6
                    autofill:pb-2'
                  >
                    <option>직무를 선택해주세요</option>
                    <option>개발자</option>
                    <option>디자이너</option>
                  </select>
                  <label
                    className='absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                    peer-focus:text-xs
                    peer-focus:-translate-y-1.5
                    peer-focus:text-gray-500
                    peer-[:not(:placeholder-shown)]:text-xs
                    peer-[:not(:placeholder-shown)]:-translate-y-1.5
                    peer-[:not(:placeholder-shown)]:text-gray-500'
                  >
                    직무 선택
                  </label>
                  <Tooltip content={errors.position?.message} />
                  {errors.position && (
                    <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <i className='bi bi-exclamation-circle text-red-500 flex-shrink-0'></i>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* 약관 확인 */}
            <div className='mt-5 flex items-center'>
              <label htmlFor='term' className='text-sm dark:text-white flex gap-1'>
                <input
                  {...register("term", { required: true })}
                  disabled={isLocalRegisterSuccess}
                  id='term'
                  name='term'
                  type='checkbox'
                  className='shrink-0 mt-0.5 border-gray-200 rounded text-blue-600 pointer-events-none focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:checked:bg-blue-500 dark:checked:border-blue-500 dark:focus:ring-offset-gray-800'
                />
                <div className='ms-1 flex'>
                  <a
                    className='text-blue-600 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    href='#'
                  >
                    개인정보수집 및 활용동의서
                  </a>
                  에 동의합니다
                  {errors.term && (
                    <div className='ml-1 inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                      <i className='bi bi-exclamation-circle text-red-500 flex-shrink-0'></i>
                    </div>
                  )}
                </div>
              </label>
            </div>

            {/* 제출 */}
            <div className='mt-5 relative'>
              <button
                type='submit'
                disabled={isLocalRegisterPending || isLocalRegisterSuccess}
                className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                회원가입
              </button>
              {isLocalRegisterPending && <LoadingSpinner backdrop={true} />}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;
