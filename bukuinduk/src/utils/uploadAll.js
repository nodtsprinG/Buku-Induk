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
  try {
    // Pastikan semua data sudah terisi
    if (
      !(
        isAkunFilled() &&
        isAyahFilled() &&
        isBiodataFilled() &&
        isHobiFilled() &&
        isIbuFilled() &&
        isKesehatanFilled() &&
        isPendidikanFilled() &&
        isTempattinggalFilled() &&
        isWaliFilled()
      )
    ) {
      throw new Error("Pastikan semua data telah diisi dengan benar.");
    }

    const getItem = (key, defaultValue = null) => localStorage.getItem(key) ?? defaultValue;
    
    const data = {
      siswa: {
        nisn: getItem("akun-nisn"),
        jurusan_nama: getItem("akun-jurusanNama"),
        angkatan_id: getItem("akun-angkatanId"),
      },
      data_diri: {
        nama_lengkap: getItem("biodata-nama"),
        nama_panggilan: getItem("biodata-panggilan"),
        jenis_kelamin: getItem("biodata-jeniskelamin"),
        tempat_lahir: getItem("biodata-tempatlahir"),
        tanggal_lahir: getItem("biodata-tanggallahir"),
        agama: getItem("biodata-agama"),
        kewarganegaraan: getItem("biodata-kewarganegaraan"),
        anak_ke: getItem("biodata-anakke"),
        jml_saudara_kandung: getItem("biodata-kandung"),
        jml_saudara_angkat: getItem("biodata-angkat"),
        jml_saudara_tiri: getItem("biodata-tiri"),
        kelengkapan_ortu: getItem("biodata-status"),
        bahasa_sehari_hari: getItem("biodata-bahasa"),
      },
      hobi: {
        kesenian: getItem("hobi-kesenian"),
        olahraga: getItem("hobi-olahraga"),
        organisasi: getItem("hobi-organisasi"),
        lain_lain: getItem("hobi-lainlain"),
      },
      ayah_kandung: {
        nama: getItem("ayah-nama"),
        tempat_lahir: getItem("ayah-tempatlahir"),
        tanggal_lahir: getItem("ayah-tanggallahir"),
        agama: getItem("ayah-agama"),
        kewarganegaraan: getItem("ayah-kewarganegaraan"),
        pendidikan: getItem("ayah-pendidikan"),
        pekerjaan: getItem("ayah-pekerjaan"),
        pengeluaran_per_bulan: getItem("ayah-pengeluaran"),
        alamat_dan_no_telepon: getItem("ayah-alamatdantelpon"),
        status: getItem("ayah-status"),
      },
      ibu_kandung: {
        nama: getItem("ibu-nama"),
        tempat_lahir: getItem("ibu-tempatlahir"),
        tanggal_lahir: getItem("ibu-tanggallahir"),
        agama: getItem("ibu-agama"),
        kewarganegaraan: getItem("ibu-kewarganegaraan"),
        pendidikan: getItem("ibu-pendidikan"),
        pekerjaan: getItem("ibu-pekerjaan"),
        pengeluaran_per_bulan: getItem("ibu-pengeluaran"),
        alamat_dan_no_telepon: getItem("ibu-alamatdantelpon"),
        status: getItem("ibu-status"),
      },
      wali: {
        nama: getItem("wali-nama"),
        tempat_lahir: getItem("wali-tempatlahir"),
        tanggal_lahir: getItem("wali-tanggallahir"),
        agama: getItem("wali-agama"),
        kewarganegaraan: getItem("wali-kewarganegaraan"),
        pendidikan: getItem("wali-pendidikan"),
        pekerjaan: getItem("wali-pekerjaan"),
        pengeluaran_per_bulan: getItem("wali-pengeluaran"),
        alamat_dan_no_telepon: getItem("wali-alamatdantelpon"),
      },
      tempat_tinggal: {
        alamat: getItem("tempattinggal-alamat"),
        no_telepon: getItem("tempattinggal-telp"),
        tinggal_dengan: getItem("tempattinggal-tinggal"),
        jarak_ke_sekolah: getItem("tempattinggal-jarak"),
      },
      pendidikan: {
        diterima_tanggal: getItem("pendidikan-tanggal"),
        sebelumnya_tamatan_dari: getItem("pendidikan-tamatan"),
        sebelumnya_lama_belajar: getItem("pendidikan-sebelumnyalamabelajar"),
      },
      kesehatan: {
        gol_darah: getItem("kesehatan-goldarah"),
        penyakit_pernah_diderita: getItem("kesehatan-penyakit"),
        kelainan_jasmani: getItem("kesehatan-jasmani"),
        tinggi: getItem("kesehatan-tinggi"),
        berat_badan: getItem("kesehatan-berat"),
      },
    };

    console.log("Data yang dikirim:", data);
    const response = await axios.post(`${baseUrl}/siswa/data-diri`, data);
    console.log("Response:", response.data);
    return response.data.message;
  } catch (error) {
    console.error("Error saat mengunggah data:", error.response?.data || error.message);
    throw error;
  }
};

export default uploadAll;