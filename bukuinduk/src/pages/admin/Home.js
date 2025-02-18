// ========================== Import library
import axios from "axios";

// ========================== Import state
import { useState, useEffect } from "react";

// ========================== import react-router
import { Routes, Route, useNavigate } from "react-router";
import { Link } from "react-router-dom";

// ========================== import halaman autentikasi
import Login from "./auth/Login";
import Verify from "./auth/Verify";

// ========================== import halaman audit
import Ayah from "./edit/Ayah";
import Biodata from "./edit/Biodata";
import Hobi from "./edit/Hobi";
import Ibu from "./edit/Ibu";
import Kesehatan from "./edit/Kesehatan";
import KetPerkembanganSiswa from "./edit/Ketpersiswa";
import Pendidikan from "./edit/Pendidikan";
import TempatTinggal from "./edit/TempatTinggal";
import Wali from "./edit/Wali";
import KetSelesai from "./edit/Selesaipend";

import Dashboard from "./Dashboard";

import DataJurusan from "./data/DataJurusan";
import DataAngkatan from "./data/DataAngkatan";
import DataSiswa from "./data/DataSiswa";
import DataMapel from "./data/DataMapel"

import TambahAkun from "./edit/Main";

import HalamanBelakang from './edit/halaman-belakang'

import { useParams } from "react-router";

import Logo from "../../assets/logosekolah.png"


//Audit system
const AuditSystem = () => {
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (isNaN(parseInt(params.id))) {
      navigate("/admin/dashboard");
    }
  }, []);

  return (
    <Routes>
      <Route exact path="/siswa" element={<TambahAkun />} />
      <Route exact path="/biodata" element={<Biodata />} />
      <Route exact path="/tempattinggal" element={<TempatTinggal />} />
      <Route exact path="/kesehatan" element={<Kesehatan />} />
      <Route exact path="/pendidikan" element={<Pendidikan />} />
      <Route exact path="/ayah" element={<Ayah />} />
      <Route exact path="/ibu" element={<Ibu />} />
      <Route exact path="/wali" element={<Wali />} />
      <Route exact path="/hobi" element={<Hobi />} />
      <Route exact path="/belakang" element={<HalamanBelakang />} />
      <Route
        exact
        path="/perkembangansiswa"
        element={<KetPerkembanganSiswa />}
      />
      <Route
        exact
        path="/selesaipend"
        element={<KetSelesai />}
      />
      <Route
        exact
        path="/belakang"
        element={<HalamanBelakang />}
      />
    </Routes>
  );
};

const HomeAdmin = () => {
  const navigate = useNavigate();
  const check = () => {
    if (localStorage.getItem("token")) {
      navigate("/admin/auth/login");
    } else {
      navigate("/admin/auth/login");
    }
  };
  return (
    <div className="flex flex-col justify-center items-center bg-homepage bg-no-repeat w-screen h-screen">
      <img src={Logo} alt="Logo Sekolah" className="w-40 h-40"/>
      <div className="text-white">
        <p className="font-header font-bold text-center text-2xl">
          "Buku Induk Virtual Akses Data dengan Mudah"
        </p>
        <p className="font-header font-bold text-center text-4xl">
          Data Buku Induk Siswa SMKN 2 SINGOSARI
        </p>
        <div className="flex flex-col items-center mt-6 w-screen">
          <button
            onClick={check}
            className="block font-body font-bold bg-[#0C7FDA] text-center w-[715px] py-3 rounded-md text-white my-1 text-sm"
          >
            Masuk
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminRouting = () => {
  return (
    <Routes>
      <Route exact path="/" element={<HomeAdmin />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      {/* [#] Auth */}
      <Route exact path="/auth/login" element={<Login />} />
      <Route exact path="/auth/verification/:code" element={<Verify />} />
      {/* [#] Halaman Input Data */}
      <Route exact path="/audit/:id/*" element={<AuditSystem />} />
      {/* [#] Data Jurusan */}
      <Route exact path="/datajurusan" element={<DataJurusan />} />
      <Route exact path="/datasiswa" element={<DataSiswa />} />
      <Route exact path="/dataangkatan" element={<DataAngkatan />} />
      <Route exact path="/mapel" element={<DataMapel />} />
    </Routes>
  );
};

export default AdminRouting;
