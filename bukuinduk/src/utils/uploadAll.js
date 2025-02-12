import {
  isAkunFilled,
  isAyahFilled,
  isBiodataFilled,
  isHobiFilled,
  isIbuFilled,
  isKesehatanFilled,
  isPendidikanFilled,
  isTempattinggalFilled,
  isWaliFilled,
} from "./check";

import axios from "axios";

import { baseUrl } from "./constan";

const uploadAll = async () => {
  if (
    (isAkunFilled(),
      isAyahFilled(),
      isBiodataFilled(),
      isHobiFilled(),
      isIbuFilled(),
      isKesehatanFilled(),
      isPendidikanFilled(),
      isTempattinggalFilled(),
      isWaliFilled())
  ) {


    const data = {
      siswa: {
        nisn: localStorage.getItem("akun-nisn"),
        jurusan_nama: localStorage.getItem("akun-jurusanNama"),
        angkatan_id: localStorage.getItem("akun-angkatanId"),
      },
      data_diri: {
        nama_lengkap: localStorage.getItem("biodata-nama"),
        nama_panggilan: localStorage.getItem("biodata-panggilan"),
        jenis_kelamin: localStorage.getItem("biodata-jeniskelamin"),
        tempat_lahir: localStorage.getItem("biodata-tempatlahir"),
        tanggal_lahir: localStorage.getItem("biodata-tanggallahir"),
        agama: localStorage.getItem("biodata-agama"),
        kewarganegaraan: localStorage.getItem("biodata-kewarganegaraan"),
        anak_ke: localStorage.getItem("biodata-anakke"),
        jml_saudara_kandung: localStorage.getItem("biodata-kandung"),
        jml_saudara_angkat: localStorage.getItem("biodata-angkat"),
        jml_saudara_tiri: localStorage.getItem("biodata-tiri"),
        kelengkapan_ortu: localStorage.getItem("biodata-status"),
        bahasa_sehari_hari: localStorage.getItem("biodata-bahasa"),
      },
      hobi: {
        kesenian: localStorage.getItem("hobi-kesenian"),
        olahraga: localStorage.getItem("hobi-olahraga"),
        organisasi: localStorage.getItem("hobi-organisasi"),
        lain_lain: localStorage.getItem("hobi-lainlain"),
      },
      ayah_kandung: {
        nama: localStorage.getItem("ayah-nama"),
        tempat_lahir: localStorage.getItem("ayah-tempatlahir"),
        tanggal_lahir: localStorage.getItem("ayah-tanggallahir"),
        agama: localStorage.getItem("ayah-agama"),
        kewarganegaraan: localStorage.getItem("ayah-kewarganegaraan"),
        pendidikan: localStorage.getItem("ayah-pendidikan"),
        pekerjaan: localStorage.getItem("ayah-pekerjaan"),
        pengeluaran_per_bulan: localStorage.getItem("ayah-pengeluaran"),
        alamat_dan_no_telepon: localStorage.getItem("ayah-alamatdantelpon"),
        status: localStorage.getItem("ayah-status"),
      },
      ibu_kandung: {
        nama: localStorage.getItem("ibu-nama"),
        tempat_lahir: localStorage.getItem("ibu-tempatlahir"),
        tanggal_lahir: localStorage.getItem("ibu-tanggallahir"),
        agama: localStorage.getItem("ibu-agama"),
        kewarganegaraan: localStorage.getItem("ibu-kewarganegaraan"),
        pendidikan: localStorage.getItem("ibu-pendidikan"),
        pekerjaan: localStorage.getItem("ibu-pekerjaan"),
        pengeluaran_per_bulan: localStorage.getItem("ibu-pengeluaran"),
        alamat_dan_no_telepon: localStorage.getItem("ibu-alamatdantelpon"),
        status: localStorage.getItem("ibu-status"),
      },
      wali: {
        nama: localStorage.getItem("wali-nama"),
        tempat_lahir: localStorage.getItem("wali-tempatlahir"),
        tanggal_lahir: localStorage.getItem("wali-tanggallahir"),
        agama: localStorage.getItem("wali-agama"),
        kewarganegaraan: localStorage.getItem("wali-kewarganegaraan"),
        pendidikan: localStorage.getItem("wali-pendidikan"),
        pekerjaan: localStorage.getItem("wali-pekerjaan"),
        pengeluaran_per_bulan: localStorage.getItem("wali-pengeluaran"),
        alamat_dan_no_telepon: localStorage.getItem("wali-alamatdantelpon"),
      },
      tempat_tinggal: {
        alamat: localStorage.getItem("tempattinggal-alamat"),
        no_telepon: localStorage.getItem("tempattinggal-telp"),
        tinggal_dengan: localStorage.getItem("tempattinggal-tinggal"),
        jarak_ke_sekolah: localStorage.getItem("tempattinggal-jarak"),
      },
      pendidikan: {
        diterima_tanggal: localStorage.getItem("pendidikan-tanggal"),
        sebelumnya_tamatan_dari: localStorage.getItem("pendidikan-tamatan"),
        sebelumnya_lama_belajar: localStorage.getItem("pendidikan-sebelumnyalamabelajar"),
        sebelumnya_tanggal_dan_ijazah: localStorage.getItem(
          "pendidikan-nomorijazah"
        ),
        sebelumnya_tanggal_skhun_dan_: localStorage.getItem("pendidikan-skhun"),
        pindahan_dari_sekolah: localStorage.getItem("pendidikan-darisekolah"),
        pindahan_alasan: localStorage.getItem("pendidikan-alasan"),
        sebelumnya_lama_belajar: localStorage.getItem("pendidikan-sebelumnyalamabelajar"),
        diterima_di_bidang_keahlian: localStorage.getItem(
          "pendidikan-bidangkeahlian"
        ),
        diterima_di_program_keahlian: localStorage.getItem(
          "pendidikan-programkeahlian"
        ),
        diterima_di_paket_keahlian: localStorage.getItem(
          "pendidikan-paketkeahlian"
        ),
        diterima_di_kelas: localStorage.getItem("pendidikan-kelas"),
      },
      kesehatan: {
        gol_darah: localStorage.getItem("kesehatan-goldarah"),
        penyakit_pernah_diderita: localStorage.getItem("kesehatan-penyakit"),
        kelainan_jasmani: localStorage.getItem("kesehatan-jasmani"),
        tinggi: localStorage.getItem("kesehatan-tinggi"),
        berat_badan: localStorage.getItem("kesehatan-berat"),
      }
    };

    console.log("Data yang di post ", data)

    return axios
      .post(baseUrl + "/siswa/data-diri", data)
      .then((res) => {
        const dt = res.data;
        console.log("Response:", dt);
        return dt.message;
      })
      .catch((error) => {
        console.error("Error posting data:", error.response ? error.response.data : error.message);
        throw error;  // Bisa melempar error lagi jika ingin ditangani di tempat lain
      });
  }
};

export default uploadAll;
