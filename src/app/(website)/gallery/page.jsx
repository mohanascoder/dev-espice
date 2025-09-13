"use client";

import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Modal from "react-modal";
import axios from "axios";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/shared/NavBar";
import Footer from "../footer/page";

// Dummy social media data – replace with actual links and icons as needed
const socialMediaLinks = [
  {
    name: "Buffalo Wild Wings",
    links: {
      facebook: "https://www.facebook.com/BWWingsIndia/",
      instagram: "https://www.instagram.com/bwwingsindia",
      google: "#",
      youtube: " https://www.youtube.com/@buffalowildwingsindia ",
    },
  },
  {
    name: "Wing Zone",
    links: {
      facebook: "#",
      instagram: "#",
      google: "#",
      youtube: "#",
    },
  },
  {
    name: "Blaze Kebabs",
    links: {
      facebook: "https://www.facebook.com/profile.php?id=61577000966469 ",
      instagram: "https://www.instagram.com/blazekebabs/ ",
      google: "#",
      youtube: "https://www.youtube.com/@BlazeKebabs",
    },
  },
  {
    name: "eTouch",
    links: {
      facebook: "#",
      instagram: "#",
      google: "#",
      youtube: "#",
    },
  },
  {
    name: "Xora",
    links: {
      facebook: "https://www.facebook.com/XoraHyd",
      instagram: "https://www.instagram.com/xorahyd/",
      google: "https://share.google/t4zOyzkavdDzviy4X",
      youtube: "#",
    },
  },
  {
    name: "Salud",
    links: {
      facebook: "https://www.facebook.com/goasalud",
      instagram: "https://www.instagram.com/saludgoa/",
      google: "https://share.google/K4Q8oEnQ31UcIFirr",
      youtube: "#",
    },
  },
  {
    name: "Sunburn Union",
    links: {
      facebook: "https://www.facebook.com/SunburnUnionBengaluru",
      instagram: "https://www.instagram.com/sunburnunionbengaluru/",
      google: "https://share.google/X10s1XPGhlqCZAKcS",
      youtube: "#",
    },
  },
  {
    name: "Teksoft",
    links: {
      facebook: "#",
      instagram: "#",
      google: "#",
      youtube: "#",
    },
  },
];




const fb = "/path/to/facebook-icon.png"; // Replace with your actual image paths
const In = "/path/to/instagram-icon.png"; // Replace with your actual image paths
const Yt = "/path/to/youtube-icon.png"; // Replace with your actual image paths

const foodcompanies = [
  { name: "Buffalo Wild Wings" },
  { name: "Wing Zone" },
  { name: "Blaze Kebabs" },
  { name: "Xora" },
  { name: "Salud" },
  { name: "Sunburn Union" },
];


const Gallery = () => {
  const pathname = usePathname();
  const [gallery, setGallery] = useState([]);
  const [activeTab, setActiveTab] = useState("images");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImages, setModalImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch gallery data from API
  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const response = await axios.get(
          "http://72.60.96.63/api/collections/gallery/records"
        );
        setGallery(response.data.items || []);
      } catch (error) {
        console.error("Error fetching gallery:", error);
      }
    };
    fetchGallery();
  }, []);

  // Check if URL includes #socialmedia
  useEffect(() => {
    if (pathname && pathname.includes("#socialmedia")) {
      setActiveTab("socialmedia");
    }
  }, [pathname]);

  // Filter active images and videos
  const imageItems = gallery.filter(
    (item) => item.active && item.type === "image" && item.image
  );

  const videoItems = gallery.filter(
    (item) => item.active && item.type === "video" && item.video
  );

  // Slider settings for both galleries
  const sliderSettings = {
    autoplay: true,
    dots: false,
    infinite: true,
    autoplaySpeed: 2500,
    speed: 1000,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  const modalSliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: currentSlide,
  };

  // Handle image click to open modal
  const handleImageClick = (clickedItem) => {
    const images = imageItems.map(
      (item) =>
        `http://72.60.96.63/api/files/${item.collectionId}/${item.id}/${item.image}`
    );
    const index = imageItems.findIndex((item) => item.id === clickedItem.id);
    setModalImages(images);
    setCurrentSlide(index);
    setIsModalOpen(true);
  };

  return (
    <div>
      <NavBar />
      <div className="mt-16 max-w-7xl mx-auto">
        <section className="xl:py-5 bg-white overflow-hidden">
          <div className="p-8 lg:p-5">
            <h2 className="text-xl uppercase text-[#223972] lg:text-4xl font-semibold text-center lg:py-5">
              Gallery
            </h2>

            <div className="flex justify-center">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-2 lg:gap-4 mt-4 mb-6">
                <Button
                  onClick={() => setActiveTab("images")}
                  className={`border-2 transition-colors duration-200 ${
                    activeTab === "images"
                      ? "bg-[#223972] text-white"
                      : "bg-white text-[#223972] hover:bg-[#223972] hover:text-white"
                  } border-[#223972]`}
                >
                  Images
                </Button>
                <Button
                  onClick={() => setActiveTab("videos")}
                  className={`border-2 transition-colors duration-200 ${
                    activeTab === "videos"
                      ? "bg-[#223972] text-white"
                      : "bg-white text-[#223972] hover:bg-[#223972] hover:text-white"
                  } border-[#223972]`}
                >
                  Videos
                </Button>
                <Button
                  onClick={() => setActiveTab("socialmedia")}
                  className={`border-2 transition-colors duration-200 ${
                    activeTab === "socialmedia"
                      ? "bg-[#223972] text-white"
                      : "bg-white text-[#223972] hover:bg-[#223972] hover:text-white"
                  } border-[#223972]`}
                >
                  Social Media
                </Button>
                <Button
                  onClick={() => setActiveTab("deliveryPlatform")}
                  className={`border-2 transition-colors duration-200 ${
                    activeTab === "deliveryPlatform"
                      ? "bg-[#223972] text-white"
                      : "bg-white text-[#223972] hover:bg-[#223972] hover:text-white"
                  } border-[#223972]`}
                >
                  Delivery Platforms
                </Button>
              </div>
            </div>

            {/* Images Slider */}
            {activeTab === "images" && (
              <Slider {...sliderSettings}>
                {imageItems.map((item, idx) => (
                  <div key={idx} className="p-2">
                    <img
                      src={`http://72.60.96.63/api/files/${item.collectionId}/${item.id}/${item.image}`}
                      alt={`Gallery Image ${idx}`}
                      className="w-full h-64 object-cover rounded-md cursor-pointer"
                      onClick={() => handleImageClick(item)}
                    />
                  </div>
                ))}
              </Slider>
            )}

            {/* Videos Slider */}
            {activeTab === "videos" && (
              <div className="w-full px-4 py-6">
                {videoItems.length > 0 ? (
                  <Slider {...sliderSettings}>
                    {videoItems.map((item, idx) => (
                      <div key={idx} className="p-2">
                        <video
                          controls
                          className="w-full h-64 object-cover rounded-md"
                          crossOrigin="anonymous"
                        >
                          <source
                            src={`http://72.60.96.63/api/files/${item.collectionId}/${item.id}/${item.video}`}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <p className="text-center text-gray-500 text-lg">
                    Loading...
                  </p>
                )}
              </div>
            )}

            {/* Social Media Section */}
            {activeTab === "socialmedia" && (
              <section id="socialmedia">
                <div className="flex flex-col justify-center items-center py-6">
                  <h2 className="text-4xl font-semibold">Follow Our Brands</h2>
                  <p className="pt-4">
                    Explore all of our unique brands across your favourite
                    platforms.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 py-10">
                    {socialMediaLinks.map((item, idx) => (
                      <div
                        key={idx}
                        className="group border-2 cursor-pointer p-10 space-y-7 shadow-lg rounded-xl border-amber-200 hover:border-[#e23130] transition-all duration-300 ease-in-out transform hover:scale-100 hover:shadow-md"
                      >
                        <h4 className="text-center text-xl font-semibold">
                          {item.name}
                        </h4>
                        <div className="flex gap-x-7 justify-center">
                          <a
                            href={item.links.facebook}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={fb}
                              alt="facebook"
                              className="h-7 w-7 transition-all duration-300 ease-in-out transform hover:scale-125 hover:shadow-md"
                            />
                          </a>
                          <a
                            href={item.links.instagram}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={In}
                              alt="instagram"
                              className="h-7 w-7 transition-all duration-300 ease-in-out transform hover:scale-125 hover:shadow-md"
                            />
                          </a>
                          <a
                            href={item.links.youtube}
                            target="_blank"
                            rel="noreferrer"
                          >
                            <img
                              src={Yt}
                              alt="youtube"
                              className="h-7 w-7 transition-all duration-300 ease-in-out transform hover:scale-125 hover:shadow-md"
                            />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            )}

            {/* Delivery platform */}
            {activeTab === "deliveryPlatform" ? (
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <h2 className="text-2xl text-center">
                  Order Your Favourite Food
                </h2>
                <p className="text-center">
                  Order from Our Unique Brands on Your Favorite Delivery Apps
                </p>
                <div className="mt-8 mb-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 w-full">
                  {foodcompanies.map((company, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-yellow-300 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-6 flex flex-col items-center"
                    >
                      <h2 className="text-lg font-semibold text-gray-800 mb-4 text-center">
                        {company.name}
                      </h2>
                      <div className="flex space-x-4 text-2xl text-gray-600">
                        <img
                          className="h-6 w-6 rounded object-cover"
                          src="/home/gallery/zomato.jpg"
                          alt="zomato"
                        />
                        <img
                          className="h-6 w-6 rounded object-cover"
                          src="/home/gallery/swiggy.jpg"
                          alt="swiggy"
                        />
                        <img
                          className="h-6 w-6 rounded object-cover"
                          src="/home/gallery/dunzo.jpg"
                          alt="dunzo"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </section>

        {/* Modal with Carousel */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          contentLabel="Image Modal"
          className="max-w-3xl mx-auto mt-20 bg-white p-4 rounded-md outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="mb-4 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Close
          </button>
          <Slider {...modalSliderSettings}>
            {modalImages.map((img, idx) => (
              <div key={idx}>
                <img
                  src={img}
                  alt={`Modal Image ${idx}`}
                  className="w-full h-[500px] object-contain"
                />
              </div>
            ))}
          </Slider>
        </Modal>
      </div>
      <Footer />
    </div>
  );
};

export default Gallery;
