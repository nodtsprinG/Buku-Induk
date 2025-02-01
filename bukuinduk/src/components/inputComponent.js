import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// CSS Modules, react-datepicker-cssmodules.css//
import "react-datepicker/dist/react-datepicker-cssmodules.css";

/* 

=====================================================================================================
                    I N P U T _ C O M P O N E N T
  >> Developed By. Ananda Eka <<

[#] Note : Mengikuti desain

=====================================================================================================

*/

export const TextInput = ({ onChange, value }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-[10px]"
      type="text"
    />
  );
};

export const IntegerInput = ({ onChange, value }) => {
  return (
    <input
      value={value}
      onChange={onChange}
      className="bg-[#DEE0E1] py-2 px-2 w-full focus:outline-none rounded-[10px]"
      type="number"
    />
  );
};

export const RadioInput = ({ onChange, value }) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex">
        <a>
          <input
            value={"laki-laki"}
            onChange={onChange}
            checked={value === "laki-laki"}
            className="bg-[#DEE0E1] py-2 px-2 rounded-[10px]"
            type="radio"
            name="gender"
          />
        </a>
        <p className="ml-1">Laki-laki</p>
      </div>
      <div className="flex">
        <a>
          <input
            value={"perempuan"}
            onChange={onChange}
            checked={value === "perempuan"}
            className="bg-[#DEE0E1] py-2 px-2 rounded-[10px]"
            type="radio"
            name="gender"
          />
        </a>
        <p className="ml-1">Perempuan</p>
      </div>
    </div>
  );
};
