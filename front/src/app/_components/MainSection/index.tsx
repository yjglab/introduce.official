"use client";

import { loadMainProjects } from "@api/project";
import SectionContainer from "@app/_common/Container/SectionContainer";
import Skeleton from "@app/_common/Parts/Skeleton";
import { loadMainProjectsKey } from "@constants/queryKey";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";

const customProject = {
  id: 1,
  category: "web",
  title: "Introduce",
  subtitle: "Unleash your masterpiece for the world to see!",
  thumbnail:
    "https://images.unsplash.com/photo-1619839769929-49455e6b780b?q=80&w=2564&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  description: "",
  source: {
    id: 1,
    name: "github",
    link: "",
    owner: "githubnickname",
  },
  grades: 4.7,
  skills: ["react", "nestjs", "spring"],
  likers: [{ id: 8, displayName: "jene" }],
  markers: [{ id: 8, displayName: "jene" }],
  sections: [
    {
      id: 1,
      name: "Section 1",
      description: "Section Desc 1",
      images: [""],
      keywords: [
        {
          id: 1,
          name: "keyword 1",
          image: "",
        },
      ],
    },
  ],
  createdAt: "2024-01-17T14:51:32.983Z",
  updatedAt: "",
  user: {
    id: 1,
    displayName: "Jaekyeong Yuk",
    // ...
  },
};

const ProjectThumb = dynamic(() => import("./ProjectThumb"), {
  loading: () => <Skeleton />,
});

const MainSection = () => {
  const { data: mainProjects } = useQuery({
    queryKey: [loadMainProjectsKey],
    queryFn: loadMainProjects,
    staleTime: 60 * 1000, // fresh->stale 5m
    gcTime: 60 * 1000,
  });

  return (
    <SectionContainer>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full'>
        {/* <ProjectThumb project={customProject} /> */}
        {mainProjects?.map((project: any) => (
          <ProjectThumb key={project.projectId} project={project} />
        ))}
      </div>
    </SectionContainer>
  );
};

export default MainSection;
