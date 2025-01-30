import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Card,
  CardContent,
  //   CardDescription,
  CardFooter,
  //   CardHeader,
  //   CardTitle,
} from "@/components/ui/card";

export default function Hero() {
  return (
    <div>
      <div className="flex flex-col items-center h-full">
        <h1 className="text-6xl font-bold text-foreground mt-16 mb-12">
          Check our most recent <i className="dark-melting-text">art pieces</i>
        </h1>
        <Carousel className="w-[50vw]">
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex h-full items-center justify-center p-6">
                    <Image
                      alt={"Piece of art Old man besides a mustang"}
                      src={"/art/image/old-man-mustang-vibrant-colors.png"}
                      width={640}
                      height={360}
                    />
                  </CardContent>
                  <CardFooter className="flex justify-center">
                    <span className="text-lg font-semibold">
                      Old man besides a mustang
                    </span>
                  </CardFooter>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-16/9 h-full items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-16/9 h-full items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-16/9 h-full items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-16/9 h-full items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Link href="/generate-art">
          <Button className="mt-4 px-4 py-2 rounded-lg">
            Generate your own art
          </Button>
        </Link>
      </div>
    </div>
  );
}
