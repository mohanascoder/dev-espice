"use client";
import React, { useEffect, useState } from "react";
import pb from "../../_lib/pb";

const ShareHolding = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pb.collection("share_holding").getFullList(200, {
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
          Shareholding Pattern
        </h2>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-center">
              <th className="w-1/5 px-4 py-2 font-medium">Year</th>
              <th className="w-1/5 px-4 py-2 font-medium">Q1</th>
              <th className="w-1/5 px-4 py-2 font-medium">Q2</th>
              <th className="w-1/5 px-4 py-2 font-medium">Q3</th>
              <th className="w-1/5 px-4 py-2 font-medium">Q4</th>
            </tr>
          </thead>
          <tbody>
            {data.map((report) => (
              <tr className="text-slate-800" key={report.id}>
                <td className="px-4 py-2 font-semibold text-[#152768] text-center">
                  {report.title}
                </td>
                <td className="px-4 py-2 text-center">
                  <a
                    target="_blank"
                    className="text-red-500"
                    href={pb.files.getURL(report, report.q1)}
                  >
                    Q1
                  </a>
                </td>
                <td className="px-4 py-2 text-center">
                  <a
                    target="_blank"
                    className="text-red-500"
                    href={pb.files.getURL(report, report.q2)}
                  >
                    Q2
                  </a>
                </td>
                <td className="px-4 py-2 text-center">
                  <a
                    target="_blank"
                    className="text-red-500"
                    href={pb.files.getURL(report, report.q3)}
                  >
                    Q3
                  </a>
                </td>
                <td className="px-4 py-2 text-center">
                  <a
                    target="_blank"
                    className="text-red-500"
                    href={pb.files.getURL(report, report.q4)}
                  >
                    Q4
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShareHolding;
