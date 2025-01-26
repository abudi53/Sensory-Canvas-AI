"use client";

import React, { useState } from "react";
import axios from "axios";
import { getBackendApiUrl } from "@/lib/utils"; // Adjust path if needed
import Image from "next/image";

// interface GenerateArtFormProps {
//   // You can define props if needed, but in this case, we don't need any props passed from the parent SSR page
// }

const GenerateArtForm: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [generatedImageBase64, setGeneratedImageBase64] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!prompt.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImageBase64(null); // Clear previous image

    try {
      const baseUrl = getBackendApiUrl();
      const response = await axios.post(`${baseUrl}/generate-image/`, {
        prompt,
      });

      if (response.status === 200) {
        setGeneratedImageBase64(response.data.image); // Assuming backend returns image_base64
        // You might also receive sound_url here and handle it similarly
      } else {
        setError(`Error generating art. Status: ${response.status}`);
      }
    } catch (e) {
      console.error("Error during API request:", e);
      setError("Failed to generate art. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label
            htmlFor="prompt"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Enter your prompt:
          </label>
          <input
            type="text"
            id="prompt"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="e.g., A futuristic cityscape at sunset"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Art"}
        </button>
      </form>
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline ml-1">{error}</span>
        </div>
      )}
      {loading && <p>Generating art... please wait.</p>}
      {generatedImageBase64 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Generated Image:</h2>
          <Image
            src={`data:image/png;base64,${generatedImageBase64}`}
            alt="Generated AI Art"
            className="max-w-full h-auto rounded-lg shadow-md"
            width={800}
            height={800}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateArtForm;
