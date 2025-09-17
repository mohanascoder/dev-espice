import NavBar from "@/components/shared/NavBar";
import Sidebar from "../_components/SideBar";
import pb from "../_lib/pb";
import Footer from "../footer/page";

export const metadata = {
  title: "Investor Relation | Spice Lounge",
  description: "",
};

const banners = await pb.collection("banners").getFullList(200, {
  sort: "sno",
  filter: 'page = "investor"',
});
console.log(banners);

export default function RootLayout({ children }) {
  return (
    <>
      <NavBar />
      <div className="flex justify-between items-center max-w-7xl mx-auto mt-16">
        <img src={pb.files.getURL(banners[0], banners[0].image)} alt="" />
      </div>
      <div className="lg:flex max-w-7xl mx-auto">
        <Sidebar />
        <div className="flex-1 overflow-y-auto no-scrollbar h-[640px]">
          {children}
        </div>
      </div>
      <Footer />
    </>
  );
}
