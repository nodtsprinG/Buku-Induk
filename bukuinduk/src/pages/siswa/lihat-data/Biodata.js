import HeaderInput from "../../../components/headerInput";
import { useState, useEffect } from "react";
import {
  TextInput,
  IntegerInput,
  RadioInput,
} from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import InputHalaman from "../../../components/pilihHalaman";
import Profil from "../../../components/profileCard";
import { useNavigate, useParams } from "react-router";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Biodata = () => {
  const params = useParams();
  const navigate = useNavigate();

  // State untuk semua input
  const [nama, setNama] = useState("");
  const [panggilan, setPanggilan] = useState("");
  const [jeniskelamin, setJeniskelamin] = useState("");
  const [tempatlahir, setTempatlahir] = useState("");
  const [tanggallahir, setTanggallahir] = useState(null);
  const [agama, setAgama] = useState("");
  const [kewarganegaraan, setKewarganegaraan] = useState("");
  const [anakke, setAnakke] = useState(0);
  const [kandung, setKandung] = useState(0);
  const [angkat, setAngkat] = useState(0);
  const [tiri, setTiri] = useState(0);
  const [status, setStatus] = useState("");
  const [bahasa, setBahasa] = useState("");

  // Fungsi helper untuk localStorage
  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, value);
  };

  const getFromLocalStorage = (key) => {
    return localStorage.getItem(key) || "";
  };

  useEffect(() => {
    setNama(getFromLocalStorage("biodata-nama"));
    setPanggilan(getFromLocalStorage("biodata-panggilan"));
    setJeniskelamin(getFromLocalStorage("biodata-jeniskelamin"));
    setTempatlahir(getFromLocalStorage("biodata-tempatlahir"));
    setTanggallahir(new Date(getFromLocalStorage("biodata-tanggallahir")) || null);
    setAgama(getFromLocalStorage("biodata-agama"));
    setKewarganegaraan(getFromLocalStorage("biodata-kewarganegaraan"));
    setAnakke(parseInt(getFromLocalStorage("biodata-anakke")) || 0);
    setKandung(parseInt(getFromLocalStorage("biodata-kandung")) || 0);
    setAngkat(parseInt(getFromLocalStorage("biodata-angkat")) || 0);
    setTiri(parseInt(getFromLocalStorage("biodata-tiri")) || 0);
    setStatus(getFromLocalStorage("biodata-status"));
    setBahasa(getFromLocalStorage("biodata-bahasa"));
  }, []);

  const validateInput = () => {
    if (!nama || !panggilan || !jeniskelamin || !tempatlahir || !tanggallahir || !agama || !kewarganegaraan || !status || !bahasa) {
      alert("Harap lengkapi semua data.");
      return false;
    }
    return true;
  };

  const nextButton = () => {
    if (!validateInput()) return;

    if (params.action === "upload") {
      saveToLocalStorage("biodata-nama", nama);
      saveToLocalStorage("biodata-panggilan", panggilan);
      saveToLocalStorage("biodata-jeniskelamin", jeniskelamin);
      saveToLocalStorage("biodata-tempatlahir", tempatlahir);
      saveToLocalStorage("biodata-tanggallahir", tanggallahir.toISOString());
      saveToLocalStorage("biodata-agama", agama);
      saveToLocalStorage("biodata-kewarganegaraan", kewarganegaraan);
      saveToLocalStorage("biodata-anakke", anakke);
      saveToLocalStorage("biodata-kandung", kandung);
      saveToLocalStorage("biodata-angkat", angkat);
      saveToLocalStorage("biodata-tiri", tiri);
      saveToLocalStorage("biodata-status", status);
      saveToLocalStorage("biodata-bahasa", bahasa);
    }

    navigate(`/admin/audit/${params.id}/tempattinggal`);
  };

  const backButton = () => {
    navigate(`/admin/datasiswa`);
  };

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll h-min:h-screen">
      <div className="my-10 w-full">
        <Profil />
      </div>
      <div>
        <InputHalaman />
      </div>
      <HeaderInput title={"Biodata"} word={"A"} form={"admin"} />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            <tr>
              <td>Nama Lengkap</td>
              <td>
                <TextInput value={nama} onChange={(e) => setNama(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Nama Panggilan</td>
              <td>
                <TextInput value={panggilan} onChange={(e) => setPanggilan(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Jenis Kelamin</td>
              <td>
                <RadioInput value={jeniskelamin} onChange={(e) => setJeniskelamin(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Tempat Lahir</td>
              <td>
                <TextInput value={tempatlahir} onChange={(e) => setTempatlahir(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Tanggal Lahir</td>
              <td>
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
              <td>Agama</td>
              <td>
                <TextInput value={agama} onChange={(e) => setAgama(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Kewarganegaraan</td>
              <td>
                <TextInput value={kewarganegaraan} onChange={(e) => setKewarganegaraan(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Anak ke</td>
              <td>
                <IntegerInput value={anakke} onChange={(e) => setAnakke(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Jumlah Saudara Kandung</td>
              <td>
                <IntegerInput value={kandung} onChange={(e) => setKandung(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Jumlah Saudara Angkat</td>
              <td>
                <IntegerInput value={angkat} onChange={(e) => setAngkat(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Jumlah Saudara Tiri</td>
              <td>
                <IntegerInput value={tiri} onChange={(e) => setTiri(e.target.value)} />
              </td>
            </tr>
            <tr>
              <td>Anak Yatim</td>
              <td>
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="bg-[#DEE0E1] text-black p-2 rounded shadow-md">
                  <option value="" hidden>Pilih</option>
                  <option value="lengkap">Lengkap</option>
                  <option value="yatim">Yatim</option>
                  <option value="piatu">Piatu</option>
                  <option value="yatim piatu">Yatim Piatu</option>
                </select>
              </td>
            </tr>
            <tr>
              <td>Bahasa Sehari-hari</td>
              <td>
                <TextInput value={bahasa} onChange={(e) => setBahasa(e.target.value)} />
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