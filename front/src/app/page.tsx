import PageContainer from "./_common/Container/PageContainer";
import MainSection from "./_components/MainSection";

const RootPage = async () => {
  // main data prefetch

  return (
    <PageContainer pageName='Root Page'>
      <MainSection />
    </PageContainer>
  );
};

export default RootPage;
