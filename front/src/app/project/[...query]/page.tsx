import { loadMainProjects } from "@api/project";
import PageContainer from "@app/_common/Container/PageContainer";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import MainSection from "./_components/MainSection";
import { loadMainProjectsKey } from "@constants/queryKey";

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

  return (
    <PageContainer pageName={`Project: ${params?.query[0]}`}>
      <HydrationBoundary state={dehydratedState}>
        <MainSection params={params} />
      </HydrationBoundary>
    </PageContainer>
  );
};

export default ProjectPage;
