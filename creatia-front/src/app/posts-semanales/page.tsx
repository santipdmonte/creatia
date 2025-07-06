'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MainLayout } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { 
  Calendar,
  Upload,
  Edit3,
  Save,
  Image as ImageIcon,
  FileText,
  Lightbulb,
  Coffee,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Star,
  Eye
} from 'lucide-react'

interface WeeklyPost {
  day: string
  dayNumber: number
  icon: any
  type: 'placeholder' | 'organic' | 'empty'
  title: string
  content: string
  image?: string
  developedCopy?: string
  isInSelectionMode?: boolean
}

// Placeholder images for selection
const placeholderImages = [
  'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop'
]

export default function PostsSemanalesPage() {
  const [selectedImageForPreview, setSelectedImageForPreview] = useState<string | null>(null)
  
  const [weeklyPosts, setWeeklyPosts] = useState<WeeklyPost[]>([
    {
      day: 'Lunes',
      dayNumber: 1,
      icon: Coffee,
      type: 'placeholder',
      title: 'Post con Imagen',
      content: '🌟 ¡Nuevo lunes, nuevas oportunidades! \n\nEsta semana nos enfocamos en construir hábitos que realmente transformen tu negocio. \n\n¿Sabías que el 80% del éxito empresarial viene de la consistencia en pequeñas acciones diarias? \n\n💪 Mi consejo para hoy: Elige UNA acción que puedas hacer todos los días durante esta semana. Solo una. \n\n¿Cuál será la tuya? 👇 \n\n#LunesDeMotivacion #Emprendimiento #Habitos #Exito #Consistencia',
      isInSelectionMode: true
    },
    {
      day: 'Martes',
      dayNumber: 2,
      icon: Sunrise,
      type: 'organic',
      title: 'Contenido Orgánico',
      content: 'Tip Tuesday: El error más común que veo en emprendedores es intentar hacer TODO al mismo tiempo. Resultado: burnout y resultados mediocres. \n\n🎯 La clave está en el ENFOQUE. \n\n¿Cómo aplicarlo? \n1️⃣ Elige solo 3 prioridades por semana \n2️⃣ Dedica bloques de tiempo específicos a cada una \n3️⃣ Ignora todo lo demás hasta completar estas 3 \n\n¿Cuáles son tus 3 prioridades de esta semana?',
      developedCopy: '💡 TIP TUESDAY: El error que está saboteando tu productividad\n\nVeo esto TODO el tiempo en mi consultoría...\n\nEmprendedores brillantes que se levantan cada día con una lista de 15 tareas "urgentes". \n\nResultado: \n❌ Agotamiento mental \n❌ Proyectos a medias \n❌ Sensación de no avanzar \n\n🎯 LA SOLUCIÓN: La regla del 3-2-1 \n\n✅ 3 prioridades máximo por semana \n✅ 2 horas de enfoque profundo por prioridad \n✅ 1 revisión diaria de progreso \n\nEjemplo práctico: \nEsta semana mis 3 son: \n1. Lanzar el nuevo curso \n2. Cerrar 2 clientes nuevos \n3. Optimizar mi funnel de ventas \n\nTODO lo demás puede esperar. \n\n¿Te atreves a aplicar la regla del 3-2-1 esta semana? \n\nCuéntame cuáles son tus 3 prioridades 👇 \n\n#ProductividadReal #Enfoque #Emprendimiento #TipTuesday #Resultados'
    },
    {
      day: 'Miércoles',
      dayNumber: 3,
      icon: Sun,
      type: 'placeholder',
      title: 'Post con Imagen',
      content: '🔥 MITAD DE SEMANA = MOMENTO DE EVALUAR \n\n¿Cómo vas con tus objetivos? \n\nEste es mi workspace hoy, trabajando en el próximo módulo de mi programa de mentoría. \n\n✨ Recordatorio: El progreso no siempre es lineal. Algunos días avanzas 10 pasos, otros solo 1. \n\nLo importante es NO parar. \n\n💭 Pregunta de reflexión: ¿Qué pequeño paso puedes dar HOY que te acerque a tu meta? \n\nNo tiene que ser perfecto, solo tiene que ser CONSISTENTE. \n\n¡Sigamos construyendo! 💪 \n\n#MiercolesDeReflexion #Progreso #Mentalidad #Emprendimiento #Consistencia #Crecimiento',
      isInSelectionMode: true
    },
    {
      day: 'Jueves',
      dayNumber: 4,
      icon: Sunset,
      type: 'organic',
      title: 'Contenido Orgánico',
      content: 'Storytelling Thursday: La vez que perdí $10,000 en 30 días y cómo eso cambió mi forma de hacer negocios para siempre. \n\n📖 Contexto: Era 2019, acababa de lanzar mi primer producto digital. \n\n💥 El golpe: Invertí todo en publicidad sin entender a mi audiencia. \n\n🎯 La lección: Antes de vender, debes SERVIR. \n\n¿Cuál ha sido tu mayor lección empresarial?',
      developedCopy: '💔 THROWBACK THURSDAY: Mi error de $10,000 \n\nHace 4 años cometí el error más caro de mi carrera empresarial. \n\nLa historia: \n\n🚀 Acababa de crear mi primer curso online \n💰 Tenía $10,000 ahorrados para marketing \n🎯 Estaba CONVENCIDO de que sería un éxito \n\nMi plan "genial": \n- Gasté $8,000 en Facebook Ads en 3 semanas \n- Apunté a "emprendedores de 25-45 años" \n- Usé un copy súper genérico \n- No había validado NADA antes \n\nResultado: \n❌ 3 ventas en total \n❌ $10,000 perdidos \n❌ Ego por el suelo \n❌ Casi abandoné todo \n\nPero... \n\n🔄 ESE FRACASO ME ENSEÑÓ LA LECCIÓN MÁS VALIOSA: \n\n"Antes de vender, debes SERVIR" \n\nAhora mi proceso: \n✅ 6 meses creando contenido de valor \n✅ Entendiendo los dolores reales de mi audiencia \n✅ Validando cada idea antes de invertir \n✅ Construyendo relaciones, no solo vendiendo \n\nResultado actual: \n🎯 +500% ROI en mis lanzamientos \n💚 Audiencia comprometida y leal \n🚀 Negocio sostenible y rentable \n\nLa moraleja: \nTus mayores fracasos pueden ser tus mejores maestros. \n\n¿Cuál ha sido tu lección empresarial más cara? \nCuéntamela en los comentarios 👇 \n\n#ThrowbackThursday #Fracaso #Aprendizaje #Emprendimiento #Lecciones #Crecimiento'
    },
    {
      day: 'Viernes',
      dayNumber: 5,
      icon: Star,
      type: 'placeholder',
      title: 'Post con Imagen',
      content: '🎉 ¡VIERNES DE CELEBRACIÓN! \n\nEsta semana logramos: \n✅ 3 nuevos clientes para el programa \n✅ 500+ nuevos seguidores comprometidos \n✅ Lanzamiento del módulo de productividad \n✅ 2 colaboraciones estratégicas cerradas \n\n🙌 Pero lo que más me emociona... \n\nVer los resultados de mis estudiantes: \n• María aumentó sus ventas 40% \n• Carlos automatizó su proceso de leads \n• Ana lanzó su primer producto digital \n\n💡 Recordatorio: Celebra tus wins, por pequeños que parezcan. \n\nEl éxito se construye con pequeñas victorias diarias. \n\n¿Qué estás celebrando esta semana? 🎊 \n\n#ViernesDeVictoria #Celebracion #Exito #Resultados #Gratitud #Emprendimiento',
      isInSelectionMode: true
    },
    {
      day: 'Sábado',
      dayNumber: 6,
      icon: Moon,
      type: 'empty',
      title: 'Descanso',
      content: ''
    },
    {
      day: 'Domingo',
      dayNumber: 7,
      icon: Moon,
      type: 'empty',
      title: 'Descanso',
      content: ''
    }
  ])

  const handleImageSelection = (dayNumber: number, imageUrl: string) => {
    setWeeklyPosts(prev => 
      prev.map(post => 
        post.dayNumber === dayNumber 
          ? { ...post, image: imageUrl, isInSelectionMode: false }
          : post
      )
    )
  }

  const handleContentChange = (dayNumber: number, newContent: string) => {
    setWeeklyPosts(prev => 
      prev.map(post => 
        post.dayNumber === dayNumber 
          ? { ...post, content: newContent }
          : post
      )
    )
  }

  const ImageSelectionGrid = ({ dayNumber }: { dayNumber: number }) => (
    <div className="grid grid-cols-2 gap-3">
      {placeholderImages.map((imageUrl, index) => (
        <div key={index} className="relative group">
          <div 
            className="aspect-square rounded-lg overflow-hidden cursor-pointer border-2 border-transparent hover:border-brand-primary/50 transition-all"
            onClick={() => handleImageSelection(dayNumber, imageUrl)}
          >
            <img 
              src={imageUrl} 
              alt={`Opción ${index + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
            />
          </div>
          
          {/* Preview button */}
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="secondary"
                size="sm"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedImageForPreview(imageUrl)
                }}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  )

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold gradient-text flex items-center gap-2">
              📅 Posts Semanales
            </h1>
            <p className="text-muted-foreground mt-1">
              Planifica y organiza tu contenido para toda la semana
            </p>
          </div>
          <Button className="gradient-brand text-white">
            <Save className="h-4 w-4 mr-2" />
            Guardar Planificación
          </Button>
        </div>

        {/* Resumen de la semana */}
        <Card className="shadow-brand border-brand-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-brand-accent">
              <FileText className="h-5 w-5" />
              Resumen de la Semana
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="space-y-1">
                <div className="text-2xl font-bold text-brand-primary">3</div>
                <div className="text-xs text-muted-foreground">Posts con Imagen</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-brand-secondary">2</div>
                <div className="text-xs text-muted-foreground">Contenido Orgánico</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-brand-success">5</div>
                <div className="text-xs text-muted-foreground">Posts Totales</div>
              </div>
              <div className="space-y-1">
                <div className="text-2xl font-bold text-brand-accent">2</div>
                <div className="text-xs text-muted-foreground">Días de Descanso</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Posts por Día */}
        <div className="space-y-4">
          {weeklyPosts.map((post) => {
            const IconComponent = post.icon
            
            // Días de descanso
            if (post.type === 'empty') {
              return (
                <Card key={post.day} className="opacity-50">
                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-muted-foreground">{post.day}</CardTitle>
                        <CardDescription className="text-sm">Día de descanso</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              )
            }

            // Posts con placeholder de imagen
            if (post.type === 'placeholder') {
              return (
                <Card key={post.day} className="shadow-brand">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-brand-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-brand-primary">{post.day}</CardTitle>
                        <Badge variant="outline" className="border-brand-primary/30 text-brand-primary">
                          <ImageIcon className="h-3 w-3 mr-1" />
                          {post.title}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Layout en 2 columnas: Texto izquierda, Imagen derecha */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Columna izquierda - Copy del post */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Copy del post:
                        </label>
                        <Textarea
                          placeholder={post.content}
                          value={post.content}
                          onChange={(e) => handleContentChange(post.dayNumber, e.target.value)}
                          className="min-h-[200px] focus:ring-brand-primary focus:border-brand-primary"
                        />
                      </div>

                      {/* Columna derecha - Área de imagen */}
                      <div className="border-2 border-dashed border-brand-primary/30 rounded-lg p-4 bg-brand-primary/5 h-fit">
                        {post.image ? (
                          <div className="relative aspect-square">
                            <img 
                              src={post.image} 
                              alt={`Post ${post.day}`}
                              className="w-full h-full object-cover rounded-lg"
                            />
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-4xl">
                                <img 
                                  src={post.image} 
                                  alt="Preview" 
                                  className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
                                />
                              </DialogContent>
                            </Dialog>
                          </div>
                        ) : post.isInSelectionMode ? (
                          <div className="space-y-3">
                            <div className="text-center">
                              <p className="text-sm text-brand-primary/80 font-medium mb-3">
                                Selecciona una imagen para tu post
                              </p>
                            </div>
                            <ImageSelectionGrid dayNumber={post.dayNumber} />
                          </div>
                        ) : (
                          <div 
                            className="text-center cursor-pointer hover:bg-brand-primary/10 transition-colors rounded-lg p-4 aspect-square flex flex-col justify-center"
                            onClick={() => setSelectedImageForPreview(null)}
                          >
                            <Upload className="h-8 w-8 mx-auto text-brand-primary/60 mb-2" />
                            <p className="text-sm text-brand-primary/80 font-medium">
                              Haz click para seleccionar imagen
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              JPG, PNG, WEBP hasta 5MB
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }

                        // Posts de contenido orgánico
            if (post.type === 'organic') {
              return (
                <Card key={post.day} className="shadow-brand border-brand-secondary/20">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-secondary/10 flex items-center justify-center">
                        <IconComponent className="h-5 w-5 text-brand-secondary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg text-brand-secondary">{post.day}</CardTitle>
                        <Badge variant="outline" className="border-brand-secondary/30 text-brand-secondary">
                          <Lightbulb className="h-3 w-3 mr-1" />
                          {post.title}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Layout en 2 columnas: Copy izquierda, Idea derecha */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Columna izquierda - Copy desarrollado */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Copy desarrollado basado en esta idea:
                        </label>
                        <Textarea
                          value={post.developedCopy || ''}
                          placeholder="Escribe aquí tu post basándote en la idea central..."
                          className="min-h-[200px] focus:ring-brand-secondary focus:border-brand-secondary"
                          readOnly
                        />
                      </div>

                      {/* Columna derecha - Idea/Guión */}
                      <div className="bg-brand-secondary/5 border border-brand-secondary/20 rounded-lg p-4 h-fit">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="h-4 w-4 text-brand-secondary mt-0.5 flex-shrink-0" />
                          <div>
                            <h4 className="font-medium text-brand-secondary mb-2">Idea central:</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {post.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            }
          })}
        </div>
      </div>
    </MainLayout>
  )
} 