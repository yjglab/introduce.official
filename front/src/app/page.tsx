import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import PageContainer from "./_common/Container/PageContainer";
import MainSection from "./_components/MainSection";
import { loadMainProjects } from "@api/project";
import { loadMainProjectsKey } from "@constants/queryKey";

const RootPage = async () => {
  // main data prefetch
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [loadMainProjectsKey],
    queryFn: loadMainProjects,
  });
  const dehydratedState = dehydrate(queryClient);

  return (
    <PageContainer pageName='Root Page'>
      <HydrationBoundary state={dehydratedState}>
        <MainSection />
      </HydrationBoundary>
    </PageContainer>
  );
};

export default RootPage;
