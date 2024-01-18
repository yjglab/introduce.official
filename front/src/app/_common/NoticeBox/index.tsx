"use client";

import React, { FC, Fragment, MouseEventHandler, PropsWithChildren, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { RiCheckFill, RiCheckLine, RiCloseFill, RiEmotionSadFill, RiInfoI } from "@remixicon/react";
import { RiSize } from "@constants/styles";

interface Props {
  type?: "general" | "success" | "error";
  title?: string;
  description: string;
  callback?: MouseEventHandler<HTMLButtonElement>;
  externalClick?: boolean;
  textAlign?: "center" | "left";
}
const NoticeBox: FC<PropsWithChildren<Props>> = ({
  children,
  type = "general",
  title,
  description,
  callback,
  externalClick = true,
  textAlign = "center",
}) => {
  let [isOpen, setIsOpen] = useState(true);

  function closeNoticeBox() {
    setIsOpen(false);
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={externalClick ? closeNoticeBox : () => {}}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                style={{ maxHeight: "90vh" }}
                className='mt-0 opacity-0 ease-out transition-all sm:max-w-[30rem] w-full m-3 sm:mx-auto'
              >
                <div className='relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800'>
                  {externalClick && (
                    <div className='absolute top-2 end-2'>
                      <button
                        type='button'
                        onClick={closeNoticeBox}
                        className='flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                      >
                        <span className='sr-only'>Close</span>
                        <RiCloseFill size={RiSize.sm} />
                      </button>
                    </div>
                  )}

                  <div className='p-4 sm:p-6 text-center overflow-y-auto'>
                    <span
                      className={classNames(
                        type === "general" &&
                          "border-primary-50 bg-primary-100 text-primary-500 dark:bg-primary-700 dark:border-primary-600  dark:text-primary-100",
                        type === "success" &&
                          "border-success-50 bg-success-100 text-success-500 dark:bg-success-700 dark:border-success-600  dark:text-success-100",
                        type === "error" &&
                          "border-error-50 bg-error-100 text-error-500 dark:bg-error-700 dark:border-error-600  dark:text-error-100",

                        "mb-4 inline-flex justify-center items-center w-[46px] h-[46px] rounded-full border-4 ",
                      )}
                    >
                      {type === "general" && <RiInfoI size={RiSize.md} />}
                      {type === "success" && <RiCheckFill size={RiSize.md} />}
                      {type === "error" && <RiEmotionSadFill size={RiSize.md} />}
                    </span>

                    <h3 className='mb-2 text-xl font-bold text-gray-800 dark:text-gray-200'>{title}</h3>
                    <p className='text-gray-300'>{description}</p>

                    <div className='mt-6 flex justify-center gap-x-4'>
                      <button
                        type='button'
                        onClick={callback || closeNoticeBox}
                        className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                      >
                        확인
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NoticeBox;
