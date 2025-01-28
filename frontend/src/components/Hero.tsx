import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  //   CardDescription,
  //   CardFooter,
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
        <Carousel>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-4xl font-semibold">
                        {index + 1}
                      </span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <p className="text-xl text-foreground">
          A sensory audiovisual canvas for AI-generated art
        </p>
        <Button className="mt-4 px-4 py-2 rounded-lg">Get started</Button>
      </div>
    </div>
  );
}
