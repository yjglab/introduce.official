"use client";

interface ContainerProps {
  text?: string;
}

export const SplitBar: React.FC<ContainerProps> = ({ text }) => {
  return (
    <div className='py-3 flex items-center text-xs text-gray-400 uppercase before:flex-[1_1_0%] before:border-t before:border-gray-200 before:me-6 after:flex-[1_1_0%] after:border-t after:border-gray-200 after:ms-6 dark:text-gray-500 dark:before:border-gray-700 dark:after:border-gray-700'>
      {text}
    </div>
  );
};
