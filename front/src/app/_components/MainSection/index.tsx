"use client";

import { staticProject } from "@/utils/dataGenerator";
import { loadMainProjects } from "@api/project";
import SectionContainer from "@app/_common/Container/SectionContainer";
import Skeleton from "@app/_common/Parts/Skeleton";
import { loadMainProjectsKey } from "@constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const ProjectThumb = dynamic(() => import("./ProjectThumb"), {
  loading: () => <Skeleton />,
});

const MainSection = () => {
  const { data: mainProjects } = useQuery({
    queryKey: [loadMainProjectsKey],
    queryFn: loadMainProjects,
    staleTime: 60 * 1000, // fresh->stale 5m
    gcTime: 60 * 1000,
  });

  return (
    <SectionContainer>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
        <ProjectThumb project={staticProject} />
        {mainProjects?.map((project: any) => (
          <ProjectThumb key={project.projectId} project={project} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default MainSection;
