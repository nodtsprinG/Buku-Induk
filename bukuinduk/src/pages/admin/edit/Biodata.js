import HeaderInput from "../../../components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import InputHalaman from "../../../components/pilihHalaman"
import Profil from "../../../components/profileCard"
import { useNavigate, useParams } from "react-router";

//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

/* 

=====================================================================================================
                    D A T A _ B I O D A T A _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[!] Warning : Dilarang mengganti sembarangan pada bagian ini

=====================================================================================================

*/

const Biodata = () => {
  const params = useParams();

  //Save data variabel pemting pada kolom input
  const [nama, setNama] = useState("");
  const [panggilan, setPanggilan] = useState("");
  const [jeniskelamin, setJeniskelamin] = useState("");
  const [tempatlahir, setTempatlahir] = useState("");
  const [tanggallahir, setTanggallahir] = useState(Date());
  const [agama, setAgama] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [anakke, setAnakke] = useState(0);
  const [kandung, setKandung] = useState(0);
  const [angkat, setAngkat] = useState(0);
  const [tiri, setTiri] = useState(0);
  const [status, setStatus] = useState("");
  const [bahasa, setBahasa] = useState("");
  const navigate = useNavigate();

  const backButton = () => {
    navigate(`/admin/datasiswa`);
  };

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("biodata-nama"))
      setNama(localStorage.getItem("biodata-nama"));
    if (localStorage.getItem("biodata-panggilan"))
      setPanggilan(localStorage.getItem("biodata-panggilan"));
    if (localStorage.getItem("biodata-jeniskelamin"))
      setJeniskelamin(localStorage.getItem("biodata-jeniskelamin"));
    if (localStorage.getItem("biodata-tempatlahir"))
      setTempatlahir(localStorage.getItem("biodata-tempatlahir"));
    if (localStorage.getItem("biodata-tanggallahir"))
      setTanggallahir(localStorage.getItem("biodata-tanggallahir"));
    if (localStorage.getItem("biodata-agama"))
      setAgama(localStorage.getItem("biodata-agama"));
    if (localStorage.getItem("biodata-kewarganegaraan"))
      setKewarganegaraan(localStorage.getItem("biodata-kewarganegaraan"));
    if (localStorage.getItem("biodata-anakke"))
      setAnakke(localStorage.getItem("biodata-anakke"));
    if (localStorage.getItem("biodata-kandung"))
      setKandung(localStorage.getItem("biodata-kandung"));
    if (localStorage.getItem("biodata-angkat"))
      setAngkat(localStorage.getItem("biodata-angkat"));
    if (localStorage.getItem("biodata-tiri"))
      setTiri(localStorage.getItem("biodata-tiri"));
    if (localStorage.getItem("biodata-status"))
      setStatus(localStorage.getItem("biodata-status"));
    if (localStorage.getItem("biodata-bahasa"))
      setBahasa(localStorage.getItem("biodata-bahasa"));
  }, []);

  const nextButton = () => {
    console.log(
      nama,
      panggilan,
      jeniskelamin,
      tempatlahir,
      tanggallahir,
      agama,
      kewarganegaraan,
      anakke,
      kandung,
      angkat,
      tiri,
      status,
      bahasa
    );
    if (
      nama &&
      panggilan &&
      jeniskelamin &&
      tempatlahir &&
      tanggallahir &&
      agama &&
      kewarganegaraan &&
      anakke &&
      status &&
      bahasa
    ) {
      if (true) {
        localStorage.setItem("biodata-nama", nama);
        localStorage.setItem("biodata-panggilan", panggilan);
        localStorage.setItem("biodata-jeniskelamin", jeniskelamin);
        localStorage.setItem("biodata-tempatlahir", tempatlahir);
        localStorage.setItem("biodata-tanggallahir", tanggallahir);
        localStorage.setItem("biodata-agama", agama);
        localStorage.setItem("biodata-kewarganegaraan", kewarganegaraan);
        localStorage.setItem("biodata-anakke", anakke);
        localStorage.setItem("biodata-kandung", kandung || "");
        localStorage.setItem("biodata-angkat", angkat || "");
        localStorage.setItem("biodata-tiri", tiri || "");
        localStorage.setItem("biodata-status", status);
        localStorage.setItem("biodata-bahasa", bahasa);
      }

      navigate(`/admin/audit/${params.id}/tempattinggal`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll h-min:h-screen text-[24px]">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      <HeaderInput title={"Biodata"} word={"A"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Nama Lengkap</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="h-full rounded-[10px]"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Nama Panggilan</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={panggilan}
                  onChange={(e) => setPanggilan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Jenis Kelamin</label>
              </td>
              <td className="w-[37%] h-full">
                <RadioInput
                  value={jeniskelamin}
                  onChange={(e) => setJeniskelamin(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tempat Lahir</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={tempatlahir}
                  onChange={(e) => setTempatlahir(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Tanggal Lahir</label>
              </td>
              <td className="w-[37%] h-full rounded-lg">
                <DatePicker
                  selected={tanggallahir}
                  onChange={(date) => setTanggallahir(date)}
                  scrollableMonthYearDropdown
                  showYearDropdown
                  dateFormat={"dd-MM-yyyy"}
                  className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-lg"
                  maxDate={new Date()}
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Agama</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={agama}
                  onChange={(e) => setAgama(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Kewarganegaraan</label>
              </td>
              <td className="w-[37%] h-full">
                <TextInput
                  value={kewarganegaraan}
                  onChange={(e) => setKewarganegaraan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Anak ke</label>
              </td>
              <td className="w-[37%] h-full">
                <IntegerInput
                  value={anakke}
                  onChange={(e) => setAnakke(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Jumlah Saudara Kandung</label>
              </td>
              <td className="w-[37%] h-full">
                <IntegerInput
                  value={kandung}
                  onChange={(e) => setKandung(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Jumlah Saudara Tiri</label>
              </td>
              <td className="w-[37%] h-full">
                <IntegerInput
                  value={tiri}
                  onChange={(e) => setTiri(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Jumlah Saudara Angkat</label>
              </td>
              <td className="w-[37%] h-full">
                <IntegerInput
                  value={angkat}
                  onChange={(e) => setAngkat(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1">Anak Yatim</label>
              </td>
              <td className="w-[63%] h-full">
                <select
                  value={status}
                  className="w-[37%] bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                  defaultValue={"default"}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="default" hidden>
                    Pilih
                  </option>
                  <option value={"lengkap"}>Lengkap</option>
                  <option value={"yatim"}>Yatim</option>
                  <option value={"piatu"}>Piatu</option>
                  <option value={"yatim piatu"}>Yatim Piatu</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-[63%] h-full">
                <label className="py-1 ">Bahasa Sehari-hari</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={bahasa}
                  onChange={(e) => setBahasa(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <Nextbefore next={nextButton} back={backButton} />
      </div>
    </div>
  );
};

export default Biodata;
