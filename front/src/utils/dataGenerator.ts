import { faker } from "@faker-js/faker";

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
    userId: string;
    projectId: string;
    createdAt: Date;
  }[];
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
    skills: ["react", "nestjs", "spring"],
    Likers: faker.helpers.multiple(generateLiker, {
      count: 3,
    }),
    Sections: faker.helpers.multiple(generateSection, {
      count: 3,
    }),
    private: false,
    createdAt: faker.date.past(),
    updatedAt: faker.date.past(),
    User: {
      id: faker.string.uuid(),
      displayName: faker.internet.displayName(),
    },
  };
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
export default (count: number) =>
  faker.helpers.multiple(generateProject, {
    count,
  });
