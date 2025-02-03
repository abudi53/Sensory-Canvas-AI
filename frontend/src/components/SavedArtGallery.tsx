"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SavedArt {
  id: number;
  prompt: string;
  image_base64: string;
}

interface SavedArtGalleryProps {
  arts: SavedArt[];
}

const SavedArtGallery: React.FC<SavedArtGalleryProps> = ({ arts }) => {
  const [selectedArt, setSelectedArt] = useState<SavedArt>(arts[0]);

  return (
    <div className="flex min-h-[80vh] w-full bg-zinc-900 pb-8">
      <div>
        <ScrollArea className="h-[80vh] flex flex-col space-y-4 gap-8">
          {arts.map((art) => (
            <div
              key={art.id}
              className="cursor-pointer h-[130px] ml-4 mr-3 mt-4 transition-opacity duration-300 hover:opacity-20"
              onClick={() => setSelectedArt(art)}
            >
              <Image
                src={`data:image/png;base64,${art.image_base64}`}
                alt={art.prompt}
                height={130}
                width={240}
                className="object-cover"
              />
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-grow-[1] flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold pt-8">Selected Art</h1>
        <Image
          src={`data:image/png;base64,${selectedArt.image_base64}`}
          alt={selectedArt.prompt}
          height={360}
          width={640}
          className="pt-8"
        />
        <h2 className="pt-2 text-xl">{selectedArt.prompt}</h2>
      </div>
    </div>
  );
};

export default SavedArtGallery;
