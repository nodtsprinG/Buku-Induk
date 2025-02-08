import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderInput from "../../../components/headerInput";
import Profil from "../../../components/profileCard";
import InputHalaman from "../../../components/pilihHalaman";
import { TextInput } from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";

/* 
=====================================================================================================
                D A T A _ T E M P A T _ T I N G G A L_ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<
! Warning : Dilarang mengganti sembarangan pada bagian ini
=====================================================================================================
*/

const TempatTinggal = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState({
    alamat: "",
    telp: "",
    tinggal: "",
    jarak: "",
  });

  // Load data dari localStorage
  useEffect(() => {
    const storedData = {
      alamat: localStorage.getItem("tempattinggal-alamat") || "",
      telp: localStorage.getItem("tempattinggal-telp") || "",
      tinggal: localStorage.getItem("tempattinggal-tinggal") || "",
      jarak: localStorage.getItem("tempattinggal-jarak") || "",
    };
    setData(storedData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const backButton = () => {
    navigate(`/admin/audit/${id}/biodata`);
  };

  const nextButton = () => {
    const { alamat, telp, tinggal, jarak } = data;
    if (alamat.trim() && telp.trim() && tinggal.trim() && jarak.trim()) {
      // Simpan data ke localStorage
      localStorage.setItem("tempattinggal-alamat", alamat);
      localStorage.setItem("tempattinggal-telp", telp);
      localStorage.setItem("tempattinggal-tinggal", tinggal);
      localStorage.setItem("tempattinggal-jarak", jarak);
      navigate(`/admin/audit/${id}/kesehatan`);
    } else {
      alert("Semua data belum terisi");
    }
  };

  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll">
      {/* Profil dan Header */}
      <div className="my-10 w-full">
        <Profil />
      </div>
      <InputHalaman />
      <HeaderInput title="Tempat Tinggal" word="B" form="admin" />

      {/* Form Input */}
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4">
          <tbody>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">Alamat</label>
              </td>
              <td className="w-[63%]">
                <TextInput
                  name="alamat"
                  value={data.alamat}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">No Telp/HP</label>
              </td>
              <td className="w-[63%]">
                <TextInput
                  name="telp"
                  value={data.telp}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">Tinggal Dengan</label>
              </td>
              <td className="w-[63%]">
                <select
                  name="tinggal"
                  value={data.tinggal}
                  onChange={handleChange}
                  className="w-full bg-[#DEE0E1] text-black p-2 rounded shadow-md"
                >
                  <option value="" hidden>Pilih</option>
                  <option value="ortu">Orang Tua</option>
                  <option value="saudara">Saudara</option>
                  <option value="lainnya">Lainnya</option>
                  <option value="wali">Wali</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="w-[63%]">
                <label className="py-1">Jarak Tempat Tinggal ke Sekolah (*km)</label>
              </td>
              <td className="w-[63%]">
                <TextInput
                  name="jarak"
                  value={data.jarak}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Tombol Navigasi */}
      <Nextbefore back={backButton} next={nextButton} />
    </div>
  );
};

export default TempatTinggal;
