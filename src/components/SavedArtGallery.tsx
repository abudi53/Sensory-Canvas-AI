"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { deleteArtAction } from "@/app/actions"; // adjust the import as needed

interface SavedArt {
  id: number;
  prompt: string;
  image_url: string;
}

interface SavedArtGalleryProps {
  arts: SavedArt[];
}

const SavedArtGallery: React.FC<SavedArtGalleryProps> = ({ arts }) => {
  const { toast } = useToast();
  const [artList, setArtList] = useState<SavedArt[]>(arts);
  const [selectedArt, setSelectedArt] = useState<SavedArt | null>(arts.length > 0 ? arts[0] : null);

  const handleDelete = async (id: number) => {
    try {
      await deleteArtAction(id);
      const newList = artList.filter((art) => art.id !== id);
      setArtList(newList);
      toast({
        title: "Art deleted",
        description: "The art has been deleted successfully.",
      });
      if (selectedArt?.id === id) {
        setSelectedArt(newList.length > 0 ? newList[0] : null);
      }
    } catch (error) {
      console.error("Error deleting art:", error);
      toast({
        title: "Error deleting art",
        description: "An error occurred while deleting the art.",
        variant: "destructive",
      });
    }
  };

  const handleSelectArt = (art: SavedArt) => {
    setSelectedArt(art);
  };

  return (
    <div className="flex min-h-[80vh] w-full">
      <div>
        <ScrollArea className="h-[80vh] flex flex-col space-y-4 gap-8">
          {artList.map((art) => (
            <div
              key={art.id}
              className="relative cursor-pointer h-[130px] ml-4 mr-3 pr-1 mt-4 transition-opacity duration-300 hover:opacity-20"
              onClick={() => handleSelectArt(art)}
            >
              <Image
                src={art.image_url}
                alt={art.prompt.substring(0, 20) + "..."}
                width={150}
                height={90}
                className="object-cover w-full h-full rounded-lg"
              />
              <div className="absolute top-1 right-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => e.stopPropagation()} // don’t trigger parent onClick
                    >
                      <MoreHorizontal className="h-2 w-4" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-2 w-24">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(art.id);
                      }}
                      className="text-sm text-red-600 bg-background w-full"
                    >
                      Delete
                    </Button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>
      <div className="flex-grow-[1] flex flex-col items-center justify-center">
        {/* <h1 className="text-2xl font-semibold pt-8">Selected Art</h1> */}
        {selectedArt && (
          <>
            <Image
              src={selectedArt.image_url}
              alt={selectedArt.prompt}
              height={360}
              width={640}
              className="pt-8"
            />
            <h2 className="pt-2 text-xl mb-8">{selectedArt.prompt}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedArtGallery;
