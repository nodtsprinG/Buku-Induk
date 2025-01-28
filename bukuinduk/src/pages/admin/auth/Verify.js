import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

import { baseUrl } from "../../../utils/constan";

const Verify = () => {
    const [kode, setKode] = useState("")
    const navigate = useNavigate()
    const { code } = useParams()

    const verify = () => {
        if(code.length == 0) {
            alert("Error")
        } else {
            axios.post(baseUrl + '/auth/code-admin', {
                code
            }).then((res) => {
                const { token } = res.data
                localStorage.setItem("token", token)
                navigate("/admin/dashboard")
            })
        }
    }

    return (
        <div className="flex items-center justify-center bg-homepage bg-no-repeat w-screen h-screen">
            <div className="flex flex-row items-center justify-center w-11/12">
                <div className="flex flex-col items-center justify-center w-1/2">
                    <img src="https://cdn.discordapp.com/attachments/847678573040631818/1255910504031846440/logosekolah.png?ex=667ed94d&is=667d87cd&hm=4aa0c62be0f7262701857bb02306a2cea8aed73b5157376b41d200933b379b5e&" className="w-44 aspect-square" />
                    <p className="font-header text-white font-bold text-3xl text-center mt-3">Buku Induk</p>
                </div>
                <div className="bg-[#D9D9D9] w-1/2 px-10 py-9 rounded-md border-4 border-[#A4A4A4]">
                    <p className="font-body opacity-30 text-sm">Langkah 2 dari 2</p>
                    <p className="font-header font-bold text-3xl mt-2">Masuk</p>
                    <div className="flex flex-col mt-5 pt-3">
                        <input onChange={(e) => setKode(e.currentTarget.value)} className="bg-transparent border-b border-black focus:outline-none pt-2 text-center " maxLength={6}></input>
                        <div className="flex flex-col justify-center items-center py-8">
                            <p className="opacity-20 w-2/3 text-center">Kami Mengirimkan Kode Verifikasi Melalui Email Anda</p>
                            <img src="https://cdn.discordapp.com/attachments/847678573040631818/1255910503725793301/EmailIcon.png?ex=667ed94d&is=667d87cd&hm=31d9e9122d093643990ac3a9e6e7ad55d3cfd72f8172e4cb76bfd128ed068930&" className=" w-14 aspect-square"></img>
                        </div>
                        <div className="flex flex-row justify-end items-center pt-10 w-full">
                            <button onClick={verify} className="font-header font-bold bg-[#0083FB] p-2 text-l text-white rounded-md">Masuk</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Verify;