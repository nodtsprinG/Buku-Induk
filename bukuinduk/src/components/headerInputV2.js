import { FaDownload } from "react-icons/fa";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { baseUrl } from "../utils/constan";
import {
  isAkunFilled,
  isBiodataFilled,
  isTempattinggalFilled,
  isKesehatanFilled,
  isPendidikanFilled,
  isAyahFilled,
  isIbuFilled,
  isHobiFilled,
} from "../utils/check";

const HeaderButton = ({ nama, isActive = false, to }) => {
  const navigate = useNavigate();

  const checkAndNavigate = () => {
    const validationMap = {
      "Biodata": () => isAkunFilled(),
      "Tempat Tinggal": () => isAkunFilled() && isBiodataFilled(),
      "Kesehatan": () => isAkunFilled() && isBiodataFilled() && isTempattinggalFilled(),
      "Pendidikan": () => isAkunFilled() && isBiodataFilled() && isTempattinggalFilled() && isKesehatanFilled(),
      "Ayah": () => isAkunFilled() && isBiodataFilled() && isTempattinggalFilled() && isKesehatanFilled() && isPendidikanFilled(),
      "Ibu": () => isAkunFilled() && isBiodataFilled() && isTempattinggalFilled() && isKesehatanFilled() && isPendidikanFilled() && isAyahFilled(),
      "Wali": () => isAkunFilled() && isBiodataFilled() && isTempattinggalFilled() && isKesehatanFilled() && isPendidikanFilled() && isAyahFilled() && isIbuFilled(),
      "Hobi": () => isAkunFilled() && isBiodataFilled() && isTempattinggalFilled() && isKesehatanFilled() && isPendidikanFilled() && isAyahFilled() && isIbuFilled() && isHobiFilled(),
    };
    
    if (!validationMap[nama]()) {
      return alert("Semua data belum terisi");
    }
    navigate(to);
  };

  return (
    <button
      onClick={checkAndNavigate}
      className={`px-2 py-2 text-xl font-bold ${isActive ? "border-b-4 border-b-blue-700" : "text-gray-500"}`}
    >
      {nama}
    </button>
  );
};

const HeaderInput = ({ title, word, form, lastpage }) => {
  const params = useParams();
  const navigate = useNavigate();
  const ButtonList = [
    "Biodata", "Tempat Tinggal", "Kesehatan", "Pendidikan", "Ayah", "Ibu", "Wali", "Hobi"
  ];

  const downloadPdf = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/export-pdf/${params.id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.pdf');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Gagal mengunduh PDF");
    }
  };

  return (
    <div className="pt-5">
      <div className="flex justify-between items-center w-full">
        <p className="font-bold text-xl">{word}. {title}</p>
        <div className="flex space-x-4">
          {!isNaN(params.id) && (
            <button onClick={downloadPdf} className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md">
              <FaDownload className="mr-2" /> Download
            </button>
          )}
          {params.action === "upload" && lastpage && (
            <button className="px-5 py-2 bg-green-500 text-white rounded-md">
              Simpan
            </button>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-8 border">
        {ButtonList.map((nama, i) => (
          <HeaderButton
            key={i}
            to={`/${form}/data/${params.action}/${nama.toLowerCase().replace(/ /g, "")}`}
            nama={nama}
            isActive={title === nama}
          />
        ))}
      </div>
    </div>
  );
};

export default HeaderInput;