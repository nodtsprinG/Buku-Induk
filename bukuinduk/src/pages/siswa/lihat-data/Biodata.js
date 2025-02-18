import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../utils/constan";

const Biodata = () => {
  const [siswa, setSiswa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Ambil ID dari localStorage
  const siswaId = localStorage.getItem("akun-id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!siswaId) {
          setError("ID tidak ditemukan di localStorage");
          setLoading(false);
          return;
        }

        // Panggil API untuk mendapatkan data siswa
        const response = await axios.get(baseUrl + `siswa/data-diri/${siswaId}`);

        setSiswa(response.data);
      } catch (err) {
        setError("Gagal mengambil data siswa", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [siswaId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold">Biodata Siswa</h1>
      {siswa ? (
        <div className="mt-4 border p-4 rounded">
          <p><strong>Nama:</strong> {siswa.data_diri.nama}</p>
          <p><strong>NISN:</strong> {siswa.user.nisn}</p>
          <p><strong>Jurusan:</strong> {siswa.jurusan.nama}</p>
          <p><strong>Angkatan:</strong> {siswa.angkatan.tahun}</p>
        </div>
      ) : (
        <p>Data siswa tidak ditemukan.</p>
      )}
    </div>
  );
};

export default Biodata;