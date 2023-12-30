import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";
import MainSection from "./_components/_MainSection";

const RootPage = async () => {
  const queryClient = new QueryClient();
  const dehydratedState = dehydrate(queryClient);

  return (
    <main>
      <HydrationBoundary state={dehydratedState}>
        <MainSection />
      </HydrationBoundary>
    </main>
  );
};

export default RootPage;
