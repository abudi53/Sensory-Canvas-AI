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
  image_base64: string;
}

interface SavedArtGalleryProps {
  arts: SavedArt[];
}

const SavedArtGallery: React.FC<SavedArtGalleryProps> = ({ arts }) => {
  const { toast } = useToast();
  const [artList, setArtList] = useState<SavedArt[]>(arts);
  const [selectedArt, setSelectedArt] = useState<SavedArt>(arts[0]);

  const handleDelete = async (id: number) => {
    try {
      await deleteArtAction(id);
      const newList = artList.filter((art) => art.id !== id);
      setArtList(newList);
      toast({
        title: "Art deleted",
        description: "The art has been deleted successfully.",
      });
      if (selectedArt.id === id && newList.length > 0) {
        setSelectedArt(newList[0]);
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

  return (
    <div className="flex min-h-[80vh] w-full bg-zinc-900 pb-8">
      <div>
        <ScrollArea className="h-[80vh] flex flex-col space-y-4 gap-8">
          {artList.map((art) => (
            <div
              key={art.id}
              className="relative cursor-pointer h-[130px] ml-4 mr-3 pr-1 mt-4 transition-opacity duration-300 hover:opacity-20"
              onClick={() => setSelectedArt(art)}
            >
              <Image
                src={`data:image/png;base64,${art.image_base64}`}
                alt={art.prompt}
                height={130}
                width={240}
                className="object-cover"
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
        <h1 className="text-2xl font-semibold pt-8">Selected Art</h1>
        {selectedArt && (
          <>
            <Image
              src={`data:image/png;base64,${selectedArt.image_base64}`}
              alt={selectedArt.prompt}
              height={360}
              width={640}
              className="pt-8"
            />
            <h2 className="pt-2 text-xl">{selectedArt.prompt}</h2>
          </>
        )}
      </div>
    </div>
  );
};

export default SavedArtGallery;
