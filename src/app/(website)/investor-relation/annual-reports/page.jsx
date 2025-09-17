"use client";
import React, { useEffect, useState } from "react";
import pb from "../../_lib/pb";
import { FileText } from "lucide-react";

const Annual = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pb.collection("annual_reports").getFullList(200, {
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
    <div className="flex flex-col items-center px-4">
      <div className="text-2xl text-[#223972] mt-3 font-semibold text-center">
        Annual Reports
      </div>

      <div className="flex flex-col space-y-4 p-4">
        {data.map((report) => (
          <a
            key={report.id}
            href={pb.files.getURL(report, report.file)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border border-red-500 text-red-600 px-4 py-2 rounded-full hover:bg-red-50 transition"
          >
            <FileText className="text-red-500" />

            <span>{report.title}</span>
          </a>
        ))}
      </div>

      {/* View More Link */}
      <a href="#" className="text-blue-600 hover:underline text-sm">
        View More Files
      </a>
    </div>
  );
};

export default Annual;
