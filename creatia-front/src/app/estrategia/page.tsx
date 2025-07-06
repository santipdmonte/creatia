'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { MainLayout } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { 
  Target, 
  Sparkles, 
  Calendar,
  CheckCircle,
  RefreshCw,
  Edit3,
  Send,
  Brain,
  TrendingUp,
  Users,
  Hash,
  FileText,
  Clock
} from 'lucide-react'

interface StrategyResponse {
  monthlyTheme: string
  objectives: string[]
  contentPillars: string[]
  weeklyBreakdown: {
    week: number
    theme: string
    goals: string[]
    contentTypes: string[]
    keyDates: string[]
  }[]
  hashtags: string[]
  kpis: string[]
}

export default function StrategyPage() {
  const [focusInput, setFocusInput] = useState('')
  const [refinementInput, setRefinementInput] = useState('')
  const [strategy, setStrategy] = useState<StrategyResponse | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRefining, setIsRefining] = useState(false)
  const [showRefinement, setShowRefinement] = useState(false)

  // Mock API call - será reemplazada por la API real
  const generateStrategy = async (prompt: string, previousStrategy?: StrategyResponse) => {
    setIsGenerating(true)
    
    // Simular llamada a API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const mockStrategy: StrategyResponse = {
      monthlyTheme: `Estrategia enfocada en: ${prompt}`,
      objectives: [
        'Aumentar el engagement en un 25% durante el mes',
        'Generar 3 leads cualificados por semana',
        'Incrementar el alcance orgánico en redes sociales',
        'Posicionar la marca como referente en el sector'
      ],
      contentPillars: [
        'Contenido educativo y tips',
        'Behind the scenes y storytelling',
        'Testimonios y casos de éxito',
        'Tendencias del sector'
      ],
      weeklyBreakdown: [
        {
          week: 1,
          theme: 'Introducción y awareness',
          goals: ['Presentar el enfoque del mes', 'Generar expectativa'],
          contentTypes: ['Posts informativos', 'Stories interactivos', 'Video intro'],
          keyDates: ['Lunes: Post de lanzamiento', 'Miércoles: Live Q&A']
        },
        {
          week: 2,
          theme: 'Educación y valor',
          goals: ['Aportar valor educativo', 'Demostrar expertise'],
          contentTypes: ['Tutoriales', 'Infografías', 'Carrusel educativo'],
          keyDates: ['Martes: Tutorial paso a paso', 'Viernes: Tips del experto']
        },
        {
          week: 3,
          theme: 'Casos de éxito',
          goals: ['Mostrar resultados reales', 'Generar confianza'],
          contentTypes: ['Testimonios', 'Antes/después', 'Case studies'],
          keyDates: ['Lunes: Testimonio cliente', 'Jueves: Caso de estudio']
        },
        {
          week: 4,
          theme: 'Cierre y llamada a la acción',
          goals: ['Convertir engagement en leads', 'Preparar próximo mes'],
          contentTypes: ['CTA posts', 'Ofertas especiales', 'Resumen mensual'],
          keyDates: ['Miércoles: Oferta especial', 'Domingo: Resumen del mes']
        }
      ],
      hashtags: [
        '#MarketingDigital', '#Estrategia', '#Contenido', '#Branding',
        '#SocialMedia', '#Engagement', '#Growth', '#Marketing'
      ],
      kpis: [
        'Alcance orgánico: +30%',
        'Engagement rate: +25%',
        'Leads generados: 12-15',
        'Seguidores nuevos: +200'
      ]
    }
    
    setStrategy(mockStrategy)
    setIsGenerating(false)
    setShowRefinement(true)
  }

  const refineStrategy = async () => {
    if (!refinementInput.trim() || !strategy) return
    
    setIsRefining(true)
    
    // Simular refinamiento
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Actualizar estrategia con refinamiento
    const refinedStrategy: StrategyResponse = {
      ...strategy,
      monthlyTheme: `${strategy.monthlyTheme} (Refinado: ${refinementInput})`,
      objectives: [
        ...strategy.objectives,
        `Objetivo adicional basado en: ${refinementInput}`
      ]
    }
    
    setStrategy(refinedStrategy)
    setRefinementInput('')
    setIsRefining(false)
  }

  const acceptStrategy = () => {
    // Aquí se guardaría la estrategia aceptada
    alert('¡Estrategia aceptada! Se ha guardado tu planificación mensual.')
    setShowRefinement(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!focusInput.trim()) return
    generateStrategy(focusInput)
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
              🎯 Estrategia Mensual
            </h1>
            <p className="text-muted-foreground mt-1">
              Genera tu estrategia de contenido personalizada para el mes
            </p>
          </div>
        </div>

        {/* Input de Enfoque */}
        {!strategy && (
          <Card className="shadow-brand">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-primary">
                <Target className="h-5 w-5" />
                Define tu Enfoque del Mes
              </CardTitle>
              <CardDescription>
                Describe en qué quieres enfocarte este mes para generar una estrategia personalizada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="focus">¿En qué te quieres enfocar este mes?</Label>
                  <Textarea
                    id="focus"
                    placeholder="Ej: Quiero aumentar las ventas de mi producto estrella, generar más leads para mi servicio de consultoría, posicionar mi marca como experta en sostenibilidad..."
                    value={focusInput}
                    onChange={(e) => setFocusInput(e.target.value)}
                    className="min-h-[100px] focus:ring-brand-primary focus:border-brand-primary"
                    disabled={isGenerating}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="gradient-brand text-white"
                  disabled={!focusInput.trim() || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generando Estrategia...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generar Estrategia
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Estrategia Generada */}
        {strategy && (
          <div className="space-y-6">
            {/* Tema Principal */}
            <Card className="shadow-brand">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-brand-primary">
                  <Brain className="h-5 w-5" />
                  Tema Principal del Mes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium">{strategy.monthlyTheme}</p>
              </CardContent>
            </Card>

            {/* Objetivos y Pilares */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-brand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-secondary">
                    <TrendingUp className="h-5 w-5" />
                    Objetivos del Mes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-brand-success mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-brand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-accent">
                    <FileText className="h-5 w-5" />
                    Pilares de Contenido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {strategy.contentPillars.map((pillar, index) => (
                      <Badge key={index} variant="outline" className="border-brand-accent/30 text-brand-accent">
                        {pillar}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Planificación Semanal */}
            <Card className="shadow-brand">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-brand-primary">
                  <Calendar className="h-5 w-5" />
                  Planificación Semanal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {strategy.weeklyBreakdown.map((week) => (
                    <div key={week.week} className="border rounded-lg p-4 bg-muted/30">
                      <h4 className="font-semibold text-brand-primary mb-2">
                        Semana {week.week}: {week.theme}
                      </h4>
                      
                      <div className="space-y-3">
                        <div>
                          <h5 className="text-sm font-medium text-muted-foreground mb-1">Objetivos:</h5>
                          <ul className="text-sm space-y-1">
                            {week.goals.map((goal, idx) => (
                              <li key={idx} className="flex items-start gap-1">
                                <span className="text-brand-primary">•</span>
                                {goal}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-muted-foreground mb-1">Tipos de contenido:</h5>
                          <div className="flex flex-wrap gap-1">
                            {week.contentTypes.map((type, idx) => (
                              <Badge key={idx} variant="secondary" className="text-xs">
                                {type}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="text-sm font-medium text-muted-foreground mb-1">Fechas clave:</h5>
                          <ul className="text-xs space-y-1">
                            {week.keyDates.map((date, idx) => (
                              <li key={idx} className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-brand-secondary" />
                                {date}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hashtags y KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-brand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-secondary">
                    <Hash className="h-5 w-5" />
                    Hashtags Recomendados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {strategy.hashtags.map((hashtag, index) => (
                      <Badge key={index} variant="outline" className="border-brand-secondary/30 text-brand-secondary">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-brand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-success">
                    <TrendingUp className="h-5 w-5" />
                    KPIs a Medir
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.kpis.map((kpi, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-brand-success rounded-full"></div>
                        <span className="text-sm">{kpi}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Acciones */}
            {showRefinement && (
              <Card className="shadow-brand border-brand-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-primary">
                    <Edit3 className="h-5 w-5" />
                    ¿Quieres Ajustar la Estrategia?
                  </CardTitle>
                  <CardDescription>
                    Puedes aceptar esta estrategia o solicitar ajustes específicos
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="refinement">Ajustes o cambios que quieres hacer:</Label>
                    <Textarea
                      id="refinement"
                      placeholder="Ej: Me gustaría incluir más contenido sobre casos de éxito, enfocarme más en video content, agregar colaboraciones con influencers..."
                      value={refinementInput}
                      onChange={(e) => setRefinementInput(e.target.value)}
                      className="min-h-[80px] focus:ring-brand-primary focus:border-brand-primary"
                      disabled={isRefining}
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={refineStrategy}
                      variant="outline"
                      disabled={!refinementInput.trim() || isRefining}
                      className="border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                    >
                      {isRefining ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Refinando...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Refinar Estrategia
                        </>
                      )}
                    </Button>
                    
                    <Button 
                      onClick={acceptStrategy}
                      className="gradient-brand text-white"
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Aceptar Estrategia
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  )
} 