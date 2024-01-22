import React, { FC } from "react";
import OverlayContainer from "@app/_common/Container/OverlayContainer";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import MainSection from "@app/project/[...query]/_components/MainSection";
import { loadMainProjectsKey } from "@constants/queryKey";
import { loadMainProjects } from "@api/project";

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

  return (
    <OverlayContainer>
      <HydrationBoundary state={dehydratedState}>
        <MainSection params={params} />
      </HydrationBoundary>
    </OverlayContainer>
  );
};

export default ProjectOverlayPage;
