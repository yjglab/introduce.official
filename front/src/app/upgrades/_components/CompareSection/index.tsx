import EachFeature from "./EachFeature";

const features = [
  {
    name: "프로젝트 마킹",
    included: [true, true, true],
  },
  {
    name: "프로젝트 라이브 채팅",
    included: [true, true, true],
  },
  {
    name: "커스텀 아바타",
    included: [true, true, true],
  },
  {
    name: "프로젝트 업로드 수",
    included: ["50회", "제한 없음", "제한 없음"],
  },
  {
    name: "프로젝트 섹션 수",
    included: ["제한 없음", "제한 없음", "제한 없음"],
  },
  {
    name: "키워드 토큰",
    included: ["10", "100", "제한 없음"],
  },
  {
    name: "프로젝트 로드 순위 향상",
    included: [false, true, true],
  },
  {
    name: "프라이빗 채팅룸 개설",
    included: [false, true, true],
  },
  {
    name: "전용 아바타 심볼",
    included: [false, true, true],
  },
  {
    name: "전용 프로젝트 심볼",
    included: [false, false, true],
  },
  {
    name: "신규 기능 얼리 액세스",
    included: [false, false, true],
  },
];
const CompareSection = () => {
  return (
    <div className='mt-20 lg:mt-32'>
      <div className='lg:text-center mb-10'>
        <h3 className='text-2xl font-semibold dark:text-white'>Compare plans</h3>
      </div>

      <div className=''>
        <table className='w-full h-px'>
          <caption className='sr-only'>Pricing plan comparison</caption>
          <thead className='sticky top-0 inset-x-0 bg-white dark:bg-gray-900'>
            <tr>
              <th className='py-4 ps-6 pe-6 text-sm font-medium text-gray-800 text-start' scope='col'>
                <span className='sr-only'>Feature by</span>
                <span className='dark:text-white'>Plans</span>
              </th>
              <th
                className='w-1/6 py-4 px-2 md:px-6 text-lg leading-6 font-medium text-gray-800 text-center dark:text-white'
                scope='col'
              >
                Free
              </th>
              <th
                className='w-1/6 py-4 px-2 md:px-6 text-lg leading-6 font-medium text-gray-800 text-center dark:text-white'
                scope='col'
              >
                Pro
              </th>
              <th
                className='w-1/6 py-4 px-2 md:px-6 text-lg leading-6 font-medium text-gray-800 text-center dark:text-white'
                scope='col'
              >
                Expert
              </th>
            </tr>
          </thead>
          <tbody className='border-t border-gray-200 divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700'>
            <tr>
              <th
                className='py-3 ps-6 bg-gray-50 font-bold text-gray-800 text-start dark:bg-gray-800 dark:text-white'
                colSpan={5}
                scope='colgroup'
              >
                이용 가능 서비스
              </th>
            </tr>
            {features.map((feature) => (
              <EachFeature key={feature.name} feature={feature} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompareSection;
