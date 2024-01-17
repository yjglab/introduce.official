import { faker } from "@faker-js/faker";

function generateProject() {
  return {
    id: faker.string.uuid(),
    category: "web",
    title: faker.music.songName(),
    subtitle: faker.string.alpha(50),
    thumbnail: faker.image.url(),
    description: faker.string.alpha(300),
    source: {
      id: faker.string.uuid(),
      name: "github",
      link: "",
      owner: "githubnickname",
    },
    grades: 4.7,
    skills: ["react", "nestjs", "spring"],
    likers: [{ id: faker.string.uuid(), displayName: faker.internet.displayName() }],
    markers: [{ id: faker.string.uuid(), displayName: faker.internet.displayName() }],
    sections: [
      {
        id: faker.string.uuid(),
        name: `Section ${faker.vehicle.bicycle()}`,
        description: faker.string.alpha(100),
        images: [""],
        keywords: [
          {
            id: faker.string.uuid(),
            name: "keyword 1",
            image: faker.image.url(),
          },
        ],
      },
    ],
    createdAt: faker.date.past(),
    updatedAt: "",
    user: {
      id: faker.string.uuid(),
      displayName: faker.internet.displayName(),
      // ...
    },
  };
}

export default (count: number) =>
  faker.helpers.multiple(generateProject, {
    count,
  });
