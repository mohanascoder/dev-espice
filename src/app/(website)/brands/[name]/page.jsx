import { notFound } from 'next/navigation';
import pb from "../../_lib/pb";

const BrandDetail = async ({ params }) => {
  const { name } = await params;

  let brand;
  try {
    brand = await pb
      .collection("brands")
      .getFirstListItem(`name="${name}"`);
  } catch (error) {
    notFound();
  }

  return <div>{brand?.name}</div>;
};

export default BrandDetail;
