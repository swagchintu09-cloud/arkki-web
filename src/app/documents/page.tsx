import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {docs.categories.map((category) => (
                <Link href={category.href} key={category.title} className="group">
                  <Card className="bg-card/80 backdrop-blur-sm h-full transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        {category.title}
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{category.description}</CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
