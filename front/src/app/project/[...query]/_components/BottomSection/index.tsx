import { UserProjectType } from "@/utils/dataGenerator";
import { RiSize } from "@constants/styles";
import { RiHeart2Line, RiLinksLine, RiMailSendLine, RiMessage3Line, RiShare2Line } from "@remixicon/react";
import { FC } from "react";

interface Props {
  project: UserProjectType;
}

const BottomSection: FC<Props> = ({ project }) => {
  return (
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
  );
};
export default BottomSection;
