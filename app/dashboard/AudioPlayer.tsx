import { postRequest } from "@/utils/shared";

const AudioPlayer = () => {
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];

    if (file) {
      const localAudioSrc = URL.createObjectURL(file);
      const formData = new FormData();
      formData.append("file", file)
      const response = await postRequest('spleeter', formData, false)

      console.log(response)

      if (response) {
      }
    }
  };

  return (
    <div className="text-center mt-4"><input
      type="file"
      accept="*"
      onChange={handleFileChange}
    /></div>
  )
}

export default AudioPlayer