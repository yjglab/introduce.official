import PageContainer from "@app/_common/Container/PageContainer";

interface Props {
  params: {
    name: string;
  };
}

const ProjectPage = ({ params }: Props) => {
  return <PageContainer pageName={`Project: ${params.name}`}>{params.name}</PageContainer>;
};

export default ProjectPage;
