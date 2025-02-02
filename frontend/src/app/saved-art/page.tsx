import { ScrollArea } from "@/components/ui/scroll-area";
import { getSavedArtAction } from "../actions";
import Image from "next/image";

interface SavedArt {
  id: number;
  prompt: string;
  image_base64: string;
}

export default async function SavedArtPage() {
  const arts = await getSavedArtAction();

  return (
    <div className="container flex min-h-[80vh]">
      <div className="flex-1">
        <ScrollArea className="h-[80vh] flex flex-col space-y-4 gap-8">
          {arts.map((art: SavedArt) => (
            <div
              key={art.id}
              className="h-[130px] ml-4 mr-6 mt-4 transition-opacity duration-300 hover:opacity-20"
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
      <div className="flex-grow-[4]"></div>
    </div>
  );
}
