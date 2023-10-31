"use client";

import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      alert("Please upload a PDF file.");
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("pdf", file);

    try {
      const response = await fetch("api/auth/pdf", {
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      });

      if (response.status === 200) {
        alert("File uploaded successfully.");
      } else {
        alert("Failed to upload file.");
      }
    } catch (error) {
      console.error("There was an error uploading the file:", error);
    }
  };

  return (
    <div>
      <h1>Upload a PDF File</h1>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
