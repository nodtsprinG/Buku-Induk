import React, { useState } from "react";
import InputHalaman from "../../../components/pilihHalaman";
import Profil from "../../../components/profileCard";

const ERaport = () => {
  const [activeSemester, setActiveSemester] = useState(1); // Default semester 1

  const handleSemesterClick = (semester) => {
    setActiveSemester(semester);
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
            onClick={() => handleSemesterClick(index + 1)}
            className={`px-4 py-2 rounded-md ${activeSemester === index + 1 ? 'bg-blue-700' : 'bg-blue-500'} text-white`}
          >
            Semester {index + 1}
          </button>
        ))}
        <button className="bg-green-500 text-white px-4 py-2 rounded-md">Unduh</button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md">Import</button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 bg-white p-4">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200 p-2 font-header font-normal text-[24px] text-center">
                <td className="border p-2">MATA PELAJARAN</td>
                <td className="border p-2">NILAI R</td>
                <td className="border p-2">KETERANGAN</td>
              </tr>
            </thead>
            <tbody>
              {Array(15).fill().map((_, index) => (
                <tr key={`${activeSemester}-${index}`}>
                  <td className="border p-2">
                    <input type="text" className="w-full p-1 outline-none" placeholder={`Nama Mapel (Semester ${activeSemester})`} />
                  </td>
                  <td className="border p-2">
                    <input type="number" className="w-full p-1 outline-none" placeholder="Nilai" />
                  </td>
                  <td className="border p-2">
                    <textarea className="w-full h-1/2 p-1 outline-none resize-y" placeholder="Deskripsi" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="py-2 px-4 bg-white">
          <div className="rounded-md shadow-md space-y-2">
            <div className="bg-gray-200 p-2 mt-2">
              <h3 className="font-header font-normal text-[24px] text-center">EKSTRAKULIKULER (Semester {activeSemester})</h3>
            </div>
            <ul className="space-y-2 w-full p-4">
              {Array(5).fill().map((_, index) => (
                <li key={index} className="flex items-center gap-4">
                  <label>{index + 1}</label>
                  <input type="text" className="border w-[90%] p-2 outline-none rounded" placeholder={`Ekstrakurikuler ${index + 1}`} />
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-md shadow-md space-y-2 mt-5">
            <div className="bg-gray-200 p-2 mt-2">
              <h3 className="font-header font-normal text-[24px] text-center">KETIDAKHADIRAN</h3>
            </div>
            <div className="bg-white p-2">
              <table className="w-full text-center">
                <tbody>
                  <tr>
                    <td className="p-2">Izin</td>
                    <td className="p-2"><input type="number" className="w-1/4 p-1 text-sm border border-gray-200 outline-none text-center" /></td>
                  </tr>
                  <tr>
                    <td className="p-2">Sakit</td>
                    <td className="p-2"><input type="number" className="w-1/4 p-1 text-sm border border-gray-200 outline-none text-center" /></td>
                  </tr>
                  <tr>
                    <td className="p-2">Alpa</td>
                    <td className="p-2"><input type="number" className="w-1/4 p-1 text-sm border border-gray-200 outline-none text-center" /></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERaport;
