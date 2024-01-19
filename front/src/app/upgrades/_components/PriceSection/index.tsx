import PriceCard from "./PriceCard";

const plans = [
  {
    value: "user",
    name: "일반 회원",
    price: "Free",
    description: "누구든 이용할 수 있습니다",
    auths: ["프로젝트 50회 업로드", "프로젝트 1개당 키워드 포인트 10회 제공", "모두와 끊김없는 실시간 채팅"],
    recommend: false,
  },
  {
    value: "pro",
    name: "Pro 회원",
    price: "4,900",
    description: "인트로듀스가 제공하는 특별한 혜택",
    auths: ["프로젝트 무제한 업로드", "프로젝트 1개당 키워드 포인트 100회 제공", "프라이빗 채팅 룸 개설"],
    recommend: true,
  },
  {
    value: "expert",
    name: "Expert 회원",
    price: "16,900",
    description: "전문 인트로듀서가 되어보세요",
    auths: ["신규 기능 1개월 얼리 액세스", "키워드 포인트 무제한 제공", "프로젝트 메인 페이지 1순위 노출"],
    recommend: false,
  },
];
const PriceSection = () => {
  return (
    <>
      <div className='max-w-2xl mx-auto text-center mb-10 lg:mb-14'>
        <h2 className='text-2xl font-bold md:text-4xl md:leading-tight text-white'>Pricing</h2>
        <p className='mt-1 text-gray-400'>인트로듀스는 회원님의 플랜에 따른 맞춤형 혜택을 제공합니다.</p>
      </div>

      <div className='mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:items-center'>
        {plans.map((plan, idx) => (
          <PriceCard key={idx} plan={plan} />
        ))}
      </div>
    </>
  );
};

export default PriceSection;
