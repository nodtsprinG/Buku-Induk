import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaFemale, FaMale, FaDatabase, FaUser, FaBars } from "react-icons/fa";
import Navigation from "../../components/nav";
import { baseUrl } from "../../utils/constan";
import GenderCharts from "../../components/GenderCharts";
import { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [siswa, setSiswa] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [isNavOpen, setIsNavOpen] = useState(false);

  const updateSiswa = () => {
    axios
      .get(baseUrl + "/admin/akun", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setSiswa(res.data);
        return axios.get(baseUrl + "/admin/dashboard", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      })
      .then((res) => {
        setDashboard(res.data);
      })
      .catch((err) => console.error("Gagal mengambil data:", err));
  };

  useEffect(updateSiswa, []);

  return (
    <div className="flex h-screen font-body">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transition-transform duration-300 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:relative w-64 bg-white shadow-lg lg:w-72`}
      >
        <Navigation />
      </div>

      {/* Tombol Toggle Navigasi */}
      <button
        onClick={() => setIsNavOpen(!isNavOpen)}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded-lg shadow-lg lg:hidden"
      >
        <FaBars size={24} />
      </button>

      {/* Konten Utama */}
      <div
        className={`flex-1 p-6 bg-gray-100 text-black overflow-y-scroll ml-4 transition-all duration-300 ${
          isNavOpen ? "ml-64 lg:ml-72" : "ml-5"
        }`}
      >
        <h1 className="font-header text-3xl font-normal leading-5 text-left">
          Dashboard
        </h1>
        <hr className="border-t-2 mt-4 bg-black-600"></hr>

        {/* Grid Statistik */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8">
          {/* Total Siswa */}
          <StatCard icon={<FaUser size={40} />} title="Total Siswa" value={dashboard.count_siswa} />

          {/* Data di Inputkan */}
          <StatCard icon={<FaDatabase size={40} />} title="Data di Inputkan" value={dashboard.count_datainputed} />

          {/* Siswa Laki-Laki */}
          <StatCard icon={<FaMale size={40} />} title="Siswa Laki-Laki" value={dashboard.count_laki} />

          {/* Siswa Perempuan */}
          <StatCard icon={<FaFemale size={40} />} title="Siswa Perempuan" value={dashboard.count_perempuan} />
        </div>
        <GenderCharts maleCount={dashboard.count_laki} femaleCount={dashboard.count_perempuan} />
      </div>

      <Toaster />
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="w-full h-[250px] rounded-lg text-white bg-gradient-to-b from-blue-500 to-blue-800 flex flex-col items-start justify-start p-4">
    {icon}
    <p className="font-bold text-lg mt-4">{title}</p>
    <p className="font-extralight text-sm">Data Siswa</p>
    <p className="text-2xl mt-2">{value}</p>
  </div>
);

export default Dashboard;