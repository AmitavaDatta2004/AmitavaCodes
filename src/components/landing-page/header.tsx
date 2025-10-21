import { Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  return (
    <header className="px-4 lg:px-6 h-16 flex items-center bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <Link href="#" className="flex items-center justify-center" prefetch={false}>
        <Sparkles className="h-6 w-6 text-primary" />
        <span className="sr-only">Landing Spark</span>
        <span className="ml-2 text-lg font-headline font-bold">Landing Spark</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Features
        </Link>
        <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Testimonials
        </Link>
        <Link href="#contact" className="text-sm font-medium hover:underline underline-offset-4" prefetch={false}>
          Contact
        </Link>
        <Button asChild size="sm">
          <Link href="#">
            Get Started
          </Link>
        </Button>
      </nav>
    </header>
  );
}
