import pb from "../../_lib/pb";

const BrandDetail = async ({ params }) => {
  const { name } = params;
  let brand;

  try {
    brand = await pb.collection("brands").getFirstListItem(`name="${name}"`);
    console.log(brand);
  } catch (error) {
    console.error("Error fetching brand:", error);
    
    return <div>Brand not found</div>;
  }

  return <div>{brand?.name}</div>;
};

export default BrandDetail;
