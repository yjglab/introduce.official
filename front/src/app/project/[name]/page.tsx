interface Props {
  params: {
    name: string;
  };
}

const ProjectPage = ({ params }: Props) => {
  return <div className='w-full h-full bg-red-500/40'>{params.name}</div>;
};

export default ProjectPage;
