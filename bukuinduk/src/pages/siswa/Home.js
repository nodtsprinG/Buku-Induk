import { Routes, Route, useNavigate } from "react-router";
import { Link } from "react-router-dom";

import CariNisn from "./search/cariNISN";
import DataSiswa from "./search/dataSiswa";
import Login from "./search/LoginSiswa";
import Lihat from "./lihat-data/Biodata"

// ========================== import halaman audit
import Ayah from "./data/Ayah";
import Biodata from "./data/Biodata";
import Hobi from "./data/Hobi";
import Ibu from "./data/Ibu";
import Kesehatan from "./data/Kesehatan";
import Pendidikan from "./data/Pendidikan";
import TempatTinggal from "./data/Tempattinggal";
import Wali from "./data/Wali";
import TambahAkun from "./data/Main";
import GoBack from "../../components/goback"

import resetAll from "../../utils/resetAll";

import Logo from "../../assets/logosekolah.png"

const HomeSiswa = () => {
  const navigate = useNavigate();
  const preparingAddData = () => {
    resetAll();
    navigate("/siswa/data/upload/akun");
  };



  return (
    <div className="flex flex-col justify-center items-center bg-homepage bg-no-repeat w-screen h-screen">
      <img src={Logo} alt="Logo Sekolah" className="w-40 h-40"/>
      <div className="text-white">
        <p className="font-header font-bold text-center text-2xl mt-5">
          "Buku Induk Virtual Akses Data dengan Mudah"
        </p>
        <p className="font-header font-bold text-center text-4xl">
          Data Buku Induk Siswa SMKN 2 SINGOSARI
        </p>
        <div className="flex flex-col items-center mt-6 w-screen">
          <button
            onClick={preparingAddData}
            className="block font-body font-bold bg-[#D9D9D9] text-center w-[715px] py-3 rounded-md text-black my-1 text-sm"
          >
            Daftar
          </button>
          <Link
            to={"/siswa/login"}
            className="block font-body font-bold bg-[#0C7FDA] text-center w-[715px] py-3 rounded-md text-white my-1 text-sm"
          >
            Masuk
          </Link>
          <GoBack to={"/"} className="block font-body font-bold bg-gray-900 text-center w-[715px] py-3 rounded-md text-white my-1 text-sm" />
        </div>
      </div>
    </div>
  );
};

//Audit system
const AddData = () => {
  return (
    <Routes>
      <Route exact path="/akun" element={<TambahAkun />} />
      <Route exact path="/biodata" element={<Biodata />} />
      <Route exact path="/tempattinggal" element={<TempatTinggal />} />
      <Route exact path="/kesehatan" element={<Kesehatan />} />
      <Route exact path="/pendidikan" element={<Pendidikan />} />
      <Route exact path="/ayah" element={<Ayah />} />
      <Route exact path="/ibu" element={<Ibu />} />
      <Route exact path="/wali" element={<Wali />} />
      <Route exact path="/hobi" element={<Hobi />} />
    </Routes>
  );
};

const SiswaRouting = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomeSiswa />} />
      {/* Halaman Cari */}
      <Route exact path="/cari" element={<CariNisn />} />
      <Route exact path="/result/:nisn" element={<DataSiswa />} />
      <Route exact path="/login" element={<Login />} />
      {/* Masukkan data NISN */}
      <Route exact path="/data/:action/*" element={<AddData />} />
      <Route exact path="/lihat-data/*" element={<Lihat />} />
    </Routes>
  );
};

export default SiswaRouting;
