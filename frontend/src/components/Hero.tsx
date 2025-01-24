import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
    <div className="animated-background h-full bg-gradient-to-r from-violet-950 via-blue-950 to-indigo-900">
      <div className="flex flex-col items-center h-full">
        <h1 className="text-6xl font-bold text-white mt-32 mb-24">
          Check our most recent <i>art pieces</i>
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
        <p className="text-xl text-white">
          A sensory audiovisual canvas for AI-generated art
        </p>
        <button className="mt-4 px-4 py-2 text-white bg-blue-500 rounded-lg">
          Get started
        </button>
      </div>
    </div>
  );
}
