"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import React, { useEffect, useState, useContext } from "react";
import { type CarouselApi } from "@/components/ui/carousel";
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

import { SoundButton } from "./SoundButton";
import SoundControlContext from "@/context/SoundControlContext";

export default function Hero() {
  const [api, setApi] = useState<CarouselApi>();

  const { stopAllSounds } = useContext(SoundControlContext);

  useEffect(() => {
    const handleSlideChange = () => {
      stopAllSounds();
    };

    if (!api) return;

    api.on("select", handleSlideChange);
    return () => {
      api.off("select", handleSlideChange);
    };
  }, [api, stopAllSounds]);

  return (
    <div className="flex flex-col items-center h-full pb-8">
      <h1 className="text-6xl font-bold text-foreground mt-16 mb-12">
        Check our most recent <i className="dark-melting-text">art pieces</i>
      </h1>
      <Carousel className="w-[50vw]" setApi={setApi}>
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
                <CardFooter className="flex justify-center gap-4">
                  <span className="text-lg font-semibold">
                    Old man besides a mustang
                  </span>
                  <SoundButton url="/art/sound/old-man.mp3" />
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-full items-center justify-center p-6">
                  <Image
                    alt={"Piece of art Skeletons playing poker"}
                    src={"/art/image/skeletons-playing-poker.png"}
                    width={640}
                    height={360}
                  />
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                  <span className="text-lg font-semibold">
                    Skeletons playing poker
                  </span>
                  <SoundButton url="/art/sound/skeletons.mp3" />
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-full items-center justify-center p-6">
                  <Image
                    alt={"Piece of art Happy with life"}
                    src={"/art/image/happy-with-life.png"}
                    width={640}
                    height={360}
                  />
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                  <span className="text-lg font-semibold">Happy with life</span>
                  <SoundButton url="/art/sound/happy.mp3" />
                </CardFooter>
              </Card>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="p-1">
              <Card>
                <CardContent className="flex h-full items-center justify-center p-6">
                  <Image
                    alt={"Riding back from the beach"}
                    src={"/art/image/coming-back-from-the-beach.png"}
                    width={640}
                    height={360}
                  />
                </CardContent>
                <CardFooter className="flex justify-center gap-4">
                  <span className="text-lg font-semibold">
                    Coming back from the beach
                  </span>
                  <SoundButton url="/art/sound/riding.mp3" />
                </CardFooter>
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
  );
}
