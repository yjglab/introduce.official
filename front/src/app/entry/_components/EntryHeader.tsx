import { UserAvatar } from "@app/_common/Parts/UserAvatar";
import { FC } from "react";

interface Props {
  role: "register" | "login";
}

const EntryHeader: FC<Props> = ({ role }) => {
  return (
    <>
      <div className='text-center'>
        <p className='text-xs font-semibold text-gray-500 tracking-wide uppercase mb-3 dark:text-gray-200'>
          {role === "register" ? "REGISTER OUR MEMBERS" : "LOGIN TO YOUR SPACE"}
        </p>
        <h1 className='text-3xl text-gray-800 font-bold sm:text-5xl lg:text-6xl lg:leading-tight dark:text-gray-200'>
          {role === "register" ? "회원가입" : "로그인"}
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
          <div className='text-sm text-gray-400'>
            {role === "register"
              ? "수많은 회원들에게 작품을 인트로듀스 하세요!"
              : "수많은 회원들이 당신을 기다리고 있어요!"}
          </div>
        </div>
      </div>
    </>
  );
};

export default EntryHeader;
