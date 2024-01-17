import Link from "next/link";
import TechBadge from "./TechBadge";
import { UserAvatar } from "@app/_common/Parts/UserAvatar";
import { FC } from "react";

interface Props {
  project: any; // type
}
const Project: FC<Props> = ({ project }) => {
  return (
    <Link
      className='group relative block rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
      href='#'
    >
      <div className='flex group-hover:flex absolute w-32 h-16 z-10 justify-end space-x-1 right-5'>
        {/* anim: 순차로 등장하도록 */}
        {project.skills.map((skill: string) => (
          <TechBadge name={skill} />
        ))}
      </div>

      <div className='flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[350px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]'>
        <img
          className='w-full h-full absolute top-0 start-0 object-cover'
          src='https://images.unsplash.com/photo-1619839769929-49455e6b780b?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Project Thumbnail'
        />
      </div>

      <div className='absolute top-0 inset-x-0 z-10'>
        <div className='p-4 flex flex-col h-full sm:p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <UserAvatar displayName='james' />
            </div>
            <div className='ms-2.5 sm:ms-4'>
              <h4 className='font-semibold text-white'>{project.user.displayName}</h4>
              <p className='text-xs text-white/[.8]'>Jan 09, 2023</p>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 inset-x-0 z-10'>
        <div className='flex flex-col h-full p-4 sm:p-6'>
          <h3 className='text-2xl font-semibold text-white group-hover:text-white/[.8]'>{project.title}</h3>
          <p className='mt-2 text-white/[.8]'>{project.subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default Project;
