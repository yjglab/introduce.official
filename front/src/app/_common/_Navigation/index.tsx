"use client";

import Link from "next/link";
import { memo } from "react";
import SiteMenu from "./SiteMenu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logoutAPI } from "@api/auth";
import { LOGOUT } from "@/store/slices/user.slice";
import Modal from "../_Modal";
import ThemeSwitcher from "./ThemeSwitcher";

const Navigation = memo(() => {
  const { authenticated } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: logoutMutate, isSuccess: isLogoutSuccess } = useMutation({
    mutationFn: logoutAPI,
    onSuccess: () => {
      dispatch(LOGOUT());
      queryClient.clear();
    },
  });

  const handleLogout = () => {
    logoutMutate();
  };

  return (
    <header className='flex fixed top-0 flex-wrap md:justify-start md:flex-nowrap z-50 w-full bg-white text-sm py-3 md:py-0 dark:bg-gray-800'>
      {isLogoutSuccess && <Modal description='로그아웃 되었습니다' externalClick={true}></Modal>}

      <nav className='max-w-[85rem] w-full mx-auto px-4 md:px-6 lg:px-8' aria-label='Global'>
        <div className='relative md:flex md:items-center md:justify-between'>
          <div className='flex items-center justify-between'>
            <a
              className='flex-none text-xl font-semibold dark:text-white dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              href='#'
              aria-label='Brand'
            >
              introduce
            </a>
            <div className='md:hidden'>
              <button
                type='button'
                className='hs-collapse-toggle flex justify-center items-center w-9 h-9 text-sm font-semibold rounded-lg border border-gray-200 text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                data-hs-collapse='#navbar-collapse-with-animation'
                aria-controls='navbar-collapse-with-animation'
                aria-label='Toggle navigation'
              >
                <i className='text-[18px] bi bi-list hs-collapse-open:hidden'></i>
                <i className='text-[22px] bi bi-x hs-collapse-open:block hidden'></i>
              </button>
            </div>
          </div>

          <div
            id='navbar-collapse-with-animation'
            className='hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow md:block'
          >
            <div className='overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-slate-700 dark:[&::-webkit-scrollbar-thumb]:bg-slate-500'>
              <div className='flex flex-col gap-x-0 mt-5 divide-y divide-dashed divide-gray-200 md:flex-row md:items-center md:justify-end md:gap-x-7 md:mt-0 md:ps-7 md:divide-y-0 md:divide-solid dark:divide-gray-700'>
                <ThemeSwitcher />
                <Link
                  className='font-medium text-gray-900 hover:text-gray-500 py-3 md:py-6 dark:text-gray-300 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                  href='/'
                >
                  홈
                </Link>
                <SiteMenu />
                <div className='pt-3 md:pt-0'>
                  {authenticated ? (
                    <button
                      onClick={handleLogout}
                      className='py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    >
                      <i className='text-[16px] bi bi-door-closed-fill'></i>
                      로그아웃
                    </button>
                  ) : (
                    <Link
                      className='py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                      href='/auth'
                    >
                      <i className='text-[16px] bi bi-person-fill'></i>
                      로그인 / 회원가입
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Navigation;
