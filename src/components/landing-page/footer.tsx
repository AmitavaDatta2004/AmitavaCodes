import Link from 'next/link';
import { Sparkles, Twitter, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="flex items-center">
        <Sparkles className="h-5 w-5 text-primary" />
        <p className="text-xs text-muted-foreground ml-2">
          &copy; {new Date().getFullYear()} Landing Spark. All rights reserved.
        </p>
      </div>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Terms of Service
        </Link>
        <Link href="#" className="text-xs hover:underline underline-offset-4" prefetch={false}>
          Privacy
        </Link>
      </nav>
      <div className="flex gap-4 sm:gap-2 mt-4 sm:mt-0 ml-4">
        <Link href="#" aria-label="Twitter">
          <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
        </Link>
        <Link href="#" aria-label="LinkedIn">
          <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
        </Link>
      </div>
    </footer>
  );
}
