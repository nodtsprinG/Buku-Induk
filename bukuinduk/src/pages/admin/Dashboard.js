import React, { useState, useEffect } from "react";
import axios from "axios";

import { FaFemale, FaMale, FaDatabase, FaUser } from "react-icons/fa";

import detailPreparing from "../../utils/detailPreparing";

import Navigation from "../../components/nav";
import { useNavigate } from "react-router";

import { baseUrl } from "../../utils/constan";
import { Toaster } from "react-hot-toast";
/*
=====================================================================================================
                    D A T A _ B I O D A T A _ S I S W A
  >> Developed By. Joko Aiko & Aden || Developed By. Kelompok 1 <<
  >> Edited By. Nataniel <<

[!] Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================
*/

const Dashboard = () => {
  const [siswa, setSiswa] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [deleteId, setDeleteId] = useState(null);
  const [deleteUsername, setDeleteUsername] = useState(null);

  const [searchkey, setSearchkey] = useState("");
  const [filtered, setFiltered] = useState([]);

  const navigate = useNavigate()

  const detailClick = (id) => {
    detailPreparing(id)
    navigate(`/admin/audit/${id}/biodata`)
  }

  const updateSiswa = () => {
    console.log(localStorage.getItem("token"));
    axios
      .get(baseUrl + "/admin/akun", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const seito = res.data;
        console.log(seito);
        setSiswa(seito);
        return axios.get(baseUrl + "/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      })
      .then((res) => {
        setDashboard(res.data);
        console.log(res.data);
      })
      .catch((err) => {});
  };

  const deleteAkun = (id) => {
    return axios
      .delete(baseUrl + "/admin/akun/" + id, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then(() => {
        setDeleteId(null);
        updateSiswa();
      })
      .catch((err) => {});
  };

  useEffect(() => {
    let data = siswa;
    if (searchkey) {
      data = data.filter((x) =>
        x.nama.toLowerCase().includes(searchkey.toLowerCase())
      );
    }
    setFiltered(data);
  });

  useEffect(updateSiswa, []);

  return (
    <div className="flex h-screen font-body ">
      <Navigation />

      <div className="w-screen h-screen flex-1 p-6 bg-gray-100 text-black overflow-y-scroll">
        <h1 className="font-header text-3xl font-normal leading-5 text-left">
          Dashboard
        </h1>
        <hr className="border-t-2 mt-4 bg-black-600"></hr>

        <div className="grid items-center justify-stretch w-full">
          <table className="m-[15px] ml-120 font-body">
            <thead>
              <tr>
                <th className="p-0">
                  <div className="m-[10px] w-[200px] h-[250px] rounded-[10px] text-white bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col items-start justify-start">
                    <FaUser size={40} className="ml-[15px] mt-[40px]" />
                    <p className="ml-[15px] mt-[5px] text-left font-bold text-[15px]">
                      Total siswa
                    </p>
                    <p className="font-extralight ml-[15px] mt-[5px] text-left text-[10px]">
                      Data Siswa
                    </p>
                    <p className="ml-[15px] mt-[5px] text-lg text-left text-[15px]">
                      {dashboard.count_siswa}
                    </p>
                  </div>
                </th>

                <th className="p-0">
                  <div className="m-[10px] w-[200px] h-[250px] rounded-[10px] text-white bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col items-start justify-start">
                    <FaDatabase size={40} className="ml-[15px] mt-[40px]" />
                    <p className="ml-[15px] mt-[5px] text-left font-bold text-[15px]">
                      Data di Inputkan
                    </p>
                    <p className=" font-extralight ml-[15px] mt-[5px] text-left text-[10px]">
                      Data Siswa
                    </p>
                    <p className="ml-[15px] mt-[5px] text-lg text-left text-[15px]">
                      {dashboard.count_datainputed}
                    </p>
                  </div>
                </th>

                <th className="p-0">
                  <div className="m-[10px] w-[200px] h-[250px] rounded-[10px] text-white bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col items-start justify-start">
                    <FaMale size={40} className="ml-[15px] mt-[40px]" />
                    <p className="ml-[15px] mt-[5px] text-left font-bold text-[15px]">
                      Siswa Laki-Laki
                    </p>
                    <p className="font-extralight ml-[15px] mt-[5px] text-left text-[10px]">
                      Data Siswa
                    </p>
                    <p className="ml-[15px] mt-[5px] text-lg text-left text-[15px]">
                      {dashboard.count_laki}
                    </p>
                  </div>
                </th>

                <th className="p-0">
                  <div className="m-[10px] w-[200px] h-[250px] rounded-[10px] text-white bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col items-start justify-start">
                    <FaFemale size={40} className="ml-[15px] mt-[40px]" />
                    <p className="ml-[15px] mt-[5px] text-left font-bold text-[15px]">
                      Siswa Perempuan
                    </p>
                    <p className="font-extralight ml-[15px] mt-[5px] text-left text-[10px]">
                      Data Siswa
                    </p>
                    <p className="ml-[15px] mt-[5px] text-lg text-left text-[15px]">
                      {dashboard.count_perempuan}
                    </p>
                  </div>
                </th>
              </tr>
            </thead>
          </table>

          <div className="w-full flex gap-4 justify-between mt-6">
            <div className="flex-grow relative">
              <input
                onChange={(e) => setSearchkey(e.target.value)}
                type="search"
                placeholder="Search"
                name="search"
                if
                className="input-field p-2 border w-full border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10"
              />
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="https://imgur.com/jr5eDVX"
                >
                  <path
                    fill-rule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zm2.828 7.828a6 6 0 111.414-1.414l4.95 4.95a1 1 0 01-1.414 1.414l-4.95-4.95z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </div>
            <button className="font-semibold bg-blue-500 rounded-lg w-26 ml-4 p-2 text-white">
              Lihat Semua
            </button>
          </div>

          <div className="w-84 mt-8">
            <table className="w-full border-collapse table-auto overflow-scroll">
              <thead className="bg-gray-200 border-b">
                <tr>
                  <th className="font-bold text-left w-10 px-4 py-2">No</th>
                  <th className="font-bold text-left w-20 px-4 py-2">Nisn</th>
                  <th className="font-bold text-left w-28 px-4 py-2">Nama</th>
                  <th className="font-bold text-left w-40 px-4 py-2">Aksi</th>
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
                        {s.nisn}
                      </td>
                      <td className="border px-4 py-2">{s.nama}</td>
                      <td className="border px-4 py-2 flex space-x-2">
                        <button onClick={() => detailClick(s.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-1/2 rounded-lg">
                          Lihat Detail
                        </button>
                        <button
                          onClick={() => {
                            setDeleteId(s.id);
                            setDeleteUsername(s.nama);
                          }}
                          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 w-1/2 rounded-lg"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {deleteId ? (
        <div className="fixed backdrop-blur-md w-screen h-screen flex justify-center items-center border border-black text-lg">
          <div className="bg-white w-2/4 p-5 rounded-xl">
            <div className="w-full f-head f-header font-bold">Edit Data Siswa</div>
            <div className="p-3">
              Perbarui data akun milik{" "}
              <b>{deleteUsername}</b>?
            </div>
            <div className="w-full flex flex-row font-header font-bold gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className=" w-1/2 text-center py-1 text-white bg-red-500"
              >
                Batalkan
              </button>
              <button
                onClick={() => deleteAkun(deleteId)}
                className=" w-1/2 text-center py-1 text-white bg-blue-500"
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

export default Dashboard;
