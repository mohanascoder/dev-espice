"use client";

import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import pb from "../../_lib/pb";

const FinancialResults = () => {
  const [loading, setLoading] = useState(true);
  const [financialResults, setFinancialResults] = useState([]);
  const pathname = usePathname();

  const quarters = ["q1", "q2", "q3", "q4"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const finResultRes = await pb
          .collection("financial_results")
          .getFullList(200, {
            sort: "-sno", // Latest first
          });

        setFinancialResults(finResultRes);
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
      <div className="h-screen w-full flex justify-center items-center bg-gray-50">
        <div className="w-16 h-16 border-4 border-gray-300 border-t-4 border-t-blue-700 rounded-full animate-spin"></div>
      </div>
    );

  const isActive = pathname === "/investor-relation/financial-results";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-900 border-b-2 border-gray-300 pb-2 inline-block">
          Financial Results
        </h2>
      </div>

      {isActive && (
        <div className="overflow-x-auto rounded-lg shadow-sm border border-gray-200 bg-white">
          <table className="min-w-full table-auto text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 border border-gray-200 text-left">Year</th>
                {quarters.map((q) => (
                  <th key={q} className="p-3 border border-gray-200 text-left">
                    {q.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {financialResults.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No financial results available.
                  </td>
                </tr>
              ) : (
                financialResults.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="p-3 border border-gray-200 font-medium text-blue-900">
                      {report.title.trim()}
                    </td>
                    {quarters.map((q) => {
                      const pdfFileName = report[q];
                      return (
                        <td key={q} className="p-3 border border-gray-200">
                          {pdfFileName ? (
                            <span className="inline-block px-3 py-1 text-red-600 bg-red-100 rounded-full text-xs">
                              {formatDateFromFilename(pdfFileName)}
                            </span>
                          ) : (
                            <span className="text-gray-400 italic">–</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

// Helper function to format date from filename
const formatDateFromFilename = (filename) => {
  const dateMatch = filename.match(/(\d{2})[_\-](\d{2})[_\-](\d{4})/);
  if (dateMatch) {
    const [, day, month, year] = dateMatch;
    return `${day}-${month}-${year}`;
  }
  return filename.replace(/\.pdf$/i, ""); // fallback
};

export default FinancialResults;
