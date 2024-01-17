"use client";

import Project from "./Project";

const randomProjects = [
  {
    id: 1,
    category: "web",
    title: "Introduce",
    subtitle: "Unleash your masterpiece for the world to see!",
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
    createdAt: "",
    updatedAt: "",
    user: {
      id: 1,
      displayName: "Jaekyeong Yuk",
      // ...
    },
  },
];
const MainSection = () => {
  return (
    <div className='px-4 py-10 lg:py-14 mx-auto'>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {randomProjects.map((project) => (
          <Project project={project} />
        ))}
      </div>
    </div>
  );
};

export default MainSection;
