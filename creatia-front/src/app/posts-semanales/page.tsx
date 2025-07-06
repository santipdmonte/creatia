'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { MainLayout } from '@/components/layout/main-layout'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Calendar,
  Upload,
  Edit3,
  Save,
  Image as ImageIcon,
  Settings,
  X,
  FileText,
  Lightbulb,
  Coffee,
  Sunrise,
  Sun,
  Sunset,
  Moon,
  Star,
  Eye,
  Sparkles,
  Target
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
  // Additional fields from original data
  originalPost?: {
    dia: string
    content_description: string
    is_image_required: boolean
    reference_images: string[]
    image_detail_description?: string
    copy_for_post?: string
  }
}

// Mapping days to icons and numbers
const dayMapping = {
  'lunes': { icon: Coffee, number: 1 },
  'martes': { icon: Sunrise, number: 2 },
  'miercoles': { icon: Sun, number: 3 },
  'miércoles': { icon: Sun, number: 3 },
  'jueves': { icon: Sunset, number: 4 },
  'viernes': { icon: Star, number: 5 },
  'sabado': { icon: Moon, number: 6 },
  'sábado': { icon: Moon, number: 6 },
  'domingo': { icon: Moon, number: 7 }
}

// Function to transform core planner data to WeeklyPost format
const transformCorePlannerToWeeklyPosts = (corePlannerData: any): WeeklyPost[] => {
  if (!corePlannerData?.monthly_plan?.mes?.semanas?.[0]?.posts) {
    return getDefaultWeeklyPosts()
  }

  const firstWeekPosts = corePlannerData.monthly_plan.mes.semanas[0].posts
  const transformedPosts: WeeklyPost[] = []
  const processedDays = new Set<number>() // Track processed day numbers to avoid duplicates

  // Transform each post from the first week, ensuring unique days
  firstWeekPosts.forEach((post: any) => {
    const dayKey = post.dia?.toLowerCase()
    const dayConfig = dayMapping[dayKey as keyof typeof dayMapping]
    
    if (dayConfig && !processedDays.has(dayConfig.number)) {
      // Mark this day as processed
      processedDays.add(dayConfig.number)
      
      const weeklyPost: WeeklyPost = {
        day: post.dia.charAt(0).toUpperCase() + post.dia.slice(1).toLowerCase(),
        dayNumber: dayConfig.number,
        icon: dayConfig.icon,
        type: post.is_image_required ? 'placeholder' : 'organic',
        title: post.is_image_required ? 'Post con Imagen' : 'Contenido Orgánico',
        content: post.content_description || '',
        developedCopy: post.copy_for_post || '',
        originalPost: {
          dia: post.dia,
          content_description: post.content_description,
          is_image_required: post.is_image_required,
          reference_images: post.reference_images || [],
          image_detail_description: post.image_detail_description,
          copy_for_post: post.copy_for_post
        }
      }
      
      transformedPosts.push(weeklyPost)
    }
  })

  // Fill in missing days with empty posts
  for (let i = 1; i <= 7; i++) {
    if (!transformedPosts.find(post => post.dayNumber === i)) {
      const dayNames = ['', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo']
      const icons = [null, Coffee, Sunrise, Sun, Sunset, Star, Moon, Moon]
      
      transformedPosts.push({
        day: dayNames[i],
        dayNumber: i,
        icon: icons[i],
        type: 'empty',
        title: 'Descanso',
        content: ''
      })
    }
  }

  // Sort by day number
  return transformedPosts.sort((a, b) => a.dayNumber - b.dayNumber)
}

// Default posts in case no core planner data is available
const getDefaultWeeklyPosts = (): WeeklyPost[] => [
  {
    day: 'Lunes',
    dayNumber: 1,
    icon: Coffee,
    type: 'placeholder',
    title: 'Post con Imagen',
    content: '🌟 ¡Nuevo lunes, nuevas oportunidades! \n\nEsta semana nos enfocamos en construir hábitos que realmente transformen tu negocio. \n\n¿Sabías que el 80% del éxito empresarial viene de la consistencia en pequeñas acciones diarias? \n\n💪 Mi consejo para hoy: Elige UNA acción que puedas hacer todos los días durante esta semana. Solo una. \n\n¿Cuál será la tuya? 👇 \n\n#LunesDeMotivacion #Emprendimiento #Habitos #Exito #Consistencia'
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
    content: '🔥 MITAD DE SEMANA = MOMENTO DE EVALUAR \n\n¿Cómo vas con tus objetivos? \n\nEste es mi workspace hoy, trabajando en el próximo módulo de mi programa de mentoría. \n\n✨ Recordatorio: El progreso no siempre es lineal. Algunos días avanzas 10 pasos, otros solo 1. \n\nLo importante es NO parar. \n\n💭 Pregunta de reflexión: ¿Qué pequeño paso puedes dar HOY que te acerque a tu meta? \n\nNo tiene que ser perfecto, solo tiene que ser CONSISTENTE. \n\n¡Sigamos construyendo! 💪 \n\n#MiercolesDeReflexion #Progreso #Mentalidad #Emprendimiento #Consistencia #Crecimiento'
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
    content: '🎉 ¡VIERNES DE CELEBRACIÓN! \n\nEsta semana logramos: \n✅ 3 nuevos clientes para el programa \n✅ 500+ nuevos seguidores comprometidos \n✅ Lanzamiento del módulo de productividad \n✅ 2 colaboraciones estratégicas cerradas \n\n🙌 Pero lo que más me emociona... \n\nVer los resultados de mis estudiantes: \n• María aumentó sus ventas 40% \n• Carlos automatizó su proceso de leads \n• Ana lanzó su primer producto digital \n\n💡 Recordatorio: Celebra tus wins, por pequeños que parezcan. \n\nEl éxito se construye con pequeñas victorias diarias. \n\n¿Qué estás celebrando esta semana? 🎊 \n\n#ViernesDeVictoria #Celebracion #Exito #Resultados #Gratitud #Emprendimiento'
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
]

// Placeholder images for selection
const placeholderImages: string[] = []

export default function PostsSemanalesPage() {
  const [selectedImageForPreview, setSelectedImageForPreview] = useState<string | null>(null)
  const [isGeneratingImages, setIsGeneratingImages] = useState(false)
  const [generatedImagesForMonday, setGeneratedImagesForMonday] = useState<string[]>([])
  const [weeklyPosts, setWeeklyPosts] = useState<WeeklyPost[]>([])
  const [isUsingCorePlannerData, setIsUsingCorePlannerData] = useState(false)
  const [hasData, setHasData] = useState(false)
  const [selectedPostForDetail, setSelectedPostForDetail] = useState<WeeklyPost | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<WeeklyPost | null>(null)
  
  // New state for managing generated images per day
  const [generatedImagesByDay, setGeneratedImagesByDay] = useState<Record<number, string[]>>({})

  // Load core planner data and generated images from localStorage on component mount
  useEffect(() => {
    try {
      // Load core planner data
      const savedCorePlannerData = localStorage.getItem('corePlannerData')
      if (savedCorePlannerData) {
        const corePlannerData = JSON.parse(savedCorePlannerData)
        const transformedPosts = transformCorePlannerToWeeklyPosts(corePlannerData)
        
        // Load selected images for each post
        const savedSelectedImages = localStorage.getItem('selectedImages')
        if (savedSelectedImages) {
          const selectedImages = JSON.parse(savedSelectedImages)
          // Update posts with selected images
          const postsWithImages = transformedPosts.map(post => ({
            ...post,
            image: selectedImages[post.dayNumber] || undefined
          }))
          setWeeklyPosts(postsWithImages)
        } else {
          setWeeklyPosts(transformedPosts)
        }
        
        setIsUsingCorePlannerData(true)
        setHasData(true)
      } else {
        // Load default posts
        const defaultPosts = getDefaultWeeklyPosts()
        const savedSelectedImages = localStorage.getItem('selectedImages')
        if (savedSelectedImages) {
          const selectedImages = JSON.parse(savedSelectedImages)
          const postsWithImages = defaultPosts.map(post => ({
            ...post,
            image: selectedImages[post.dayNumber] || undefined
          }))
          setWeeklyPosts(postsWithImages)
        } else {
          setWeeklyPosts(defaultPosts)
        }
        setHasData(false)
      }
      
      // Load generated images for each day
      const savedGeneratedImages = localStorage.getItem('generatedImagesByDay')
      if (savedGeneratedImages) {
        const generatedImages = JSON.parse(savedGeneratedImages)
        setGeneratedImagesByDay(generatedImages)
        
        // Set Monday images for backward compatibility
        if (generatedImages[1]) {
          setGeneratedImagesForMonday(generatedImages[1])
        }
      }
      
    } catch (error) {
      console.error('Error loading saved data:', error)
      setHasData(false)
    }
  }, [])

  // Function to clear all saved images
  const clearAllImages = () => {
    const confirmClear = window.confirm(
      '¿Estás seguro de que quieres limpiar todas las imágenes guardadas? Esta acción no se puede deshacer.'
    )
    
    if (!confirmClear) return
    
    try {
      localStorage.removeItem('selectedImages')
      localStorage.removeItem('generatedImagesByDay')
      
      // Clear state
      setGeneratedImagesByDay({})
      setGeneratedImagesForMonday([])
      
      // Clear images from posts
      setWeeklyPosts(prev => 
        prev.map(post => ({
          ...post,
          image: undefined
        }))
      )
      
      console.log('🗑️ Cleared all saved images')
      alert('✅ Todas las imágenes han sido eliminadas')
    } catch (error) {
      console.error('Error clearing images:', error)
      alert('❌ Error al limpiar las imágenes')
    }
  }

  // Function to save selected images to localStorage
  const saveSelectedImageToStorage = (dayNumber: number, imageUrl: string) => {
    try {
      const savedSelectedImages = localStorage.getItem('selectedImages')
      const selectedImages = savedSelectedImages ? JSON.parse(savedSelectedImages) : {}
      selectedImages[dayNumber] = imageUrl
      localStorage.setItem('selectedImages', JSON.stringify(selectedImages))
      console.log('💾 Saved selected image for day', dayNumber, ':', imageUrl)
    } catch (error) {
      console.error('Error saving selected image:', error)
    }
  }

  // Function to save generated images to localStorage
  const saveGeneratedImagesToStorage = (dayNumber: number, imageUrls: string[]) => {
    try {
      const savedGeneratedImages = localStorage.getItem('generatedImagesByDay')
      const generatedImages = savedGeneratedImages ? JSON.parse(savedGeneratedImages) : {}
      generatedImages[dayNumber] = imageUrls
      localStorage.setItem('generatedImagesByDay', JSON.stringify(generatedImages))
      console.log('💾 Saved generated images for day', dayNumber, ':', imageUrls.length, 'images')
    } catch (error) {
      console.error('Error saving generated images:', error)
    }
  }

  // Function to reload core planner data
  const handleReloadCorePlannerData = () => {
    try {
      const savedCorePlannerData = localStorage.getItem('corePlannerData')
      if (savedCorePlannerData) {
        const corePlannerData = JSON.parse(savedCorePlannerData)
        const transformedPosts = transformCorePlannerToWeeklyPosts(corePlannerData)
        
        // Reload selected images
        const savedSelectedImages = localStorage.getItem('selectedImages')
        if (savedSelectedImages) {
          const selectedImages = JSON.parse(savedSelectedImages)
          const postsWithImages = transformedPosts.map(post => ({
            ...post,
            image: selectedImages[post.dayNumber] || undefined
          }))
          setWeeklyPosts(postsWithImages)
        } else {
          setWeeklyPosts(transformedPosts)
        }
        
        setIsUsingCorePlannerData(true)
        setHasData(true)
      } else {
        alert('No hay datos de estrategia guardados. Ve a la página de Estrategia para generar un plan.')
      }
    } catch (error) {
      console.error('Error reloading core planner data:', error)
      alert('Error al cargar los datos de estrategia.')
    }
  }

  const handleImageSelection = (dayNumber: number, imageUrl: string) => {
    // Update the posts state
    setWeeklyPosts(prev => 
      prev.map(post => 
        post.dayNumber === dayNumber 
          ? { ...post, image: imageUrl }
          : post
      )
    )
    
    // Save the selection to localStorage
    saveSelectedImageToStorage(dayNumber, imageUrl)
    
    console.log('🖼️ Selected image for day', dayNumber, ':', imageUrl)
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

  const handleOpenDetailModal = (post: WeeklyPost) => {
    setSelectedPostForDetail(post)
    setEditingPost({ ...post })
    setIsDetailModalOpen(true)
  }

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false)
    setSelectedPostForDetail(null)
    setEditingPost(null)
  }

  const handleSavePostDetails = () => {
    if (!editingPost) return

    // Update the post in the main state
    setWeeklyPosts(prev => 
      prev.map(post => 
        post.dayNumber === editingPost.dayNumber 
          ? editingPost
          : post
      )
    )

    // Update the original data in localStorage
    try {
      const savedCorePlannerData = localStorage.getItem('corePlannerData')
      if (savedCorePlannerData && editingPost.originalPost) {
        const corePlannerData = JSON.parse(savedCorePlannerData)
        
        // Find and update the corresponding post in the original data
        if (corePlannerData.monthly_plan?.mes?.semanas?.[0]?.posts) {
          const posts = corePlannerData.monthly_plan.mes.semanas[0].posts
          const postIndex = posts.findIndex((p: any) => 
            p.dia.toLowerCase() === editingPost.originalPost!.dia.toLowerCase()
          )
          
          if (postIndex !== -1) {
            posts[postIndex] = {
              ...posts[postIndex],
              content_description: editingPost.content,
              copy_for_post: editingPost.developedCopy,
              image_detail_description: editingPost.originalPost.image_detail_description,
              reference_images: editingPost.originalPost.reference_images
            }
            
            // Save back to localStorage
            localStorage.setItem('corePlannerData', JSON.stringify(corePlannerData))
          }
        }
      }
    } catch (error) {
      console.error('Error saving post details:', error)
    }

    handleCloseDetailModal()
  }

  const handleEditingPostChange = (field: string, value: any) => {
    if (!editingPost) return
    
    if (field.startsWith('originalPost.')) {
      const originalField = field.replace('originalPost.', '')
      setEditingPost(prev => ({
        ...prev!,
        originalPost: {
          ...prev!.originalPost!,
          [originalField]: value
        }
      }))
    } else {
      setEditingPost(prev => ({
        ...prev!,
        [field]: value
      }))
    }
  }

  const handleGenerateImages = async () => {
    setIsGeneratingImages(true)
    
    try {
      // Get the Monday post for generating images
      const mondayPost = weeklyPosts.find(post => post.dayNumber === 1)
      if (!mondayPost) {
        alert('No se encontró el post del lunes')
        return
      }

      // Use the detailed image description if available, otherwise use content description
      let initial_prompt = mondayPost.content
      if (mondayPost.originalPost?.image_detail_description) {
        initial_prompt = mondayPost.originalPost.image_detail_description
      } else if (mondayPost.originalPost?.content_description) {
        initial_prompt = mondayPost.originalPost.content_description
      }

      let prompt = initial_prompt + `
      
{
    "brandIdentity": {
      "name": "AI Weekend (AIWKND)",
      "tagline": "Impulsando el futuro, hoy.",
      "tone": "Futuristic, Playful, Bold, Professional",
      "colorPalette": {
        "primary": "#FF2D87",
        "secondary": "#6C2BFF",
        "accent1": "#00C2FF",
        "accent2": "#0A0A0A",
        "background": "#1E1E1E",
        "textLight": "#FFFFFF",
        "textMuted": "#B0B0B0"
      },
      "typography": {
        "headingFont": "Montserrat, sans-serif",
        "bodyFont": "Roboto, sans-serif",
        "headingWeight": "800",
        "bodyWeight": "400",
        "textTransform": "uppercase for headings",
        "textColor": "#FFFFFF"
      },
      "graphics": {
        "style": "Gradient overlays, neomorphic elements, glowing effects",
        "iconography": "Minimal, neon-outline icons or glyphs",
        "shapes": ["Blobs", "Spheres", "Geometric stars", "Rounded rectangles"]
      },
      "layout": {
        "structure": "Hero first, followed by key event details",
        "alignment": "Center-aligned headers, grid-based sections",
        "callToAction": {
          "style": "Rounded buttons",
          "color": "#FF2D87",
          "textColor": "#FFFFFF",
          "hoverEffect": "Glow or slight enlargement"
        }
      },
      "components": {
        "navbar": {
          "background": "black",
          "textColor": "white",
          "fontSize": "14px",
          "items": ["Speakers", "Sponsors", "Agenda", "Próximos Eventos", "Blog"]
        },
        "footer": {
          "style": "Minimal dark footer with social links",
          "backgroundColor": "#0A0A0A",
          "textColor": "#B0B0B0"
        },
        "chatWidget": {
          "style": "Mascot-themed assistant in corner",
          "position": "bottom-right",
          "messageStyle": "Speech bubble"
        }
      }
    },
    "eventStructure": {
      "highlights": ["Conferencias", "Workshops", "Hackaton"],
      "duration": "3 days",
      "locations": ["Buenos Aires", "Rosario", "Mendoza", "Salta"],
      "companies": ["Google", "AWS", "X", "Microsoft", "Vercel"],
      "targetAudience": ["Developers", "Students", "Startups", "Tech Enthusiasts"],
      "sponsorsCall": {
        "style": "Highlighted section with CTA",
        "button": {
          "text": "QUIERO SPONSOREAR",
          "color": "#FF2D87",
          "rounded": true
        }
      }
    },
    "animationStyle": {
      "transitions": "Smooth fade-ins, slides",
      "interactiveElements": ["Hover glowing buttons", "Mascot animation", "Scrolling reveals"]
    },
    "brandingPrinciples": {
      "consistency": "Maintain visual style across locations and dates",
      "engagement": "Use of mascot and vibrant CTA to keep user attention",
      "energy": "Colorful, exciting, fast-paced aesthetic for innovation"
    }
  }
      `
      console.log('🎨 Generating images with prompt:', prompt)

      // Call the backend API to generate images
      const response = await fetch('http://localhost:8000/images/generate-batch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt,
          count: 3,
          quality: "high",
          size: "1024x1024",
          output_format: "jpeg",
          save_directory: "images_generated/frontend",
          filename_prefix: "lunes_post",
          images_url_list: ["resources_content/avatars/o_1iteckaknngm12do11h953rlftfn.webp", "resources_content/images/gld4By_68274b1c568fa_medium.webp"]
        }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        console.error('❌ API Error:', response.status, errorText)
        throw new Error(`Error al generar las imágenes: ${response.status} - ${errorText}`)
      }

      const result = await response.json()
      console.log('✅ Images generated successfully:', result)

      // Extract the generated image paths and convert them to URLs that the frontend can access
      const generatedImages = result.results?.successful || []
      const imageUrls = generatedImages.map((img: any) => {
        // Convert the backend path to a frontend-accessible URL
        // The images are served through the /static endpoint we configured
        // img.image_path = "images_generated/frontend/filename.jpeg"
        // We need to remove "images_generated/" and use /static/ instead
        const relativePath = img.image_path.replace('images_generated/', '')
        return `http://localhost:8000/static/${relativePath}`
      })

      console.log('🖼️ Generated image URLs:', imageUrls)

      // Update the generated images for Monday
      if (imageUrls.length > 0) {
        setGeneratedImagesForMonday(imageUrls)
        
        // Update the generatedImagesByDay state
        setGeneratedImagesByDay(prev => ({
          ...prev,
          1: imageUrls // Monday is day 1
        }))
        
        // Save to localStorage
        saveGeneratedImagesToStorage(1, imageUrls)
        
        console.log('📋 Updated Monday images state with', imageUrls.length, 'images')
        alert(`🎉 ¡Imágenes generadas exitosamente! ${result.results?.total_successful || 0} imágenes creadas para el lunes.`)
      } else {
        console.warn('⚠️ No image URLs generated')
        alert('❌ No se pudieron generar imágenes. Intenta de nuevo.')
      }
      
    } catch (error) {
      console.error('Error generating images:', error)
      alert(`Error al generar las imágenes: ${error instanceof Error ? error.message : 'Error desconocido'}`)
    } finally {
      setIsGeneratingImages(false)
    }
  }

  const ImageSelectionGrid = ({ dayNumber }: { dayNumber: number }) => {
    // Use generated images for the specific day if available, otherwise show placeholder
    const imagesToShow = generatedImagesByDay[dayNumber] && generatedImagesByDay[dayNumber].length > 0
      ? generatedImagesByDay[dayNumber]
      : placeholderImages

    // If no images available, show placeholder
    if (imagesToShow.length === 0) {
      return (
        <div className="text-center py-6">
          <div className="w-12 h-12 rounded-full bg-brand-primary/10 flex items-center justify-center mx-auto mb-3">
            <ImageIcon className="h-6 w-6 text-brand-primary/60" />
          </div>
          <p className="text-sm text-brand-primary/80 font-medium mb-1">
            Imágenes pendientes de generación
          </p>
          <p className="text-xs text-muted-foreground">
            Haz click en "Generar Imágenes" para crear opciones visuales
          </p>
        </div>
      )
    }

    // Get the currently selected image for this day
    const selectedImage = weeklyPosts.find(post => post.dayNumber === dayNumber)?.image
    
    return (
      <div className="grid grid-cols-3 gap-2">
        {imagesToShow.map((imageUrl, index) => {
          const isSelected = selectedImage === imageUrl
          
          return (
            <div key={index} className="relative group">
              <div 
                className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                  isSelected 
                    ? 'border-green-500 ring-2 ring-green-200' 
                    : 'border-transparent hover:border-brand-primary/50'
                }`}
                onClick={() => handleImageSelection(dayNumber, imageUrl)}
              >
                <img 
                  src={imageUrl} 
                  alt={`Opción ${index + 1}`}
                  className={`w-full h-full object-cover transition-transform ${
                    isSelected ? 'scale-95' : 'group-hover:scale-105'
                  }`}
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                    <Badge className="bg-green-500 text-white text-xs">
                      ✓
                    </Badge>
                  </div>
                )}
              </div>
          
            {/* Preview button */}
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity w-6 h-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedImageForPreview(imageUrl)
                  }}
                >
                  <Eye className="h-3 w-3" />
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
          )
        })}
      </div>
    )
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-light creatia-title flex items-center gap-2">
                📅 Posts Semanales
              </h1>
              {isUsingCorePlannerData && (
                <Badge variant="outline" className="border-brand-primary/30 text-brand-primary bg-brand-primary/5">
                  <Lightbulb className="h-3 w-3 mr-1" />
                  Estrategia IA
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mt-1">
              {isUsingCorePlannerData 
                ? 'Contenido generado desde tu estrategia mensual' 
                : 'Planifica y organiza tu contenido para toda la semana'
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            {isUsingCorePlannerData && (
              <Button 
                variant="outline"
                onClick={handleReloadCorePlannerData}
                className="border-brand-primary/30 text-brand-primary hover:bg-brand-primary/10"
              >
                <FileText className="h-4 w-4 mr-2" />
                Recargar Estrategia
              </Button>
            )}
            {(Object.keys(generatedImagesByDay).length > 0 || weeklyPosts.some(post => post.image)) && (
              <Button 
                variant="outline"
                onClick={clearAllImages}
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                <X className="h-4 w-4 mr-2" />
                Limpiar Imágenes
              </Button>
            )}
            {hasData && (
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-400"
                onClick={handleGenerateImages}
                disabled={isGeneratingImages}
              >
                <Sparkles className={`h-4 w-4 mr-2 ${isGeneratingImages ? 'animate-spin' : ''}`} />
                {isGeneratingImages ? 'Generando Imágenes...' : 'Generar Imágenes para Lunes'}
              </Button>
            )}
          </div>
        </div>

        {/* Estado vacío cuando no hay datos */}
        {!hasData ? (
          <Card className="shadow-brand border-brand-accent/20">
            <CardContent className="text-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <Calendar className="h-8 w-8 text-brand-primary/60" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-brand-primary">
                    No hay estrategia mensual
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Para ver los posts semanales, primero necesitas generar una estrategia mensual.
                  </p>
                </div>
                <Button 
                  onClick={() => window.location.href = '/estrategia'}
                  className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                >
                  <Target className="h-4 w-4 mr-2" />
                  Ir a Estrategia
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
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
                    <div className="text-2xl font-bold text-brand-primary">
                      {weeklyPosts.filter(p => p.type === 'placeholder').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Posts con Imagen</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-brand-secondary">
                      {weeklyPosts.filter(p => p.type === 'organic').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Contenido Orgánico</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-brand-success">
                      {weeklyPosts.filter(p => p.type !== 'empty').length}
                    </div>
                    <div className="text-xs text-muted-foreground">Posts Totales</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-brand-accent">
                      {weeklyPosts.filter(p => p.type === 'empty').length}
                    </div>
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
                <Card key={post.dayNumber} className="opacity-50">
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
                <Card key={post.dayNumber} className="shadow-brand">
                  <CardHeader>
                    <div className="flex items-center justify-between">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDetailModal(post)}
                        className="text-brand-primary hover:bg-brand-primary/10"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {/* Layout en 2 columnas: Texto izquierda, Imagen derecha */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Columna izquierda - Copy del post */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">
                          Copy desarrollado para el post:
                        </label>
                        <Textarea
                          placeholder={post.developedCopy || 'Copy desarrollado para el post...'}
                          value={post.developedCopy || ''}
                          readOnly
                          className="min-h-[300px] focus:ring-brand-primary focus:border-brand-primary"
                        />
                      </div>

                      {/* Columna derecha - Área de imagen */}
                      <div className="border-2 border-dashed border-brand-primary/30 rounded-lg p-4 bg-brand-primary/5 h-fit">
                        {post.image ? (
                          <div className="space-y-4">
                            {/* Imagen seleccionada - formato cuadrado */}
                            <div className="relative aspect-square">
                              <img 
                                src={post.image} 
                                alt={`Post ${post.day}`}
                                className="w-full h-full object-cover rounded-lg"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-green-500 text-white text-xs">
                                  ✓ Seleccionada
                                </Badge>
                              </div>
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
                            
                            {/* Mostrar otras opciones si existen - más pequeñas */}
                            {generatedImagesByDay[post.dayNumber] && generatedImagesByDay[post.dayNumber].length > 0 && (
                              <div>
                                <p className="text-xs text-muted-foreground mb-2 text-center">
                                  Otras opciones disponibles:
                                </p>
                                <ImageSelectionGrid dayNumber={post.dayNumber} />
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <ImageSelectionGrid dayNumber={post.dayNumber} />
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
                <Card key={post.dayNumber} className="shadow-brand border-brand-secondary/20">
                  <CardHeader>
                    <div className="flex items-center justify-between">
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenDetailModal(post)}
                        className="text-brand-secondary hover:bg-brand-secondary/10"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
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
          </>
        )}

        {/* Modal de Detalle del Post */}
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Detalle del Post - {selectedPostForDetail?.day}
              </DialogTitle>
            </DialogHeader>
            
            {editingPost && (
              <div className="space-y-6 mt-4">
                {/* Información básica */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="day">Día</Label>
                    <Input
                      id="day"
                      value={editingPost.day}
                      onChange={(e) => handleEditingPostChange('day', e.target.value)}
                      className="focus:ring-brand-primary focus:border-brand-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Tipo de Post</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant={editingPost.type === 'placeholder' ? 'default' : 'secondary'}>
                        {editingPost.type === 'placeholder' ? '📸 Post con Imagen' : '📝 Contenido Orgánico'}
                      </Badge>
                      {editingPost.originalPost?.is_image_required && (
                        <Badge variant="outline" className="text-xs">
                          Imagen Requerida
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Descripción del contenido */}
                <div className="space-y-2">
                  <Label htmlFor="content">Descripción del Contenido</Label>
                  <Textarea
                    id="content"
                    value={editingPost.content}
                    onChange={(e) => handleEditingPostChange('content', e.target.value)}
                    placeholder="Descripción del contenido del post..."
                    className="min-h-[100px] focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                {/* Copy desarrollado */}
                <div className="space-y-2">
                  <Label htmlFor="copy">Copy Desarrollado</Label>
                  <Textarea
                    id="copy"
                    value={editingPost.developedCopy || ''}
                    onChange={(e) => handleEditingPostChange('developedCopy', e.target.value)}
                    placeholder="Copy completo para el post..."
                    className="min-h-[200px] focus:ring-brand-primary focus:border-brand-primary"
                  />
                </div>

                {/* Información de imagen (si aplica) */}
                {editingPost.originalPost?.is_image_required && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Información de Imagen
                    </h3>
                    
                    {/* Descripción detallada de imagen */}
                    <div className="space-y-2">
                      <Label htmlFor="imageDescription">Descripción Detallada de la Imagen</Label>
                      <Textarea
                        id="imageDescription"
                        value={editingPost.originalPost?.image_detail_description || ''}
                        onChange={(e) => handleEditingPostChange('originalPost.image_detail_description', e.target.value)}
                        placeholder="Descripción detallada de cómo debería ser la imagen..."
                        className="min-h-[100px] focus:ring-brand-primary focus:border-brand-primary"
                      />
                    </div>

                    {/* Imágenes de referencia */}
                    <div className="space-y-2">
                      <Label htmlFor="referenceImages">Imágenes de Referencia</Label>
                      <Input
                        id="referenceImages"
                        value={editingPost.originalPost?.reference_images?.join(', ') || ''}
                        onChange={(e) => handleEditingPostChange('originalPost.reference_images', e.target.value.split(', ').filter(img => img.trim()))}
                        placeholder="imagen1.jpg, imagen2.png, ..."
                        className="focus:ring-brand-primary focus:border-brand-primary"
                      />
                      <p className="text-xs text-muted-foreground">
                        Separa las rutas de imágenes con comas
                      </p>
                    </div>
                  </div>
                )}

                {/* Metadatos */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Metadatos</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Día original:</span>
                      <span className="ml-2 font-medium">{editingPost.originalPost?.dia}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Número del día:</span>
                      <span className="ml-2 font-medium">{editingPost.dayNumber}</span>
                    </div>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <Button
                    variant="outline"
                    onClick={handleCloseDetailModal}
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSavePostDetails}
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  )
}