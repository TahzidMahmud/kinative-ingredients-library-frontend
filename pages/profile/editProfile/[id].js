import Input from "@/components/Input";
import { useEffect, useState, useRef } from "react";
import Label from "@/components/Label";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "../../../lib/axios";
import AppLayout from "@/components/Layouts/AppLayout";
import { useRouter } from "next/router";
import Toaster from "@/components/Toaster";

const ProfileEditModal = ({ profile, Concerns, Skintypes }) => {
  //   console.log(Skintypes);
  const [cmntimage, setCmntimage] = useState(null);
  const router = useRouter();

  const [name, setName] = useState(profile.user.name);
  const [email, setEmail] = useState(
    profile.user.email == null ? "not given" : profile.user.email
  );
  const [phone, setPhone] = useState(profile.user.phone);
  const [concerns, setConcerns] = useState([
    profile.concern.data.length > 0 ? profile.concern.data[0].id : null,
  ]);
  const [skinTypes, setSkinTypes] = useState([
    profile.skin_type.data.length > 0 ? profile.skin_type.data[0].id : null,
  ]);
  const [allSkinTypes, setAllSkinTypes] = useState(Skintypes);
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
    var aScript = document.createElement("script");
    aScript.type = "text/javascript";
    aScript.src =
      "https://cdn.jsdelivr.net/npm/tw-elements/dist/js/index.min.js";
    document.head.appendChild(aScript);
  }, []);
  function convertImage() {
    var reader = new FileReader();
    var url = reader.readAsDataURL(imageInput.current.files[0]);
    if (imageInput.current.files[0].size < 5245329) {
      reader.onloadend = function (e) {
        setCmntimage(reader.result);
      };
    } else {
      Toaster.notify("Image Size Must Be Smaller Than 5MB", { type: "error" });
    }
  }
  function submitForm(event) {
    event.preventDefault();
    let formData = new FormData();
    formData.append("concerns", JSON.stringify(concerns));
    formData.append("skinTypes", JSON.stringify(skinTypes));
    formData.append("birth_date", Math.floor(birthtDate.getTime() / 1000));
    formData.append("name", name.toString());
    formData.append("email", email.toString());
    formData.append("phone", phone.toString());
    formData.append("image", cmntimage);
    formData.append(
      "imgname",
      imageInput.current.value ? imageInput.current.value : null
    );

    axios
      .post(`/api/profiles/${profile.id}/update`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          Toaster.notify(res.data.message, { type: "success" });
          router.push(`/profile/${profile.user.id}`);
          // location.reload();
        } else {
          Toaster.notify(res.data.message, { type: "error" });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <AppLayout>
      <div
        className={` w-full  bg-white rounded-lg border border-gray-200 shadow-md  my-10`}
      >
        <div className="py-2 w-full px-6 lg:px-8 ">
          <div className="p-4">
            <h3 className="text-lg font-bold text-gray-900 text-center p-1">
              Edit Profile
            </h3>
            <hr></hr>
            <div className="">
              <div>
                <label className="block mb-2 text-md font-semibold pt-1 text-gray-900">
                  Your Name
                </label>
                <Input
                  type="text"
                  value={name}
                  className="block  w-[100%]"
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
                  className="block mt-1 w-[100%]"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="">
                <label className="block mb-2 text-md font-semibold pt-1 text-gray-900">
                  Your Phone
                </label>
                <Input
                  type="text"
                  value={phone}
                  className="block mt-1 w-[100%]"
                  onChange={(event) => setPhone(event.target.value)}
                  required
                  autoFocus
                />
              </div>
              {/* skin type stage */}
              <div className={`flex flex-col justify-center items-center`}>
                <label className="block mb-2 text-md font-semibold pt-1 text-gray-900">
                  Skin Type
                </label>

                <div className="grid grid-cols-1 gap-4 m-2 w-[100%]">
                  <select
                    // value={skinTypes[0]}

                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    {allSkinTypes?.map((skinType, index) => (
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
              <div className={` flex flex-col justify-center items-center`}>
                <label className="block mb-2 text-md font-semibold text-gray-900">
                  Concerns
                </label>

                <div className="grid grid-cols-2 gap-4 m-2 ">
                  {Concerns.map((concern, index) => (
                    <div
                      key={index}
                      className={`${
                        concerns.includes(concern.id)
                          ? `border-2 border-blue-500 rounded-xl `
                          : ``
                      }  border flex flex-col justify-center items-center p-2`}
                      onClick={() => {
                        setConcerns([...concerns, concern.id]);
                      }}
                    >
                      {concern.name}
                    </div>
                  ))}
                </div>
              </div>
              <div className={`flex flex-col justify-center items-center`}>
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
                  className={`flex flex-col justify-center items-center my-2`}
                >
                  <Label htmlFor="name" className="text-xl">
                    Upload Profile Image
                  </Label>
                  <small className="text-red-500">
                    (Must Be Smaller than 5MB)
                  </small>

                  <button
                    type="button"
                    className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
                    htmlFor="imageInput"
                    onClick={() => imageInput.current.click()}
                  >
                    <Image
                      src="/icons8-picture.svg"
                      alt="logo"
                      width={45}
                      height={45}
                      className="rounded-t-lg py-6"
                    />
                    <span className="sr-only">Upload image </span>
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

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                  onClick={submitForm}
                >
                  Update Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const id = params.id;
  const profile = await axios
    .get(`/api/profiles/${id}`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  const concerns = await axios
    .get("/api/concerns")
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));
  const skinTypes = await axios
    .get("/api/skin-types")
    .then((response) => {
      return response.data;
    })
    .catch((error) => console.log(error));

  return {
    props: {
      Concerns: concerns.data,
      Skintypes: skinTypes.data,
      profile: profile.data,
    },
  };
}

export default ProfileEditModal;
