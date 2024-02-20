import { UserProjectType } from "@/utils/dataGenerator";
import dateFormatter from "@/utils/dateFormatter";
import TechIcon from "@app/_common/Parts/TechIcon";
import { UserAvatar } from "@app/_common/Parts/UserAvatar";
import { RiSize } from "@constants/styles";
import { RiSendPlaneFill } from "@remixicon/react";
import { FC } from "react";

interface Props {
  project: UserProjectType;
}
const HeaderSection: FC<Props> = ({ project }) => {
  return (
    <>
      <div className='flex items-center mb-6'>
        <div className='flex w-full sm:items-center gap-x-5 sm:gap-x-3'>
          <div className='flex-shrink-0'>
            <UserAvatar displayName={project?.User.displayName!} plan={project?.User.plan!} />
          </div>

          <div className='grow'>
            <div className='flex justify-between items-center gap-x-2'>
              <div>
                <div className='hs-tooltip inline-block [--trigger:hover] [--placement:bottom]'>
                  <div className='hs-tooltip-toggle sm:mb-1 text-start cursor-pointer'>
                    <span className='font-semibold text-gray-800 dark:text-gray-200'>
                      {project?.User.displayName}
                    </span>

                    <div
                      className='hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 min-w-[250px] cursor-default bg-gray-900 divide-y divide-gray-700 shadow-lg rounded-xl dark:bg-black'
                      role='tooltip'
                    >
                      <div className='p-4 sm:p-5'>
                        <div className='mb-2 flex w-full sm:items-center gap-x-5 sm:gap-x-3'>
                          <div className='flex-shrink-0'>
                            <UserAvatar
                              displayName={project?.User.displayName!}
                              plan={project?.User.plan!}
                              size='xs'
                            />
                          </div>

                          <div className='grow'>
                            <p className='text-lg font-semibold text-gray-200'>{project?.User.displayName}</p>
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
                    {dateFormatter(project?.createdAt!)}
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
      <div className='space-y-3'>
        <h1 className='text-2xl font-bold md:text-3xl dark:text-white'>{project?.title}</h1>
        <h2 className='text-gray-500 dark:text-gray-400 break-words'>{project?.subtitle}</h2>
        <p className='text-lg text-gray-800 dark:text-gray-200 break-words'>{project?.description}</p>
      </div>

      <div className='space-y-3'>
        {project?.skills.map((skill) => (
          <button
            key={skill}
            type='button'
            className='m-1 border dark:border-gray-700 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
          >
            <div className='relative'>
              <TechIcon name={skill} />
            </div>
            {skill}
          </button>
        ))}
      </div>
    </>
  );
};

export default HeaderSection;
