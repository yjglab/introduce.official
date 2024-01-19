import dataGenerator from "@/utils/dataGenerator";

const dbProjects = dataGenerator(8);

export async function loadMainProjects() {
  const response = [...dbProjects];
  console.log(response[0].title);
  return response;
}

// export function loadProject({ queryKey }: { queryKey: [string, string] }) {
//   const [projectName, projectId] = queryKey;
//   console.log(dbProjects);
//   const response = dbProjects.find((v) => v.id === projectId);
//   console.log(response);
//   return response;
// }
