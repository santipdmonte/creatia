import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Sparkles, 
  Zap, 
  Target, 
  Calendar,
  Brain,
  Palette,
  Rocket,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  Instagram,
  Twitter,
  Facebook,
  Linkedin,
  MessageCircle,
  BarChart3,
  Settings,
  Eye,
  Coffee,
  DollarSign,
  Lightbulb,
  RefreshCw
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/20">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-accent/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-40 right-10 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-20 left-1/3 w-64 h-64 bg-brand-secondary/15 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="relative container mx-auto px-4 py-12 lg:py-24">
          <div className="text-center space-y-8">
            {/* Logo */}
            <div className="flex items-center justify-center space-x-3 mb-8 animate-fade-in">
              <div className="relative">
                <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-brand-accent to-brand-primary shadow-brand-lg">
                  <Brain className="w-7 h-7 text-black" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-brand-accent rounded-full animate-ping" />
              </div>
              <div className="space-y-1">
                <span className="text-3xl font-bold bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text text-transparent">
                  creatia
                </span>
                <div className="text-xs text-brand-accent font-medium tracking-widest">
                  AI POWERED
                </div>
              </div>
            </div>

            {/* Main headline */}
            <div className="space-y-6 animate-slide-up">
              <div className="space-y-2">
                <Badge variant="outline" className="border-brand-accent text-brand-accent mb-4">
                  🎯 Para Emprendedores
                </Badge>
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-balance leading-none">
                  <span className="block">Tus Redes</span>
                  <span className="block">Sociales en</span>
                  <span className="block bg-gradient-to-r from-brand-accent via-brand-primary to-brand-accent bg-clip-text text-transparent animate-pulse">
                    Piloto Automático
                  </span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-4xl mx-auto leading-relaxed">
                <span className="text-brand-accent font-semibold">Planificamos, creamos y publicamos</span> el contenido 
                de tus redes sociales de forma automatizada. 
                <span className="text-brand-primary font-semibold"> Enfócate en tu negocio</span>, nosotros nos encargamos de tu presencia digital.
              </p>
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8 animate-scale-in">
              <Button size="lg" className="text-lg px-10 py-6 bg-gradient-to-r from-brand-accent to-brand-primary hover:from-brand-primary hover:to-brand-accent text-black font-bold shadow-brand-lg transform hover:scale-105 transition-all duration-300">
                <Rocket className="w-5 h-5 mr-2" />
                Solicita tu acceso anticipado
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>

            {/* Pain Points Ticker */}
            <div className="pt-12 space-y-4">
              <p className="text-sm text-muted-foreground">
                ¿Te suena familiar?
              </p>
              <div className="flex items-center justify-center text-sm text-muted-foreground space-x-6 opacity-80">
                <span>⌛ "No tengo tiempo para redes"</span>
                <span>💸 "Los community managers son muy caros"</span>
                <span>📉 "Publico sin estrategia"</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-red-500 text-red-500">
              😖 El Problema Real
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              Eres <span className="text-red-500">Emprendedor</span>, No Community Manager
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tu tiempo vale oro, pero las redes sociales demandan consistencia diaria. 
              Es una trampa que te aleja de hacer crecer tu negocio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pain Point 1 */}
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10">
                  <Clock className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-bold text-red-500">Pérdida de Tiempo</h3>
                <p className="text-sm text-muted-foreground">
                  Horas perdidas pensando qué publicar, diseñando y escribiendo contenido que debería ser automático.
                </p>
              </CardContent>
            </Card>

            {/* Pain Point 2 */}
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10">
                  <DollarSign className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-bold text-red-500">Costos Elevados</h3>
                <p className="text-sm text-muted-foreground">
                  Community managers y diseñadores cuestan miles al mes, un gasto que muchos emprendedores no pueden permitirse.
                </p>
              </CardContent>
            </Card>

            {/* Pain Point 3 */}
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10">
                  <BarChart3 className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-bold text-red-500">Sin Estrategia</h3>
                <p className="text-sm text-muted-foreground">
                  Contenido improvisado sin coherencia ni planificación, que no genera resultados medibles.
                </p>
              </CardContent>
            </Card>

            {/* Pain Point 4 */}
            <Card className="border-red-500/20 bg-red-500/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-red-500/10">
                  <Coffee className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-bold text-red-500">Sobrecarga Mental</h3>
                <p className="text-sm text-muted-foreground">
                  Una tarea más en tu lista infinita, cuando deberías estar enfocado en hacer crecer tu negocio.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-brand-accent text-brand-accent">
              🚀 La Solución Definitiva
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-brand-accent">Automatización Total</span> con Control Humano
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Desde tu identidad de marca hasta contenido publicado automáticamente. 
              Tú mantienes el control, nosotros hacemos el trabajo pesado.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="relative group hover:shadow-brand-lg transition-all duration-300 border-brand-secondary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-brand-accent/20 to-brand-primary/20 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-8 h-8 text-brand-accent" />
                </div>
                <h3 className="text-2xl font-bold">Estrategia Inteligente</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Analizamos tu marca y creamos estrategias de contenido a <strong>mediano y largo plazo</strong>. 
                  No más improvisación, sino planificación estratégica real.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-brand-accent">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Análisis profundo de tu nicho
                  </div>
                  <div className="flex items-center text-sm text-brand-accent">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Calendarios editoriales a 6 meses
                  </div>
                  <div className="flex items-center text-sm text-brand-accent">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Adaptación continua con IA
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="relative group hover:shadow-brand-lg transition-all duration-300 border-brand-secondary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 group-hover:scale-110 transition-transform duration-300">
                  <Palette className="w-8 h-8 text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold">Creación 100% Alineada</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Contenido visual y textual que respeta tu branding al 100%. 
                  Cada post mantiene tu <strong>identidad visual y comunicacional</strong> intacta.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-brand-primary">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Diseños con tu paleta de colores
                  </div>
                  <div className="flex items-center text-sm text-brand-primary">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Tono de voz personalizado
                  </div>
                  <div className="flex items-center text-sm text-brand-primary">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Optimizado por red social
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="relative group hover:shadow-brand-lg transition-all duration-300 border-brand-secondary/20 bg-card/50 backdrop-blur">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-brand-secondary/20 to-brand-accent/20 group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-8 h-8 text-brand-secondary" />
                </div>
                <h3 className="text-2xl font-bold">Control Total</h3>
                <p className="text-muted-foreground leading-relaxed">
                  <strong>Intervención humana</strong> en cualquier parte del proceso. 
                  Revisá, ajustá o aprobá antes de que se publique automáticamente.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-brand-secondary">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Aprobación antes de publicar
                  </div>
                  <div className="flex items-center text-sm text-brand-secondary">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Edición en tiempo real
                  </div>
                  <div className="flex items-center text-sm text-brand-secondary">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Chatbot para eventos especiales
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-muted/5">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="border-brand-accent text-brand-accent">
              ⚡ Súper Simple
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-brand-accent">4 Pasos</span> para Nunca Más Preocuparte por Redes
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Configuración única de 10 minutos. Después, piloto automático para siempre.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Step 1 */}
            <div className="text-center space-y-6 relative">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-accent to-brand-primary text-black font-bold text-2xl mx-auto shadow-brand-lg">
                1
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Subí tu Branding</h3>
                <p className="text-muted-foreground text-sm">
                  Logo, colores, descripción de tu marca. Nuestra IA aprende tu identidad en minutos.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="text-center space-y-6 relative">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-primary to-brand-secondary text-black font-bold text-2xl mx-auto shadow-brand-lg">
                2
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Validá la Estrategia</h3>
                <p className="text-muted-foreground text-sm">
                  Revisás y aprobás el plan de contenido a largo plazo. Tu marca, tu decisión final.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="text-center space-y-6 relative">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-secondary to-brand-accent text-black font-bold text-2xl mx-auto shadow-brand-lg">
                3
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Revisá Semanalmente</h3>
                <p className="text-muted-foreground text-sm">
                  Cada semana recibís el contenido para revisar. Editás lo que quieras o dejás que se publique.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-brand-accent to-brand-primary text-black font-bold text-2xl mx-auto shadow-brand-lg">
                4
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Piloto Automático</h3>
                <p className="text-muted-foreground text-sm">
                  Tu contenido se publica automáticamente. Vos te enfocás en tu negocio, nosotros en tu presencia.
                </p>
              </div>
            </div>
          </div>

          {/* Special Features */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-brand-accent/20 bg-brand-accent/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <MessageCircle className="w-8 h-8 text-brand-accent" />
                  <h3 className="text-xl font-bold">Chatbot Inteligente</h3>
                </div>
                <p className="text-muted-foreground">
                  Informale sobre eventos, lanzamientos o promociones especiales. 
                  El sistema adapta automáticamente tu contenido para incluir estas novedades.
                </p>
              </CardContent>
            </Card>

            <Card className="border-brand-primary/20 bg-brand-primary/5">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center space-x-3">
                  <Lightbulb className="w-8 h-8 text-brand-primary" />
                  <h3 className="text-xl font-bold">Contenido Orgánico</h3>
                </div>
                <p className="text-muted-foreground">
                  También sugerimos contenido orgánico con guiones para videos e historias que vos podés crear, 
                  humanizando tu marca sin perder la automatización.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-green-500 text-green-500">
                  ✨ Los Resultados Hablan
                </Badge>
                <h2 className="text-4xl md:text-5xl font-bold">
                  <span className="text-green-500">Tiempo Recuperado</span>
                  <br />
                  <span className="text-brand-primary">Resultados Reales</span>
                </h2>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Dejá de perder tiempo en tareas que pueden ser automatizadas. 
                  Enfócate en lo que realmente hace crecer tu negocio.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-green-500" />
                    <span className="font-bold text-2xl text-green-500">15h</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Semanales recuperadas para tu negocio</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5 text-brand-accent" />
                    <span className="font-bold text-2xl text-brand-accent">80%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Menos costo vs community manager</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-brand-primary" />
                    <span className="font-bold text-2xl text-brand-primary">300%</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Más consistencia en publicaciones</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <RefreshCw className="w-5 h-5 text-brand-secondary" />
                    <span className="font-bold text-2xl text-brand-secondary">24/7</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Automatización que nunca duerme</p>
                </div>
              </div>

              <Button size="lg" className="bg-gradient-to-r from-brand-accent to-brand-primary hover:from-brand-primary hover:to-brand-accent text-black font-bold">
                <Target className="w-5 h-5 mr-2" />
                Quiero Recuperar mi Tiempo
              </Button>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-card to-muted/20 rounded-2xl p-8 border border-brand-secondary/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-brand-accent">Tu Dashboard</span>
                    <Settings className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-green-500/10 rounded-lg border border-green-500/20">
                      <span className="text-sm">Contenido de esta semana</span>
                      <Badge className="bg-green-500 text-black">Aprobado</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-brand-accent/10 rounded-lg border border-brand-accent/20">
                      <span className="text-sm">Próxima publicación</span>
                      <span className="text-sm text-brand-accent">En 2 horas</span>
                    </div>
                    <div className="h-32 bg-gradient-to-br from-brand-accent/10 to-brand-primary/10 rounded-lg border border-brand-accent/20 flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <Sparkles className="w-8 h-8 text-brand-accent mx-auto" />
                        <p className="text-sm text-muted-foreground">Vista previa del post</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Engagement promedio</span>
                      <span className="text-xs text-green-500">+45% esta semana</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-8 h-8 bg-brand-accent rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-black" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden bg-muted/5">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-accent/5 via-background to-brand-primary/5" />
        <div className="container mx-auto px-4 relative">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="outline" className="border-brand-accent text-brand-accent">
              🎯 Acceso Anticipado Limitado
            </Badge>
            <h2 className="text-4xl md:text-6xl font-bold">
              No Pierdas Tiempo en
              <span className="block bg-gradient-to-r from-brand-accent via-brand-primary to-brand-accent bg-clip-text text-transparent">
                Tareas que Podés Automatizar
              </span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Únete a los emprendedores que ya recuperaron su tiempo y ven crecer su presencia digital 
              sin el estrés diario de crear contenido.
            </p>
            
            <div className="bg-card/50 backdrop-blur rounded-2xl p-8 border border-brand-accent/20 max-w-2xl mx-auto">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-brand-accent">¿Te gustaría enfocarte en tu negocio?</h3>
                <p className="text-muted-foreground">
                  No tenés tiempo para planificar, diseñar y subir contenido, pero querés una presencia consistente. 
                  <strong className="text-brand-primary"> Creatia llega para ayudarte.</strong>
                </p>
                <div className="pt-4">
                  <Button size="lg" className="text-xl px-12 py-8 w-full bg-gradient-to-r from-brand-accent to-brand-primary hover:from-brand-primary hover:to-brand-accent text-black font-bold shadow-brand-lg transform hover:scale-105 transition-all duration-300">
                    <Rocket className="w-6 h-6 mr-3" />
                    Solicitar Acceso Anticipado
                    <ArrowRight className="w-6 h-6 ml-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Configuración en 10 minutos</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Control total de tu contenido</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span>Soporte personalizado</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-accent to-brand-primary">
                <Brain className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-brand-accent to-brand-primary bg-clip-text text-transparent">
                creatia
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-muted-foreground hover:text-brand-accent transition-colors">
                Términos
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-accent transition-colors">
                Privacidad
              </a>
              <a href="#" className="text-muted-foreground hover:text-brand-accent transition-colors">
                Contacto
              </a>
            </div>
            <div className="flex items-center space-x-4">
              <Instagram className="w-5 h-5 text-muted-foreground hover:text-brand-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 text-muted-foreground hover:text-brand-accent cursor-pointer transition-colors" />
              <Linkedin className="w-5 h-5 text-muted-foreground hover:text-brand-accent cursor-pointer transition-colors" />
            </div>
          </div>
          <div className="text-center mt-8 pt-8 border-t border-border">
            <p className="text-muted-foreground">
              © 2025 creatia. Todos los derechos reservados. Tu tiempo vale más que crear contenido de la forma tradicional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
