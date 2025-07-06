'use client'

import { useState, useEffect } from 'react'
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

interface CorePlannerResponse {
  success: boolean
  monthly_plan?: {
    mes: {
      mes_description: string
      mes_objetivos: string
      pilares_contenido: string[]
      semanas: {
        semana_description: string
        semana_objetivos: string
        posts: {
          dia: string
          content_description: string
          is_image_required: boolean
          reference_images: string[]
          image_detail_description?: string
          copy_for_post?: string
        }[]
      }[]
    }
  }
  error?: string
  thread_id?: string
}

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
  const [corePlannerData, setCorePlannerData] = useState<CorePlannerResponse | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isRefining, setIsRefining] = useState(false)
  const [showRefinement, setShowRefinement] = useState(false)
  const [showDetailedView, setShowDetailedView] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSavedStrategy, setHasSavedStrategy] = useState(false)

  // Check if there's a saved strategy on component mount
  useEffect(() => {
    try {
      const savedStrategy = localStorage.getItem('monthlyStrategy')
      const savedCorePlannerData = localStorage.getItem('corePlannerData')
      
      if (savedStrategy && savedCorePlannerData) {
        setStrategy(JSON.parse(savedStrategy))
        setCorePlannerData(JSON.parse(savedCorePlannerData))
        setShowRefinement(true)
        setHasSavedStrategy(true)
      }
    } catch (error) {
      console.error('Error loading saved strategy:', error)
    }
  }, [])

  // Function to create a new strategy (clear current one)
  const handleNewStrategy = () => {
    const confirmClear = window.confirm(
      '¿Estás seguro de que quieres crear una nueva estrategia? Se perderá la estrategia actual guardada en memoria.'
    )
    
    if (!confirmClear) return
    
    // Clear localStorage
    localStorage.removeItem('monthlyStrategy')
    localStorage.removeItem('corePlannerData')
    
    // Reset all states
    setStrategy(null)
    setCorePlannerData(null)
    setShowRefinement(false)
    setHasSavedStrategy(false)
    setIsLoading(false)
    setIsGenerating(false)
    setIsRefining(false)
    setShowDetailedView(false)
    
    // Reset form
    setFocusInput('')
  }

  // Función para transformar la respuesta del core planner al formato de la UI
  const transformCorePlannerResponse = (corePlannerResponse: CorePlannerResponse): StrategyResponse => {
    if (!corePlannerResponse.monthly_plan) {
      throw new Error('No monthly plan data received')
    }

    const { mes } = corePlannerResponse.monthly_plan
    
    return {
      monthlyTheme: mes.mes_description,
      objectives: mes.mes_objetivos.split('\n').filter(obj => obj.trim()),
      contentPillars: mes.pilares_contenido,
      weeklyBreakdown: mes.semanas.map((semana, index) => ({
        week: index + 1,
        theme: semana.semana_description,
        goals: semana.semana_objetivos.split('\n').filter(goal => goal.trim()),
        contentTypes: semana.posts.map(post => post.content_description),
        keyDates: semana.posts.map(post => `${post.dia}: ${post.content_description.substring(0, 50)}...`)
      })),
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
  }

  // Llamada real a la API del core planner
  const generateStrategy = async (prompt: string, previousStrategy?: StrategyResponse) => {
    setIsGenerating(true)
    
    try {
      // Obtener datos de identidad de marca del sessionStorage
      const brandIdentityData = sessionStorage.getItem('brandIdentityData')
      let company_info = ''
      
      if (brandIdentityData) {
        const brandData = JSON.parse(brandIdentityData)
        
        // Concatenar todos los datos de identidad de marca
        company_info = [
          brandData.website ? `Sitio web: ${brandData.website}` : '',
          brandData.instagram ? `Instagram: ${brandData.instagram}` : '',
          brandData.generalInfo ? `Información general: ${brandData.generalInfo}` : '',
          brandData.brandIdentity ? `Identidad de marca: ${brandData.brandIdentity}` : '',
          brandData.targetAudience ? `Público objetivo: ${brandData.targetAudience}` : '',
          brandData.productsServices ? `Productos/Servicios: ${brandData.productsServices}` : ''
        ].filter(item => item !== '').join('\n\n')
      }
      
      const response = await fetch('http://localhost:8000/core-planner/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: prompt,
          thread_id: `strategy-${Date.now()}`,
          company_info: company_info
        }),
      })

      if (!response.ok) {
        if (response.status === 0) {
          throw new Error('No se puede conectar con el servidor. Asegúrate de que el backend esté ejecutándose en el puerto 8000.')
        }
        throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`)
      }

      const result: CorePlannerResponse = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Error generating strategy')
      }

      // Guardar la respuesta original del core planner
      setCorePlannerData(result)
      
      // Transformar y mostrar en la UI
      const transformedStrategy = transformCorePlannerResponse(result)
      setStrategy(transformedStrategy)
      
      // Guardar en localStorage para persistencia
      localStorage.setItem('corePlannerData', JSON.stringify(result))
      localStorage.setItem('monthlyStrategy', JSON.stringify(transformedStrategy))
      
      setShowRefinement(true)
      setHasSavedStrategy(true)
      
    } catch (error) {
      console.error('Error generating strategy:', error)
      let errorMessage = 'Error desconocido'
      
      if (error instanceof TypeError && error.message.includes('fetch')) {
        errorMessage = 'No se puede conectar con el servidor. Verifica que el backend esté ejecutándose en http://localhost:8000'
      } else if (error instanceof Error) {
        errorMessage = error.message
      }
      
      alert(`Error al generar la estrategia: ${errorMessage}`)
    } finally {
      setIsGenerating(false)
    }
  }

  const refineStrategy = async () => {
    if (!refinementInput.trim() || !strategy) return
    
    setIsRefining(true)
    
    try {
      // Obtener datos de identidad de marca del sessionStorage
      const brandIdentityData = sessionStorage.getItem('brandIdentityData')
      let company_info = ''
      
      if (brandIdentityData) {
        const brandData = JSON.parse(brandIdentityData)
        
        // Concatenar todos los datos de identidad de marca
        company_info = [
          brandData.website ? `Sitio web: ${brandData.website}` : '',
          brandData.instagram ? `Instagram: ${brandData.instagram}` : '',
          brandData.generalInfo ? `Información general: ${brandData.generalInfo}` : '',
          brandData.brandIdentity ? `Identidad de marca: ${brandData.brandIdentity}` : '',
          brandData.targetAudience ? `Público objetivo: ${brandData.targetAudience}` : '',
          brandData.productsServices ? `Productos/Servicios: ${brandData.productsServices}` : ''
        ].filter(item => item !== '').join('\n\n')
      }
      
      // Llamar a la API del core planner con el refinamiento
      const refinementPrompt = `Refina la estrategia existente basándote en este feedback: ${refinementInput}`
      
      const response = await fetch('http://localhost:8000/core-planner/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: refinementPrompt,
          thread_id: corePlannerData?.thread_id || `strategy-${Date.now()}`,
          company_info: company_info
        }),
      })

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} - ${response.statusText}`)
      }

      const result: CorePlannerResponse = await response.json()
      
      if (!result.success) {
        throw new Error(result.error || 'Error refining strategy')
      }

      // Actualizar con la nueva respuesta del core planner
      setCorePlannerData(result)
      
      // Transformar y mostrar en la UI
      const refinedStrategy = transformCorePlannerResponse(result)
      setStrategy(refinedStrategy)
      
      // Guardar en localStorage
      localStorage.setItem('corePlannerData', JSON.stringify(result))
      localStorage.setItem('monthlyStrategy', JSON.stringify(refinedStrategy))
      
    } catch (error) {
      console.error('Error refining strategy:', error)
      alert(`Error al refinar la estrategia: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setRefinementInput('')
      setIsRefining(false)
    }
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
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-light creatia-title flex items-center gap-2">
                Estrategia Mensual
              </h1>
              {hasSavedStrategy && (
                <Badge variant="outline" className="border-brand-success/30 text-brand-success bg-brand-success/5">
                                  <Target className="h-3 w-3 mr-1 text-green-500" />
                Estrategia Guardada
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              {hasSavedStrategy 
                ? 'Tu estrategia mensual está guardada en memoria' 
                : 'Genera tu estrategia de contenido personalizada para el mes'
              }
            </p>
          </div>
          <div className="flex gap-2">
            {hasSavedStrategy && (
              <Button
                variant="outline"
                onClick={handleNewStrategy}
                className="flex items-center gap-2 border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10"
              >
                <Sparkles className="h-4 w-4 text-cyan-400" />
                Nueva Estrategia
              </Button>
            )}
            {strategy && (
              <Button
                variant={showDetailedView ? "default" : "outline"}
                onClick={() => setShowDetailedView(!showDetailedView)}
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-cyan-400" />
                {showDetailedView ? 'Vista Resumen' : 'Vista Detallada'}
              </Button>
            )}
          </div>
        </div>

        {/* Input de Enfoque */}
        {!strategy && (
          <Card className="shadow-brand">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-primary">
                <Target className="h-5 w-5 text-cyan-400" />
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
                  className="btn-primary"
                  disabled={!focusInput.trim() || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin text-black" />
                      Generando Estrategia...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 text-black" />
                      Generar Estrategia
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Vista Detallada del Core Planner */}
        {strategy && corePlannerData && showDetailedView && (
          <div className="space-y-6">
            <Card className="shadow-brand">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-brand-primary">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                  Plan Mensual Detallado
                </CardTitle>
                <CardDescription>
                  Planificación completa con contenido diario específico
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Información del Mes */}
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="font-semibold text-lg mb-2">📅 {corePlannerData.monthly_plan?.mes.mes_description}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{corePlannerData.monthly_plan?.mes.mes_objetivos}</p>
                    <div className="flex flex-wrap gap-2">
                      {corePlannerData.monthly_plan?.mes.pilares_contenido.map((pilar, index) => (
                        <Badge key={index} variant="secondary" className="bg-brand-primary/10 text-brand-primary">
                          {pilar}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Semanas Detalladas */}
                  {corePlannerData.monthly_plan?.mes.semanas.map((semana, semanaIndex) => (
                    <div key={semanaIndex} className="border rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 text-black flex items-center justify-center text-sm font-bold">
                          {semanaIndex + 1}
                        </div>
                        <div>
                          <h4 className="font-semibold">{semana.semana_description}</h4>
                          <p className="text-sm text-muted-foreground">{semana.semana_objetivos}</p>
                        </div>
                      </div>

                      {/* Posts Diarios */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {semana.posts.map((post, postIndex) => (
                          <div key={postIndex} className="bg-muted/20 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded bg-brand-secondary text-white flex items-center justify-center text-xs font-bold">
                                {post.dia.charAt(0).toUpperCase()}
                              </div>
                              <span className="font-medium capitalize text-sm">{post.dia}</span>
                              {post.is_image_required && (
                                <Badge variant="outline" className="text-xs border-green-500 text-green-500 bg-green-500/10">
                                  📸 Imagen
                                </Badge>
                              )}
                            </div>
                            
                            <p className="text-sm text-muted-foreground mb-2">
                              {post.content_description}
                            </p>
                            
                            {post.copy_for_post && (
                              <div className="bg-background/50 p-2 rounded text-xs">
                                <span className="font-medium">Copy:</span>
                                <p className="mt-1">{post.copy_for_post.length > 100 ? post.copy_for_post.substring(0, 100) + '...' : post.copy_for_post}</p>
                              </div>
                            )}
                            
                            {post.image_detail_description && (
                              <div className="mt-2 text-xs text-muted-foreground">
                                <span className="font-medium">Imagen:</span> {post.image_detail_description}
                              </div>
                            )}
                            
                            {post.reference_images && post.reference_images.length > 0 && (
                              <div className="mt-2 text-xs text-muted-foreground">
                                <span className="font-medium">Referencias:</span> {post.reference_images.join(', ')}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Estrategia Generada (Vista Resumen) */}
        {strategy && !showDetailedView && (
          <div className="space-y-6">
            {/* Tema Principal */}
            <Card className="shadow-brand">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-brand-primary">
                  <Brain className="h-5 w-5 text-cyan-400" />
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
                  <CardTitle className="flex items-center gap-2 text-brand-primary">
                    <TrendingUp className="h-5 w-5 text-green-500" />
                    Objetivos del Mes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="shadow-brand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-primary">
                    <Users className="h-5 w-5 text-cyan-400" />
                    Pilares de Contenido
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {strategy.contentPillars.map((pillar, index) => (
                      <Badge key={index} variant="secondary" className="bg-brand-primary/10 text-brand-primary">
                        {pillar}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Desglose Semanal */}
            <Card className="shadow-brand">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-brand-primary">
                  <Calendar className="h-5 w-5 text-cyan-400" />
                  Planificación Semanal
                </CardTitle>
                <CardDescription>
                  Desglose detallado por semanas del mes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {strategy.weeklyBreakdown.map((week, index) => (
                    <Card key={index} className="border-l-4 border-l-brand-primary/60 hover:shadow-md transition-shadow">
                      <CardHeader className="pb-3">
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 text-black flex items-center justify-center text-sm font-bold shadow-sm">
                              {week.week}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-lg leading-tight mb-1">{week.theme}</h4>
                            <p className="text-sm text-muted-foreground">Semana {week.week}</p>
                          </div>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0 space-y-4">
                        {/* Objetivos */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Target className="h-4 w-4 text-green-500" />
                            <span className="font-medium text-brand-primary text-sm">Objetivos</span>
                          </div>
                          <ul className="space-y-1 ml-6">
                            {week.goals.map((goal, goalIndex) => (
                              <li key={goalIndex} className="flex items-start gap-2 text-sm">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0"></div>
                                <span className="text-muted-foreground leading-relaxed">{goal}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Tipos de contenido */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-cyan-400" />
                            <span className="font-medium text-brand-primary text-sm">Tipos de contenido</span>
                          </div>
                          <div className="flex flex-wrap gap-2 ml-6">
                            {week.contentTypes.slice(0, 4).map((type, typeIndex) => (
                              <Badge key={typeIndex} variant="secondary" className="text-xs bg-brand-primary/10 text-brand-primary border-brand-primary/20 hover:bg-brand-primary/20 transition-colors">
                                {type.length > 25 ? type.substring(0, 25) + '...' : type}
                              </Badge>
                            ))}
                            {week.contentTypes.length > 4 && (
                              <Badge variant="outline" className="text-xs text-muted-foreground">
                                +{week.contentTypes.length - 4} más
                              </Badge>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Hashtags y KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-brand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-primary">
                    <Hash className="h-5 w-5 text-cyan-400" />
                    Hashtags Recomendados
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {strategy.hashtags.map((hashtag, index) => (
                      <Badge key={index} variant="outline" className="text-brand-primary border-brand-primary/30">
                        {hashtag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-brand">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-brand-primary">
                    <FileText className="h-5 w-5 text-green-500" />
                    KPIs a Monitorear
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {strategy.kpis.map((kpi, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{kpi}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Sección de Refinamiento */}
        {showRefinement && (
          <Card className="shadow-brand border-brand-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-brand-primary">
                <Edit3 className="h-5 w-5 text-cyan-400" />
                Refinar Estrategia
              </CardTitle>
              <CardDescription>
                ¿Quieres ajustar algo específico de esta estrategia?
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ej: Me gustaría incluir más contenido sobre casos de éxito, o enfocarme más en video contenido..."
                value={refinementInput}
                onChange={(e) => setRefinementInput(e.target.value)}
                className="min-h-[80px] focus:ring-brand-primary focus:border-brand-primary"
                disabled={isRefining}
              />
              
              <div className="flex gap-3">
                <Button 
                  onClick={refineStrategy}
                  variant="outline"
                  disabled={!refinementInput.trim() || isRefining}
                  className="border-brand-primary text-brand-primary hover:bg-brand-primary/10"
                >
                  {isRefining ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin text-cyan-400" />
                      Refinando...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2 text-cyan-400" />
                      Refinar Estrategia
                    </>
                  )}
                </Button>
                
                <Button 
                  onClick={acceptStrategy}
                  className="btn-primary"
                >
                  <CheckCircle className="h-4 w-4 mr-2 text-black" />
                  Aceptar Estrategia
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  )
} 