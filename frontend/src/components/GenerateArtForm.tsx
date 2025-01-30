"use client";

import React, { useState } from "react";
import axios from "axios";
import { getBackendApiUrl } from "@/lib/utils"; // Adjust path if needed
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";

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
    <div className="grid grid-cols-2 gap-8 justify-center h-screen">
      <form onSubmit={handleSubmit} className="mb-4 mt-4">
        <div className="mb-4">
          <label
            htmlFor="prompt"
            className="block text-foreground text-lg font-semibold mb-2"
          >
            Enter your prompt:
          </label>
          <Textarea
            id="prompt"
            className="bg-input text-foreground shadow appearance-none border rounded w-full py-2 px-3 leading-tight resize-none outline-none"
            placeholder="e.g., A futuristic cityscape at sunset"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
        <Button
          type="submit"
          className="bg-primary font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Art"}
        </Button>
      </form>
      <div>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline ml-1">{error}</span>
          </div>
        )}
        {loading && <Skeleton className="w-full h-[50vh] rounded-xl mt-4" />}
        {generatedImageBase64 && (
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-2">Generated Image:</h2>
            <Image
              src={`data:image/png;base64,${generatedImageBase64}`}
              alt="Generated AI Art"
              className="max-w-full h-auto shadow-md"
              width={1280}
              height={720}
            />
            <Button className="font-bold mt-2">Save Art</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateArtForm;
