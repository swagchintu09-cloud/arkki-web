import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import docs from "@/lib/content/documents.json";

export default function DocumentsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Particles className="absolute inset-0 -z-10" />
      <Header />
      <main className="flex-1">
        <div className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-center mb-8">{docs.title}</h1>
            <p className="text-lg text-muted-foreground text-center mb-16">
              {docs.description}
            </p>

            <Accordion type="single" collapsible className="w-full">
              {docs.categories.map((category) => (
                <AccordionItem key={category.title} value={category.title}>
                  <AccordionTrigger className="text-xl font-headline hover:no-underline">{category.title}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    <p className="font-bold text-primary mb-4">{category.description}</p>
                    {category.content}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
