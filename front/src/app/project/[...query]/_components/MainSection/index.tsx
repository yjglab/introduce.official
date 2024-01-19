"use client";

import dateFormatter from "@/utils/dateFormatter";
import { loadMainProjects } from "@api/project";
import { UserAvatar } from "@app/_common/Parts/UserAvatar";
import { loadMainProjectsKey } from "@constants/queryKey";
import { RiSize } from "@constants/styles";
import {
  RiHeart2Line,
  RiLinksLine,
  RiMailSendLine,
  RiMessage3Line,
  RiSendPlaneFill,
  RiShare2Line,
} from "@remixicon/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";

interface Props {
  params: {
    query: [string, string];
  };
}
const MainSection: FC<Props> = ({ params }) => {
  const [project, setProject] = useState<any>({});
  const queryClient = useQueryClient();

  // 나중에 project 1개 로드 api로 바꾸고 서버컴포넌트로 교체
  // 현재 새로고침 시 데이터 클라이언트 측 로드
  useEffect(() => {
    const mainProjects: any = queryClient.getQueryData([loadMainProjectsKey]);
    setProject(mainProjects.find((v: any) => v.id === params.query[1]));
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className='max-w-4xl px-4 pb-12 sm:px-6 lg:px-8 mx-auto'>
        <div className='w-full'>
          <div className='flex justify-between items-center mb-6'>
            <div className='flex w-full sm:items-center gap-x-5 sm:gap-x-3'>
              <div className='flex-shrink-0'>
                <UserAvatar displayName={project?.user?.displayName} />
              </div>

              <div className='grow'>
                <div className='flex justify-between items-center gap-x-2'>
                  <div>
                    <div className='hs-tooltip inline-block [--trigger:hover] [--placement:bottom]'>
                      <div className='hs-tooltip-toggle sm:mb-1 block text-start cursor-pointer'>
                        <span className='font-semibold text-gray-800 dark:text-gray-200'>
                          {project?.user?.displayName}
                        </span>

                        <div
                          className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 min-w-[300px] cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-black'
                          role='tooltip'
                        >
                          <div className='p-4 sm:p-5'>
                            <div className='mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3'>
                              <div className='flex-shrink-0'>
                                <UserAvatar displayName={project?.user?.displayName} />
                              </div>

                              <div className='grow'>
                                <p className='text-lg font-semibold text-gray-200'>
                                  {project?.user?.displayName}
                                </p>
                              </div>
                            </div>
                            <p className='text-sm text-gray-400'>유저 간단소개글</p>
                          </div>

                          <div className='flex justify-between items-center px-4 py-3 sm:px-5'>
                            <ul className='text-xs space-x-3'>
                              <li className='inline-block'>
                                <span className='font-semibold text-gray-200'>16</span>
                                <span className='ml-1 text-gray-400'>Projects</span>
                              </li>
                              <li className='inline-block'>
                                <span className='font-semibold text-gray-200'>107</span>
                                <span className='ml-1 text-gray-400'>Followers</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <ul className='text-xs text-gray-500'>
                      <li className='inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600'>
                        {dateFormatter(project?.createdAt)}
                      </li>
                      <li className='inline-block relative pe-6 last:pe-0 last-of-type:before:hidden before:absolute before:top-1/2 before:end-2 before:-translate-y-1/2 before:w-1 before:h-1 before:bg-gray-300 before:rounded-full dark:text-gray-400 dark:before:bg-gray-600'>
                        {/* ..분전 표시 */}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <button
                      type='button'
                      className='py-1.5 px-2.5 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                    >
                      <RiSendPlaneFill size={RiSize.sm} />
                      라이브 메시지
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-5 md:space-y-8'>
            <div className='space-y-3'>
              <h2 className='text-2xl font-bold md:text-3xl dark:text-white'>{project?.title}</h2>
              <p className='text-lg text-gray-800 dark:text-gray-200 break-words'>{project?.description}</p>
            </div>

            <div className='space-y-3'>
              <h3 className='text-2xl font-semibold dark:text-white'>섹션1 타이틀</h3>
              <p className='text-lg text-gray-800 dark:text-gray-200'>섹션1 디스크립션</p>
            </div>

            <figure>
              <img
                className='w-full object-cover rounded-xl'
                src='https://images.unsplash.com/photo-1619839769929-49455e6b780b?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                alt='섹션1 이미지 설명'
              />
              <figcaption className='mt-3 text-sm text-center text-gray-500'>섹션1 이미지 설명</figcaption>
            </figure>

            <div>
              <button
                type='button'
                className='m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                키워드 1
              </button>
              <button
                type='button'
                className='m-1 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                키워드 2
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className='sticky bottom-6 inset-x-0 text-center'>
        <div className='inline-block bg-white shadow-md rounded-full py-3 px-4 dark:bg-gray-800'>
          <div className='flex items-center gap-x-1.5'>
            <div className='hs-tooltip inline-block'>
              <button
                type='button'
                className='hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                <RiHeart2Line size={RiSize.sm} />
                10
                <span
                  className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-black'
                  role='tooltip'
                >
                  Like
                </span>
              </button>
            </div>

            <div className='block h-3 border-e border-gray-300 mx-3 dark:border-gray-600'></div>

            <div className='hs-tooltip inline-block'>
              <button
                type='button'
                className='hs-tooltip-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                <RiMessage3Line size={RiSize.sm} />
                16
                <span
                  className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm dark:bg-black'
                  role='tooltip'
                >
                  Comment
                </span>
              </button>
            </div>

            <div className='block h-3 border-e border-gray-300 mx-3 dark:border-gray-600'></div>

            <div className='hs-dropdown relative inline-flex'>
              <button
                type='button'
                id='blog-article-share-dropdown'
                className='hs-dropdown-toggle flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
              >
                <RiShare2Line size={RiSize.sm} />
                Share
              </button>
              <div
                className='hs-dropdown-menu w-56 transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden mb-1 z-10 bg-gray-900 shadow-md rounded-xl p-2 dark:bg-black'
                aria-labelledby='blog-article-share-dropdown'
              >
                <button
                  type='button'
                  className='flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400'
                >
                  <RiLinksLine size={RiSize.sm} />
                  Copy link
                </button>
                <div className='border-t border-gray-600 my-2'></div>
                <button
                  type='button'
                  className='flex w-full items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-400 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-gray-400'
                >
                  <RiMailSendLine size={RiSize.sm} />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainSection;
