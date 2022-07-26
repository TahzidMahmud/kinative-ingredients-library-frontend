import AuthCard from "@/components/AuthCard";
import AuthValidationErrors from "@/components/AuthValidationErrors";
import Button from "@/components/Button";
import GuestLayout from "@/components/Layouts/GuestLayout";
import Input from "@/components/Input";
import Label from "@/components/Label";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import axios from "../../lib/axios";

const Create = ({ Concerns, SkinTypes }) => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [stage, setStage] = useState(1);
  const imageInput = useRef(null);
  const [cmntimage, setCmntimage] = useState(null);

  const [concerns, setConcerns] = useState([]);
  const [skinTypes, setSkinTypes] = useState([]);

  const [errors, setErrors] = useState([]);
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
    event.preventDefault();
    let formData = new FormData();
    formData.append("name", name);
    formData.append("concerns", JSON.stringify(concerns));
    formData.append("skinTypes", JSON.stringify(skinTypes));
    formData.append("image", cmntimage);
    axios
      .post("/api/profile", formData)
      .then((res) => {
        // setUser(res.data);
        // setStage(3);
      })
      .catch((error) => {
        setErrors(error.response.data.errors);
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
                  skinTypes.includes(skinType.id) ? ` border-blue-500` : ``
                }border flex flex-col justify-center items-center`}
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
                  concerns.includes(concern.id) ? ` border-blue-500` : ``
                }  border flex flex-col justify-center items-center`}
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

        {stage !== 3 ? (
          <div className="flex items-center justify-end mt-4">
            {stage !== 1 ? (
              <Button className="ml-4" onClick={prevStep}>
                Previous
              </Button>
            ) : (
              <></>
            )}
            <Button className="ml-4" onClick={nextStep}>
              Next
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-end mt-4">
            <Button className="ml-4" onClick={prevStep}>
              Previous
            </Button>
            <Button className="ml-4">Submit</Button>
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
