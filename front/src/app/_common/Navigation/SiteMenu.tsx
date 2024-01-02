"use client";

const SiteMenu = () => {
  return (
    <>
      <div className='hs-dropdown [--strategy:static] md:[--strategy:absolute] [--adaptive:none] md:[--trigger:hover] py-3 md:py-4'>
        <button
          type='button'
          className='flex items-center w-full text-gray-900 hover:text-gray-500 font-medium dark:text-gray-300 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
        >
          SiteMenu
          <svg
            className='flex-shrink-0 ms-2 w-4 h-4'
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d='m6 9 6 6 6-6' />
          </svg>
        </button>

        <div className='hs-dropdown-menu transition-[opacity,margin] duration-[0.1ms] md:duration-[150ms] hs-dropdown-open:opacity-100 opacity-0 w-full hidden z-10 top-full start-0 min-w-[15rem] bg-white md:shadow-2xl rounded-lg py-2 md:p-4 dark:bg-gray-800 dark:divide-gray-700 before:absolute before:-top-5 before:start-0 before:w-full before:h-5'>
          <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div className='flex flex-col mx-1 md:mx-0'>
              <a
                className='group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                href='#'
              >
                <svg
                  className='flex-shrink-0 w-5 h-5 mt-1'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z' />
                  <path d='M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z' />
                </svg>
                <div className='grow'>
                  <p className='font-medium text-gray-800 dark:text-gray-200'>A</p>
                  <p className='text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200'>
                    AAA
                  </p>
                </div>
              </a>

              <a
                className='group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                href='#'
              >
                <svg
                  className='flex-shrink-0 w-5 h-5 mt-1'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <rect width='7' height='7' x='14' y='3' rx='1' />
                  <path d='M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3' />
                </svg>
                <div className='grow'>
                  <p className='font-medium text-gray-800 dark:text-gray-200'>B</p>
                  <p className='text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200'>
                    BBB
                  </p>
                </div>
              </a>

              <a
                className='group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                href='#'
              >
                <svg
                  className='flex-shrink-0 w-5 h-5 mt-1'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='m7 11 2-2-2-2' />
                  <path d='M11 13h4' />
                  <rect width='18' height='18' x='3' y='3' rx='2' ry='2' />
                </svg>
                <div className='grow'>
                  <p className='font-medium text-gray-800 dark:text-gray-200'>C</p>
                  <p className='text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200'>
                    CCC
                  </p>
                </div>
              </a>
            </div>

            <div className='flex flex-col mx-1 md:mx-0'>
              <a
                className='group flex gap-x-5 hover:bg-gray-100 rounded-lg p-4 dark:text-gray-200 dark:hover:bg-gray-900 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
                href='#'
              >
                <svg
                  className='flex-shrink-0 w-5 h-5 mt-1'
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <circle cx='12' cy='12' r='10' />
                  <path d='M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
                  <path d='M12 17h.01' />
                </svg>
                <div className='grow'>
                  <p className='font-medium text-gray-800 dark:text-gray-200'>D</p>
                  <p className='text-sm text-gray-500 group-hover:text-gray-800 dark:group-hover:text-gray-200'>
                    DDD
                  </p>
                </div>
              </a>
            </div>

            <div className='flex flex-col pt-4 md:pt-0 mx-1 md:mx-0'>
              <span className='text-sm font-semibold uppercase text-gray-800 dark:text-gray-200'>EE</span>

              <a
                className='group mt-2 p-3 flex gap-x-5 items-center rounded-xl hover:bg-gray-100 dark:hover:bg-slate-500/10 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-slate-600'
                href='#'
              >
                <img
                  className='w-32 h-32 rounded-lg'
                  src='https://images.unsplash.com/photo-1648737967328-690548aec14f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&h=320&q=80'
                  alt='Image Description'
                />
                <div className='grow'>
                  <p className='text-sm text-gray-800 dark:text-slate-400'>GG</p>
                  <p className='mt-3 inline-flex items-center gap-x-1 text-sm text-blue-600 decoration-2 hover:underline font-medium dark:text-blue-400 dark:hover:text-blue-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-slate-600'>
                    More
                    <svg
                      className='flex-shrink-0 w-4 h-4 transition ease-in-out group-hover:translate-x-1'
                      xmlns='http://www.w3.org/2000/svg'
                      width='24'
                      height='24'
                      viewBox='0 0 24 24'
                      fill='none'
                      stroke='currentColor'
                      strokeWidth='2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    >
                      <path d='m9 18 6-6-6-6' />
                    </svg>
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SiteMenu;
