import React, { useState, useEffect } from "react";
import axios from "axios";
import Navigation from "../../../components/nav";
import { useNavigate } from "react-router-dom";
import { CiFilter } from "react-icons/ci";
import FilterComponent from "../../../components/filter";
import { baseUrl } from "../../../utils/constan";
import detailPreparing from "../../../utils/detailPreparing";
import fileDownload from "js-file-download";
import { toast } from "react-toastify";

const DataSiswa = () => {
  const navigate = useNavigate();
  const [siswa, setSiswa] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [jurusans, setJurusans] = useState([]);
  const [angkatans, setAngkatans] = useState([]);
  const [filters, setFilters] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    axios.get(`${baseUrl}/admin/akun`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => setSiswa(res.data));
  }, []);

  useEffect(() => {
    if (!siswa) return;
    let data = siswa.filter((s) =>
      s.nama.toLowerCase().includes(searchKey.toLowerCase())
    );

    const selectedAngkatans = angkatans.filter((x) => x.checked).map((x) => x.tahun);
    const selectedJurusans = jurusans.filter((x) => x.checked).map((x) => x.nama);

    if (selectedAngkatans.length) data = data.filter((s) => selectedAngkatans.includes(s.angkatan));
    if (selectedJurusans.length) data = data.filter((s) => selectedJurusans.includes(s.jurusan));

    setFiltered(data);
  }, [siswa, searchKey, angkatans, jurusans]);

  const handleDetailClick = (id) => {
    detailPreparing(id);
    localStorage.setItem("akun-id", id);
    navigate(`/admin/lihat/${id}/biodata`);
  };

  const handleEditClick = (id) => {
    detailPreparing(id);
    navigate(`/admin/audit/${id}/biodata`);
  };

  const handleExport = (type) => {
    const fileExtension = type === "excel" ? "xlsx" : type; // Pastikan 'excel' diubah ke 'xlsx'
    axios.get(`${baseUrl}/admin/export-${type}`, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => fileDownload(res.data, `data-siswa.${fileExtension}`))
      .catch((err) => console.error("Download error:", err));
  };

  const exportDataPDF = () => {
    const searchQuery = searchKey;
    const jurusanQuery = jurusans.filter((x) => x.checked).map((x) => x.nama).join(",");
    const angkatanQuery = angkatans.filter((x) => x.checked).map((x) => x.tahun).join(",");

    axios
      .get(
        `${baseUrl}/admin/export-pdf?search=${searchQuery}&jurusan=${jurusanQuery}&angkatan=${angkatanQuery}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        fileDownload(response.data, "download.pdf");
        toast.success("Ekspor PDF berhasil");
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal mengekspor PDF!");
      });
  };

  const exportData = () => {
    const searchQuery = searchKey;
    const jurusanQuery = jurusans.filter((x) => x.checked).map((x) => x.nama).join(",");
    const angkatanQuery = angkatans.filter((x) => x.checked).map((x) => x.tahun).join(",");
    axios
      .get(
        `${baseUrl}/admin/export-excel?search=${searchQuery}&jurusan=${jurusanQuery}&angkatan=${angkatanQuery}`,
        {
          responseType: "blob",
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        fileDownload(response.data, "data-siswa.xlsx");
        toast.success("Ekspor Excel berhasil");
      })
      .catch((error) => {
        console.error("Download error:", error);
        toast.error("Gagal mengekspor Excel!");
      });
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih data terlebih dahulu");

    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${baseUrl}/import-excel`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File berhasil diunggah");
    } catch {
      alert("File gagal diunggah");
    }
  };

  return (
    <div className="flex h-screen font-body">
      <Navigation />
      <div className="flex-1 p-6 bg-white text-black overflow-y-scroll">
        <h1 className="text-3xl font-normal ml-2">Data Siswa</h1>
        <header className="flex justify-end gap-4 my-5">
          <button onClick={() => exportData()} className="bg-blue-500 rounded-sm p-2 text-white">Unduh Excel</button>
          <button onClick={() => exportDataPDF()} className="bg-blue-500 rounded-sm p-2 text-white">Unduh PDF</button>
          <form onSubmit={handleImport} className="flex gap-2">
            <input type="file" onChange={handleFileChange} className="border border-black rounded-sm p-1" />
            <button type="submit" className="bg-blue-500 rounded-sm p-2 text-white">Impor Excel</button>
          </form>
        </header>
        <hr className="border-black border-2" />
        <div className="grid grid-cols-10 gap-5 mt-6">
          <input
            type="search"
            placeholder="Cari.."
            className="border border-gray-400 rounded-sm col-span-9 p-2"
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button onClick={() => setFilters(!filters)} className="grid grid-cols-2 border border-gray-400 rounded-sm text-black col-span-1 p-2">
            <CiFilter className="m-auto" />
            <label className="m-auto">Filter</label>
          </button>
        </div>
        {filters && <FilterComponent stateAngkatan={setAngkatans} stateJurusan={setJurusans} />}
        <table className="w-full mt-8">
          <thead className="bg-gray-200 border p-2">
            <tr>
              <th>No</th>
              <th>NISN</th>
              <th>Nama</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, index) => (
              <tr key={s.id}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{s.nisn}</td>
                <td className="border px-4 py-2">{s.nama}</td>
                <td className="grid grid-cols-2 gap-5 border px-4 py-2">
                  <button onClick={() => handleDetailClick(s.id)} className="bg-blue-500 rounded-sm p-2 text-white border">Lihat Detail</button>
                  <button onClick={() => handleEditClick(s.id)} className="bg-green-800 rounded-sm p-2 text-white border">Perbarui</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataSiswa;