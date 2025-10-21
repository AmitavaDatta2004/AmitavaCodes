'use server';

import { z } from 'zod';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactFormState = {
  message: string;
  status: 'success' | 'error';
} | null;

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  try {
    const parsed = contactFormSchema.safeParse({
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    });

    if (!parsed.success) {
      const errorMessages = parsed.error.errors.map((e) => e.message).join(' ');
      return {
        message: `Error: ${errorMessages}`,
        status: 'error',
      };
    }

    // In a real application, you would send an email, save to a database, etc.
    console.log('Contact form submitted:', parsed.data);

    return {
      message: 'Thank you! Your message has been sent successfully.',
      status: 'success',
    };
  } catch (e) {
    return {
      message: 'An unexpected error occurred. Please try again.',
      status: 'error',
    };
  }
}
