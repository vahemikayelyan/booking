import { useState } from "react";

interface OptionsModalProps {
  closePopup: () => void;
}

const OptionsModal = ({ closePopup }: OptionsModalProps) => {
  const [uploadState, setUploadState] = useState("no");
  const handleStateChange = (event: any) => {
    setUploadState(event.target.value);
  };

  return (
    <>
      <div
        id="progress-modal"
        aria-hidden="true"
        className="fixed z-50 justify-center items-center w-full flex"
      >
        <div className="relative p-4 w-[40%] max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <button
              type="button"
              onClick={() => closePopup()}
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5">
              <svg
                className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 16 20"
              >
                <path d="M8 5.625c4.418 0 8-1.063 8-2.375S12.418.875 8 .875 0 1.938 0 3.25s3.582 2.375 8 2.375Zm0 13.5c4.963 0 8-1.538 8-2.375v-4.019c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353c-.193.081-.394.158-.6.231l-.189.067c-2.04.628-4.165.936-6.3.911a20.601 20.601 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244c-.053-.028-.113-.053-.165-.082v4.019C0 17.587 3.037 19.125 8 19.125Zm7.09-12.709c-.193.081-.394.158-.6.231l-.189.067a20.6 20.6 0 0 1-6.3.911 20.6 20.6 0 0 1-6.3-.911l-.189-.067a10.719 10.719 0 0 1-.852-.34 8.08 8.08 0 0 1-.493-.244C.112 6.035.052 6.01 0 5.981V10c0 .837 3.037 2.375 8 2.375s8-1.538 8-2.375V5.981c-.052.029-.112.054-.165.082a8.08 8.08 0 0 1-.745.353Z" />
              </svg>
              <h3 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
                Do you want to remove vocals from this song?
              </h3>
              <ul className="my-3 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
                <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-license"
                      type="radio"
                      value="no"
                      name="upload_state"
                      onChange={handleStateChange}
                      checked={uploadState === "no"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="horizontal-list-radio-license"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                    >
                      No
                    </label>
                  </div>
                </li>
                <li className="w-full dark:border-gray-600">
                  <div className="flex items-center ps-3">
                    <input
                      id="horizontal-list-radio-passport"
                      type="radio"
                      value="yes"
                      name="upload_state"
                      onChange={handleStateChange}
                      checked={uploadState === "yes"}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
                    />
                    <label
                      htmlFor="horizontal-list-radio-passport"
                      className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                    >
                      Yes
                    </label>
                  </div>
                </li>
              </ul>
              <div className="flex justify-between mb-1 text-gray-500 dark:text-gray-400">
                <span className="text-base font-normal">Progress</span>
                <span className="text-sm font-semibold text-gray-900">
                  25 of 100% processed
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-orange-500 h-2.5 rounded-full w-[25%]"></div>
              </div>
              <div className="flex items-center mt-6 space-x-2 rtl:space-x-reverse">
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => closePopup()}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        modal-backdrop=""
        className="bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40"
      ></div>
    </>
  );
};

export default OptionsModal;
