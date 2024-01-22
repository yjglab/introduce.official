import CompareSection from "./_components/CompareSection";
import HeaderSection from "./_components/HeaderSection";
import PriceSection from "./_components/PriceSection";
import PageContainer from "@app/_common/Container/PageContainer";

const UpgradesPage = () => {
  return (
    <>
      <PageContainer pageName='Upgrades Plan Page'>
        <HeaderSection />
        <PriceSection />
        <CompareSection />
      </PageContainer>
      <div role='backdrop' className='fixed w-full h-full top-0 left-0 dark:bg-gray-900 -z-10' />
    </>
  );
};

export default UpgradesPage;
