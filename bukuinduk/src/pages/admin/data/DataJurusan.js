import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../../components/nav";
import { Link } from "react-router-dom";
import { CiFilter } from "react-icons/ci";

import { baseUrl } from "../../../utils/constan";

/* 

=====================================================================================================
                    
  >> Documented and Edited By. Joko & Aden || Developed By. Kelompok 1 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const DataJurusan = () => {
  const [showDialog, setShowDialog] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const [jurusan, setJurusan] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deletedName, setDeleteName] = useState(null);

  const [searchkey, setSearchkey] = useState("");
  const [filtered, setFiltered] = useState([]);

  const updateJurusan = () => {
    axios
      .get(baseUrl + "/admin/jurusan", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const seito = res.data;
        console.log(seito);
        setJurusan(seito);
      });
  };

  const deleteJurusan = (id) => {
    return axios
      .delete(baseUrl + "/admin/jurusan/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setDeleteId(null);
        updateJurusan();
      })
      .catch((err) => {});
  };

  useEffect(updateJurusan, []);

  const handleButtonClick = () => {
    setShowDialog(true);
  };

  const handleCancelClick = () => {
    setShowDialog(false);
    setInputValue("");
  };

  const handleEnterClick = () => {
    axios
      .post(
        baseUrl + "/admin/jurusan/",
        {
          nama: inputValue,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(() => {
        updateJurusan();
        setShowDialog(false);
        setInputValue("");
      });
  };

  useEffect(() => {
    let data = jurusan;
    if (searchkey) {
      data = data.filter((x) =>
        x.nama.toLowerCase().includes(searchkey.toLowerCase())
      );
    }
    setFiltered(data);
  });

  return (
    <div className="flex h-screen">
      <div className="w-3/8 h-screen">
        <Navigation />
      </div>

      <div className="w-5/8 h-screen flex-1 p-6 bg-white text-black overflow-y-scroll">
        <header className="flex justify-between items-center gap-8 mb-4">
          <h1 className="font-inter text-3xl font-normal leading-5">
            Jurusan SMKN 2 Singosari
          </h1>
          <button
            onClick={handleButtonClick}
            className="bg-blue-500 text-white p-2 rounded-lg"
          >
            Tambah Jurusan
          </button>
        </header>
        <hr className="border-black border-2 w-5/8" />
        <div className="w-full flex gap-4 justify-between mt-6">
          <div className="flex-grow relative">
            <input
              onChange={(e) => setSearchkey(e.target.value)}
              type="search"
              placeholder="Search"
              name="search"
              className="input-field p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
            />
            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zm2.828 7.828a6 6 0 111.414-1.414l4.95 4.95a1 1 0 01-1.414 1.414l-4.95-4.95z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </div>
        </div>

        <div className="w-full mt-8">
          <table className="w-full">
            <thead className="bg-gray-200 border-b">
              <tr>
                <th className="font-bold px-4 py-2 w-1/6 text-left">No</th>
                <th className="font-bold px-4 py-2 w-2/6 text-center">
                  Jurusan
                </th>
                <th className="font-bold px-4 py-2 w-3/6 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => {
                return (
                  <tr>
                    <td id="no" className="border px-4 py-2">
                      {s.id}
                    </td>
                    <td id="nisn" className="border px-4 py-2">
                      {s.nama}
                    </td>
                    <td className="border px-4 py-2 flex space-x-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-1/2 rounded-lg">
                        Lihat Detail
                      </button>
                      <button
                        onClick={() => {
                          setDeleteId(s.id);
                          setDeleteName(s.nama);
                        }}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-1/2 rounded-lg"
                      >
                        Perbarui
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showDialog && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Tambah Jurusan</h2>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama jurusan"
            />
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={handleCancelClick}
                className="bg-gray-500 text-white p-2 rounded-lg"
              >
                Batal
              </button>
              <button
                onClick={handleEnterClick}
                className="bg-blue-500 text-white p-2 rounded-lg"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteId ? (
        <div className="fixed backdrop-blur-md w-screen h-screen flex justify-center items-center">
          <div className="bg-white w-2/4 p-5 rounded-xl">
            <div className="w-full f-head f-header font-bold">
              Perbarui Data Jurusan
            </div>
            <div className="p-3">
              Perbarui data jurusan <b>{deletedName}</b>?
            </div>
            <div className="w-full flex flex-row font-header font-bold">
              <button
                onClick={() => setDeleteId(null)}
                className=" w-1/2 text-center py-1 text-red-500"
              >
                Batalkan
              </button>
              <button
                onClick={() => deleteJurusan(deleteId)}
                className=" w-1/2 text-center py-1 text-white bg-[#0C7FDA]"
              >
                Konfirmasi
              </button>
            </div>
          </div>
        </div>
      ) : (
        false
      )}
    </div>
  );
};

export default DataJurusan;
