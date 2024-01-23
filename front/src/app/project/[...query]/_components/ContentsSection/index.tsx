import { UserProjectType } from "@/utils/dataGenerator";
import { FC } from "react";
import Section from "./Section";

interface Props {
  params: {
    query: [string, string];
  };
  project: UserProjectType;
}
const ContentsSection: FC<Props> = ({ params, project }) => {
  return (
    <div className='space-y-5 md:space-y-20 my-14'>
      {project?.Sections.map((section) => (
        <Section key={section.sectionId} section={section} />
      ))}
    </div>
  );
};

export default ContentsSection;
