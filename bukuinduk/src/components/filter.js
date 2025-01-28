import React, { useEffect } from "react";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constan";

const Checkbox = ({ isChecked, label, checkHandler, index }) => {
  return (
    <label>
      <input
        className="mr-2"
        type="checkbox"
        id={`checkbox-${index}`}
        checked={isChecked}
        onChange={checkHandler}
      />
      {label}
    </label>
  );
};

const FilterComponent = ({ stateAngkatan, stateJurusan }) => {
  const [angkatan, setAngkatan] = useState([]);
  const [jurusan, setJurusan] = useState([]);

  useEffect(() => {
    axios
      .get(baseUrl + "/admin/jurusan", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const data = res.data;
        setJurusan(data);
        return axios.get(baseUrl + "/admin/angkatan", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      })
      .then((res) => {
        const data = res.data;
        setAngkatan(data);
        console.log(angkatan, jurusan);
      });
  }, []);

  const updateJurusan = (index) => {
    setJurusan(
      jurusan.map((jrs, currentIndex) =>
        currentIndex === index ? { ...jrs, checked: !jrs.checked } : jrs
      )
    );
  };
  const updateAngkatan = (index) => {
    setAngkatan(
      angkatan.map((ank, currentIndex) =>
        currentIndex === index ? { ...ank, checked: !ank.checked } : ank
      )
    );
  };

  const terapken = () => {
    stateAngkatan(angkatan)
    stateJurusan(jurusan)
  }


  return (
    <div className="p-6 bg-white rounded-md shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <CiFilter />
        <h2 className="text-lg font-semibold">Filter</h2>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h3 className="font-semibold mb-2">Jurusan</h3>
          <div className="flex flex-col">
            {jurusan.map((jrs, index) => {
              return (
                <Checkbox
                  className="flex items-center"
                  key={jrs.nama}
                  isChecked={jrs.checked}
                  checkHandler={() => updateJurusan(index)}
                  label={jrs.nama}
                  index={index}
                />
              );
            })}
          </div>
        </div>
        <div className="flex flex-col">
          <h3 className="font-semibold mb-2">Angkatan</h3>
          <div className="flex flex-col">
            {angkatan.map((ank, index) => {
              return (
                <Checkbox
                  className="flex items-center"
                  key={ank.tahun}
                  isChecked={ank.checked}
                  checkHandler={() => updateAngkatan(index)}
                  label={ank.tahun}
                  index={index}
                />
              );
            })}
          </div>
        </div>
      </div>
      <button onClick={terapken} className="mt-6 bg-blue-500 text-white p-4 rounded-md">
        Terapkan
      </button>
    </div>
  );
};

export default FilterComponent;
