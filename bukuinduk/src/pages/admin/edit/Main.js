import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import { baseUrl } from "../../../utils/constan";

const TambahAkun = () => {
  const params = useParams();
  const [jurusan, setJurusan] = useState([]);
  const [angkatan, setAngkatan] = useState([]);

  const [jurusan_id, setJurusan_id] = useState(0);
  const [angkatan_id, setAngkatan_id] = useState(0);
  const [nisn, setNisn] = useState("");

  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(baseUrl + "/siswa/jurusan")
      .then((res) => {
        const data = res.data;
        setJurusan(data);
        return axios.get(baseUrl + "/siswa/angkatan");
      })
      .then((res) => {
        const data = res.data;
        setAngkatan(data);
        if (localStorage.getItem("akun-nisn"))
          setNisn(localStorage.getItem("akun-nisn"));
        if (localStorage.getItem("akun-jurusanId"))
          setJurusan_id(localStorage.getItem("akun-jurusanId"));
        if (localStorage.getItem("akun-angkatanId"))
          setAngkatan_id(localStorage.getItem("akun-angkatanId"));
      });
  };

  useEffect(fetchData, []);

  const daftar = () => {
    console.log(nisn, jurusan_id, angkatan_id);
    if (jurusan_id && !isNaN(angkatan_id) & !isNaN(nisn)) {
      localStorage.setItem("akun-nisn", nisn);
      localStorage.setItem("akun-jurusanId", jurusan_id);
      localStorage.setItem("akun-angkatanId", angkatan_id);
      navigate(`/admin/audit/${params.id}/biodata`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="flex items-center justify-center bg-homepage bg-no-repeat w-screen h-screen">
      <div className="flex flex-row items-center justify-center w-11/12">
        <div className="flex flex-col items-center justify-center w-1/2">
          <img
            src="https://cdn.discordapp.com/attachments/847678573040631818/1255910504031846440/logosekolah.png?ex=667ed94d&is=667d87cd&hm=4aa0c62be0f7262701857bb02306a2cea8aed73b5157376b41d200933b379b5e&"
            className="w-44 aspect-square"
          />
          <p className="font-header text-white font-bold text-3xl text-center mt-3">
            Buku Induk
          </p>
        </div>
        <div className="bg-[#D9D9D9] w-1/2 px-10 py-9 rounded-md border-4 border-[#A4A4A4]">
          <p className="font-header font-bold text-3xl mt-2">Informasi Siswa</p>
          <div className="flex flex-col mt-10 pt-10 border-t border-black">
            <label className="opacity-20">NISN</label>
            <input
              value={nisn}
              onChange={(e) => setNisn(e.target.value)}
              className="bg-transparent border-b border-black focus:outline-none pt-2"
            ></input>
            <label className="opacity-20 pt-5">Jurusan</label>
            <select
              value={jurusan_id}
              onChange={(e) => setJurusan_id(e.target.value)}
              className="bg-transparent border-b border-black focus:outline-none pt-2"
              defaultValue={"default"}
            >
              <option value={"default"} hidden>
                Pilih
              </option>
              {jurusan.map((jrs) => {
                return <option value={jrs.id}>{jrs.nama}</option>;
              })}
            </select>
            <label className="opacity-20 pt-5">Angkatan</label>
            <select
              value={angkatan_id}
              onChange={(e) => setAngkatan_id(e.target.value)}
              className="bg-transparent border-b border-black focus:outline-none pt-2"
              defaultValue={"default"}
            >
              <option value={"default"} hidden>
                Pilih
              </option>
              {angkatan.map((ank) => {
                return <option value={ank.id}>{ank.tahun}</option>;
              })}
            </select>
            <div className="flex flex-row pt-10 w-full">
              <div className="flex flex-row justify-center items-center">
                <button
                  onClick={daftar}
                  className="font-header font-bold bg-[#0083FB] p-2 text-l text-white rounded-md"
                >
                  Lanjutkan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TambahAkun;
