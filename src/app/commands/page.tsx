import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Particles } from "@/components/particles";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import commands from "@/lib/content/commands.json";

export default function CommandsPage() {
  return (
    <div className="flex flex-col min-h-dvh bg-background text-foreground">
      <Particles className="absolute inset-0 -z-10" />
      <Header />
      <main className="flex-1">
        <div className="container py-20 md:py-32">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-headline text-4xl md:text-6xl font-extrabold text-center mb-8">Commands</h1>
            <p className="text-lg text-muted-foreground text-center mb-16">
              Explore the wide range of commands Arrkiii offers to manage and entertain your server.
            </p>

            {commands.categories.map((category) => (
              <section key={category.name} className="mb-16">
                <h2 className="font-headline text-3xl font-bold text-primary mb-8">{category.name}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.commands.map((command) => (
                    <Card key={command.name} className="bg-card/80 backdrop-blur-sm">
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="font-code text-lg">/{command.name}</span>
                          {command.badge && <Badge variant="secondary">{command.badge}</Badge>}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">{command.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
