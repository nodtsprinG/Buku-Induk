const StudentInfo = () => {
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
    return (
        <div className="bg-white p-6 rounded-lg shadow-md w-full mx-auto">
            <h2 className="text-lg font-semibold mb-4">Informasi Siswa</h2>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nama Siswa</label>
                    <input
                        type="text"
                        value={localStorage.getItem("biodata-nama")}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Angkatan</label>
                    <input
                        type="text"
                        value={angkatanMapping[angkatanId] || "Angkatan tidak ditemukan"}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">NIS</label>
                    <input
                        type="text"
                        value={localStorage.getItem("akun-nisn")}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Jurusan</label>
                    <input
                        type="text"
                        value={jurusanMapping[jurusanId] || "Jurusan tidak ditemukan"}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;