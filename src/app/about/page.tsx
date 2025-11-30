import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import content from "@/lib/content/about.json";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Particles className="absolute inset-0 -z-10" />
      <Header />
      <main className="flex-1">
        <div className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-center mb-8">{content.title}</h1>
            <p className="text-lg text-muted-foreground text-center mb-16">{content.subtitle}</p>
            
            <Image 
              src="https://picsum.photos/seed/about-us/1200/600" 
              alt="About Arrkiii" 
              width={1200}
              height={600}
              className="rounded-lg shadow-2xl mb-16"
              data-ai-hint="team computers"
            />

            <div className="prose prose-invert lg:prose-xl mx-auto">
              {content.sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="font-headline text-2xl md:text-3xl font-bold text-primary mb-4">{section.title}</h2>
                  <p className="text-muted-foreground">{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
