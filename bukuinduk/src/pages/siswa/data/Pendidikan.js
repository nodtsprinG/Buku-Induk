import HeaderInput from "../../../components/headerInputV2";
import { useState, useEffect } from "react";
import {
  TextInput,
  DateInput,
  IntegerInput,
  RadioInput,
} from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";

//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import { useNavigate, useParams } from "react-router";

/* 

=====================================================================================================
                    D A T A _ P E N D I D I K A N _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[!] Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================

*/

const Pendidikan = () => {
  const navigate = useNavigate();
  const params = useParams()

  const [tanggal, setTanggal] = useState(new Date());

  const [tamatan, setTamatan] = useState("");
  const [ijazah, setIjazah] = useState("")
  const [nomorijazah, setNomorijazah] = useState("");
  const [skhun, setSkhun] = useState("");
  const [nomorskhun, setNomorSKHUN] = useState("")
  const [darisekolah, setDarisekolah] = useState("");
  const [alasan, setAlasan] = useState("");
  const [bidangkeahlian, setBidangkeahlian] = useState("");
  const [programkeahlian, setProgramkeahlian] = useState("");
  const [paketkeahlian, setPaketkeahlian] = useState("");
  const [kelas, setKelas] = useState(0);
  const [lamabelajar, setLamabelajar] = useState("")

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("pendidikan-tanggal"))
      setTanggal(localStorage.getItem("pendidikan-tanggal"));

    if (localStorage.getItem("pendidikan-tamatan"))
      setTamatan(localStorage.getItem("pendidikan-tamatan"));

    if (localStorage.getItem("pendidikan-ijazah"))
      setIjazah(localStorage.getItem("pendidikan-nomorijazah"));

    if (localStorage.getItem("pendidikan-nomorijazah"))
      setNomorijazah(localStorage.getItem("pendidikan-nomorijazah"));

    if (localStorage.getItem("pendidikan-nomorskhun"))
      setNomorSKHUN(localStorage.getItem("pendidikan-nomorskhun"));

    if (localStorage.getItem("pendidikan-skhun"))
      setSkhun(localStorage.getItem("pendidikan-skhun"));

    if (localStorage.getItem("pendidikan-darisekolah") !== "null")
      setDarisekolah(localStorage.getItem("pendidikan-darisekolah"));
    if (localStorage.getItem("pendidikan-alasan") !== "null")
      setAlasan(localStorage.getItem("pendidikan-alasan"));
    if (localStorage.getItem("pendidikan-bidangkeahlian"))
      setBidangkeahlian(localStorage.getItem("pendidikan-bidangkeahlian"));
    if (localStorage.getItem("pendidikan-programkeahlian"))
      setProgramkeahlian(localStorage.getItem("pendidikan-programkeahlian"));
    if (localStorage.getItem("pendidikan-paketkeahlian"))
      setPaketkeahlian(localStorage.getItem("pendidikan-paketkeahlian"));
    if (localStorage.getItem("pendidikan-kelas"))
      setKelas(localStorage.getItem("pendidikan-kelas"));
    if(localStorage.getItem("pendidikan-sebelumnyalamabelajar")) setLamabelajar(localStorage.getItem("pendidikan-sebelumnyalamabelajar"))
  }, []);

  const backButton = () => {
    navigate(`/siswa/data/${params.action}/kesehatan`);
  };

  const nextButton = () => {
    console.log(
      tanggal,
      tamatan,
      lamabelajar,
      ijazah,
      nomorijazah,
      skhun,
      nomorskhun,
      darisekolah,
      alasan,
      bidangkeahlian,
      programkeahlian,
      paketkeahlian,
      kelas
    );
    if (
      tanggal &&
      tamatan &&
      lamabelajar &&
      ijazah &&
      nomorijazah &&
      skhun &&
      nomorskhun &&
      bidangkeahlian &&
      programkeahlian &&
      paketkeahlian &&
      kelas
    ) {
      localStorage.setItem("pendidikan-tanggal", tanggal);
      localStorage.setItem("pendidikan-tamatan", tamatan);
      localStorage.setItem("pendidikan-ijazah", ijazah);
      localStorage.setItem("pendidikan-nomorijazah", nomorijazah);
      localStorage.setItem("pendidikan-skhun", skhun);
      localStorage.setItem("pendidikan-nomorskhun", nomorskhun);
      localStorage.setItem("pendidikan-darisekolah", darisekolah ? darisekolah : null);
      localStorage.setItem("pendidikan-alasan", alasan ? alasan : null);
      localStorage.setItem("pendidikan-bidangkeahlian", bidangkeahlian);
      localStorage.setItem("pendidikan-programkeahlian", programkeahlian);
      localStorage.setItem("pendidikan-paketkeahlian", paketkeahlian);
      localStorage.setItem("pendidikan-kelas", kelas);
      localStorage.setItem("pendidikan-sebelumnyalamabelajar", lamabelajar)
      navigate(`/siswa/data/${params.action}/ayah`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll text-[24px]">
      <HeaderInput title={"Pendidikan"} word={"D"} form={"siswa"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="font-bold">1. Keterangan Sebelumnya</td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">a. Tamatan Dari</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={tamatan}
                  onChange={(e) => setTamatan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">b. Sebelumnya Lama Belajar</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={lamabelajar}
                  onChange={(e) => setLamabelajar(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">c. Nomor Ijazah</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={nomorijazah}
                  onChange={(e) => setNomorijazah(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">d. Nomor SKHUN</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={skhun}
                  onChange={(e) => setSkhun(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold">2. Pindahan</td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">a. Dari Sekolah</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={darisekolah}
                  onChange={(e) => setDarisekolah(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">b. Alasan</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={alasan}
                  onChange={(e) => setAlasan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="font-bold">3. Diterima Disekolah Ini</td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">a. Kelas</label>
              </td>
              <td className="w-[63%] h-full">
                <IntegerInput
                  value={kelas}
                  onChange={(e) => setKelas(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">b. Bidang Keahlian</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={bidangkeahlian}
                  onChange={(e) => setBidangkeahlian(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">c. Program Keahlian</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={programkeahlian}
                  onChange={(e) => setProgramkeahlian(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">d. Paket Keahlian</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={paketkeahlian}
                  onChange={(e) => setPaketkeahlian(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">e. Tanggal</label>
              </td>
              <td className="w-[37%] h-full">
                <DatePicker
                  selected={tanggal}
                  onChange={(date) => setTanggal(date)}
                  scrollableMonthYearDropdown
                  showYearDropdown
                  dateFormat={"dd-MM-yyyy"}
                  className="w-full bg-[#DEE0E1] py-2 px-2 focus:outline-none rounded-lg"
                  maxDate={new Date()}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Nextbefore next={nextButton} back={backButton} />
    </div>
  );
};

export default Pendidikan;