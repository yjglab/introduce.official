import { FC, useState } from "react";
import useLocalRegister from "@hooks/mutations/auth/useLocalRegister";
import { ErrorField } from "@components/Common/ErrorField";

import { useForm } from "react-hook-form";
import Tooltip from "@components/Common/Tooltip";
import InputError from "@components/Common/Icons/InputError";
import InputUnchecked from "@components/Common/Icons/InputUnchecked";
import InputChecked from "@components/Common/Icons/InputChecked";
import SocialAuth from "./SocialAuth";

interface Props {
  setFormType: (type: "login" | "register") => void;
}
interface RegisterValues {
  email: string;
  password: string;
  position: string;
  displayName: string;
}

const RegisterForm: FC<Props> = ({ setFormType }) => {
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

  // const registerError = {
  //   email: Yup.string()
  //     .email("C:이메일 형식이어야 합니다")
  //     .required("C:이메일은 비워둘 수 없거나 공백일 수 없습니다"),
  //   password: Yup.string()
  //     .required("C:비밀번호는 비워둘 수 없거나 공백일 수 없습니다")
  //     .min(3, "C:비밀번호는 3자리에서 14자리 사이이어야 합니다")
  //     .max(14, "C:비밀번호는 3자리에서 14자리 사이이어야 합니다"),
  //   position: Yup.string().required("소속된 직무를 선택해야 합니다"),
  //   displayName: Yup.string()
  //     .required("C:표시 이름은 비워둘 수 없거나 공백일 수 없습니다")
  //     .min(3, "C:표시 이름은 3자리에서 12자리 사이이어야 합니다")
  //     .max(12, "C:표시 이름은 3자리에서 12자리 사이이어야 합니다"),
  // };

  const onSubmit = (values: RegisterValues) => {
    console.log(values);
    try {
      localRegisterMutate(values);
      if (isLocalRegisterError) {
        // setAPIErrors(localRegisterError);
      }
      if (me) {
        // router.push("/me");
        console.log("register 성공");
      }
    } catch (err: any) {
      console.log("ERROR", err);
    }
  };

  return (
    <form>
      <div className='lg:max-w-lg lg:mx-auto lg:me-0 ms-auto'>
        <div className='p-4 sm:p-7 flex flex-col bg-white rounded-2xl shadow-lg dark:bg-slate-900'>
          <div className='text-center'>
            <h1 className='block text-2xl font-bold text-gray-800 dark:text-white'>가입하기</h1>
            <p className='mt-2 text-sm text-gray-600 dark:text-gray-400'>
              이미 계정이 있으신가요?
              <button
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
              <div className='hs-tooltip [--placement:bottom] '>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    type='email'
                    id='hs-hero-signup-form-floating-input-email'
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
                    htmlFor='hs-hero-signup-form-floating-input-email'
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
                  <Tooltip content='이메일 형식이 아닙니다' />
                  <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                    <InputError />
                  </div>
                </div>
              </div>

              <div className='hs-tooltip [--placement:bottom] '>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    type='text'
                    id='hs-hero-signup-form-floating-input-last-name'
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
                    htmlFor='hs-hero-signup-form-floating-input-last-name'
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
                  <Tooltip content='최소 3~12자가 필요합니다.' />
                  <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                    <InputError />
                  </div>
                </div>
              </div>

              <div className='relative col-span-full'>
                <div className='relative'>
                  <input
                    type='password'
                    id='hs-hero-signup-form-floating-input-new-password'
                    className='peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2'
                    placeholder=''
                  />
                  <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                    <InputError />
                  </div>
                  <label
                    htmlFor='hs-hero-signup-form-floating-input-new-password'
                    className='absolute top-0 start-0 p-4 h-full text-sm truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
            peer-focus:text-xs
            peer-focus:-translate-y-1.5
            peer-focus:text-gray-500
            peer-[:not(:placeholder-shown)]:text-xs
            peer-[:not(:placeholder-shown)]:-translate-y-1.5
            peer-[:not(:placeholder-shown)]:text-gray-500'
                  >
                    새 비밀번호
                  </label>
                </div>

                <div
                  id='hs-strong-password-popover'
                  className='hidden absolute z-10 w-full bg-blue-50 rounded-lg p-4 dark:bg-blue-950'
                >
                  <div
                    id='hs-strong-password-in-popover'
                    data-hs-strong-password='{
              "target": "#hs-hero-signup-form-floating-input-new-password",
              "hints": "#hs-strong-password-popover",
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
                        <InputUnchecked />
                      </span>
                      <span data-uncheck>
                        <InputChecked />
                      </span>
                      최소 3~14자가 필요합니다.
                    </li>
                    <li
                      data-hs-strong-password-hints-rule-text='lowercase'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <InputUnchecked />
                      </span>
                      <span data-uncheck>
                        <InputChecked />
                      </span>
                      영문 소문자를 포함해야 합니다.
                    </li>
                    <li
                      data-hs-strong-password-hints-rule-text='uppercase'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <InputUnchecked />
                      </span>
                      <span data-uncheck>
                        <InputChecked />
                      </span>
                      영문 대문자를 포함해야 합니다.
                    </li>
                    <li
                      data-hs-strong-password-hints-rule-text='numbers'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <InputUnchecked />
                      </span>
                      <span data-uncheck>
                        <InputChecked />
                      </span>
                      숫자를 포함해야 합니다.
                    </li>
                    <li
                      data-hs-strong-password-hints-rule-text='special-characters'
                      className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                    >
                      <span className='hidden' data-check>
                        <InputUnchecked />
                      </span>
                      <span data-uncheck>
                        <InputChecked />
                      </span>
                      특수문자를 포함해야 합니다.
                    </li>
                  </ul>
                </div>
              </div>

              <div className='hs-tooltip [--placement:bottom] col-span-full'>
                <div className='hs-tooltip-toggle relative'>
                  <input
                    type='password'
                    id='hs-hero-signup-form-floating-input-current-password'
                    className='peer border p-4 block w-full border-gray-200 rounded-lg text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400 dark:focus:ring-gray-600
          focus:pt-6
          focus:pb-2
          [&:not(:placeholder-shown)]:pt-6
          [&:not(:placeholder-shown)]:pb-2
          autofill:pt-6
          autofill:pb-2'
                    placeholder=''
                  />
                  <Tooltip content='비밀번호가 일치하지 않습니다' />
                  <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                    <InputError />
                  </div>
                  <label
                    htmlFor='hs-hero-signup-form-floating-input-current-password'
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
            </div>

            <div className='mt-5 flex items-center'>
              <label htmlFor='term' className='text-sm dark:text-white flex gap-1'>
                <input
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
                  <div className='ml-2 inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                    <InputError />
                  </div>
                </div>
              </label>
            </div>

            <div className='mt-5'>
              <button
                type='submit'
                className='w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                회원가입
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default RegisterForm;

/*
<form onSubmit={handleSubmit(onSubmit)} className=''>
        <div>
          <div className='flex gap-y-4'>
            <label htmlFor='email-address' className='sr-only'>
              Email address
            </label>
            <span>이메일</span>
            <div>
              <label
                htmlFor='hs-validation-name-error'
                className='block text-sm font-medium mb-2 dark:text-white'
              >
                Email
              </label>
              <span className='block text-sm text-gray-500 mb-2'>Optional</span>
              <div className='relative'>
                <input
                  type='text'
                  id='hs-validation-name-error'
                  name='hs-validation-name-error'
                  className='py-3 px-4 block w-full border-red-500 rounded-lg text-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                  required
                  aria-describedby='hs-validation-name-error-helper'
                />
                <div className='absolute inset-y-0 end-0 flex items-center pointer-events-none pe-3'>
                  <svg
                    className='flex-shrink-0 h-4 w-4 text-red-500'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  >
                    <circle cx='12' cy='12' r='10' />
                    <line x1='12' x2='12' y1='8' y2='12' />
                    <line x1='12' x2='12.01' y1='16' y2='16' />
                  </svg>
                </div>
              </div>
              <p className='text-sm text-red-600 mt-2' id='hs-validation-name-error-helper'>
                Please enter a valid email address.
              </p>
            </div>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "이메일 형식이 아닙니다.",
                },
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
            <label htmlFor='displayName' className='sr-only'>
              displayName
            </label>
            <span>사용자명</span>
            <input
              {...register("displayName", {
                required: true,
                maxLength: {
                  value: 10,
                  message: "사용자명 제한",
                },
              })}
              id='displayName'
              required
              className='border border-black'
              placeholder='작성해주세요'
              size={30}
              type='text'
              autoComplete='displayName'
              disabled={false}
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
                maxLength: 14,
              })}
              id='password'
              required
              className='border border-black'
              placeholder='작성해주세요'
              size={30}
              type='password'
              autoComplete='password'
              disabled={false}
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

        <button type='submit' className='disabled:opacity-50 bg-white' disabled={false}>
          가입
        </button>

        {/* <PropagateLoader color='white' loading={false} size={10} /> */
// </form>
// */
