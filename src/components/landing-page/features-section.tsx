import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Zap, LayoutTemplate, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Zap className="h-8 w-8 text-primary" />,
    title: 'AI-Powered Copywriting',
    description: 'Leverage the power of AI to generate compelling headlines, descriptions, and calls-to-action for your landing page.',
  },
  {
    icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
    title: 'Customizable Templates',
    description: 'Start with professionally designed templates and customize them to fit your brand. No coding required.',
  },
  {
    icon: <Smartphone className="h-8 w-8 text-primary" />,
    title: 'Responsive Design',
    description: 'Every landing page you create is automatically optimized for desktops, tablets, and mobile devices.',
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-card">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">Key Features</div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Everything You Need to Launch</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Landing Spark provides a comprehensive suite of tools to build and launch beautiful, high-converting landing pages.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 sm:grid-cols-2 md:gap-12 lg:grid-cols-3 lg:max-w-none mt-12">
          {features.map((feature) => (
            <Card key={feature.title} className="shadow-md hover:shadow-lg transition-shadow rounded-lg">
              <CardHeader className="flex flex-col items-center text-center">
                {feature.icon}
                <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-muted-foreground">
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
