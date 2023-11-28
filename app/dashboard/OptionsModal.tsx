import Button from "@/components/Button";
import CloseIcon from "@/components/CloseIcon";
import RangeSlider from "@/components/RangeSlider";
import { useState } from "react";

interface OptionsModalProps {
  duration: number;
  closePopup: (submit?: boolean) => void;
}

const OptionsModal = ({ duration, closePopup }: OptionsModalProps) => {
  const [uploadState, setUploadState] = useState("no");
  const handleStateChange = (event: any) => {
    setUploadState(event.target.value);
  };

  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  const ms = Math.floor((duration % 1) * 1000);

  return (
    <>
      <div className="fixed z-50 justify-center items-center w-full flex">
        <div className="relative bg-white rounded-lg shadow w-[40%] max-h-full">
          <CloseIcon onClick={closePopup} />

          <div className="p-4 md:p-5">
            <svg
              className="h-[35px] mb-4 text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 16 20"
            >
              <path d="M15 5a1 1 0 0 0-1 1v3a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V6a1 1 0 0 0-2 0v3a6.006 6.006 0 0 0 6 6h1v2H5a1 1 0 0 0 0 2h6a1 1 0 0 0 0-2H9v-2h1a6.006 6.006 0 0 0 6-6V6a1 1 0 0 0-1-1Z" />
              <path d="M9 0H7a3 3 0 0 0-3 3v5a3 3 0 0 0 3 3h2a3 3 0 0 0 3-3V3a3 3 0 0 0-3-3Z" />
            </svg>

            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Do you want to remove vocals from this song?
            </h3>

            <ul className="mb-4 w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex">
              <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r">
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
              <li className="w-full">
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

            <div className="mb-2">
              Duration:{" "}
              <b>
                {minutes} min, {seconds} sec
              </b>
            </div>

            <div className="h-8">
              <RangeSlider
                min={0}
                max={minutes * 60 + seconds}
                isDisabled={uploadState === "no"}
                onChange={({ min, max }) => {}}
              />
            </div>

            <div className="flex items-center mt-4 space-x-2 rtl:space-x-reverse">
              <Button type="blue" onClick={() => closePopup(true)}>
                Submit
              </Button>
              <Button onClick={closePopup}>Cancel</Button>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-900/50 fixed inset-0 z-40"></div>
    </>
  );
};

export default OptionsModal;
