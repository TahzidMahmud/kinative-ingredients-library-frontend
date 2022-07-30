import AuthCard from "@/components/AuthCard";
import AuthValidationErrors from "@/components/AuthValidationErrors";
import Button from "@/components/Button";
import GuestLayout from "@/components/Layouts/GuestLayout";
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
    <GuestLayout>
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
          } flex flex-col justify-center items-center`}
        >
          <Label htmlFor="name" className="text-xl">
            Select Skin Type
          </Label>

          <div className="grid grid-cols-2 gap-4 m-6">
            {SkinTypes.map((skinType, index) => (
              <div
                key={index}
                className={`${
                  skinTypes.includes(skinType.id)
                    ? `border-2 border-blue-500 rounded-xl bg-blue-300`
                    : ``
                }border flex flex-col justify-center items-center p-3`}
                onClick={() => {
                  setSkinTypes([...skinTypes, skinType.id]);
                }}
              >
                <Image
                  loader={() => {
                    return skinType.image != null
                      ? skinType.image
                      : "/avatar.PNG";
                  }}
                  src={skinType.image != null ? skinType.image : "/avatar.PNG"}
                  alt={skinType.name}
                  width={60}
                  height={60}
                  className="py-4"
                />
                {skinType.name}
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
          <Label htmlFor="name" className="text-xl">
            Select Concern
          </Label>

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
                <Image
                  loader={() => {
                    return concern.image != null
                      ? concern.image
                      : "/avatar.PNG";
                  }}
                  src={concern.image != null ? concern.image : "/avatar.PNG"}
                  alt={concern.name}
                  width={60}
                  height={60}
                  className="py-4"
                />
                {concern.name}
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

        {stage !== 4 ? (
          <div className="flex items-center justify-end mt-4">
            {stage !== 1 ? (
              <Button className="ml-4" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <></>
            )}
            {(stage == 1 && cmntimage != null) ||
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
            <Button className="ml-4" onClick={submitForm}>
              Submit
            </Button>
          </div>
        )}
        {/* </form> */}
      </AuthCard>
    </GuestLayout>
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
