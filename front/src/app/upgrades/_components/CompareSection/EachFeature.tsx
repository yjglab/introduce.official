import { RiSize } from "@constants/styles";
import { RiCheckFill, RiCloseFill, RiSubtractFill } from "@remixicon/react";
import { FC } from "react";

interface Props {
  feature: {
    name: string;
    included: boolean[] | string[];
  };
}
const EachFeature: FC<Props> = ({ feature }) => {
  return (
    <tr>
      <th
        className='py-5 ps-6 pe-6 text-sm font-normal text-gray-600 text-start whitespace-nowrap dark:text-gray-400'
        scope='row'
      >
        {feature.name}
      </th>

      {feature.included.map((i, idx) => (
        <td key={idx} className='py-5 px-6 text-center'>
          {typeof i === "boolean" ? (
            i ? (
              <span className='inline-block text-indigo-500'>
                <RiCheckFill size={RiSize.md} />
              </span>
            ) : (
              <span className='inline-block text-gray-500'>
                <RiCloseFill size={RiSize.md} />
              </span>
            )
          ) : (
            <span className='inline-block text-indigo-500 text-sm'>{i}</span>
          )}
          <span className='sr-only'>Included in {feature.name}</span>
        </td>
      ))}
    </tr>
  );
};
export default EachFeature;
