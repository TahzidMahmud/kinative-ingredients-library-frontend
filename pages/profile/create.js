import AuthCard from "@/components/AuthCard";
import AuthValidationErrors from "@/components/AuthValidationErrors";
import Button from "@/components/Button";
import AppLayout from "@/components/Layouts/AppLayout";

import Label from "@/components/Label";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "../../lib/axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRouter } from "next/router";

const Create = ({ Concerns, SkinTypes }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [gender, setGender] = useState(null);

  const [datechange, setDatechange] = useState(null);

  const [stage, setStage] = useState(1);
  const imageInput = useRef(null);
  const [cmntimage, setCmntimage] = useState(null);

  const [concerns, setConcerns] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);
  const [birthtDate, setBirthtDate] = useState(new Date());
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
  if (user == null) {
    axios
      .get("/api/user")
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => {
        if (error.response.status !== 409) throw error;
      });
  }
  function convertImage() {
    var reader = new FileReader();
    var url = reader.readAsDataURL(imageInput.current.files[0]);
    reader.onloadend = function (e) {
      setCmntimage(reader.result);
    };
  }
  function nextStep() {
    let prevStage = stage;
    setStage((prevStage) => prevStage + 1);
  }
  function prevStep() {
    let prevStage = stage;
    setStage((prevStage) => prevStage - 1);
  }
  const submitForm = (event) => {
    // event.preventDefault();
    let formData = new FormData();
    formData.append("userid", user.id);
    formData.append("concerns", JSON.stringify(concerns));
    formData.append("skinTypes", JSON.stringify(skinTypes));
    formData.append("birth_date", Math.floor(birthtDate.getTime() / 1000));
    formData.append("image", cmntimage);
    formData.append("gender", gender);

    formData.append("imgname", imageInput.current.value);

    axios
      .post("/api/profiles", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          router.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AppLayout>
      <AuthCard
        logo={
          <Link href="/">
            <a>
              <Image
                className="rounded-t-lg"
                src="/logo.svg"
                alt="logo"
                width={250}
                height={50}
              />
            </a>
          </Link>
        }
      >
        {/* Validation Errors */}
        <AuthValidationErrors className="mb-4" errors={errors} />

        {/* <form onSubmit={submitForm}> */}
        {/* cover image stage*/}
        <div
          className={`${
            stage == 1 ? "active" : "hidden"
          } flex flex-col justify-center items-center`}
        >
          <Label htmlFor="name" className="text-2xl font-bold">
            Upload Profile Image
          </Label>

          <button
            type="button"
            className="inline-flex justify-center p-2 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
            htmlFor="imageInput"
            onClick={() => imageInput.current.click()}
          >
            <Image
              src="/icons8-picture.svg"
              alt="logo"
              width={60}
              height={60}
              className="rounded-t-lg py-6"
            />
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
        {cmntimage != null && stage == 1 ? (
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

        {/* skin type stage */}
        <div
          className={`${
            stage == 2 ? "active" : "hidden"
          } flex flex-col justify-center items-center `}
        >
          <Label htmlFor="name" className="text-2xl font-bold">
            Select Skin Type
          </Label>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 m-6">
            {SkinTypes.map((skinType, index) => (
              <div
                key={index}
                className={`${
                  skinTypes.includes(skinType.id)
                    ? `border-2 border-blue-500 rounded-xl bg-blue-300`
                    : ``
                }border  p-3 bg-gray-100`}
                onClick={() => {
                  setSkinTypes([skinType.id]);
                }}
              >
                <div className="flex flex-col justify-center">
                  <Image
                    loader={() => {
                      return skinType.image != null
                        ? skinType.image
                        : "/avatar.PNG";
                    }}
                    src={
                      skinType.image != null ? skinType.image : "/avatar.PNG"
                    }
                    alt={skinType.name}
                    width={150}
                    height={150}
                    className="py-4 rounded-full"
                  />
                  <div className="flex items-center justify-center text-center p-2 my-2 bg-gray-200 rounded-md">
                    {" "}
                    {skinType.name}
                  </div>
                  <div className="flex items-center justify-center text-center md:text-sm text-xs">
                    {skinType.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* concern stage */}
        <div
          className={`${
            stage == 3 ? "active" : "hidden"
          } flex flex-col justify-center items-center`}
        >
          <Label htmlFor="name" className="text-2xl font-bold">
            Select Concern
          </Label>

          <div className="grid md:grid-cols-3 grid-cols-2 gap-4 m-6">
            {Concerns.map((concern, index) => (
              <div
                key={index}
                id={`con-${concern.id}`}
                className={`
                rounded-xl border p-3 bg-gray-100`}
                onClick={() => {
                  if (concerns.includes(concern.id)) {
                    let arr = concerns;
                    arr.splice(1, arr.indexOf(concern.id));
                    let elm = document.getElementById(`con-${concern.id}`);
                    elm.classList.remove("border-2");
                    elm.classList.remove("border-blue-500");
                    setConcerns(arr);
                  } else {
                    let elm = document.getElementById(`con-${concern.id}`);
                    elm.classList.add("border-2");
                    elm.classList.add("border-blue-500");
                    setConcerns([...concerns, concern.id]);
                  }
                }}
              >
                <div className="flex flex-col justify-center overflow-x-hidden">
                  <Image
                    loader={() => {
                      return concern.image != null
                        ? concern.image
                        : "/avatar.PNG";
                    }}
                    src={concern.image != null ? concern.image : "/avatar.PNG"}
                    alt={concern.name}
                    width={150}
                    height={150}
                    className="py-4 rounded-full"
                  />
                  <div className="flex items-center justify-center text-center p-2 my-2 bg-gray-200 rounded-md">
                    {" "}
                    {concern.name}
                  </div>
                  <div className="flex items-center justify-center text-center  md:text-sm text-xs px-1.5 ">
                    {concern.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* birth date  */}
        <div
          className={`${
            stage == 4 ? "active" : "hidden"
          } flex flex-col justify-center items-center`}
        >
          <Label htmlFor="name" className="text-2xl font-bold">
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
                    onChange={({ target: { value } }) => changeYear(value)}
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
        </div>
        {/* Select Gender stage */}
        <div
          className={`${
            stage == 5 ? "active" : "hidden"
          } flex flex-col justify-center items-center `}
        >
          <Label htmlFor="name" className="text-2xl font-bold">
            Select Gender
          </Label>

          <div className="grid grid-cols-2 gap-4 m-6">
            <div
              className={`${
                gender == "male"
                  ? `border-2 border-blue-500 rounded-xl bg-blue-300`
                  : ``
              }border  p-3 bg-gray-100`}
              onClick={() => {
                setGender("male");
              }}
            >
              <div className="flex flex-col justify-center">
                <Image
                  src="/male-user.svg"
                  alt="male"
                  width={150}
                  height={150}
                  className="py-4 rounded-full"
                />
                <div className="flex items-center justify-center text-center p-2 my-2 bg-gray-200 rounded-md">
                  {" "}
                  Male
                </div>
              </div>
            </div>
            <div
              className={`${
                gender == "female"
                  ? `border-2 border-blue-500 rounded-xl bg-blue-300`
                  : ``
              }border  p-3 bg-gray-100`}
              onClick={() => {
                setGender("female");
              }}
            >
              <div className="flex flex-col justify-center">
                <Image
                  src="/female-user.svg"
                  alt="male"
                  width={150}
                  height={150}
                  className="py-4 rounded-full"
                />
                <div className="flex items-center justify-center text-center p-2 my-2 bg-gray-200 rounded-md">
                  {" "}
                  Female
                </div>
              </div>
            </div>
          </div>
        </div>
        {stage !== 5 ? (
          <div className="flex items-center justify-end mt-4">
            {stage !== 1 ? (
              <Button className="ml-4" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <></>
            )}
            {stage == 1 ||
            (stage == 2 && skinTypes.length != 0) ||
            (stage == 3 && concerns.length != 0) ||
            (stage == 4 && datechange == true) ? (
              <Button className="ml-4" onClick={nextStep}>
                Next
              </Button>
            ) : (
              <Button className="ml-4" disabled onClick={nextStep}>
                Next
              </Button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-end mt-4">
            <Button className="ml-4" onClick={prevStep}>
              Previous
            </Button>
            {gender != null ? (
              <Button className="ml-4" onClick={submitForm}>
                Submit
              </Button>
            ) : (
              <></>
            )}
          </div>
        )}
        {/* </form> */}
      </AuthCard>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
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
      SkinTypes: skinTypes.data,
    },
  };
}

export default Create;
