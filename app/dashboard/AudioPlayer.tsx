import { useRef, useState } from "react";
import OptionsModal from "./OptionsModal";

const AudioPlayer = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audioFile, setAudioFile] = useState<HTMLAudioElement>();
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (files) {
      const file = files[0];

      if (file) {
        const audio = new Audio(URL.createObjectURL(file));

        audio.onloadeddata = () => {
          setAudioFile(audio);
        };

        //const localAudioSrc = URL.createObjectURL(file);
        //const formData = new FormData();
        //formData.append("file", file)
        //const response = await postRequest('spleeter', formData, false)
        //console.log(response)
      }
    }
  };

  const closePopup = () => {
    setAudioFile(undefined);

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
      {audioFile && (
        <OptionsModal duration={audioFile.duration} closePopup={closePopup} />
      )}
    </>
  );
};

export default AudioPlayer;
