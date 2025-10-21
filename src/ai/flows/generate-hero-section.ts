'use server';

/**
 * @fileOverview Hero section generation flow.
 *
 * - generateHeroSection - A function that generates a hero section for a landing page.
 * - GenerateHeroSectionInput - The input type for the generateHeroSection function.
 * - GenerateHeroSectionOutput - The return type for the generateHeroSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHeroSectionInputSchema = z.object({
  prompt: z.string().describe('A prompt describing the desired hero section.'),
});
export type GenerateHeroSectionInput = z.infer<typeof GenerateHeroSectionInputSchema>;

const GenerateHeroSectionOutputSchema = z.object({
  headline: z.string().describe('The generated headline for the hero section.'),
  description: z.string().describe('The generated description for the hero section.'),
  callToAction: z.string().describe('The generated call to action for the hero section.'),
});
export type GenerateHeroSectionOutput = z.infer<typeof GenerateHeroSectionOutputSchema>;

export async function generateHeroSection(input: GenerateHeroSectionInput): Promise<GenerateHeroSectionOutput> {
  return generateHeroSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHeroSectionPrompt',
  input: {schema: GenerateHeroSectionInputSchema},
  output: {schema: GenerateHeroSectionOutputSchema},
  prompt: `You are an expert copywriter specializing in landing pages. Generate a hero section based on the following prompt:

Prompt: {{{prompt}}}

Headline:`, // Intentionally leaving headline open-ended for the model to complete.
});

const generateHeroSectionFlow = ai.defineFlow(
  {
    name: 'generateHeroSectionFlow',
    inputSchema: GenerateHeroSectionInputSchema,
    outputSchema: GenerateHeroSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
