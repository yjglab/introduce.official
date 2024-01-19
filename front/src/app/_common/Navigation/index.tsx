"use client";

import Link from "next/link";
import { memo } from "react";
import SiteMenu from "./SiteMenu";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { loadMeAPI, logoutAPI } from "@api/auth";
import { LOGOUT } from "@/store/slices/user.slice";
import ThemeSwitcher from "./ThemeSwitcher";
import { RiCloseFill, RiMenu3Line, RiUser3Line, RiUserShared2Line } from "@remixicon/react";
import { RiSize } from "@constants/styles";
import { loadMyDataKey } from "@constants/queryKey";
import NoticeBox from "../NoticeBox";

const Navigation = memo(() => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data: me } = useQuery({
    queryKey: [loadMyDataKey],
    queryFn: loadMeAPI,
    staleTime: Infinity,
    gcTime: Infinity,
  });

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
    <header className='flex fixed top-0 flex-wrap md:justify-start md:flex-nowrap z-50 bg-white text-sm py-3 md:py-0 dark:bg-gray-800 w-screen sm:pr-[15px]'>
      {isLogoutSuccess && <NoticeBox description='로그아웃 되었습니다' externalClick={true}></NoticeBox>}

      <nav className='max-w-7xl w-full mx-auto px-4' aria-label='Global'>
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
                <span className='hs-collapse-open:hidden'>
                  <RiMenu3Line size={RiSize.sm} />
                </span>
                <span className='hs-collapse-open:block hidden'>
                  <RiCloseFill size={RiSize.sm} />
                </span>
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
                <Link
                  className='font-medium text-gray-900 hover:text-gray-500 py-3 md:py-6 dark:text-gray-300 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                  href='/upgrades'
                >
                  Upgrade Plans
                </Link>
                <SiteMenu />
                <div className='pt-3 md:pt-0'>
                  {me ? (
                    <button
                      onClick={handleLogout}
                      className='py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    >
                      <RiUserShared2Line size={RiSize.sm} />
                      로그아웃
                    </button>
                  ) : (
                    <Link
                      className='py-2.5 px-4 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-50 disabled:pointer-events-none dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                      href='/entry'
                    >
                      <RiUser3Line size={RiSize.sm} />
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
