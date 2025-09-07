import NavBar from "@/components/shared/NavBar";
import Carousel from "@/components/shared/Carousel";

const banners =  [
  "/img/home/banner1.jpg",
  "/img/home/banner2.jpg",
  "/img/home/banner3.jpg",
  "/img/home/banner4.jpg",
  "/img/home/banner5.jpg",
  "/img/home/banner6.jpg",
];

const Home = () => {
  return (
    <>
      <NavBar />
      <Carousel slides={banners} slideInterval={3000} />
    </>
  );
};

export default Home;
