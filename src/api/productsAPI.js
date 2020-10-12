import globalAPI from "./globalAPI";

export default async () => {
  try {
    const data = await globalAPI.get("/products");
    const fetchedData = data.data;
    const headerData = await globalAPI.get("/shopitems");
    const headerFetched = headerData.data;
    return { fetchedData, headerFetched };
  } catch (error) {
    console.log(error);
  }
};
