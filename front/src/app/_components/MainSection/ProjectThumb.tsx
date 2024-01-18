import Link from "next/link";
import TechBadge from "./TechBadge";
import { UserAvatar } from "@app/_common/Parts/UserAvatar";
import { FC, Suspense } from "react";
import dateFormatter from "@/utils/dateFormatter";

interface Props {
  project: any; // type
}
const ProjectThumb: FC<Props> = ({ project }) => {
  return (
    <Link
      className='group relative block rounded-xl dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600'
      href={`/project/${project.title.replace(/ /g, "_")}`}
      scroll={false}
    >
      <div className='flex group-hover:flex absolute w-32 h-16 z-10 justify-end space-x-1 right-5'>
        {/* anim: 순차로 등장하도록 */}
        {project.skills.map((skill: string) => (
          <TechBadge key={skill} name={skill} />
        ))}
      </div>

      <div className='flex-shrink-0 relative rounded-xl overflow-hidden w-full h-[350px] before:absolute before:inset-x-0 before:w-full before:h-full before:bg-gradient-to-t before:from-gray-900/[.7] before:z-[1]'>
        <img
          className='w-full h-full absolute top-0 start-0 object-cover'
          src={project.thumbnail}
          alt='Project Thumbnail'
        />
      </div>

      <div className='absolute top-0 inset-x-0 z-10'>
        <div className='p-4 flex flex-col h-full sm:p-6'>
          <div className='flex items-center'>
            <div className='flex-shrink-0'>
              <UserAvatar displayName={project.user.displayName} />
            </div>
            <div className='ms-2.5 sm:ms-4'>
              <h4 className='font-semibold text-white'>{project.user.displayName}</h4>
              <p className='text-xs text-white/[.8]'>{dateFormatter(project.createdAt)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className='absolute bottom-0 inset-x-0 z-10'>
        <div className='flex flex-col h-full p-4 sm:p-6'>
          <h3 className='text-2xl font-semibold text-white group-hover:text-white/[.8]'>{project.title}</h3>
          <p className='mt-2 text-white/[.8] truncate'>{project.subtitle}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectThumb;
