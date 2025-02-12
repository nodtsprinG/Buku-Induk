import React, { useState, useEffect } from "react";
import axios from "axios";
import InputHalaman from "../../../components/pilihHalaman";
import Profil from "../../../components/profileCard";
import { baseUrl } from "../../../utils/constan";

const ERaport = () => {
  const [activeSemester, setActiveSemester] = useState(1);
  const [mapelList, setMapelList] = useState([]);  // Menyimpan daftar mapel dari API
  const [nilaiList, setNilaiList] = useState([
    { mapel: "", nilai: "", keterangan: "" }
  ]); // Menyimpan daftar nilai yang bisa ditambahkan

  useEffect(() => {
    fetchMapel();
  }, []);

  const fetchMapel = async () => {
    try {
      const response = await axios.get(baseUrl + "/admin/mapel", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMapelList(response.data);
    } catch (error) {
      console.error("Error fetching mapel:", error);
    }
  };

  const handleAddRow = () => {
    setNilaiList([...nilaiList, { mapel: "", nilai: "", keterangan: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const newNilaiList = [...nilaiList];
    newNilaiList[index][field] = value;
    setNilaiList(newNilaiList);
  };

  const handleSave = async () => {
    try {
      const response = await axios.post(baseUrl + "/admin/nilai", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        semester: activeSemester,
        nilaiList,
      });
      alert("Data berhasil disimpan!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error saving nilai:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      <h1 className="text-2xl font-bold my-4">E - Raport (Semester {activeSemester})</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[...Array(6)].map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSemester(index + 1)}
            className={`px-4 py-2 rounded-md ${activeSemester === index + 1 ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
          >
            Semester {index + 1}
          </button>
        ))}
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded-md">Simpan</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">Import</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 p-2 font-header font-normal text-[24px] text-center">
                <td className="border p-2">MATA PELAJARAN</td>
                <td className="border p-2">NILAI</td>
                <td className="border p-2">KETERANGAN</td>
              </tr>
            </thead>
            <tbody>
              {nilaiList.map((item, index) => (
                <tr key={index}>
                  <td className="border p-2">
                    <select
                      className="w-full p-1 outline-none"
                      value={item.mapel}
                      onChange={(e) => handleInputChange(index, "mapel", e.target.value)}
                    >
                      <option value="">Pilih Mapel</option>
                      {mapelList.map((mapel) => (
                        <option key={mapel.id} value={mapel.nama}>{mapel.nama}</option>
                      ))}
                    </select>
                  </td>
                  <td className="border p-2">
                    <input
                      type="number"
                      className="w-full p-1 outline-none"
                      placeholder="Nilai"
                      value={item.nilai}
                      onChange={(e) => handleInputChange(index, "nilai", e.target.value)}
                    />
                  </td>
                  <td className="border p-2">
                    <textarea
                      className="w-full p-1 outline-none resize-y"
                      placeholder="Deskripsi"
                      value={item.keterangan}
                      onChange={(e) => handleInputChange(index, "keterangan", e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleAddRow} className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">
            Tambah Nilai
          </button>
        </div>
      </div>
    </div>
  );
};

export default ERaport;