import Link from "next/link";
import Input from "@/components/Input";
import { useEffect, useState, useRef } from "react";
import Label from "@/components/Label";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../lib/axios";

const ProfileEditModal = ({
  show,
  closeModal,
  profile,
  Concerns,
  Skintypes,
}) => {
  const [cmntimage, setCmntimage] = useState(null);

  const [name, setName] = useState(profile.user.name);
  const [email, setEmail] = useState(profile.user.email);
  const [phone, setPhone] = useState(profile.user.phone);
  const [concerns, setConcerns] = useState([profile.concern.data[0].id]);
  const [skinTypes, setSkinTypes] = useState([profile.skin_type.data[0].id]);
  const [datechange, setDatechange] = useState(null);
  const imageInput = useRef(null);

  const [dateValues, timeValues] = profile.birth_day.split(" ");
  const [month, day, year] = dateValues.split("/");
  const [hours, minutes, seconds] = timeValues.split(":");
  const [birthtDate, setBirthtDate] = useState(
    new Date(+year, month - 1, +day, +hours, +minutes, +seconds)
  );
  const cur_date = new Date();
  const years = date_range(1990, cur_date.getFullYear() + 1, 1);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [errors, setErrors] = useState([]);
  function date_range(start, end, step) {
    let years = [];
    for (let i = start; i <= end; i += step) {
      years.push(i);
    }
    return years;
  }
  useEffect(() => {
    var aScript1 = document.createElement("script");
    aScript1.type = "text/javascript";
    aScript1.src = "https://cdn.tailwindcss.com";
    document.head.appendChild(aScript1);
    var aScript = document.createElement("script");
    aScript.type = "text/javascript";
    aScript.src =
      "https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js";
    document.head.appendChild(aScript);
    aScript.onload = () => {};
  }, []);
  function convertImage() {
    var reader = new FileReader();
    var url = reader.readAsDataURL(imageInput.current.files[0]);
    reader.onloadend = function (e) {
      setCmntimage(reader.result);
    };
  }
  function submitForm(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("concerns", JSON.stringify(concerns));
    formData.append("skinTypes", JSON.stringify(skinTypes));
    formData.append("birth_date", Math.floor(birthtDate.getTime() / 1000));
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("image", cmntimage);
    formData.append("imgname", imageInput.current.value);

    axios
      .post(`/api/profiles/${profile.id}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          closeModal();
          location.reload();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <div className="">
      <div
        className={`${
          show ? "active" : "hidden"
        }  bg-black w-screen h-screen opacity-40 absolute top-0 left-0 z-10`}
      ></div>
      <div
        id="authentication-modal"
        tabIndex="-1"
        className={`${
          show ? "active" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center`}
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full md:max-w-xl max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={closeModal}
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="py-6 px-6 lg:px-8">
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-900 text-center p-1">
                  Edit Profile
                </h3>
                <hr></hr>
                <div className="h-96 overflow-y-auto ">
                  <form className="space-y-6" action="#">
                    <div>
                      <label className="block mb-2 text-md font-semibold pt-1 text-gray-900">
                        Your Name
                      </label>
                      <Input
                        type="text"
                        value={name}
                        className="block mt-1 w-full"
                        onChange={(event) => setName(event.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-md font-semibold pt-1 text-gray-900">
                        Your Email
                      </label>
                      <Input
                        type="text"
                        value={email}
                        className="block mt-1 w-full"
                        onChange={(event) => setEmail(event.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    <div>
                      <label className="block mb-2 text-md font-semibold pt-1 text-gray-900">
                        Your Phone
                      </label>
                      <Input
                        type="text"
                        value={phone}
                        className="block mt-1 w-full"
                        onChange={(event) => setPhone(event.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                    {/* skin type stage */}
                    <div
                      className={`flex flex-col justify-center items-center`}
                    >
                      <label className="block mb-2 text-md font-semibold pt-1 text-gray-900">
                        Skin Type
                      </label>

                      <div className="grid grid-cols-1 gap-4 m-6 w-full">
                        <select
                          value={skinTypes[0]}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {Skintypes.map((skinType, index) => (
                            <option
                              key={index}
                              value={skinType.id}
                              onClick={() => {
                                setSkinTypes([skinType.id]);
                              }}
                              className="text-cetner"
                            >
                              {skinType.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* concern stage */}
                    <div
                      className={` flex flex-col justify-center items-center`}
                    >
                      <label className="block mb-2 text-md font-semibold pt-1 text-gray-900">
                        Concerns
                      </label>

                      <div className="grid grid-cols-2 gap-4 m-6">
                        {Concerns.map((concern, index) => (
                          <div
                            key={index}
                            className={`${
                              concerns.includes(concern.id)
                                ? `border-2 border-blue-500 rounded-xl `
                                : ``
                            }  border flex flex-col justify-center items-center p-3`}
                            onClick={() => {
                              setConcerns([...concerns, concern.id]);
                            }}
                          >
                            {concern.name}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className={`flex flex-col justify-center items-center`}
                    >
                      <Label htmlFor="name" className="text-xl">
                        Select Birth Date
                      </Label>
                      <div className="flex items-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ">
                        <div
                          className="inset-y-0 left-0 items-center pl-3 pointer-events-none -ml-3"
                          htmlFor="dd"
                          onClick={() => {
                            const elem = document.getElementsByClassName(
                              "react-datepicker-wrapper"
                            );
                            elem[0].click();
                            elem.click();
                          }}
                        >
                          {" "}
                          <svg
                            aria-hidden="true"
                            className="w-5 h-5 text-gray-500 dark:text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                        </div>
                        <DatePicker
                          renderCustomHeader={({
                            date,
                            changeYear,
                            changeMonth,
                            decreaseMonth,
                            increaseMonth,
                            prevMonthButtonDisabled,
                            nextMonthButtonDisabled,
                          }) => (
                            <div
                              style={{
                                margin: 10,
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                onClick={decreaseMonth}
                                disabled={prevMonthButtonDisabled}
                                className="p-1 m-2"
                              >
                                {"<"}
                              </button>
                              <select
                                value={date.getFullYear()}
                                onChange={({ target: { value } }) =>
                                  changeYear(value)
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                {years.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>

                              <select
                                value={months[date.getMonth()]}
                                onChange={({ target: { value } }) =>
                                  changeMonth(months.indexOf(value))
                                }
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                              >
                                {months.map((option) => (
                                  <option key={option} value={option}>
                                    {option}
                                  </option>
                                ))}
                              </select>

                              <button
                                onClick={increaseMonth}
                                disabled={nextMonthButtonDisabled}
                                className="p-1 m-2"
                              >
                                {">"}
                              </button>
                            </div>
                          )}
                          selected={birthtDate}
                          onChange={(date) => {
                            setBirthtDate(date);
                            setDatechange(true);
                          }}
                          dateFormat="dd/MM/yyyy"
                          onClick={() => console.log("clicked")}
                          className="bg-gray-50 border-none text-gray-900 sm:text-sm rounded-lg  block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
                        />
                      </div>
                      {/* cover image stage*/}
                      <div
                        className={`flex flex-col justify-center items-center`}
                      >
                        <Label htmlFor="name" className="text-xl">
                          Upload Profile Image
                        </Label>

                        <button
                          type="button"
                          className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                          htmlFor="imageInput"
                          onClick={() => imageInput.current.click()}
                        >
                          <svg
                            aria-hidden="true"
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                              clipRule="evenodd"
                            ></path>
                          </svg>
                          <span className="sr-only">Upload image</span>
                        </button>
                        <input
                          ref={imageInput}
                          type="file"
                          name="imageInput"
                          multiple="true"
                          onChange={convertImage}
                          className="hidden"
                        />
                      </div>
                      {cmntimage != null ? (
                        <div className="mx-2 my-2 flex items-center justify-between">
                          <Image
                            loader={() => cmntimage}
                            src={cmntimage}
                            alt={`profile-image`}
                            width={150}
                            height={150}
                            className="py-6 border border-red-400 rounded-lg m-1"
                          />
                          <div
                            className="bg-white text-black md:p-4 sm:p-3 h-6 w-6 rounded-2xl flex justify-center items-center"
                            onClick={() => {
                              setCmntimage(null);
                            }}
                          >
                            <span>x</span>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                      onClick={submitForm}
                    >
                      Update Profile
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditModal;
