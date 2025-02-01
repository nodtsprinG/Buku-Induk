import HeaderInput from "../../../components/headerInput";
import { useState, useEffect } from "react";
import Profil from "../../../components/profileCard";
import InputHalaman from "../../../components/pilihHalaman"
import {
  TextInput,
  DateInput,
  IntegerInput,
  RadioInput,
} from "../../../components/inputComponent";
import Nextbefore from "../../../components/nextbefore";
import { useNavigate, useParams } from "react-router";
/* 

=====================================================================================================
                    D A T A _ K E T E R A N G A N _ P E R K E M B A N G A N _ S I S W A
  >> Documented and Edited By. Ananda Eka & Nataniel || Developed By. Kelompok 2 <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const KetPerkembanganSiswa = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [beasiswa, setBeasiswa] = useState("");
  const [meninggalkansekolah, setMeninggalkansekolah] = useState("");
  const [akhirpendidikan, setAkhirpendidikan] = useState("");

  const backButton = () => {
    navigate(`/admin/audit/${params.id}/perkembangansiswa`);
  };

  useEffect(() => {
    console.log("Di cek dulu...");
    if (localStorage.getItem("perkembangan-beasiswa") !== "null")
      setBeasiswa(localStorage.getItem("perkembangan-beasiswa"));
    if (localStorage.getItem("perkembangan-meninggalkansekolah") !== "null")
      setMeninggalkansekolah(
        localStorage.getItem("perkembangan-meninggalkansekolah")
      );
    if (localStorage.getItem("perkembangan-akhirpendidikan") !== "null")
      setAkhirpendidikan(localStorage.getItem("perkembangan-akhirpendidikan"));
  }, []);

  const nextButton = () => {
    console.log(beasiswa, meninggalkansekolah, akhirpendidikan);
    localStorage.setItem("perkembangan-beasiswa", beasiswa ? beasiswa : null);
    localStorage.setItem(
      "perkembangan-meninggalkansekolah",
      meninggalkansekolah ? meninggalkansekolah : null
    );
    localStorage.setItem(
      "perkembangan-akhirpendidikan",
      akhirpendidikan ? akhirpendidikan : null
    );

    navigate(`/admin/audit/${params.id}/selesaipend`);
  };
  return (
    <div className="bg-[#dee0e1d6] w-screen px-10 pb-6 h-screen overflow-y-scroll">
      <div className="my-10 w-full"><Profil /></div>
      <div><InputHalaman /></div>
      <HeaderInput
        title={"Perkembangan Siswa"}
        word={"I"}
        form={"admin"}
      />
      <div className="bg-white p-6 flex items-center justify-center">
        <table className="w-3/4 font-body border-separate border-spacing-4 ">
          <tbody>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Menerima Bea Siswa</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={beasiswa}
                  onChange={(e) => setBeasiswa(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Meninggalkan Sekolah</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={meninggalkansekolah}
                  onChange={(e) => setMeninggalkansekolah(e.target.value)}
                  className="h-full"
                />
              </td>
            </tr>
            <tr>
              <td className="w=1/2 h-full">
                <label className="py-1">Akhir Pendidikan</label>
              </td>
              <td className="w-[63%] h-full">
                <TextInput
                  value={akhirpendidikan}
                  onChange={(e) => setAkhirpendidikan(e.target.value)}
                  className="h-full"
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

export default KetPerkembanganSiswa;
