import { loadMainProjects } from "@api/project";
import PageContainer from "@app/_common/Container/PageContainer";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import { loadMainProjectsKey } from "@constants/queryKey";
import HeaderSection from "./_components/HeaderSection";
import { UserProjectType, staticProject } from "@/utils/dataGenerator";
import ContentsSection from "./_components/ContentsSection";
import BottomSection from "./_components/BottomSection";

interface Props {
  params: {
    query: [string, string];
  };
}

const ProjectPage = async ({ params }: Props) => {
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
    <PageContainer pageName={`Project: ${params?.query[0]}`}>
      <HydrationBoundary state={dehydratedState}>
        <HeaderSection project={project!} />
        <ContentsSection project={project!} params={params} />
        <BottomSection project={project!} />
      </HydrationBoundary>
    </PageContainer>
  );
};

export default ProjectPage;
