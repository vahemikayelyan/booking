import { useRef, useState } from "react";
import OptionsModal from "./OptionsModal";

const AudioPlayer = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [popupDisplay, setPopupDisplay] = useState(false);
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];

      if (file) {
        setPopupDisplay(true);
        //const localAudioSrc = URL.createObjectURL(file);
        //const formData = new FormData();
        //formData.append("file", file)
        //const response = await postRequest('spleeter', formData, false)
        //console.log(response)
      }
    }
  };

  const closePopup = () => {
    setPopupDisplay(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="text-center mt-4">
        <input
          accept="*"
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </div>
      {popupDisplay && <OptionsModal closePopup={closePopup} />}
    </>
  );
};

export default AudioPlayer;
