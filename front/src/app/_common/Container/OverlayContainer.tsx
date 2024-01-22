"use client";

import { FC, Fragment, PropsWithChildren, useRef, useState } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { RiCloseFill } from "@remixicon/react";
import { RiSize } from "@constants/styles";
import { useRouter } from "next/navigation";

interface Props {
  children: React.ReactNode;
}
const OverlayContainer: FC<PropsWithChildren<Props>> = ({ children }) => {
  let [isOpen, setIsOpen] = useState(true);
  const router = useRouter();
  function closeNoticeBox() {
    setIsOpen(false);
    router.back();
  }
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={closeNoticeBox}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto '>
          <div className='flex min-h-full items-center justify-center'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-out duration-[0.8s] transform'
              enterFrom='opacity-0 translate-y-10'
              enterTo='opacity-100 translate-y-0'
            >
              <Dialog.Panel
                style={{ maxHeight: "90vh" }}
                className='mt-32 opacity-0 ease-out w-full max-w-[85%] lg:max-w-[1100px] sm:mx-auto'
              >
                <div className='relative flex flex-col bg-white shadow-lg rounded-xl dark:bg-gray-800'>
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

                  <div className='min-h-screen w-full px-4 py-10 overflow-y-auto'>{children}</div>
                  {/* <div className='px-4 py-10 overflow-y-auto'></div> */}
                </div>

                <div className='mt-40 sr-only' />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default OverlayContainer;
