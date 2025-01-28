import { useParams } from "react-router";

const Nextbefore = ({ back, next, lastpage }) => {
  const params = useParams();
  return (
    <div className="flex justify-between mt-4">
      <button onClick={back} className="bg-gray-500  text-white p-2 rounded">
        Kembali
      </button>
      {!lastpage ? (
        <button onClick={next} className="bg-blue-500 text-white p-2 rounded">
          Lanjut
        </button>
      ) : null}
      {(!isNaN(parseInt(params.id)) && lastpage) ||
      (params.action === "upload" && lastpage) ? (
        <button onClick={next} className="bg-blue-500 text-white p-2 rounded">
          Simpan
        </button>
      ) : null}
    </div>
  );
};

export default Nextbefore;
