import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../../components/nav";
import { Link, useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import Filter from "../../../components/filter";
import { baseUrl } from "../../../utils/constan";
import FilterComponent from "../../../components/filter";
import detailPreparing from "../../../utils/detailPreparing";

const DataSiswa = () => {
  const navigate = useNavigate()
  const [siswa, setSiswa] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteUsername, setDeleteUsername] = useState(null);

  const [searchkey, setSearchkey] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [jurusans, setJurusans] = useState([]);
  const [angkatans, setAngkatans] = useState([]);

  const [filters, setFilters] = useState(false)
  const updateSiswa = () => {
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
      });
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

    const fa = angkatans.filter((x) => x?.checked === true).map((x) => x.tahun);

    if (fa.length > 0) {
      data = data.filter((x) => fa.includes(x.angkatan));
    }

    console.log("Data hasil :", data, "Filter :", fa )

    const fj = jurusans.filter((x) => x?.checked === true).map((x) => x.nama);

    if (fj.length > 0) {
      data = data.filter((x) => fj.includes(x.jurusan));
    }

    console.log("Data hasil :", data, "Filter :", fj )

    setFiltered(data);
  }, [siswa, searchkey, angkatans, jurusans]);

  const detailClick = (id) => {
    detailPreparing(id)
    navigate(`/admin/audit/${id}/biodata`)
  }

  useEffect(updateSiswa, []);
  return (
    <div className="flex h-screen">
      <div className="w-3/8">
        <Navigation />
      </div>
      <div className="w-5/8 h-screen flex-1 p-6 bg-white text-black overflow-y-scroll">
        <header className="flex justify-between items-center gap-8 mb-4">
          <h1 className="font-inter text-3xl font-normal leading-5 ml-2">
            Semua Siswa
          </h1>
        </header>
        <hr className="border-black border-2" />
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
          <button
            onClick={() => {
              setFilters(!filters);
            }}
            className="font-semibold bg-white rounded-lg p-2 text-black border-solid border-2 border-black flex items-center gap-2 justify-center"
          >
            <CiFilter className="mr-1" />
            Filter
          </button>
        </div>

        {filters ? <FilterComponent
          stateAngkatan={(ank) => setAngkatans(ank)}
          stateJurusan={(jrs) => setJurusans(jrs)}
        /> : null}

        <div className="w-full mt-8">
          <table className="w-full">
            <thead className="bg-gray-200 border-b">
              <tr>
                <th className="font-bold px-4 py-2 w-1/8 text-left">No</th>
                <th className="font-bold px-4 py-2 w-2/8 text-left">NISN</th>
                <th className="font-bold px-4 py-2 w-2/8 text-center">Nama</th>
                <th className="font-bold px-4 py-2 w-3/3 text-center">Aksi</th>
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
      {deleteId ? (
        <div className="fixed backdrop-blur-md w-screen h-screen flex justify-center items-center text-2xl">
          <div className="bg-white w-2/4 p-5 rounded-xl">
            <div className="w-full f-head f-header font-bold">Perbarui Data Siswa</div>
            <div className="p-3">
              Perbarui data akun milik{" "}
              <b>{deleteUsername}</b>?
            </div>
            <div className="w-full flex flex-row font-header font-bold">
              <button
                onClick={() => setDeleteId(null)}
                className=" w-1/2 text-center py-1 text-red-500"
              >
                Batalkan
              </button>
              <button
                onClick={() => deleteAkun(deleteId)}
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
export default DataSiswa;
