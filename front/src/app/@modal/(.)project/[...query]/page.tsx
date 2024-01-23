import React, { FC } from "react";
import OverlayContainer from "@app/_common/Container/OverlayContainer";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { loadMainProjectsKey } from "@constants/queryKey";
import { loadMainProjects } from "@api/project";
import { UserProjectType, staticProject } from "@/utils/dataGenerator";
import HeaderSection from "@app/project/[...query]/_components/HeaderSection";
import ContentsSection from "@app/project/[...query]/_components/ContentsSection";
import BottomSection from "@app/project/[...query]/_components/BottomSection";

interface Props {
  params: {
    query: [string, string];
  };
}
const ProjectOverlayPage: FC<Props> = async ({ params }) => {
  const queryClient = new QueryClient();
  // 나중에 project 1개 로드 api로 교체
  await queryClient.prefetchQuery({
    queryKey: [loadMainProjectsKey],
    queryFn: loadMainProjects,
  });
  const dehydratedState = dehydrate(queryClient);

  const mainProjects: UserProjectType[] = queryClient.getQueryData([loadMainProjectsKey])!;
  const project =
    params?.query[1] === "staticProjectId"
      ? staticProject
      : mainProjects?.find((v) => v.projectId === params.query[1]);

  return (
    <OverlayContainer>
      <HydrationBoundary state={dehydratedState}>
        <div className='max-w-4xl px-4 pb-12 sm:px-8 lg:px-12 mx-auto'>
          <HeaderSection project={project!} />
          <ContentsSection project={project!} params={params} />
          <BottomSection project={project!} />
        </div>
      </HydrationBoundary>
    </OverlayContainer>
  );
};

export default ProjectOverlayPage;
