import { postRequest } from "@/utils/shared";
import { useRef, useState } from "react";
import OptionsModal from "./OptionsModal";

const AudioPlayer = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audioFile, setAudioFile] = useState<HTMLAudioElement>();
  const [isUploading, setIsUploading] = useState<boolean>();
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
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", fileData);
      const response = await postRequest("spleeter", formData, false);
      setIsUploading(false);

      if (response.ok) {
      }
    } else if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <div className="text-center mt-4">
        {!isUploading ? (
          <input
            accept="*"
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        ) : (
          <span>Please wait, file is being processed...</span>
        )}
      </div>
      {audioFile && (
        <OptionsModal duration={audioFile.duration} closePopup={closePopup} />
      )}
    </>
  );
};

export default AudioPlayer;
