'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const testimonials = [
  {
    name: 'Sarah L.',
    role: 'CEO, Tech Startup',
    quote: "Landing Spark is a game-changer. We were able to generate and deploy a high-quality landing page for our new feature in just an afternoon. The AI-generated copy was surprisingly good!",
    avatarId: 'testimonial-1'
  },
  {
    name: 'Mike R.',
    role: 'Marketing Manager',
    quote: "I'm not a designer, but with Landing Spark, I feel like one. The templates are beautiful and easy to customize. Our conversion rates have seen a significant bump since we switched.",
    avatarId: 'testimonial-2'
  },
  {
    name: 'Jane D.',
    role: 'Freelance Designer',
    quote: "This tool has supercharged my workflow. I can quickly prototype ideas and get client feedback faster than ever. The AI suggestions are a great starting point for my designs.",
    avatarId: 'testimonial-3'
  },
];


export function TestimonialsSection() {
  return (
    <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Testimonials</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Loved by Teams Worldwide</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              See what our customers are saying about how Landing Spark has transformed their marketing efforts.
            </p>
          </div>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto mt-12"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => {
              const avatar = PlaceHolderImages.find(p => p.id === testimonial.avatarId);
              return (
              <CarouselItem key={testimonial.name} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2 h-full">
                  <Card className="flex flex-col h-full justify-between shadow-md rounded-lg">
                    <CardContent className="p-6 space-y-4 flex flex-col flex-grow">
                      <p className="text-base italic flex-grow">"{testimonial.quote}"</p>
                      <div className="flex items-center gap-4 pt-4 border-t">
                        <Avatar>
                          {avatar && (
                            <AvatarImage src={avatar.imageUrl} alt={avatar.description} data-ai-hint={avatar.imageHint} />
                          )}
                          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )})}
          </CarouselContent>
          <CarouselPrevious className="ml-12" />
          <CarouselNext className="mr-12" />
        </Carousel>
      </div>
    </section>
  );
}
