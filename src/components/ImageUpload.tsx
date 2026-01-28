import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function ImageUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    setMessage(null);

    // Define file path in Supabase bucket
    const fileExt = file.name.split(".").pop();
    const filePath = `images/${Date.now()}.${fileExt}`;

    const { data, error } = await supabase.storage
      .from("Xpert Institute - Storage")
      .upload(filePath, file, { cacheControl: "3600", upsert: true });

    setUploading(false);

    if (error) {
      console.error("Upload error:", error.message);
      setMessage("Failed to upload image.");
    } else {
      setMessage("Image uploaded successfully!");
      console.log("Supabase file data:", data);
      setFile(null);
      setPreview(null);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        Upload Image
      </h2>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 w-full border border-gray-300 p-2 rounded"
      />

      {preview && (
        <div className="mb-4">
          <p className="text-gray-700 mb-2">Preview:</p>
          <img
            src={preview}
            alt="preview"
            className="w-full h-48 object-contain border rounded"
          />
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={!file || uploading}
        className={`w-full py-2 px-4 rounded text-white font-medium transition-colors ${
          uploading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      {message && (
        <p className="mt-4 text-center text-gray-700">{message}</p>
      )}
    </div>
  );
}
