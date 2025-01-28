import HeaderInput from "../../../components/headerInput";
import { useState, useEffect } from "react";
import { TextInput, IntegerInput } from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import { useNavigate, useParams } from "react-router";

//Date issues

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import updateData from "../../../utils/updateData";
import toast from "react-hot-toast";

/* 

=====================================================================================================
                    
  >> Documented and Edited By. Joko & Aden || Developed By. Kelompok 1 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const KetSelesai = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [tanggal, setTanggal] = useState(new Date());

  const [melanjutkan, setMelanjutkan] = useState("");
  const [perusahaan, setPerusahaan] = useState("");
  const [penghasilan, setPenghasilan] = useState("");

  useEffect(() => {
    console.log("Di cek dulu...");
    console.log(localStorage.getItem("selesaipendidikan-tanggal"));
    if (localStorage.getItem("selesaipendidikan-melanjutkan") !== "null")
      setMelanjutkan(localStorage.getItem("selesaipendidikan-melanjutkan"));
    if (localStorage.getItem("selesaipendidikan-perusahaan") !== "null")
      setPerusahaan(localStorage.getItem("selesaipendidikan-perusahaan"));
    if (localStorage.getItem("selesaipendidikan-tanggal") === "null") {
      setTanggal(new Date());
    } else {
      setTanggal(localStorage.getItem("selesaipendidikan-tanggal"));
    }
    if (localStorage.getItem("selesaipendidikan-penghasilan") !== "null")
      setPenghasilan(localStorage.getItem("selesaipendidikan-penghasilan"));
  }, []);

  const backButton = () => {
    navigate("/admin/audit/new/perkembangansiswa");
  };

  const nextButton = async () => {
    console.log(melanjutkan, perusahaan, tanggal, penghasilan);
    localStorage.setItem(
      "selesaipendidikan-melanjutkan",
      melanjutkan ? melanjutkan : null
    );
    localStorage.setItem(
      "selesaipendidikan-perusahaan",
      perusahaan ? perusahaan : null
    );
    localStorage.setItem("selesaipendidikan-tanggal", tanggal ? tanggal : null);
    localStorage.setItem(
      "selesaipendidikan-penghasilan",
      penghasilan ? penghasilan : null
    );
    //Check semua ada lalu save

    await updateData(params.id).then((message) => {
      console.log("Notifikasi :",message)
      toast.success(message)
    });
    navigate("/admin/dashboard");
  };
  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll">
      <HeaderInput
        title={"Keterangan selesai pendidikan"}
        word={"J"}
        form={"admin"}
        lastpage={true}
      />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Melanjutkan ke</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={melanjutkan}
                  onChange={(e) => setMelanjutkan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">a.Nama Perusahaan</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={perusahaan}
                  onChange={(e) => setPerusahaan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">b.Tanggal Mulai Kerja</label>
              </td>
              <td className="w-[63%] h-full">
                <DatePicker
                  selected={tanggal}
                  onChange={(date) => setTanggal(date)}
                  scrollableMonthYearDropdown
                  showYearDropdown
                  className="bg-[#DEE0E1] py-1 px-1 w-full focus:outline-none"
                  maxDate={new Date()}
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">c.Penghasilan</label>
              </td>
              <td className="w-[63%] h-full">
                <IntegerInput
                  value={penghasilan}
                  onChange={(e) => setPenghasilan(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <Nextbefore next={nextButton} back={backButton} lastpage={true} />
    </div>
  );
};
export default KetSelesai;
