import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../../components/nav";
import { Link, useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import Filter from "../../../components/filter";
import { baseUrl } from "../../../utils/constan";
import FilterComponent from "../../../components/filter";
import detailPreparing from "../../../utils/detailPreparing";
import fileDownload from "js-file-download"

const DataSiswa = () => {
  const navigate = useNavigate()
  const [siswa, setSiswa] = useState([]);

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


  useEffect(() => {
    let data = siswa;

    if (searchkey) {
      data = data.filter((s) =>
        s.nama.toLowerCase().includes(searchkey.toLowerCase())
      );
    }

    if (angkatans.length > 0) {
      const selectedAngkatans = angkatans.filter((x) => x.checked).map((x) => x.tahun);
      if (selectedAngkatans.length > 0) {
        data = data.filter((s) => selectedAngkatans.includes(s.angkatan));
      }
    }

    if (jurusans.length > 0) {
      const selectedJurusans = jurusans.filter((x) => x.checked).map((x) => x.nama);
      if (selectedJurusans.length > 0) {
        data = data.filter((s) => selectedJurusans.includes(s.jurusan));
      }
    }

    setFiltered(data);
  }, [siswa, searchkey, angkatans, jurusans]);

  const detailClick = (id) => {
    detailPreparing(id)
    navigate(`/admin/audit/${id}/biodata`)
  }
  const [showDialog, setShowDialog] = useState(false);
  const handleButtonClick = () => {
    setShowDialog(true);
  };

  const exportData = () => {
    axios.get(`${baseUrl}/admin/export-excel`, {
      responseType: 'blob', // Important: indicates that the response should be treated as a Blob
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    })
      .then((response) => {
        fileDownload(response.data, 'data-siswa.xlsx');
      })
      .catch((error) => {
        console.error('Download error:', error);
      });
  }

  const exportDataPDF = () => {
    axios
      .get(
        `${baseUrl}/admin/export-pdf`,
        {
          responseType: "blob", // Important: indicates that the response should be treated as a Blob
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
          }
        }
      )
      .then((response) => {
        fileDownload(response.data, "download.pdf");
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  };

  const [file, setFile] = useState(null);

  const importhandleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${baseUrl}/import-excel`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(`File berhasil diunggah: ${response.data}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('File gagal diunggah');
    }
  };

  useEffect(updateSiswa, []);
  return (
    <div className="flex h-screen font-body">
      <div className="w-3/8">
        <Navigation />
      </div>
      <div className="w-5/8 h-screen flex-1 p-6 bg-white text-black overflow-y-scroll">
        <h1 className="font-inter text-3xl font-normal leading-5 ml-2 whitespace-nowrap">
          Data Siswa
        </h1>
        <header className="flex flex-auto gap-2 mb-5">
          <div className="w-full mt-8 flex justify-end space-x-4">
            <button onClick={() => navigate('/tambah/upload/akun')} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm w-full">
              Tambah Siswa
            </button>
            <button onClick={() => { exportData() }} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-sm w-full">
              Unduh Excel
            </button>
            <button onClick={() => { exportDataPDF() }} className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-sm w-full">
              Unduh PDF
            </button>
          </div>
          <form onSubmit={handleSubmit} className="bg-white mt-4 grid grid-cols-2 items-center gap-2">
            <div className="w-full mt-3 py-2 px-4">
              <input
                type="file"
                onChange={(e) => importhandleFileChange(e)}
                className="w-full text-sm text-gray-700 file:rounded-sm file:border-0 file:py-2 file:px-4 file:text-sm file:bg-gray-300 file:text-black"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-3 bg-blue-500 text-white font-medium py-2 px-4 rounded-sm"
            >
              Ekspor Excel
            </button>
          </form>
        </header>
        <hr className="border-black border-2" />
        <div className="w-full flex gap-4 justify-between mt-6">
          <div className="flex-grow relative">
            <input
              onChange={(e) => setSearchkey(e.target.value)}
              type="search"
              placeholder="Search"
              name="search"
              className="input-field p-2 border w-full border-gray-400 rounded-lg hover:border-black pl-10"
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
            className="text-black bg-white rounded-lg p-2 border-solid border border-gray-400 flex hover:border-black items-center focus:border-black gap-2 justify-center"
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
                        onClick={() => detailClick(s.id)}
                        className="bg-green-900 text-white font-bold py-2 w-1/2 rounded-lg"
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
    </div>
  );
};
export default DataSiswa;
