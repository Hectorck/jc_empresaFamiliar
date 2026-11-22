"use client";

import React, { useState } from "react";
import { uploadLandingImage } from "../../lib/landing-db";

interface ImageUploadInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
  placeholder?: string;
  uploadPath?: string;
}

const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  value,
  onChange,
  label,
  required = false,
  placeholder = "URL de la imagen",
  uploadPath = "service",
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validar que sea una imagen
    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona un archivo de imagen válido");
      return;
    }

    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("La imagen no debe superar los 5MB");
      return;
    }

    setIsUploading(true);

    try {
      // Subir a Firebase Storage
      const url = await uploadLandingImage(file, uploadPath);
      onChange(url);
      setIsUploading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error al subir la imagen");
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium mb-2">
          {label} {required && "*"}
        </label>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 px-4 py-2 border rounded-lg"
          placeholder={placeholder}
          required={required}
        />
        <label className="px-4 py-2 bg-gray-100 border rounded-lg hover:bg-gray-200 cursor-pointer flex items-center gap-2 whitespace-nowrap">
          <span className="material-icons-round text-sm">upload</span>
          <span className="text-sm">{isUploading ? "Subiendo..." : "Subir"}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
        </label>
      </div>
      {value && (
        <div className="mt-2">
          <img
            src={value}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploadInput;
