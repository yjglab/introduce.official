import { FC, MouseEventHandler, PropsWithChildren } from "react";
interface Props {
  children: React.ReactNode;
  callback?: MouseEventHandler<HTMLButtonElement>;
}
const Tag: FC<PropsWithChildren<Props>> = ({ children, callback }) => {
  return (
    <button
      onClick={callback}
      type='button'
      className='m-1 border dark:border-gray-700 inline-flex items-center gap-1.5 py-2 px-3 rounded-full text-sm bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-200 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
    >
      {children}
    </button>
  );
};
export default Tag;
