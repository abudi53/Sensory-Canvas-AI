"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import { Textarea } from "./ui/textarea";
import { saveArtAction, generateArtAction } from "@/app/actions";
import { useToast } from "@/hooks/use-toast";

const GenerateArtForm: React.FC = () => {
  const { toast } = useToast();
  const [prompt, setPrompt] = useState("");
  const [generatedImageBase64, setGeneratedImageBase64] = useState<
    string | null
  >(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [LoadingSave, setLoadingSave] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!prompt.trim()) {
      toast({
        title: "Invalid prompt",
        description: "Please enter a prompt to generate art.",
        variant: "destructive",
      });
      return;
    }

    setLoadingImage(true);
    setGeneratedImageBase64(null); // Clear previous image

    try {
      const response = await generateArtAction(prompt);
      setGeneratedImageBase64(response);
    } catch (err: unknown) {
      console.error("Error generating art:", err);
        toast({
          title: "Error generating art",
          description:
            err instanceof Error ? err.message : "Please, try again.",
          variant: "destructive",
        });
    } finally {
      setLoadingImage(false);
    }
  };

  const handleSaveArt = async () => {
    if (!prompt.trim() || !generatedImageBase64) {
      toast({
        title: "Invalid art",
        description: "Please generate art first.",
        variant: "destructive",
      });
      return;
    }
    setLoadingSave(true);

    try {
      const formData = new FormData();
      formData.append("prompt", prompt);
      formData.append("image_base64", generatedImageBase64);

      await saveArtAction(formData);
      toast({
        title: "Art saved!",
        description: "Your art has been saved successfully.",
      });
    } catch (err: unknown) {
      console.error("Error saving art:", err);
      if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) {
        toast({
          title: "Not signed in",
          description: "You need to sign in first.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error saving art",
          description:
            err instanceof Error
              ? err.message
              : "An unexpected error occurred.",
          variant: "destructive",
        });
      }
    } finally {
      setLoadingSave(false);
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
          disabled={loadingImage}
        >
          {loadingImage ? "Generating..." : "Generate Art"}
        </Button>
        <p>(Sound generation api still not available)</p>
      </form>
      <div>
        {loadingImage && <Skeleton className="w-full h-[50vh] rounded-xl mt-4" />}
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
            <Button className="font-bold mt-2" onClick={handleSaveArt} disabled={LoadingSave}>
              {LoadingSave ? "Saving..." : "Save Art"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default GenerateArtForm;
