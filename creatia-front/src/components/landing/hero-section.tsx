import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap, Target, Calendar } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl">
        <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-40 right-10 w-96 h-96 bg-brand-secondary/10 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex items-center justify-center space-x-2 mb-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl gradient-brand shadow-brand-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">Creatia</span>
          </div>

          {/* Main headline */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-balance">
              Contenido Potenciado
              <span className="gradient-text block">por Inteligencia Artificial</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-3xl mx-auto">
              Genera contenido consistente y alineado con tu marca para redes sociales con nuestra 
              IA inteligente que comprende tu negocio y crea posts atractivos automáticamente.
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button size="lg" className="text-lg px-8 py-6 shadow-brand-lg">
              Comenzar Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-8 py-6">
              Ver Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="pt-12 space-y-4">
            <p className="text-sm text-muted-foreground">
              Confiado por más de 1,000 empresas en todo el mundo
            </p>
            <div className="flex items-center justify-center space-x-8 opacity-60">
              <div className="text-2xl font-bold">Logo</div>
              <div className="text-2xl font-bold">Logo</div>
              <div className="text-2xl font-bold">Logo</div>
              <div className="text-2xl font-bold">Logo</div>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-primary/10 mx-auto">
              <Target className="w-6 h-6 text-brand-primary" />
            </div>
            <h3 className="text-xl font-semibold">Planificación Estratégica</h3>
            <p className="text-muted-foreground">
              La IA analiza tu marca y crea estrategias de contenido mensuales y semanales integrales.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-secondary/10 mx-auto">
              <Zap className="w-6 h-6 text-brand-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Generación Instantánea</h3>
            <p className="text-muted-foreground">
              Genera 3 variaciones únicas de posts diariamente con imágenes, textos y hashtags.
            </p>
          </div>
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-brand-accent/10 mx-auto">
              <Calendar className="w-6 h-6 text-brand-accent" />
            </div>
            <h3 className="text-xl font-semibold">Publicación Inteligente</h3>
            <p className="text-muted-foreground">
              Aprueba y publica directamente en tus plataformas de redes sociales con un clic.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 