"use client";
import { useEffect, useState } from "react";
import pb from "@/app/(admin)/_lib/pb";
import { Trash2, X } from "lucide-react";

const Brands = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [imgOpen, setImgOpen] = useState("");
  const [editingRow, setEditingRow] = useState(null);

  const [fade, setFade] = useState(false);
  const [imgFade, setImgFade] = useState(false);

  // Form state
  const [newImages, setNewImages] = useState({}); // {banner1: File, banner2: File, banner3: File}

  // Trigger fade when modal opens
  useEffect(() => {
    setFade(open);
  }, [open]);

  // Trigger fade when image modal opens
  useEffect(() => {
    setImgFade(!!imgOpen);
  }, [imgOpen]);

  // Fetch brands
  const fetchData = async () => {
    const records = await pb.collection("brands").getFullList(
      {
        sort: "sno",
      },
      { requestKey: null }
    );
    setData(records);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImages((prev) => ({ ...prev, [field]: file }));
    }
  };

  const openEdit = (row) => {
    setEditingRow(row);
    setNewImages({});
    setOpen(true);
  };

  const handleSave = async () => {
    if (!editingRow) return;
    try {
      const updateData = {};
      for (const field of ["banner1", "banner2", "banner3"]) {
        if (newImages[field]) updateData[field] = newImages[field];
      }

      const record = await pb
        .collection("brands")
        .update(editingRow.id, updateData);

      setData((prev) =>
        prev.map((item) => (item.id === editingRow.id ? record : item))
      );

      setOpen(false);
      setEditingRow(null);
      setNewImages({});
    } catch (err) {
      console.error(err);
      alert("Error saving: " + err.message);
    }
  };

  const handleDeleteField = async (field) => {
    if (!editingRow || !editingRow[field]) return;

    const confirmDelete = confirm(`Delete ${field}?`);
    if (!confirmDelete) return;

    try {
      const updated = await pb.collection("brands").update(editingRow.id, {
        [field]: "",
      });

      setEditingRow(updated);
      setData((prev) =>
        prev.map((item) => (item.id === editingRow.id ? updated : item))
      );
    } catch (err) {
      console.error(err);
      alert("Error deleting image: " + err.message);
    }
  };

  const fmt = (val) => (val ? new Date(val).toLocaleString() : "-");

  return (
    <>
      {/* Header */}
      <div className="fixed top-0 p-4 bg-gray-100 border-b w-full flex flex-wrap gap-2 z-10">
        <a href="/dashboard">
          <span className="text-gray-600 hover:text-black">Dashboard</span>
        </a>
        <span className="text-gray-600">/</span>
        <span className="text-black">Brands</span>
        <span className="text-gray-600">/</span>
        <a href="/dashboard/brands/banners">
          <span className="text-black">Banners</span>
        </a>
      </div>

      {/* Table */}
      <div className="p-4 mt-14 w-full">
        <h2 className="font-semibold text-lg mb-3">Brand (Banners)</h2>

        <div className="overflow-x-auto border border-gray-300">
          <div className="max-h-[75vh] overflow-y-auto no-scrollbar">
            <table className="w-full min-w-[900px] text-sm">
              <thead className="sticky top-0 bg-gray-200">
                <tr>
                  <th className="px-3 py-2">S.No</th>
                  <th className="px-3 py-2">Name</th>
                  <th className="px-3 py-2">Banner1</th>
                  <th className="px-3 py-2">Banner2</th>
                  <th className="px-3 py-2">Banner3</th>
                  <th className="px-3 py-2">Created</th>
                  <th className="px-3 py-2">Updated</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {data.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-4 text-gray-600">
                      No Records
                    </td>
                  </tr>
                ) : (
                  data.map((item, i) => (
                    <tr
                      key={item.id}
                      className="border-t bg-gray-50 hover:bg-gray-100 cursor-pointer"
                      onClick={() => openEdit(item)}
                    >
                      <td className="px-3 py-2">{i + 1}</td>
                      <td className="px-3 py-2 font-medium">{item.name}</td>
                      {["banner1", "banner2", "banner3"].map((field) => (
                        <td key={field} className="px-3 py-2">
                          {item[field] ? (
                            <img
                              src={`${pb.files.getURL(item, item[field])}?thumb=64x0`}
                              className="w-12 h-12 rounded object-cover mx-auto hover:scale-105 transition-all duration-200"
                              alt={field}
                              onClick={(e) => {
                                e.stopPropagation();
                                setImgOpen(
                                  `${pb.files.getURL(item, item[field])}?thumb=1024x0`
                                );
                              }}
                            />
                          ) : (
                            "N/A"
                          )}
                        </td>
                      ))}
                      <td className="px-3 py-2 text-gray-500">
                        {fmt(item.created)}
                      </td>
                      <td className="px-3 py-2 text-gray-500">
                        {fmt(item.updated)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal for Edit */}
      {open && editingRow && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-100 ${
            fade ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setOpen(false)}
        >
          <div className="relative">
            <div
              className={`bg-gray-50 rounded p-6 w-[700px] max-h-[70dvh] overflow-y-auto no-scrollbar shadow transform transition-transform duration-100 ${
                fade ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold mb-4">
                Edit Brand - {editingRow.name}
              </h3>

              {/* Brand name (read-only) */}
              <label className="block mb-2 text-sm font-medium">Name</label>
              <input
                type="text"
                value={editingRow.name}
                readOnly
                className="w-full border px-3 py-2 rounded mb-4 bg-gray-100 text-gray-700 cursor-not-allowed"
              />

              {/* Banner fields */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {["banner1", "banner2", "banner3"].map((field) => (
                  <div key={field} className="border p-3 rounded bg-white">
                    <label className="block mb-2 text-sm font-medium">
                      {field}
                    </label>

                    {editingRow[field] && (
                      <div className="relative mb-2">
                        <img
                          src={pb.files.getURL(editingRow, editingRow[field])}
                          className="w-full h-28 object-contain rounded"
                          alt={field}
                        />
                        <button
                          onClick={() => handleDeleteField(field)}
                          type="button"
                          className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-bl"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    )}

                    {newImages[field] && (
                      <div className="flex items-center gap-2">
                        <label
                          htmlFor="newImg"
                          className="text-xs text-gray-500"
                        >
                         Uploaded Img
                        </label>
                        <img
                          src={URL.createObjectURL(newImages[field])}
                          className="w-20 object-contain rounded mb-2 mt-4 border"
                          alt="preview"
                        />
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange(e, field)}
                      className="w-full border px-2 py-1 rounded"
                    />
                  </div>
                ))}
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-gray-700 text-white hover:bg-gray-800 rounded"
                >
                  Save
                </button>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="absolute top-0 right-0 p-1 rounded-bl-md bg-gray-700 text-white"
            >
              <X />
            </button>
          </div>
        </div>
      )}

      {/* Preview for Large Image */}
      {imgOpen && (
        <div
          className={`fixed inset-0 flex items-center justify-center z-50 bg-black/40 transition-opacity duration-100 ${
            imgFade ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setImgOpen("")}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative rounded w-[80dvw] md:w-auto md:h-[60dvh] transform transition-transform duration-100 ${
              imgFade ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
            }`}
          >
            <img
              src={imgOpen}
              alt="preview"
              className="w-full h-full object-contain bg-white"
            />
            <button
              onClick={() => setImgOpen("")}
              className="absolute top-0 right-0 p-1 rounded-bl-xl bg-red-600 text-white"
            >
              <X />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Brands;
