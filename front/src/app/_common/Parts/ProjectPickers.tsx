import { RiSize } from "@constants/styles";
import { RiMedalFill } from "@remixicon/react";
import { FC } from "react";
import Tooltip from "./Tooltip";
import classNames from "classnames";

interface Props {
  choicer: string;
}

const ProjectPickers: FC<Props> = ({ choicer }) => {
  return (
    <span className={classNames("text-gray-300", "hs-tooltip hs-tooltip-toggle [--placement:top]")}>
      <RiMedalFill size={RiSize.sm} />
      {choicer === "expert" ? (
        <Tooltip content='전문가 프로젝트' />
      ) : choicer === "developer" ? (
        <Tooltip content='개발자의 선택' />
      ) : choicer === "designer" ? (
        <Tooltip content='디자이너의 선택' />
      ) : null}
    </span>
  );
};
export default ProjectPickers;
