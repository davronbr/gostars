'use server';
/**
 * @fileOverview An AI assistant that generates compelling descriptions for website listings.
 *
 * - generateListingDescription - A function that handles the generation of the website description.
 * - GenerateListingDescriptionInput - The input type for the generateListingDescription function.
 * - GenerateListingDescriptionOutput - The return type for the generateListingDescription function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateListingDescriptionInputSchema = z.object({
  technicalDetails: z
    .string()
    .describe('Technical specifications and underlying technologies of the website.'),
  features: z
    .array(z.string())
    .describe('A list of key features and functionalities offered by the website.'),
  targetAudience: z
    .string()
    .optional()
    .describe('Optional: The primary audience the website is intended for.'),
  currentDescription: z
    .string()
    .optional()
    .describe('Optional: An existing description to be refined or improved.'),
});
export type GenerateListingDescriptionInput = z.infer<
  typeof GenerateListingDescriptionInputSchema
>;

const GenerateListingDescriptionOutputSchema = z.object({
  description: z.string().describe('A compelling and refined description for the website listing.'),
});
export type GenerateListingDescriptionOutput = z.infer<
  typeof GenerateListingDescriptionOutputSchema
>;

export async function generateListingDescription(
  input: GenerateListingDescriptionInput
): Promise<GenerateListingDescriptionOutput> {
  return aiPoweredListingDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateListingDescriptionPrompt',
  input: { schema: GenerateListingDescriptionInputSchema },
  output: { schema: GenerateListingDescriptionOutputSchema },
  prompt: `You are an expert marketing copywriter specializing in creating compelling descriptions for digital asset marketplaces.
Your goal is to generate an attractive and informative description for a website listing, highlighting its key selling points and benefits.

Use the following information to craft the description:

Technical Details: {{{technicalDetails}}}
Features: {{#each features}}- {{{this}}}\n{{/each}}

{{#if targetAudience}}
Target Audience: {{{targetAudience}}}
{{/if}}

{{#if currentDescription}}
Refine the following existing description, making it more compelling and persuasive:
Existing Description: {{{currentDescription}}}
{{else}}
Craft a new, engaging description.
{{/if}}

The description should be concise, professional, and focus on enticing potential buyers.
`,
});

const aiPoweredListingDescriptionFlow = ai.defineFlow(
  {
    name: 'aiPoweredListingDescriptionFlow',
    inputSchema: GenerateListingDescriptionInputSchema,
    outputSchema: GenerateListingDescriptionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate listing description.');
    }
    return output;
  }
);
