import React from "react";
import InputHalaman from "../../../components/pilihHalaman"
const ERaport = () => {
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <div>
        <InputHalaman />
      </div>
      <h1 className="text-2xl font-bold my-4">E - Raport</h1>
      
      <div className="flex gap-2 mb-4 flex-wrap">
        {[...Array(9)].map((_, index) => (
          <button key={index} className="bg-blue-500 text-white px-4 py-2 rounded-md">
            Sub Bab {index + 1}
          </button>
        ))}
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">E - Raport</button>
      </div>
      
      <div className="flex gap-2 mb-4">
        <button className="border px-4 py-2 rounded-md">Pilih Semester</button>
        <button className="border px-4 py-2 rounded-md flex items-center gap-1">
          <span role="img" aria-label="edit"></span> Edit
        </button>
        <button className="border px-4 py-2 rounded-md">Tambahkan Nilai</button>
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Download</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white shadow-md rounded-md p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border p-2">MATA PELAJARAN</th>
                <th className="border p-2">NILAI R</th>
                <th className="border p-2">KETERANGAN</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">Mapel</td>
                <td className="border p-2">Angka</td>
                <td className="border p-2">Deskripsi untuk penilaian... </td>
              </tr>
              <tr>
                <td className="border p-2 h-10"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
              <tr>
                <td className="border p-2 h-10"></td>
                <td className="border p-2"></td>
                <td className="border p-2"></td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gray-200 p-4 rounded-md shadow-md">
            <h3 className="font-semibold">EKSTRAKULIKULER</h3>
          </div>
          <div className="bg-gray-200 p-4 rounded-md shadow-md">
            <h3 className="font-semibold">KETIDAKHADIRAN</h3>
            <p>Izin berapa hari (...) </p>
            <p>Sakit berapa hari (...) </p>
            <p>Tanpa keterangan berapa hari (...) </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERaport;
