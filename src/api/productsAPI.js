export default async () => {
  try {
    const data = await fetch("/products");
    const fetchedData = await data.json();
    const headerData = await fetch("/shopitems");
    const headerFetched = await headerData.json();
    return { fetchedData, headerFetched };
  } catch (error) {
    console.log(error);
  }
};
