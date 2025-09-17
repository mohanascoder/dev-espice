"use client";
import React, { useEffect, useState } from "react";
import pb from "../../_lib/pb";

const Corporate = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pb.collection("corporate_info").getFullList(200, {
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
      <div className="text-2xl text-[#223972] mt-3 font-semibold text-center">
        Corporate Information
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-8">
        {data.length > 0 ? (
          data.map((item) => {
            return (
              <div
                key={item.id}
                className="border border-red-300 rounded-md p-4"
              >
                <div className="font-semibold underline text-[#223972] mb-2 text-xl">
                  {item.title}
                </div>
                <p>
                  <strong className="text-[#152768] text-lg">
                    {item.subTitle}
                  </strong>
                  <br />
                  {item.address}
                  <br />
                  Mobile No: {item.phone}
                  <br />
                  Email:
                  <a href={`mailto:${item.email}`} className="text-blue-600">
                    {item.email}
                  </a>
                </p>
              </div>
            );
          })
        ) : (
          <div>No corporate information available.</div>
        )}
      </div>
    </div>
  );
};

export default Corporate;
