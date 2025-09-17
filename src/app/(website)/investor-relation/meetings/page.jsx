"use client";
import React, { useEffect, useState } from "react";
import pb from "../../_lib/pb";
import Accordion from "../../_components/Accordion";

const Meetings = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pb.collection("meetings").getFullList(200, {
          sort: "sno",
          requestKey: null,
        });
        setData(res);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="h-full w-full flex justify-center items-center">
        <div className="w-20 h-20 border-4 border-gray-300 border-t-4 border-t-[#152768] rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div>
      <div className="px-4">
        <h2 className="text-2xl text-[#223972] mt-3 font-semibold text-center">
          Meetings
        </h2>
      </div>
      <div className="overflow-x-auto p-4">
        <Accordion items={data} />
      </div>
    </div>
  );
};

export default Meetings;
