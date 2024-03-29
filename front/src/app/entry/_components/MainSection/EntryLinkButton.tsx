import Link from "next/link";
import { FC } from "react";
import { RiGoogleFill, RiKakaoTalkFill, RiMailAddLine, RiMailCheckLine } from "@remixicon/react";
import { RiSize } from "@constants/styles";

interface Props {
  name: string;
  href: string;
  role: string;
}

const EntryLinkButton: FC<Props> = ({ name, href, role }) => {
  return (
    <Link
      className='bg-white p-4 transition duration-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-white/[.05] dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
      href={href}
    >
      <div className='flex items-center'>
        <div className='flex justify-center flex-shrink-0 rounded-s-xl'>
          <div className='mr-2 text-gray-800 dark:text-gray-200'>
            {role === "login" && <RiMailCheckLine size={RiSize.sm} />}
            {role === "register" && <RiMailAddLine size={RiSize.sm} />}
            {role === "google" && <RiGoogleFill size={RiSize.sm} />}
            {role === "kakao" && <RiKakaoTalkFill size={RiSize.sm} />}
          </div>
        </div>

        <h3 className='text-sm my-auto font-semibold text-gray-800 dark:text-gray-300'>{name}</h3>
      </div>
    </Link>
  );
};

export default EntryLinkButton;
