import ClientPage from "./page.client";

const RootPage = async () => {
  // const data = await loadAllDataAPI(undefined);
  // const initialData = {
  //   pages: [data],
  //   pageParams: [undefined],
  // };

  return <ClientPage initialData={null} />;
};

export default RootPage;
