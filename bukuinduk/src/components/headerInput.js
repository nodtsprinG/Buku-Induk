import { FaDownload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import {
  isAkunFilled,
  isBiodataFilled,
  isTempattinggalFilled,
  isKesehatanFilled,
  isPendidikanFilled,
  isAyahFilled,
  isIbuFilled,
  isWaliFilled,
  isHobiFilled,
} from "../utils/check";
import { MdLastPage } from "react-icons/md";
import { baseUrl } from "../utils/constan";
import axios from "axios";
import { createElement } from "react";


/* 

=====================================================================================================
                    H E A D E R _ I N P U T _ C O M P O N E N T 
  >> Developed By. Ananda Eka <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

const HeaderButton = ({ nama, isActive = false, to }) => {
  const navigate = useNavigate();

  const bukaDanCek = () => {
    switch (nama) {
      case "Biodata":
        if (!isAkunFilled()) return alert("Semua data belum terisi");
        break;
      case "Tempat Tinggal":
        if (!(isAkunFilled() && isBiodataFilled()))
          return alert("Semua data belum terisi");
        break;
      case "Kesehatan":
        if (!(isAkunFilled() && isBiodataFilled() && isTempattinggalFilled()))
          return alert("Semua data belum terisi");
        break;
      case "Pendidikan":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
      case "Keterangan ayah kandung":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled() &&
            isPendidikanFilled
          )
        )
          return alert("Semua data belum terisi");
        break;
      case "Keterangan ibu kandung":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled() &&
            isPendidikanFilled &&
            isAyahFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
      case "Keterangan wali":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled() &&
            isPendidikanFilled &&
            isAyahFilled() &&
            isIbuFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
      case "Hobi":
        if (
          !(
            isAkunFilled() &&
            isBiodataFilled() &&
            isTempattinggalFilled() &&
            isKesehatanFilled() &&
            isPendidikanFilled &&
            isAyahFilled() &&
            isIbuFilled() &&
            isHobiFilled()
          )
        )
          return alert("Semua data belum terisi");
        break;
    }
    navigate(to);
  };

  if (!isActive) {
    return (
      <button
        onClick={bukaDanCek}
        className="px-14 py-2 text-center text-l font-bold font-body mb-5 mx-2 bg-[#849BB0] text-white rounded-md"
      >
        {nama}
      </button>
    );
  } else {
    return (
      <button
        onClick={bukaDanCek}
        className="px-14 py-2 text-center text-l font-bold font-body mb-5 mx-2 bg-[#0C7FDA] text-white rounded-md"
      >
        {nama}
      </button>
    );
  }
};

const HeaderInput = ({ title, word, form, lastpage }) => {
  const params = useParams();
  const ButtonList = [
    { a: "Biodata", b: "biodata" },
    { a: "Tempat Tinggal", b: "tempattinggal" },
    { a: "Kesehatan", b: "kesehatan" },
    { a: "Pendidikan", b: "pendidikan" },
    { a: "Keterangan ayah kandung", b: "ayah" },
    { a: "Keterangan ibu kandung", b: "ibu" },
    { a: "Keterangan wali", b: "wali" },
    { a: "Hobi", b: "hobi" },
    {
      a: "Keterangan perkembangan siswa/siswi",
      b: "perkembangansiswa",
      c: true,
    },
    { a: "Keterangan selesai pendidikan", b: "selesaipend", c: true },
  ];

  const downloadPdf = async () => {
    const response = await axios.get(`${baseUrl}/admin/export-pdf/${params.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      responseType: 'blob', // Untuk menerima data dalam format blob (binary large object)
    });

    // Buat URL dari blob yang diterima
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.pdf'); // Nama file yang diunduh
    document.body.appendChild(link);
    link.click();

    // Hapus URL dan elemen link setelah selesai
    link.parentNode.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="pt-5">
      <div className="flex flex-row items-center w-full">
        <div className="w-[63%] h-full">
          <p className="font-header font-bold text-xl">
            {word}. {title}
          </p>
        </div>
        <div className="w-[63%] h-full flex justify-end items-center">
          {!isNaN(params.id) ? (
            <button
              onClick={downloadPdf}
              className="flex flex-row justify-center items-center px-5 py-2 mr-6 text-center text-m font-bold font-body rounded-md"
            >
              <FaDownload className="mr-2" /> Download
            </button>
          ) : null}
          {!isNaN(params.id) ? (
            <div className="flex flex-row justify-center items-center px-5 py-2 mr-6 text-center text-m font-bold font-body rounded-md">
              <FaDownload className="mr-2" />
              Print
            </div>
          ) : null}
          {params.action === "upload" && lastpage ? (
            <div className="px-5 py-2 text-center text-m font-bold font-body bg-[#0C7FDA] text-white rounded-md">
              Simpan
            </div>
          ) : null}
        </div>
      </div>
      <div className="flex flex-row flex-wrap w-full overflow-hidden mt-3">
        {ButtonList.map((t, i) => {
          if (t.c && form !== "admin") return;
          return (
            <HeaderButton
              key={i}
              to={
                form == "admin"
                  ? `/${form}/audit/${params.id}/${t.b}`
                  : `/${form}/data/${params.action}/${t.b}`
              }
              nama={t.a}
              isActive={title === t.a ? true : false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HeaderInput;
