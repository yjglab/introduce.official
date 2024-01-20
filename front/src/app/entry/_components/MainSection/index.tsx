import Link from "next/link";
import EntryLinkButton from "./EntryLinkButton";
import SectionContainer from "@app/_common/Container/SectionContainer";

const MainSection = () => {
  return (
    <SectionContainer>
      <div className='max-w-[50rem] flex flex-col mx-auto w-full h-full'>
        <div className='flex justify-center w-full py-4'>
          <div className='px-4 sm:px-6 lg:px-8' aria-label='Global'>
            <Link
              className='flex-none text-xl font-semibold sm:text-3xl dark:text-white'
              href='/'
              aria-label='Brand'
            >
              introduce
            </Link>
          </div>
        </div>

        <div className='text-center py-10 px-4 sm:px-6 lg:px-8'>
          <h1 className='block text-5xl font-bold text-gray-800 sm:text-7xl dark:text-white'>안녕하세요</h1>
          <h1 className='block text-2xl font-bold text-white'></h1>

          <p className='mt-4 text-gray-600 dark:text-gray-400'>간편하게 인증하고 많은 기능을 이용해보세요</p>
          <div className='mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3'>
            <div className='py-3 sm:py-6 mt-10'>
              <div className='grid gap-2 sm:grid-cols-2 md:grid-cols-2'>
                <EntryLinkButton name='이메일로 로그인하기' href='/entry/login' role='login' />
                <EntryLinkButton name='이메일로 계정 만들기' href='/entry/register' role='register' />
                <EntryLinkButton name='구글로 계속하기' href='/entry' role='google' />
                <EntryLinkButton name='카카오로 계속하기' href='/entry' role='kakao' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default MainSection;
