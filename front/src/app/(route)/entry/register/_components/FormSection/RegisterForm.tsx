"use client";

import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { DEVELOPMENT } from "@/utils/constants";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { registerAPI } from "@api/auth";
import { useRouter } from "next/navigation";
import Modal from "@app/_common/Modal";
import LoadingSpinner from "@app/_common/Parts/LoadingSpinner";
import Tooltip from "@app/_common/Parts/Tooltip";
import { RiCheckLine, RiCloseLine, RiErrorWarningFill } from "@remixicon/react";
import { RiSM } from "@constants";
import { UserAvatar } from "@app/_common/Parts/UserAvatar";
import Link from "next/link";

interface Props {}
interface RegisterValues {
  email: string;
  password: string;
  passwordCheck: string;
  position: string;
  displayName: string;
  term: boolean;
}

// avatar svg hydration 불일치 문제 있음
const RegisterForm: FC<Props> = () => {
  const [apiError, setApiError] = useState<{ [key: string]: string } | null>(null);
  const router = useRouter();

  const {
    mutate: localRegisterMutate,
    isPending: isLocalRegisterPending,
    isSuccess: isLocalRegisterSuccess,
    data: me,
  } = useMutation({
    mutationFn: registerAPI,
    onSuccess: () => {
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
    getValues,
    watch,
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
    router.push("/login");
  };

  return (
    <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-20'>
      {isLocalRegisterSuccess && (
        <Modal
          title='회원가입 완료'
          description={`${me.user.displayName}님, 회원가입 되었습니다. 이메일 함에서 인증 후 정상 이용 가능합니다.`}
          callback={submitCallback}
          externalClick={false}
        ></Modal>
      )}
      <div className='relative mx-auto max-w-4xl grid'>
        <div className='text-center'>
          <p className='text-xs font-semibold text-gray-500 tracking-wide uppercase mb-3 dark:text-gray-200'>
            REGISTER OUR MEMBERS
          </p>
          <h1 className='text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight dark:text-gray-200'>
            회원가입
          </h1>
        </div>

        <div className='sm:flex sm:justify-center sm:items-center text-center sm:text-start mt-12 mb-32'>
          <div className='flex-shrink-0 pb-5 sm:flex sm:pb-0 sm:pe-5'>
            <div className='flex justify-center -space-x-3'>
              <UserAvatar displayName='a.com' />
              <UserAvatar displayName='b.com' />
              <UserAvatar displayName='c.com' />
              <UserAvatar displayName='d.com' />
              <span className='inline-flex items-center justify-center h-12 w-12 rounded-full ring-2 ring-white bg-gray-800 dark:bg-gray-900 dark:ring-gray-800'>
                <span className='text-xs font-medium leading-none text-white uppercase'>10k+</span>
              </span>
            </div>
          </div>

          <div className='border-t sm:border-t-0 sm:border-s border-gray-200 w-32 h-px sm:w-auto sm:h-full mx-auto sm:mx-0'></div>

          <div className='pt-5 sm:pt-0 sm:ps-5'>
            <div className='text-lg font-semibold text-gray-800 dark:text-gray-200'>Let's Introduce!</div>
            <div className='text-sm text-gray-400'>수많은 회원들에게 여러분을 인트로듀스 하세요!</div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=' flex flex-col items-center mb-10'>
            <div className='hs-tooltip hs-tooltip-toggle [--placement:top] '>
              <UserAvatar displayName={watch("displayName")} size='xl' />
              <Tooltip content='아바타는 프로필에서 커스텀 가능합니다' />
            </div>
            <div className='hs-tooltip [--placement:bottom] relative mt-4'>
              <label htmlFor='displayName' className='block text-sm font-medium'>
                <span className='sr-only'>User Display Name</span>
              </label>
              <div className='relative'>
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
                  className='hs-tooltip-toggle text-center block w-full bg-transparent border-t-transparent border-b-2 border-x-transparent border-b-gray-200 focus:border-t-transparent focus:border-x-transparent focus:ring-0 disabled:opacity-50 disabled:pointer-events-none dark:border-b-gray-700 dark:text-gray-200 dark:focus:ring-gray-600 dark:focus:border-b-gray-400'
                  placeholder='표시 이름'
                />
              </div>
              <Tooltip content={errors.displayName?.message || apiError?.displayName} />
              {(errors.displayName || apiError?.displayName) && (
                <RiErrorWarningFill size={RiSM} className='absolute my-auto inset-y-0 end-2.5 text-red-500' />
              )}
            </div>
          </div>

          <div className='mx-auto max-w-4xl sm:flex sm:space-x-3 p-3 bg-white border rounded-lg shadow-lg shadow-gray-100 dark:bg-slate-900 dark:border-gray-700 dark:shadow-gray-900/[.2]'>
            <div className='hs-tooltip [--placement:bottom] relative pb-2 sm:pb-0 sm:flex-[1_0_0%]'>
              <label htmlFor='email' className='block text-sm font-medium dark:text-white'>
                <span className='sr-only'>User Email</span>
              </label>

              <input
                type='text'
                id='email'
                className='hs-tooltip-toggle py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600'
                placeholder='이메일'
                disabled={isLocalRegisterSuccess}
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
                <RiErrorWarningFill size={RiSM} className='absolute my-auto inset-y-0 end-2.5 text-red-500' />
              )}
            </div>

            <div className='hs-tooltip [--placement:bottom] relative pt-2 sm:pt-0 sm:ps-3 border-t border-gray-200 sm:border-t-0 sm:border-s sm:flex-[1_0_0%] dark:border-gray-700'>
              <label htmlFor='password' className='block text-sm font-medium dark:text-white'>
                <span className='sr-only'>User Password</span>
              </label>
              <input
                defaultValue={DEVELOPMENT ? "Ab2@" : ""}
                type='password'
                id='password'
                className='hs-tooltip-toggle py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600'
                placeholder='비밀번호'
                disabled={isLocalRegisterSuccess}
                {...register("password", {
                  required: "비밀번호를 입력해주세요.",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#.~_-])[A-Za-z\d@$!%*?&#.~_-]{3,14}$/,
                    message: "비밀번호 형식을 준수해주세요.",
                  },
                })}
              />
              <Tooltip content={errors.password?.message} />
              {errors.password && (
                <RiErrorWarningFill size={RiSM} className='absolute my-auto inset-y-0 end-2.5 text-red-500' />
              )}

              <div
                id='password-popover'
                className='hidden absolute w-full z-10 bg-gray-50 rounded-lg p-4 dark:bg-slate-900'
              >
                <div
                  data-hs-strong-password='{
                        "target": "#password",
                        "hints": "#password-popover",
                        "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-gray-400 opacity-40 mx-1",
                        "mode": "popover",
                        "minLength": "3"
                      }'
                  className='flex -mx-1 mb-3'
                />
                <ul className='space-y-1 text-sm text-gray-500'>
                  <li
                    data-hs-strong-password-hints-rule-text='min-length'
                    className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                  >
                    <span className='hidden' data-check>
                      <RiCheckLine size={RiSM} />
                    </span>
                    <span data-uncheck>
                      <RiCloseLine size={RiSM} />
                    </span>
                    최소 3~14자가 필요합니다.
                  </li>
                  <li
                    data-hs-strong-password-hints-rule-text='lowercase'
                    className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                  >
                    <span className='hidden' data-check>
                      <RiCheckLine size={RiSM} />
                    </span>
                    <span data-uncheck>
                      <RiCloseLine size={RiSM} />
                    </span>
                    영문 소문자를 포함해야 합니다.
                  </li>
                  <li
                    data-hs-strong-password-hints-rule-text='uppercase'
                    className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                  >
                    <span className='hidden' data-check>
                      <RiCheckLine size={RiSM} />
                    </span>
                    <span data-uncheck>
                      <RiCloseLine size={RiSM} />
                    </span>
                    영문 대문자를 포함해야 합니다.
                  </li>
                  <li
                    data-hs-strong-password-hints-rule-text='numbers'
                    className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                  >
                    <span className='hidden' data-check>
                      <RiCheckLine size={RiSM} />
                    </span>
                    <span data-uncheck>
                      <RiCloseLine size={RiSM} />
                    </span>
                    숫자를 포함해야 합니다.
                  </li>
                  <li
                    data-hs-strong-password-hints-rule-text='special-characters'
                    className='hs-strong-password-active:text-teal-500 flex items-center gap-x-2'
                  >
                    <span className='hidden' data-check>
                      <RiCheckLine size={RiSM} />
                    </span>
                    <span data-uncheck>
                      <RiCloseLine size={RiSM} />
                    </span>
                    특수문자를 포함해야 합니다.
                  </li>
                </ul>
              </div>
            </div>

            <div className='hs-tooltip [--placement:bottom] relative pt-2 sm:pt-0 sm:ps-3 border-t border-gray-200 sm:border-t-0 sm:border-s sm:flex-[1_0_0%] dark:border-gray-700'>
              <label htmlFor='position' className='block text-sm font-medium dark:text-white'>
                <span className='sr-only'>User Position</span>
              </label>
              <select
                {...register("position", {
                  validate: {
                    matched: (value) => value !== "직무 선택" || "직무를 선택해주세요.",
                  },
                  required: "직무를 선택해주세요.",
                })}
                disabled={isLocalRegisterSuccess}
                id='position'
                className='hs-tooltip-toggle py-3 px-4 block w-full border-transparent rounded-lg text-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-slate-900 dark:border-transparent dark:text-gray-400 dark:focus:ring-gray-600'
              >
                <option>직무 선택</option>
                <option>개발자</option>
                <option>디자이너</option>
              </select>
              <Tooltip content={errors.position?.message} />
              {errors.position && (
                <RiErrorWarningFill size={RiSM} className='absolute my-auto inset-y-0 end-2.5 text-red-500' />
              )}
            </div>

            <div className='pt-2 sm:pt-0 grid sm:block sm:flex-[0_0_auto] relative'>
              <button
                className='py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                type='submit'
                disabled={isLocalRegisterPending || isLocalRegisterSuccess}
              >
                등록하기
              </button>
              {isLocalRegisterPending && <LoadingSpinner backdrop={true} />}
            </div>
          </div>

          <div className='mt-5 flex justify-between'>
            <label htmlFor='term' className='text-sm dark:text-white flex gap-1'>
              <input
                {...register("term", { required: true })}
                disabled={isLocalRegisterSuccess}
                id='term'
                name='term'
                type='checkbox'
                className='shrink-0 mt-0.5 border-gray-200 rounded text-primary-600 pointer-events-none focus:ring-primary-500 dark:bg-slate-900 dark:border-gray-700 dark:checked:bg-gray-500 dark:checked:border-primary-500 dark:focus:ring-offset-gray-800'
              />
              <div className='ms-1 flex'>
                <a
                  className='text-primary-500 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                  href='#'
                >
                  개인정보수집 및 활용동의서
                </a>
                에 동의합니다
                {errors.term && <RiErrorWarningFill size={RiSM} className='ml-1.5 my-auto text-red-500' />}
              </div>
            </label>

            <p className='text-sm text-gray-600 dark:text-gray-200'>
              이미 계정이 있으신가요?
              <Link
                href={"/login"}
                className='ml-1 text-primary-500 decoration-2 hover:underline font-medium dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                로그인
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
