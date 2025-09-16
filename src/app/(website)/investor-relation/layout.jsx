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
      <div className="max-w-7xl">
        <img src={pb.files.getURL(banners[0], banners[0].image)} alt="" />
      </div>
      <div className="flex min-w-[768px]">
        <Sidebar />
        <main className="flex-1 min-h-dvh overflow-y-auto no-scrollbar">
          {children}
        </main>
      </div>
      <Footer />
    </>
  );
}
