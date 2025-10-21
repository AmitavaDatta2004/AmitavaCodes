'use client';

import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  generateHeroSection,
  GenerateHeroSectionOutput,
} from '@/ai/flows/generate-hero-section';
import { Loader2, Wand2 } from 'lucide-react';

export function HeroSection() {
  const [isPending, startTransition] = useTransition();
  const [prompt, setPrompt] = useState('a SaaS for automated accounting');
  const [generatedContent, setGeneratedContent] = useState<GenerateHeroSectionOutput | null>(null);

  const handleGenerate = () => {
    startTransition(async () => {
      const content = await generateHeroSection({ prompt });
      setGeneratedContent(content);
    });
  };
  
  const DisplaySection = () => {
    if (isPending) {
        return (
            <div className="flex flex-col items-center justify-center text-center p-8 space-y-4 h-[250px] sm:h-[298px]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-muted-foreground">Generating your hero section...</p>
            </div>
        )
    }

    if (generatedContent) {
        return (
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
                    {generatedContent.headline}
                </h1>
                <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
                    {generatedContent.description}
                </p>
                <div>
                    <Button size="lg" variant="accent">{generatedContent.callToAction}</Button>
                </div>
            </div>
        )
    }

    return (
        <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline">
            Spark Your Next Landing Page
            </h1>
            <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Unleash AI to craft compelling hero sections in seconds. Describe your product, and watch the magic happen.
            </p>
        </div>
    )
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-8 lg:gap-12 items-center justify-center">
            <DisplaySection />
            <Card className="w-full max-w-2xl mx-auto shadow-lg">
              <CardContent className="p-6">
                <div className="grid gap-4">
                  <Textarea
                    placeholder="e.g., a mobile app for learning new languages"
                    className="resize-none bg-white"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                  />
                  <Button onClick={handleGenerate} disabled={isPending || !prompt}>
                    <Wand2 className="mr-2 h-4 w-4" />
                    {isPending ? 'Generating...' : 'Generate with AI'}
                  </Button>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </section>
  );
}
