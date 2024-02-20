import { faker } from "@faker-js/faker";
import techImages from "./techImages";

export interface UserProjectType {
  projectId: string;
  category: "web" | "design";
  title: string;
  subtitle: string;
  thumbnail: string;
  description: string;
  Source: {
    link: string;
    name: string;
    owner: string;
  };
  grades: number;
  skills: string[];
  Likers: {
    developers: number;
    designers: number;
    users: {
      userId: string;
      projectId: string;
      createdAt: Date;
    }[];
  };

  Sections: {
    sectionId: string;
    name: string;
    description: string;
    Images: {
      src: string;
      alt: string;
    }[];
    Keywords: {
      keywordId: string;
      name: string;
      description: string;
      image: {
        src: string;
        alt: string;
      };
    }[];
  }[];
  private: boolean;
  createdAt: Date;
  updatedAt: Date;
  User: {
    id: string;
    displayName: string;
    plan: string;
  };
}
function generateProject() {
  return {
    projectId: faker.string.uuid(),
    category: "web",
    title: faker.music.songName(),
    subtitle: faker.string.alpha(50),
    thumbnail: faker.image.url(),
    description: faker.string.alpha(300),
    Source: {
      link: faker.internet.url() + faker.string.uuid().slice(0, 10),
      name: "github",
      owner: "githubnickname",
    },
    grades: 4.7,
    skills: generateSkills(3),
    Likers: {
      developers: randomNumber(70),
      designers: randomNumber(70),
      users: faker.helpers.multiple(generateLiker, {
        count: 3,
      }),
    },
    Sections: faker.helpers.multiple(generateSection, {
      count: 3,
    }),
    private: false,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    User: {
      id: faker.string.uuid(),
      displayName: faker.internet.displayName(),
      plan: ["user", "pro", "expert"][randomNumber(3)],
    },
  };
}

function randomNumber(n: number) {
  return Math.floor(Math.random() * n);
}
function generateImage() {
  return { src: faker.image.url(), alt: faker.string.alpha(10) };
}
function generateSection() {
  return {
    sectionId: faker.string.uuid(),
    name: `Section ${faker.vehicle.bicycle()}`,
    description: faker.string.alpha(100),
    Images: faker.helpers.multiple(generateImage, {
      count: 2,
    }),
    Keywords: Array(4).fill({
      keywordId: faker.string.uuid(),
      name: faker.animal.dog(),
      description: faker.string.alpha(50),
      image: { src: faker.image.url(), alt: faker.string.alpha(10) },
    }),
  };
}
function generateLiker() {
  return {
    userId: faker.string.uuid(),
    projectId: faker.string.uuid(),
    createdAt: faker.date.past(),
  };
}

function generateSkills(n: number) {
  const skills: string[] = [];
  const techImagesKeys = Object.keys(techImages);
  let newSkill;
  while (n > 0) {
    newSkill = techImagesKeys[randomNumber(techImagesKeys.length)];
    if (skills.includes(newSkill)) {
      continue;
    }
    skills.push(newSkill);
    n -= 1;
  }
  return skills;
}

export const staticProject: UserProjectType = {
  projectId: "staticProjectId",
  category: "web",
  title: "인트로듀스",
  subtitle: "인트로듀스 서브타이틀입니다. ".repeat(2),
  thumbnail:
    "https://images.unsplash.com/photo-1705866649609-9ea7159fe1ea?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  description: "인트로듀스 설명입니다. ".repeat(15),
  Source: {
    link: "https://github.com/yjglab",
    name: "github",
    owner: "yjglab",
  },
  grades: 4.3,
  skills: ["React", "Nest.js", "Firebase"],
  Likers: {
    developers: 60,
    designers: 50,
    users: [
      {
        userId: "dqwdqwe",
        projectId: "qwdqwrqwdqw",
        createdAt: new Date(),
      },
      {
        userId: "dqawdwdqwe",
        projectId: "qwdqwdqwqweqwerqwdqw",
        createdAt: new Date(),
      },
    ],
  },
  Sections: [
    {
      sectionId: "adwdqpwld[qwk",
      name: `Section 1번 섹션`,
      description: "1번 섹션 설명입니다. ".repeat(12),
      Images: [
        {
          src: "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "1번 이미지 설명입니다.".repeat(2),
        },
        {
          src: "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "2번 이미지 설명입니다.".repeat(2),
        },
      ],
      Keywords: [
        {
          keywordId: "awdwqdljqwoipr",
          name: "1번키워드",
          description: "1번 키워드 설명입니다. ".repeat(5),
          image: {
            src: "https://images.unsplash.com/photo-1705917677386-d6e882e29e6e?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "1번 키워드 이미지 설명입니다.".repeat(2),
          },
        },
      ],
    },
    {
      sectionId: "adwdqpwld[qwk",
      name: `Section 2번 섹션`,
      description: "2번 섹션 설명입니다. ".repeat(12),
      Images: [
        {
          src: "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "1번 이미지 설명입니다.".repeat(2),
        },
        {
          src: "https://images.unsplash.com/photo-1682686581498-5e85c7228119?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          alt: "2번 이미지 설명입니다.".repeat(2),
        },
      ],
      Keywords: [
        {
          keywordId: "awddwqwdwqdljqwoipr",
          name: "1번키워드",
          description: "1번 키워드 설명입니다. ".repeat(5),
          image: {
            src: "https://images.unsplash.com/photo-1705917677386-d6e882e29e6e?q=80&w=1587&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            alt: "1번 키워드 이미지 설명입니다.".repeat(2),
          },
        },
      ],
    },
  ],
  private: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  User: {
    id: "wdqwdqweqwr",
    displayName: "인트로듀스 제작자",
    plan: "expert",
  },
};

export default (count: number) =>
  faker.helpers.multiple(generateProject, {
    count,
  });
