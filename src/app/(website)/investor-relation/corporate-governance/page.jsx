"use client";
import React, { useEffect, useState } from "react";
import pb from "../../_lib/pb";

const CorporateGov = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pb
          .collection("corporate_governance")
          .getFullList(200, {
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
          Corporate Governance
        </h2>
      </div>
      <div className="overflow-x-auto p-4">
        {/* Introduction Paragraph */}
        <p className="text-gray-800 mb-6">{data[0] && data[0].description1}</p>

        {/* Key Governance Principles */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">
            Key Governance Principles:
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {data[0] &&
              data[0].principles.map((principle, index) => (
                <li key={index}>{principle}</li>
              ))}
          </ul>
        </div>

        {/* Concluding Statement */}
        <p className="text-gray-800">{data[0] && data[0].description2}</p>
      </div>
    </div>
  );
};

export default CorporateGov;
