"use client";
import NavBar from "@/components/shared/NavBar";
import React, { useEffect, useState } from "react";
import Footer from "../footer/page";
import axios from "axios";

const Franchise = () => {
  const [brandLogos, setBrandLogos] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const response = await axios.get(
          "http://72.60.96.63/api/collections/brands/records"
        );
        setBrandLogos(response.data.items);
      } catch (error) {
        console.error("Fetch brandLogos error:", error);
      }
    };
    fetchTeams();
  }, []);
  return (
    <div>
      <NavBar />
      <div className="mt-16 max-w-7xl mx-auto mb-4">
        <img className="w-full" src="franchises/franchise.jpg" alt="" />
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {brandLogos.length > 0 ? (
            brandLogos.map((brands, index) => {
              return (
                <div className="border border-orange-500 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer ease-in-out transform hover:scale-[1.02] p-4">
                  <div className="flex items-center justify-center">
                    <img
                      className="w-32 h-32 object-contain"
                      src={`http://72.60.96.63/api/files/${brands?.collectionId}/${brands?.id}/${brands.logo}`}
                      alt=""
                    />
                  </div>
                  <p className="text-sm text-center">
                    {brands?.aboutDescription.split(" ").slice(0, 18).join(" ")}
                    <a href="/brands/bufewings">
                      <span className="text-[#d13b2a] font-semibold">
                        ...apply
                      </span>
                    </a>
                  </p>
                </div>
              );
            })
          ) : (
            <p>Loading brands...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Franchise;
