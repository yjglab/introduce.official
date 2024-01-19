import { RiSize } from "@constants/styles";
import { RiCheckFill, RiSubtractFill } from "@remixicon/react";
import Link from "next/link";
import HeaderSection from "./_components/HeaderSection";
import PriceSection from "./_components/PriceSection";

interface Props {}

const UpgradesPage = () => {
  return (
    <>
      <div role='backdrop' className='bg-black fixed w-full h-full top-0 left-0' />
      <main
        id='content'
        role='main'
        className='relative bg-black px-4 sm:px-6 lg:px-8 flex flex-col justify-center sm:items-center mx-auto w-full'
      >
        <HeaderSection />

        <div className='max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
          <PriceSection />
        </div>
      </main>
    </>
  );
};

export default UpgradesPage;
