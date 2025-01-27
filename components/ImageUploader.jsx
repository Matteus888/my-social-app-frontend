"use client"; // Utilisez "use client" si vous êtes dans Next.js 13+ avec l'App Router

import { useState } from "react";

export default function ImageUploader() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Gestion de la sélection de fichier
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    // Prévisualisation de l'image
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
    }
  };

  // Envoi de l'image au serveur
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Veuillez sélectionner un fichier !");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Image uploadée avec succès !");
      } else {
        alert("Erreur lors de l'upload.");
      }
    } catch (error) {
      console.error("Erreur :", error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleUpload}>
        <input type="file" accept="image/*" onChange={handleFileChange} className="mb-4" />
        {preview && <img src={preview} alt="Preview" className="w-32 h-32 object-cover mb-4 rounded-md" />}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
          Upload
        </button>
      </form>
    </div>
  );
}
