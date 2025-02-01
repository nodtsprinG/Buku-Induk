import { MdHomeFilled } from "react-icons/md";
import { RiLogoutBoxLine } from "react-icons/ri";
import { VscGraph } from "react-icons/vsc";
import { FaChevronDown } from "react-icons/fa";
import { PiStudent } from "react-icons/pi";


import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import resetAll from "../utils/resetAll";

const Navigation = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      return navigate("/admin/auth/login");
    }
  });



  const Logout = () => {
    localStorage.removeItem("token");
    return navigate("/admin/auth/login")
  };

  return (
    <div>
      <nav className="h-screen bg-[#161A23] min-h-full p-6 space-y-6 flex flex-col w-80">
        <div>
          <h1 className="block text-xl font-bold text-gray-400 mb-2">Admin</h1>
          <hr className="border border-gray-500"></hr>
        </div>
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/Dashboard"
              href="#"
              className="flex items-center space-x-2 text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-lg"
            >
              <MdHomeFilled />
              <span className="font-inter text-sm font-medium leading-[20px] tracking-tight text-left p-2 rounded shadow">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/datasiswa"
              href="#"
              className="flex items-center space-x-2 text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-lg"
            >
              <PiStudent />
              <span className="font-inter text-sm font-medium leading-[20px] tracking-tight text-left p-2 rounded shadow">
                Data Siswa
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/dataangkatan"
              href="#"
              className="flex items-center space-x-2 text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-lg"
            >
              <VscGraph />
              <span className="font-inter text-sm font-medium leading-[20px] tracking-tight text-left p-2 rounded shadow">
                Data Angkatan
              </span>
            </Link>
          </li>
          <li>
            <Link
              to="/admin/datajurusan"
              href="#"
              className="flex items-center space-x-2 text-gray-400 hover:bg-gray-700 hover:text-white px-3 py-1 rounded-lg"
            >
              <MdHomeFilled />
              <span className="font-inter text-sm font-medium leading-[20px] tracking-tight text-left p-2 rounded shadow">
                Data Jurusan
              </span>
            </Link>
          </li>
        </ul>
        <hr className="border border-gray-500"></hr>
        <div className="mt-auto">
          <button
            onClick={Logout}
            className="flex items-center space-x-2 text-red-500 hover:text-white hover:bg-red-700 px-3 py-2 rounded-lg"
          >
            <RiLogoutBoxLine />
            <span>Logout Account</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Navigation;
