import { postRequest } from "@/utils/shared";
import { useRef, useState } from "react";
import OptionsModal from "./OptionsModal";

const AudioPlayer = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audioFile, setAudioFile] = useState<HTMLAudioElement>();
  const [fileData, setFileData] = useState<File>();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];
      const audio = new Audio(URL.createObjectURL(file));

      audio.onloadeddata = () => {
        setAudioFile(audio);
        setFileData(file);
      };
    }
  };

  const closePopup = async (submit?: boolean) => {
    setAudioFile(undefined);

    if (submit && fileData) {
      const formData = new FormData();
      formData.append("file", fileData);
      const response = await postRequest("spleeter", formData, false);
    } else if (fileInputRef.current) {
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
      {audioFile && (
        <OptionsModal duration={audioFile.duration} closePopup={closePopup} />
      )}
    </>
  );
};

export default AudioPlayer;
