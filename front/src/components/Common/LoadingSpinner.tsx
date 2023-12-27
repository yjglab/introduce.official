import { FC } from "react";

interface Props {
  background: boolean;
}
const LoadingSpinner: FC<Props> = ({ background }) => {
  return (
    <>
      {background ? (
        <>
          <div className='absolute top-0 start-0 w-full h-full bg-white/[.5] rounded-lg dark:bg-gray-800/[.4]' />
          <div className='absolute flex my-auto top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2'>
            <div
              className='animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-white'
              role='status'
              aria-label='loading'
            >
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        </>
      ) : (
        <div
          className='animate-spin inline-block w-5 h-5 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-white'
          role='status'
          aria-label='loading'
        >
          <span className='sr-only'>Loading...</span>
        </div>
      )}
    </>
  );
};

export default LoadingSpinner;
