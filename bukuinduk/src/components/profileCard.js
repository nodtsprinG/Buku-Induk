import React, { useState } from "react";

const StudentInfo = () => {
  const [awalMasukImage, setAwalMasukImage] = useState(null);
  const [lulusSekolahImage, setLulusSekolahImage] = useState(null);

  const angkatanMapping = {
    1: "2022",
    2: "2023",
    3: "2024",
    4: "2025",
  };

  const jurusanMapping = {
    1: "Rekayasa Perangkat Lunak",
    2: "Desain Komunikasi Visual",
    3: "Audio Video",
    4: "Broadcasting",
    5: "Animasi",
    6: "Teknik Komunikasi Jaringan",
    7: "Elektronika Industri",
    8: "Mekatronika",
  };

  const angkatanId = localStorage.getItem("akun-angkatanId");
  const jurusanId = localStorage.getItem("akun-jurusanId");

  const handleImageUpload = (event, setImage) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
      <h2 className="text-lg font-semibold mb-4">Informasi Siswa</h2>
      <div className="flex items-start gap-6">
        <div className="flex gap-8">
          {/* Foto Awal */}
          <div className="flex flex-col items-center">
            {awalMasukImage ? (
              <img
                src={awalMasukImage}
                alt="Awal Masuk"
                className="w-32 h-40 object-cover rounded-md"
              />
            ) : (
              <div className="w-32 h-40 bg-gray-200 flex items-center justify-center rounded-md">
                Foto
              </div>
            )}
            <label className="text-sm font-medium text-gray-700 mt-2 text-center">
              Awal Masuk Sekolah
            </label>
            <label
              htmlFor="awalMasukUpload"
              className="mt-1 px-1 py-0.5 bg-gray-100 text-black text-xs rounded-md border border-gray-300 cursor-pointer"
              >
              Pilih Gambar
            </label>
            <input
              id="awalMasukUpload"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setAwalMasukImage)}
              className="hidden"
            />
          </div>

          {/* Foto Lulus */}
          <div className="flex flex-col items-center">
            {lulusSekolahImage ? (
              <img
                src={lulusSekolahImage}
                alt="Lulus Sekolah"
                className="w-32 h-40 object-cover rounded-md"
              />
            ) : (
              <div className="w-32 h-40 bg-gray-200 flex items-center justify-center rounded-md">
                Foto
              </div>
            )}
            <label className="text-sm font-medium text-gray-700 mt-2 text-center">
              Lulus Sekolah
            </label>
            <label
              htmlFor="lulusUpload"
              className="mt-1 px-1 py-0.5 bg-gray-100 text-black text-xs rounded-md border border-gray-300 cursor-pointer"
            >
              Pilih Gambar
            </label>
            <input
              id="lulusUpload"
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, setLulusSekolahImage)}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nama Siswa
            </label>
            <input
              type="text"
              value={localStorage.getItem("biodata-nama")}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Angkatan
            </label>
            <input
              type="text"
              value={angkatanMapping[angkatanId] || "Angkatan tidak ditemukan"}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              NIS
            </label>
            <input
              type="text"
              value={localStorage.getItem("akun-nisn")}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Jurusan
            </label>
            <input
              type="text"
              value={jurusanMapping[jurusanId] || "Jurusan tidak ditemukan"}
              readOnly
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentInfo;