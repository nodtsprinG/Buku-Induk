const StudentInfo = () => {
    localStorage.getItem("biodata-nama")
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
                        value={localStorage.getItem("akun-angkatanId")}
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
                        value={localStorage.getItem("akun-jurusanNama")}
                        readOnly
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;