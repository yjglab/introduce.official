"use client";

import { useState } from "react";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

const FormSection = () => {
  const [formType, setFormType] = useState<"login" | "register">("login");

  return (
    <div className='min-h-screen relative bg-gradient-to-bl from-blue-100 via-transparent dark:to-slate-900 dark:from-blue-950 dark:via-slate-900 '>
      <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        <div className='grid items-center md:grid-cols-2 gap-8 lg:gap-12'>
          <div>
            <p className='inline-block text-sm font-medium bg-clip-text bg-gradient-to-l from-blue-600 to-violet-500 text-transparent dark:from-blue-400 dark:to-violet-400'>
              {formType === "login" ? "Welcome Back Introduce!" : "Welcome Introduce!"}
            </p>

            <div className='mt-4 md:mb-12 max-w-2xl'>
              <h1 className='mb-4 font-semibold text-gray-800 text-4xl lg:text-5xl dark:text-gray-200'>
                {formType === "login" ? "돌아오셨군요!" : "환영합니다!"}
              </h1>
              <p className='text-gray-600 dark:text-gray-400'>
                {formType === "login"
                  ? "회원님이 없는 동안 많은 것들을 준비했어요"
                  : "세상에 내딛는 나의 첫걸음, 인트로듀스"}
              </p>
            </div>
          </div>

          <div>
            {formType === "login" ? (
              <LoginForm setFormType={setFormType} />
            ) : (
              <RegisterForm setFormType={setFormType} />
            )}
          </div>
        </div>
        <div className='mt-6 md:mt-12 py-3 flex items-center text-sm text-gray-800 gap-x-1.5 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-white dark:after:border-gray-700'>
          인트로듀스는 Nebaram과 함께합니다.
        </div>
        <div className='flex flex-wrap gap-x-6 sm:gap-x-12 lg:gap-x-24'></div>
      </div>
    </div>
  );
};

export default FormSection;
