"use client";
import React, { useEffect, useState } from "react";
import pb from "../../_lib/pb";

const Disclosures = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await pb.collection("disclosures").getFullList(200, {
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
          Disclosures under Regulation 46
        </h2>
      </div>
      <div className="overflow-x-auto p-4">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-slate-100 text-slate-700 text-center">
              <th className="w-1/12 px-4 py-2 font-medium">SNo</th>
              <th className="w-9/12 px-4 py-2 font-medium">Disclosure</th>
              <th className="w-2/12 px-4 py-2 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((disclosure) => (
              <tr className="text-slate-800" key={disclosure.id}>
                <td className="px-4 py-2 text-center">{disclosure.sno}</td>
                <td className="px-4 py-2 text-left">{disclosure.title}</td>
                <td className="px-4 py-2 text-center">
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#152768] text-white px-3 py-1 rounded"
                    href={
                      disclosure.type == "link"
                        ? disclosure.link
                        : pb.files.getURL(disclosure, disclosure.pdf)
                    }
                  >
                    Click Here
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

export default Disclosures;
