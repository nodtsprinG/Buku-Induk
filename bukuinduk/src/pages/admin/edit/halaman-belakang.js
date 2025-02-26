import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router";
import fileDownload from "js-file-download";
import { baseUrl } from "../../../utils/constan";
import Profil from "../../../components/profileCard"
import PilihHalaman from "../../../components/pilihHalaman"

const ERaport = () => {
  const [activeSemester, setActiveSemester] = useState(1);
  const [mapelList, setMapelList] = useState([]);
  const [nilaiList, setNilaiList] = useState([]);
  const [file, setFile] = useState(null);

  const params = useParams();

  useEffect(() => {
    fetchMapel();
  }, []);

  useEffect(() => {
    if (mapelList.length > 0) {
      fetchNilai();
    }
  }, [activeSemester, mapelList]);

  const fetchMapel = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/mapel`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMapelList(response.data);
    } catch (error) {
      console.error("Error fetching mapel:", error);
    }
  };

  const fetchNilai = async () => {
    try {
      const response = await axios.get(baseUrl + `/admin/nilai/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.data[`Semester ${activeSemester}`]) {
        setNilaiList(
          response.data[`Semester ${activeSemester}`].map((val) => ({
            sia: {
              sakit: val.SIA?.sakit ?? 0,
              izin: val.SIA?.izin ?? 0,
              alpha: val.SIA?.alpha ?? 0,
            },
            mapel: {
              id: val.mapel_id,
              nama: val.mapel.nama,
            },
            nilai: val.r,
            keterangan: val.keterangan,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching nilai:", error);
    }
  };



  const handleInputChange = (index, field, value, mapel) => {
    const newNilaiList = [...nilaiList];
    console.log(nilaiList)

    if (index === -1) {
      console.log("not found")
      newNilaiList.push({
        mapel: {
          id: mapelList.find(item => item.nama === mapel).id,
          nama: mapel
        }, nilai: "", keterangan: ""
      })
      index = newNilaiList.length - 1;
    }
    newNilaiList[index][field] = value;
    setNilaiList(newNilaiList);
  };


  const handleDelete = (index) => {
    setNilaiList((prevList) => prevList.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      const data = nilaiList.map((val) => ({
        mapel_id: val.mapel.id,
        r: val.nilai,
        keterangan: val.keterangan,
      }));

      await axios.post(
        `${baseUrl}/admin/nilai`,
        {
          semester: activeSemester,
          user_id: params.id,
          data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Data berhasil disimpan!");
    } catch (error) {
      console.error("Error saving nilai:", error);
      alert("Terjadi kesalahan saat menyimpan data.");
    }
  };

  const kelompokUmum = [
    "Pendidikan Agama dan Budi Pekerti",
    "Pendidikan Pancasila",
    "Bahasa Indonesia",
    "Pendidikan Jasmani, Olahraga, dan Kesehatan",
    "Sejarah",
    "Seni Budaya",
    "Bahasa Jawa",
    "Matematika",
    "Bahasa Inggris",
    "Informatika",
    "Projek IPAS",
    "Dasar Program Keahlian",
    "Mata Pelajaran Konsentrasi Keahlian",
    "Projek Kreatif dan Kewirausahaan",
    "Mata Pelajaran Pilihan",
  ];


  const exportData = () => {
    axios
      .get(`${baseUrl}/admin/export-raport-pdf/${params.id}`, {
        responseType: "blob",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        fileDownload(response.data, "nilai-siswa.pdf");
      })
      .catch((error) => {
        console.error("Download error:", error);
      });
  };

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) return alert("Pilih data terlebih dahulu");

    const formData = new FormData();
    formData.append("file", file);
    try {
      await axios.post(`${baseUrl}/import-raport`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("File berhasil diunggah");
    } catch {
      alert("File gagal diunggah");
    }
  };

  const handleSIAChange = (field, value) => {
    setNilaiList((prevList) => {
      if (prevList.length === 0) return prevList; // Ensure there's at least one item
      const updatedList = [...prevList];
      updatedList[0] = {
        ...updatedList[0],
        sia: {
          ...updatedList[0].sia,
          [field]: parseInt(value),
        },
      };
      return updatedList;
    });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen text-[20px]">
      <Profil />
      <div><PilihHalaman /></div>
      <h1 className="text-2xl font-bold my-4">E - Raport (Semester {activeSemester})</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {[...Array(6)].map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSemester(index + 1)}
            className={`px-4 py-2 rounded-md ${activeSemester === index + 1 ? "bg-blue-700" : "bg-gray-500"} text-white`}
          >
            Semester {index + 1}
          </button>
        ))}
        <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Simpan
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={exportData}>
          Ekspor
        </button>
        <form onSubmit={handleImport} className="flex gap-2">
          <input type="file" onChange={handleFileChange} className="border border-black rounded-md p-2" />
          <button type="submit" className="bg-green-800 rounded-md px-4 py-2 text-white">Impor</button>
        </form>
      </div>

      <div className="bg-white p-4 flex">
        <table className="w-[75%]">
          <thead>
            <tr className="bg-gray-200 text-center">
              <td className="border border-gray-400 p-2">MATA PELAJARAN</td>
              <td className="border border-gray-400 p-2">NILAI</td>
              <td className="border border-gray-400 p-2">KETERANGAN</td>
            </tr>
          </thead>
          <tbody>
            {kelompokUmum.map((mapel, index) => {
              // Find the matching item in nilaiList
              const nilaiItem = nilaiList.find(item => item.mapel?.nama === mapel) || {};

              return (
                <tr key={index}>
                  <td className="border border-gray-400 p-2">{mapel}</td>
                  <td className="border border-gray-400 p-2">
                    <input
                      type="number"
                      className="w-full h-full outline-none"
                      placeholder="Nilai"
                      value={nilaiItem.nilai || ""}
                      onChange={(e) =>
                        handleInputChange(nilaiList.findIndex(item => item.mapel?.nama === mapel), "nilai", e.target.value, mapel)
                      }
                    />
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <textarea
                      className="w-full h-full outline-none"
                      placeholder="Deskripsi"
                      value={nilaiItem.keterangan || ""}
                      onChange={(e) =>
                        handleInputChange(nilaiList.findIndex(item => item.mapel?.nama === mapel), "keterangan", e.target.value, mapel)
                      }
                    />
                  </td>
                  {/* <td>
                    <button
                      onClick={() => deleteNilai(index)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>

        </table>
        <div className="w-full md:w-1/3 px-4">
          <table className="w-full border border-gray-300 rounded-md">
            <thead className="bg-gray-100 text-center text-black">
              <tr>
                <th className="py-2 px-4 border border-gray-300">Keterangan</th>
                <th className="py-2 px-4 border border-gray-300">Hari</th>
              </tr>
            </thead>
            <tbody>
              {["sakit", "izin", "alpha"].map((field) => (
                <tr key={field} className="text-center">
                  <td className="px-4 py-2 capitalize border border-gray-300">{field}</td>
                  <td className="px-4 py-2 border border-gray-300 grid grid-cols-2">
                    <input
                      type="number"
                      className="w-[100px] px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                      value={nilaiList[0]?.sia?.[field] || ""}
                      onChange={(e) => handleSIAChange(field, e.target.value)}
                    />
                    <label className="ml-4">Hari</label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ERaport;