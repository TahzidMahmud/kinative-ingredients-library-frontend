import { useState, useRef } from "react";
import Button from "@/components/Button";
import ReviewStar from "@/components/ReviewStar";
import Label from "@/components/Label";
import Link from "next/link";
import axios from "../lib/axios";
import Image from "next/image";
import Toaster from "@/components/Toaster";

const ReviewModal = ({ user, product, show, closeModal, addReview }) => {
  const [stage, setStage] = useState(1);
  const [pros, setPros] = useState(null);
  const [cons, setCons] = useState(null);
  const [using, setUsing] = useState(0);
  const [unit, setuinit] = useState("day");
  const [inactiverating, setInactiverating] = useState(5);
  const [rating, setRating] = useState(0);
  const imageInput = useRef(null);
  const [cmntimagereview, setCmntimagereview] = useState(null);

  function nextStep() {
    let prevStage = stage;
    setStage((prevStage) => prevStage + 1);
  }
  function prevStep() {
    let prevStage = stage;
    setStage((prevStage) => prevStage - 1);
  }
  function setStars(rating) {
    setRating(rating);
    setInactiverating(5 - rating);
  }
  function convertImage() {
    var reader = new FileReader();
    var url = reader.readAsDataURL(imageInput.current.files[0]);
    reader.onloadend = function (e) {
      setCmntimagereview(reader.result);
    };
  }
  function submitForm() {
    let formData = new FormData();
    formData.append("user_id", user.id);
    formData.append("product_id", product.id);
    formData.append("rating", rating);
    if (unit === "day") {
      setUsing(using);
    } else if (unit === "month") {
      setUsing(using * 30);
    } else {
      setUsing(using * 365);
    }

    formData.append("days_used", using);
    formData.append("liking_factors", pros);
    formData.append("disliking_facotrs", cons);
    formData.append("image", cmntimagereview);
    formData.append("imgname", imageInput.current.value);
    formData.append("likes", 0);
    formData.append("dislikes", 0);
    axios
      .post("/api/reviews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.data.success) {
          addReview(res.data.review);
          Toaster.notify(res.data.message, { type: "success" });
          closeModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <div
        className={`${
          show ? "active" : "hidden"
        }  bg-black w-screen h-screen opacity-90 absolute top-0 left-0 z-10`}
      ></div>

      <div
        id="authentication-modal"
        tabIndex="-1"
        className={`${
          show ? "active" : "hidden"
        } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex justify-center items-center `}
        aria-modal="true"
        role="dialog"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow ">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              data-modal-toggle="authentication-modal"
              onClick={closeModal}
            >
              <Image
                className="rounded-full"
                src="/icons8-close.svg"
                alt="logo"
                width={12}
                height={12}
              />
              <span className="sr-only">Close modal</span>
            </button>
            {/* what u like section  */}
            {stage === 1 ? (
              <div className="py-6 px-6 lg:px-8 lg:py-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 mt-3 ">
                  What you liked about the product?
                </h3>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full w-[100%] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write What you liked..."
                  onChange={(e) => setPros(e.target.value)}
                >
                  {pros}
                </textarea>
              </div>
            ) : (
              <></>
            )}
            {/* what u like section  */}
            {stage === 2 ? (
              <div className="py-6 px-6 lg:px-8 lg:py-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 mt-3 ">
                  What you disliked about the product?
                </h3>
                <textarea
                  id="message"
                  rows="4"
                  className="block p-2.5 w-full  w-[100%]  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write What you disliked..."
                  onChange={(e) => setCons(e.target.value)}
                >
                  {cons}
                </textarea>
              </div>
            ) : (
              <></>
            )}
            {/* How Long using  */}
            {stage === 3 ? (
              <div className="py-6 px-6 lg:px-8 lg:py-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 mt-3 ">
                  How long have you been using this product?
                </h3>
                <div className="flex">
                  <div>
                    <input
                      type="number"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setUsing(e.target.value)}
                      value={using}
                    />
                  </div>
                  <div>
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      onChange={(e) => setuinit(e.target.value)}
                    >
                      <option value={`day`}>Days</option>
                      <option value={`month`}>Months</option>
                      <option value={`year`}>Years</option>
                    </select>
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            {/* cover image stage*/}
            <div
              className={`${
                stage == 4 ? "active" : "hidden"
              } flex flex-col justify-center items-center p-10`}
            >
              <Label htmlFor="name" className="text-xl font-medium ">
                Upload An Image For Review
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
                  width={25}
                  height={25}
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
            {cmntimagereview != null && stage == 4 ? (
              <div className="mx-2 my-2 flex items-center justify-between px-6">
                <Image
                  loader={() => cmntimagereview}
                  src={cmntimagereview}
                  alt={`profile-image`}
                  width={150}
                  height={150}
                  className="py-6 border border-red-400 rounded-lg m-1"
                />
                <div
                  className="bg-white text-black md:p-4 sm:p-3 h-6 w-6 rounded-2xl flex justify-center items-center"
                  onClick={() => {
                    setCmntimagereview(null);
                  }}
                >
                  <span>x</span>
                </div>
              </div>
            ) : (
              <></>
            )}
            {/*rating  */}
            {stage === 5 ? (
              <div className="flex items-center justify-center">
                <div className="py-6 px-6 lg:px-8 lg:py-8">
                  <h3 className="mb-4 text-xl font-medium text-gray-900 mt-3 ">
                    Rate this product?
                  </h3>
                  <div className="flex">
                    <ReviewStar
                      rating={inactiverating}
                      starWidth={`30`}
                      starHeight={`30`}
                      setRating={setStars}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div className="py-4 px-6">
              {stage !== 5 ? (
                <div className="flex items-center justify-end mt-4">
                  {stage !== 1 ? (
                    <Button className="ml-4" onClick={prevStep}>
                      Previous
                    </Button>
                  ) : (
                    <></>
                  )}

                  {(stage == 1 && pros != null) ||
                  (stage == 2 && cons != null) ||
                  (stage == 3 && using != 0) ||
                  (stage == 4 && cmntimagereview != null) ? (
                    <Button className="ml-4" onClick={nextStep}>
                      Next
                    </Button>
                  ) : (
                    <Button className="ml-4" disabled>
                      Next
                    </Button>
                  )}
                </div>
              ) : (
                <div className="flex items-center justify-end mt-4">
                  <Button className="ml-4" onClick={prevStep}>
                    Previous
                  </Button>
                  {rating > 0 ? (
                    <Button className="ml-4" onClick={submitForm}>
                      Submit
                    </Button>
                  ) : (
                    <Button className="ml-4" disabled>
                      Submit
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
