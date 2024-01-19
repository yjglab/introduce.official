import { RiSize } from "@constants/styles";
import { RiCheckFill } from "@remixicon/react";
import classNames from "classnames";
import Link from "next/link";
import { FC } from "react";

interface Plan {
  value: string;
  name: string;
  price: string;
  description: string;
  auths: string[];
  recommend: boolean;
}
interface Props {
  plan: Plan;
}

const PriceCard: FC<Props> = ({ plan }) => {
  return (
    <div
      className={classNames(
        plan.recommend ? "border-2 shadow-xl border-indigo-700" : "border border-gray-700",
        "flex flex-col text-center rounded-xl p-8 ",
      )}
    >
      {plan.recommend && (
        <p className='mb-3'>
          <span className='inline-flex items-center gap-1.5 py-1.5 px-3 rounded-lg text-xs uppercase font-semibold bg-indigo-600 text-white'>
            Most popular
          </span>
        </p>
      )}
      <h4 className='font-medium text-lg text-gray-200'>{plan.name}</h4>
      <span className='mt-5 font-bold text-5xl text-gray-200'>
        <span className='font-bold text-2xl'>₩</span>
        {plan.price}
      </span>
      <p className='mt-2 text-sm text-gray-500'>{plan.description}</p>

      <ul className='mt-7 space-y-2.5 text-sm'>
        {plan.auths.map((auth, idx) => (
          <li key={idx} className='flex space-x-2 text-indigo-500'>
            <RiCheckFill size={RiSize.sm} />
            <span className='text-gray-400'>{auth}</span>
          </li>
        ))}
      </ul>

      <button
        className={classNames(
          plan.value === "user" ? "bg-gray-400 hover:bg-gray-500" : "bg-indigo-600  hover:bg-indigo-700",
          "mt-5 py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:ring-1 focus:ring-gray-600",
        )}
        disabled
      >
        Upgrade
      </button>
    </div>
  );
};

export default PriceCard;
